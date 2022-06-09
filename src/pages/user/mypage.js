import { useEffect, useState } from 'react'
import styled from "styled-components"
import axios from '@/lib/axios'
//componentes
import Header from '../../components/Parts/Template/Header'
import LeftArea from '../../components/Parts/UserInfo/LeftArea'
import MainArea from '../../components/Parts/UserInfo/MainArea'
//mui
import Grid from '@mui/material/Grid'
const UserPageWrapper = styled(Grid)`
	margin: 6rem auto 0 auto;
	@media screen and (min-width:1024px) {
		max-width: 1200px;
		display: flex;
		justify-content: space-around;
	}
`
const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null)
  useEffect(async () => {
    axios.get('/api/my_page')
      .then(res => {
        setUserInfo(res.data.contents.user_info)
        console.log(res)
      }).catch(error => {

      })
  }, [])
  return (
    <>
      <Header />
      {userInfo && (
        <UserPageWrapper>
          <LeftArea userInfo={userInfo} />
          <MainArea userInfo={userInfo} />
        </UserPageWrapper>
      )}
    </>
  )
}
export default MyPage