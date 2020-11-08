import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
    open: boolean,
    onClose: () => void
    onRegister: (text: string) => void
}

export default (props: Props) => {
    const [text, setText] = useState("")

    const handleClose = () => {
        props.onClose()
    };

    const onRegister = () => {
        props.onRegister(text)
    }

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">勉強した内容を記録しよう</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    あなたは今回の勉強から何を学びましたか？小さなことでいいので書き残しておきましょう。
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="学んだ内容"
                    fullWidth
                    onChange={(e) => setText(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    キャンセル
                </Button>
                <Button onClick={onRegister} color="primary">
                    登録
              </Button>
            </DialogActions>
        </Dialog>
    );
}