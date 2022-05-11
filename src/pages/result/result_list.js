import { useEffect, useState } from 'react'
import styled from "styled-components"
import Grid from '@mui/material/Grid'
import Header from '../../components/Parts/Template/Header'
import { useAuth } from '@/hooks/auth'
//mui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const StyledTabList = styled(TabList)`
  width: fit-content;
  margin: 0 auto;
`
const ResultList = () => {
  const { user } = useAuth({ middleware: 'auth' })
  const [value, setValue] = useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <>
      <Header />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <StyledTabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
            </StyledTabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </Box>
      test

    </>
  )
}
export default ResultList