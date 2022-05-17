import Paper from '@mui/material/Paper'
import styled from "styled-components"
import TextField from '@mui/material/TextField'
//css
import Css from '../../../../styles/sidebar_search.module.css'
const SideBar = styled(Paper)`
padding: 1.5rem;
width: 25%;
`
const SideBarSearch = (props) => {
  const { TagFocus } = props
  return (
    <SideBar>
      <dl className={Css.side_search_bar}>
        <dt className="bold">キーワード</dt>
        <dd className='ml100'>
          <TextField
            label=""
            id="outlined-size-small"
            defaultValue="キーワード"
            size="small"
          />
        </dd>
        <dt className="bold">タグ</dt>
        <dd className='ml100'>
          <TextField
            label=""
            id="outlined-size-small"
            defaultValue="タグ"
            size="small"
            onFocus={TagFocus}
          />
        </dd>
        <dt className="bold">エリア</dt>
        <dd className='ml100'>内容</dd>
        <dt className="bold">開催日</dt>
        <dd className='ml100'>内容</dd>
        <dd className='ml100'>内容</dd>
      </dl>
    </SideBar>
  )
}
export default SideBarSearch