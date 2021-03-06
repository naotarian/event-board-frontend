import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
//mui
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
import Input from '@mui/material/Input'
//components
import Header from '../../components/Parts/Template/Header'
import Bread from '../../components/Parts/Template/Breadcrumbs'

const WrapperGrid = styled(Grid)`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
`
const ButtonArea = styled(Grid)`
  max-width: 1200px;
  margin: 1rem auto;
  text-align: center;
`
const ContentWrapper = styled(Grid)`
  @media screen and (min-width: 1024px) {
    display: flex;
  }
  justify-content: space-between;
`

const FromWrapper = styled(Paper)`
  padding: 1rem;
  margin: 0 auto;
  width: 800px;
`
const SentLoadingButton = styled(LoadingButton)`
  width: 300px;
`
const StyledAlert = styled(Alert)`
  margin-bottom: 1rem;
`
const SuccessAlert = styled(Alert)`
  margin: 2rem auto;
  width: 800px;
`

const Contact = () => {
  const router = useRouter()
  const [eventInfo, setEventInfo] = useState(null)
  const eventId = router.query.event
  const { user } = useAuth({ middleware: 'guest' })
  const [contactText, setContactText] = useState('')
  const [loading, setLoading] = useState(false)
  const [requiredText, setRequiredText] = useState(false)
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorEmailMessage, setErrorEmailMessage] = useState('')
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    ; (async () => {
      if (!router.isReady) return
      const sendData = { id: eventId, isAuth: user ? 1 : 0 }
      const res = await axios.post('/api/event_detail', sendData)
      setEventInfo(res.data.contents.event_info)
    })()
  }, [router.isReady, user])
  const onChangeText = e => {
    setContactText(e.target.value)
  }
  const send = async () => {
    let sendFlag = true
    let emailErrorFlag = false
    let contactTextErrorFlag = false
    setLoading(true)
    if (contactText.length === 0) {
      setRequiredText(true)
      setLoading(false)
      contactTextErrorFlag = true
      sendFlag = false
    }
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
    if (!user && email.length === 0) {
      setErrorEmailMessage('???????????????????????????????????????????????????')
      setErrorEmail(true)
      setLoading(false)
      sendFlag = false
      emailErrorFlag = true
    }
    if (!user && !regex.test(email)) {
      setErrorEmailMessage('????????????????????????????????????????????????????????????')
      setErrorEmail(true)
      setLoading(false)
      sendFlag = false
      emailErrorFlag = true
    }
    if (!contactTextErrorFlag) setRequiredText(false)
    if (!emailErrorFlag) {
      setErrorEmailMessage('')
      setErrorEmail(false)
    }
    if (!sendFlag) return
    const sendDatas = {
      'eventId': eventInfo.id,
      'contactText': contactText,
      'email': user ? user.email : email
    }
    const res = await axios.post('/api/event_contact', sendDatas)
    if (res.status === 200) {
      setSuccess(true)
      setContactText('')
      setEmail('')
    }
    setLoading(false)
  }
  const emailArea = () => {
    if (user) {
      return (
        <>{user.email}</>
      )
    } else {
      return (
        <Input placeholder="test@test.com" onChange={onChangeEmail} />
      )
    }
  }
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  return (
    <>
      <Header />
      <WrapperGrid>
        <Bread />
        {success && (
          <SuccessAlert
            onClose={() => {
              setSuccess(false)
            }}
            variant="filled"
            severity="success">
            ?????????????????????????????????????????????????????????????????????????????????????????????
          </SuccessAlert>
        )}
        <ContentWrapper>
          {eventInfo && (
            <FromWrapper>
              <Typography variant="h2">???????????????</Typography>
              <Typography>{eventInfo.title}</Typography>
              <Typography variant="h2">????????????????????????</Typography>
              <Typography>{eventInfo.event_start} ~ {eventInfo.event_end}</Typography>
              <Typography variant="h2">????????????</Typography>
              <Typography>&#12306;{eventInfo.post_code}&nbsp;{eventInfo.address}{eventInfo.other_address}</Typography>
              <Typography variant="h2">?????????????????????</Typography>
              {errorEmail && (
                <StyledAlert severity="error">{errorEmailMessage}</StyledAlert>
              )}
              {emailArea()}
              <Typography variant="h2">????????????????????????</Typography>
              {requiredText && (
                <StyledAlert severity="error">??????????????????????????????????????????????????????</StyledAlert>
              )}
              <TextField
                id="outlined-multiline-static"
                label="????????????????????????"
                multiline
                fullWidth
                rows={8}
                value={contactText}
                onChange={onChangeText}
              />
              <ButtonArea>
                <SentLoadingButton
                  size="small"
                  onClick={send}
                  loading={loading}
                  loadingIndicator="Loading???"
                  variant="contained"
                >
                  ??????
                </SentLoadingButton>
              </ButtonArea>
            </FromWrapper>
          )}
        </ContentWrapper>
      </WrapperGrid>
    </>
  )
}
export default Contact