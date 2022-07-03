import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { useRouter } from 'next/router'
//components
import ForgetPassword from '../components/Auth/ForgetPassword'

const ForgotPassword = () => {
  const router = useRouter()
  const { forgotPassword } = useAuth({ middleware: 'guest' })

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const submitForm = event => {
    event.preventDefault()
    forgotPassword({ email, setErrors, setStatus })
  }

  return (
    <>
      <ForgetPassword
        email={email}
        setEmail={setEmail}
        errors={errors}
        setErrors={setErrors}
        status={status}
        setStatus={setStatus}
        submitForm={submitForm}
      />
    </>
  )
}

export default ForgotPassword
