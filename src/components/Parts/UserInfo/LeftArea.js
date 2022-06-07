import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import styled from "styled-components"
//mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
//icons
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import CommentIcon from '@mui/icons-material/Comment'

const LeftAreaWrapper = styled(Grid)`
  display: block;
`
const LeftAreaGrid = styled(Grid)`
	@media screen and (min-width:1024px) {
		width: 300px;
	}
	border-radius: 5px;
	padding: 1rem;
  margin-top: 1rem;
`
const ImageGrid = styled(Grid)`
	@media screen and (min-width:1024px) {
		width: 300px;
    height: 300px;
    border: 1px solid #ddd;
	  border-radius: 50%;
	}
`
const UserInfoColumn = styled(Typography)`
  margin-top: 1rem;
`
const LeftArea = (props) => {
  const { userInfo } = props
  console.log(userInfo)
  return (
    <LeftAreaWrapper>
      <ImageGrid>画像が入る</ImageGrid>
      <LeftAreaGrid>
        <UserInfoColumn><PersonOutlineIcon style={{ verticalAlign: 'bottom', marginRight: '1rem' }} />{userInfo[0].name}</UserInfoColumn>
        <UserInfoColumn><CommentIcon style={{ verticalAlign: 'bottom', marginRight: '1rem' }} />一言コメントが入る</UserInfoColumn>
        <UserInfoColumn><MailOutlineIcon style={{ verticalAlign: 'bottom', marginRight: '1rem' }} />{userInfo[0].email}</UserInfoColumn>
      </LeftAreaGrid>
    </LeftAreaWrapper>
  )
}
export default LeftArea