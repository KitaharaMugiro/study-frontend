import { useMutation } from "@apollo/client";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Alert from "@material-ui/lab/Alert";
import React, { useState } from 'react';
import { ConnectUserInput, LoginInput, LoginOutput } from '../../graphQL/generated/types';
import { ConnectUserMutation, LoginMutation } from '../../graphQL/LoginStatements';
import useForm from '../../models/hooks/useForm';
import useLocal from '../../models/hooks/useLocal';
import { REGISTER_TYPE } from "../../models/logics/user/REGISTER_TYPE";

interface Props {
    open: boolean
    handleOpen: (open: boolean) => void
}

const SignupFormDialog = (props: Props) => {
    const [email, onChangeEmail] = useForm("")
    const [password, onChangePassword] = useForm("")
    const [login] = useMutation(LoginMutation);
    const [connect] = useMutation(ConnectUserMutation)
    const [errorMessage, setErrorMessage] = useState("")

    const handleClose = () => {
        props.handleOpen(false);
    };

    const onClickRegister = async () => {
        console.log("login挑戦")
        const input: LoginInput = { email, password }
        const { data } = await login({ variables: { input } })
        const user: LoginOutput = data?.login
        if (user.success) {
            setErrorMessage("すでにユーザが存在します")
        } else {
            console.log("login失敗/会員登録を開始")
            const userId = useLocal("USER_ID")
            const input: ConnectUserInput = { userId, email, password }
            const result = await connect({ variables: { input } })
            const user: LoginOutput = result.data.connectUser
            if (user) {
                console.log(`会員登録成功 id =  ${user.user?.userId}`)
                useLocal("USER_ID", user.user?.userId)
                useLocal("Name", user.user?.name)
                useLocal("REGISTER_TYPE", REGISTER_TYPE.Registered)
                handleClose()
            } else {
                setErrorMessage("会員登録失敗")
            }
        }
    }

    return (
        <div>
            <Dialog
                open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">会員登録</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        会員登録をして別のデバイスでアクセスしよう
                     </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="ユーザ名"
                        type="text"
                        value={email}
                        onChange={onChangeEmail}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                        fullWidth
                    />
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

                </DialogContent>

                <DialogActions>
                    <Button onClick={onClickRegister} color="primary">
                        会員登録
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SignupFormDialog;