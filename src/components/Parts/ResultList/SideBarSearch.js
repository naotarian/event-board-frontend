import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Grid from '@mui/material/Grid'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import LoadingButton from '@mui/lab/LoadingButton'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
//css
import styled from "styled-components"
import Css from '../../../../styles/sidebar_search.module.css'
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />
const ButtonArea = styled(Grid)`
  padding: 1rem;
  border-top: 1px solid #ddd;
  text-align: center;
`
const SideBarSearch = (props) => {
  const [selectDateStart, setSelectDateStart] = useState(null)
  const [selectDateEnd, setSelectDateEnd] = useState(null)
  const [loading, setLoading] = useState(false)
  const { TagFocus } = props
  return (
    <dl className={Css.side_search_bar}>
      <dt className="bold">キーワード</dt>
      <dd className='ml100'>
        <TextField
          label=""
          id="outlined-size-small"
          defaultValue="キーワード"
          size="small"
          variant="filled"
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
          variant="filled"
        />
      </dd>

      <dt className="bold">エリア</dt>
      <dd className='ml100'>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={top100Films}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="エリアを選択" />
          )}
        />
      </dd>
      <dt className="bold">開催日</dt>
      <dd className='ml100'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="開始"
            value={selectDateStart}
            onChange={(newValue) => {
              setSelectDateStart(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </dd>
      <dd className='ml100'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="終了"
            value={selectDateEnd}
            minDate={selectDateStart}
            onChange={(newValue) => {
              setSelectDateEnd(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </dd>
      <ButtonArea>
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          startIcon={<FilterAltIcon />}
          variant="outlined"
        >
          絞り込む
        </LoadingButton>
      </ButtonArea>
    </dl>
  )
}
const top100Films = [
  { title: '東京都' },
  { title: '神奈川県' },
  { title: '埼玉県' },
  { title: '千葉県' },
  { title: '大阪府' },
  { title: '福岡県' },
]
export default SideBarSearch