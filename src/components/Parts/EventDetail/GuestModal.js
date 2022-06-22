import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Link from 'next/link'


const GuestModal = (props) => {
  const { guestModalOpen, guestModalClose, guestApplication, setGuestName, setGuestEmail } = props
  return (
    <div>
      <Dialog open={guestModalOpen} onClose={guestModalClose}>
        <DialogTitle>ゲストとして申し込む</DialogTitle>
        <DialogContent>
          <DialogContentText>
            このままゲストとしてイベントに申し込みを行う場合は<br />
            ・氏名<br />
            ・メールアドレス<br />の入力をお願いします。<br />
            ログインする場合は
            <Link href="/login">
              <a>
                こちら
              </a>
            </Link>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="氏名"
            type="email"
            fullWidth
            variant="standard"
            onChange={event => setGuestName(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="メールアドレス"
            type="email"
            fullWidth
            variant="standard"
            onChange={event => setGuestEmail(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={guestModalClose}>閉じる</Button>
          <Button onClick={guestApplication}>申し込む</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default GuestModal