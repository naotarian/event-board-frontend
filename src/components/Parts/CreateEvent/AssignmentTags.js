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
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
const TagsWrapperGrid = styled(Grid)`
`
const CategoryName = styled(Typography)`
  border-bottom: 1px #ddd solid;
  width: 200px;
`

const AssignmentTags = (props) => {
  const { open, setOpen, handleClickOpen, handleClose, tagAll, checkedTags, setCheckedTags } = props
  const handleChange = (e) => {
    if (checkedTags.includes(e.target.value)) {
      setCheckedTags(
        checkedTags.filter((checkedValue) => checkedValue !== e.target.value)
      );
    } else {
      setCheckedTags([...checkedTags, e.target.value]);
    }
  }
  const allClear = () => {
    setCheckedTags([])
  }
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
            {tagAll.map((data, index) => (
              <Grid key={index}>
                <CategoryName variant="h2">
                  {data.category_name}
                </CategoryName>
                {data.tags && data.tags.map((tag, key) => (
                  <FormControlLabel key={key} control={<Checkbox value={`${tag.id}`} onChange={handleChange} checked={checkedTags.includes(`${tag.id}`)} />} label={tag.tag_name} style={{ width: '200px' }} />
                ))}
              </Grid>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={allClear}>
            全てクリア
          </Button>
          <Button onClick={handleClose} autoFocus>
            決定
          </Button>
        </DialogActions>
      </Dialog >
    </TagsWrapperGrid >
  )
}
export default AssignmentTags