import { useEffect, useState } from 'react'
import styled from "styled-components"
import Header from '../../components/Parts/Template/Header'
import { useAuth } from '@/hooks/auth'
import Bread from '../../components/Parts/Template/Breadcrumbs'
import ResultListCss from '../../../styles/result_list.module.css'
//mui
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import Link from 'next/link'
import theme from '../../components/default'
import { ThemeProvider } from '@material-ui/styles'
import Paper from '@mui/material/Paper'

const StyledTabList = styled(TabList)`
  width: fit-content;
  margin: 0 auto;
`
const WrapperCard = styled(Card)`
  width: 70%;
`
const WrapperGrid = styled(Grid)`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
`
const StyledTab = styled(Tab)`
  flex-basis: calc(100% / 2)
`
const ContentTag = styled(Grid)`
  width: 100%;
`
const H1Typo = styled(Typography)`
  font-size: 22px;
  line-height: 1.4; 
`
const ListActions = styled(Grid)`
  padding :1rem;
  display: flex;
  justify-content: space-between;
  width: 70%;
`
const ActionItem = styled(Grid)`
  font-size: 14px;
`
const ActionItemChild = styled(Grid)`
  position:relative;
  display:inline-block;
  padding-left: 1rem;
  &:hover {
    cursor: pointer;
    color: #0e7ac4;
  }
`
const MainContentGrid = styled(Grid)`
  // display: flex;
`
const FlexGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;
`
const SideBar = styled(Paper)`
  padding: 1rem;
  width: 25%;
`

const ResultList = () => {
  const { user } = useAuth({ middleware: 'auth' })
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  )
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  return (
    <>
      <Header />
      <WrapperGrid>
        <Bread />
        <H1Typo variant="h1" gutterBottom>
          <LocalOfferIcon />交流会
        </H1Typo>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <StyledTab value="one" label="Item One" />
            <StyledTab value="two" label="Item Two" />
          </Tabs>
        </Box>
        <MainContentGrid>
          <ListActions>
            <ActionItem>開催予定48件/開催中0件/全48件</ActionItem>
            <ActionItem className="flex">
              <ActionItemChild>
                <Link href="#">
                  <a>おすすめ順</a>
                </Link>
              </ActionItemChild>
              <ActionItemChild>
                <Link href="#">
                  <a>新着順</a>
                </Link>
              </ActionItemChild>
              <ActionItemChild>
                <Link href="#">
                  <a>開催昇順</a>
                </Link>
              </ActionItemChild>
              <ActionItemChild>
                <Link href="#">
                  <a>開催降順</a>
                </Link>
              </ActionItemChild>
              <ActionItemChild>
                <Link href="#">
                  <a>申込数順</a>
                </Link>
              </ActionItemChild>
            </ActionItem>
          </ListActions>
          <FlexGrid>
            <WrapperCard>
              <CardContent className="flex">
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className="bold">
                  2022/5/17 17:00 ~ 21:00
                </Typography>
                <ThemeProvider theme={theme}>
                  <Typography className="bold fs15rem">
                    エンジニアの自由研究発表会vol.6 ～IoT／ローコード開発／アプリ開発etc～業務外でエンジニアスキルを活かしてみた！
                  </Typography>

                </ThemeProvider>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </WrapperCard>
            <SideBar>
              <dl className={ResultListCss.side_search_bar}>
                <dt>キーワード</dt>
                <dd>内容</dd>
                <dt>タグ</dt>
                <dd>内容</dd>
                <dt>エリア</dt>
                <dd>内容</dd>
                <dt>開催日</dt>
                <dd>内容</dd>
                <dd>内容</dd>
              </dl>
            </SideBar>
          </FlexGrid>

        </MainContentGrid>

      </WrapperGrid>
    </>
  )
}
export default ResultList