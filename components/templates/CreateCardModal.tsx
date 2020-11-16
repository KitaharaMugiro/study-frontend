import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import React, { useState } from "react"

interface Props {
    open: boolean
    onClose: () => void
    onRegister: (title: string) => void
}

const CreateCardModal = (props: Props) => {
    const [title, setTitle] = useState("")
    const onRegister = () => {
        props.onRegister(title)
        setTitle("")
        props.onClose()
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                勉強したいことを追加する
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    例) 英単語、デザイン、本読む
          </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label=""
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={props.onClose} color="primary">
                    Cancel
          </Button> */}
                <Button onClick={onRegister} color="primary">
                    登録
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default CreateCardModal;