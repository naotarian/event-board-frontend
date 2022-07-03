import { useState } from 'react'
import styled from 'styled-components'
//mui
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
const modalStyle = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  width: 900,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}
const ModalBox = styled(Box)`
  overflow-y: scroll;
`
const TagTitle = styled(Typography)`
  margin-bottom: 15px;
  color: #253458;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`
const TagBand = styled(Typography)`
  padding: 6px 20px;
  margin-bottom: 15px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  border-radius: 2px;
  background-color: #333;
`
const TagModal = props => {
  const { tagModal, tagModalClose } = props
  function FormRow() {
    return (
      <>
        <Grid item xs={3}>
          <Item>.NET</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>ActionScript</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>Agda</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>Akka</Item>
        </Grid>
      </>
    )
  }
  const Item = styled(Grid)`
    padding: 1rem;
  `
  return (
    <Modal
      open={tagModal}
      onClose={tagModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <ModalBox sx={modalStyle}>
        <TagTitle id="modal-modal-title">タグを選択</TagTitle>
        <TagBand id="modal-modal-description" sx={{ mt: 2 }}>
          プログラム
        </TagBand>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid container item spacing={3}>
              <FormRow />
            </Grid>
          </Grid>
        </Box>
        <Button onClick={tagModalClose}>閉じる</Button>
      </ModalBox>
    </Modal>
  )
}
export default TagModal
