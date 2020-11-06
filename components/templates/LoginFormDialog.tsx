import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useForm from '../../models/hooks/useForm';
import { useQuery, useMutation } from "@apollo/client";
import { LoginMutation, RegisterMutation } from '../../graphQL/LoginStatements';
import useLocal from '../../models/hooks/useLocal';
import { LoginInput, LoginOutput, RegisterInput } from '../../graphQL/generated/types';

interface Props {
    open: boolean
    handleOpen: (open: boolean) => void
}

export default (props: Props) => {
    const [email, onChangeEmail] = useForm("")
    const [password, onChangePassword] = useForm("")
    const [login] = useMutation(LoginMutation);
    const [register] = useMutation(RegisterMutation)

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
        } else {
            console.log("login失敗/会員登録を開始")
            const input: RegisterInput = { email, password, name: email }
            const result = await register({ variables: { input } })
            const user: LoginOutput = result.data.registerUser
            if (user) {
                console.log(`会員登録成功 id =  ${user.user?.userId}`)
                useLocal("USER_ID", user.user?.userId)
                useLocal("Name", user.user?.name)
            } else {
                console.log("会員登録失敗")
                console.log(result)
            }
        }
        handleClose()
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">ログイン/会員登録</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ログイン/会員登録をしてください。
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
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClickLoginOrRegister} color="primary">
                        ログイン/登録
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}