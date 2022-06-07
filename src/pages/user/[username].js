import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import styled from "styled-components"
//mui
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Header from '../../components/Parts/Template/Header'
import LeftArea from '../../components/Parts/UserInfo/LeftArea'
import MainArea from '../../components/Parts/UserInfo/MainArea'
const UserPageWrapper = styled(Grid)`
	margin: 6rem auto 0 auto;
	@media screen and (min-width:1024px) {
		max-width: 1200px;
		display: flex;
		justify-content: space-around;
	}
`
const UserName = () => {
	const [userInfo, setUserInfo] = useState(null)
	if (process.browser) {
		let sendData = {}
		sendData.userName = location.href.substring(location.href.lastIndexOf('/') + 1)
		useEffect(async () => {
			axios.post('/api/user_info', sendData)
				.then(res => {
					console.log(res)
					setUserInfo(res.data.contents.user_info)
				}).catch(error => {

				})
		}, [])
	}
	return (
		<>
			<Header />
			{userInfo && (
				<UserPageWrapper>
					<LeftArea userInfo={userInfo} />
					<MainArea />
				</UserPageWrapper>
			)}
		</>
	)
}
export default UserName