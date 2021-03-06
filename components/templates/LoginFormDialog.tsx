import { useMutation } from "@apollo/client";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { LoginInput, LoginOutput, RegisterInput } from '../../graphQL/generated/types';
import { LoginMutation, RegisterMutation } from '../../graphQL/LoginStatements';
import useForm from '../../models/hooks/useForm';
import useLocal from '../../models/hooks/useLocal';
import Alert from '@material-ui/lab/Alert';
import { REGISTER_TYPE } from "../../models/logics/user/REGISTER_TYPE";

interface Props {
    open: boolean
    handleOpen: (open: boolean) => void
}

const LoginFormDialog = (props: Props) => {
    const [email, onChangeEmail] = useForm("")
    const [password, onChangePassword] = useForm("")
    const [login] = useMutation(LoginMutation);
    const [errorMessage, setErrorMessage] = useState("")

    const handleClose = () => {
        props.handleOpen(false);
    };

    const onClickLoginOrRegister = async () => {
        console.log("login挑戦")
        const input: LoginInput = { email, password }
        const { data } = await login({ variables: { input } })
        const user: LoginOutput = data?.login
        console.log(user)
        if (user.success) {
            console.log(`login成功！ id =  ${user.user?.userId}`)
            useLocal("USER_ID", user?.user?.userId)
            useLocal("Name", user?.user?.name)
            useLocal("REGISTER_TYPE", REGISTER_TYPE.Registered)
            handleClose()
            window.location.reload()
        } else {
            setErrorMessage("ログイン失敗")
        }
    }

    return (
        <div>
            <Dialog
                open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">ログイン</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ログイン
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
                    <Button onClick={onClickLoginOrRegister} color="primary">
                        ログイン
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LoginFormDialog;