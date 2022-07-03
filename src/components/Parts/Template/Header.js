import { useEffect } from 'react'
import styled from 'styled-components'
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import HeaderCss from '../../../../styles/Parts/Template/Header.module.css'

const StyledAppBar = styled(AppBar)`
  padding: 1rem;
  box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
  height: 60px;
  position: fixed;
  top: 0;
  background-color: #fff;
`
const Header = () => {
  const { user } = useAuth({ middleware: 'guest' })
  const { logout } = useAuth()
  return (
    <StyledAppBar>
      {/* <Grid>Header</Grid> */}
      <div className={`fixed top-0 right-0 px-6 py-4 sm:block`}>
        {user ? (
          <div>
            <Link href="/result/result_list">
              <a className={`ml-4 text-sm ${HeaderCss.headerLink}`}>
                イベント一覧
              </a>
            </Link>
            <Link href="/create_event">
              <a className={`ml-4 text-sm ${HeaderCss.headerLink}`}>
                イベントを主催
              </a>
            </Link>
            <Link href="/user/mypage">
              <a className={`ml-4 text-sm ${HeaderCss.headerLink}`}>
                マイページ
              </a>
            </Link>
            {/* <Link href={logout}> */}
            <a
              className={`ml-4 text-sm ${HeaderCss.headerLink}`}
              onClick={logout}>
              ログアウト
            </a>
            {/* </Link> */}
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className={`ml-4 text-sm ${HeaderCss.headerLink}`}>Login</a>
            </Link>

            <Link href="/register">
              <a className={`ml-4 text-sm ${HeaderCss.headerLink}`}>Register</a>
            </Link>
          </>
        )}
      </div>
    </StyledAppBar>
  )
}
export default Header
