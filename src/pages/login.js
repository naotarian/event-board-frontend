// import ApplicationLogo from '@/components/ApplicationLogo'
// import AuthCard from '@/components/AuthCard'
// import AuthSessionStatus from '@/components/AuthSessionStatus'
// import AuthValidationErrors from '@/components/AuthValidationErrors'
// import Button from '@/components/Button'
// import GuestLayout from '@/components/Layouts/GuestLayout'
// import Input from '@/components/Input'
// import Label from '@/components/Label'
// import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
//components
import SignIn from '../components/Auth/SignIn'

const Login = () => {
  const router = useRouter()

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (router.query.reset?.length > 0 && errors.length == 0) {
      setStatus(atob(router.query.reset))
    } else {
      setStatus(null)
    }
  })

  const submitForm = async event => {
    setLoading(true)
    event.preventDefault()
    login({ email, password, setErrors, setStatus })
  }

  return (
    <>
      <SignIn
        submitForm={submitForm}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        errors={errors}
        setErrors={setErrors}
        status={status}
        setStatus={setStatus}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  )
}

export default Login
