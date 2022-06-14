import { useEffect, useState } from 'react'
import styled from "styled-components"
//mui
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
const TagsWrapperGrid = styled(Grid)`
`

const AssignmentTags = (props) => {
  const { open, setOpen, handleClickOpen, handleClose } = props
  return (
    <TagsWrapperGrid>
      <Button variant="outlined" onClick={handleClickOpen}>
        タグを設定する
      </Button>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="responsive-dialog-title">
          {"下記の中から付与したいタグを選択してください(複数選択可)"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ここにタグ一覧<br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </TagsWrapperGrid>
  )
}
export default AssignmentTags