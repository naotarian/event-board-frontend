import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
//mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
//icons
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import CommentIcon from '@mui/icons-material/Comment'

const LeftAreaWrapper = styled(Grid)`
  display: block;
  @media screen and (max-width: 767px) {
    display: flex;
    margin-bottom: 1rem;
  }
`
const LeftAreaGrid = styled(Grid)`
  @media screen and (min-width: 1024px) {
    width: 300px;
    padding: 1rem;
    margin-top: 1rem;
  }
  @media screen and (max-width: 767px) {
    margin-left: 1rem;
  }
  border-radius: 5px;
`
const ImageGrid = styled(Grid)`
  @media screen and (min-width: 1024px) {
    width: 300px;
    height: 300px;
    border: 1px solid #ddd;
    background-image: url('/images/test.jpeg');
    border-radius: 50%;
  }
  @media screen and (max-width: 767px) {
    width: 150px;
    height: 150px;
    border: 1px solid #ddd;
    background-image: url('/images/test.jpeg');
    border-radius: 50%;
  }
  background-size: cover;
`
const UserInfoColumn = styled(Typography)`
  margin-top: 1rem;
`
const EditProfileButton = styled(Button)`
  width: 100%;
`
const LeftArea = props => {
  const { userInfo } = props
  const [myPage, setMyPage] = useState(false)
  const router = useRouter()
  let pathName = router.pathname
  useEffect(async () => {
    if (router.isReady) {
      if (pathName == '/user/mypage') {
        setMyPage(true)
      }
    }
  }, [pathName])
  return (
    <LeftAreaWrapper>
      <ImageGrid />
      <LeftAreaGrid>
        <UserInfoColumn>
          <PersonOutlineIcon
            style={{ verticalAlign: 'bottom', marginRight: '1rem' }}
          />
          {userInfo.name}
        </UserInfoColumn>
        <UserInfoColumn>
          <CommentIcon
            style={{ verticalAlign: 'bottom', marginRight: '1rem' }}
          />
          一言コメントが入る
        </UserInfoColumn>
        <UserInfoColumn>
          <MailOutlineIcon
            style={{ verticalAlign: 'bottom', marginRight: '1rem' }}
          />
          {userInfo.email}
        </UserInfoColumn>
        {myPage && (
          <UserInfoColumn>
            <EditProfileButton variant="contained">
              Edit Profile
            </EditProfileButton>
          </UserInfoColumn>
        )}
      </LeftAreaGrid>
    </LeftAreaWrapper>
  )
}
export default LeftArea
