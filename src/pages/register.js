import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
//components
import SignUp from '../components/Auth/SignUp'

const Register = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])

  const submitForm = event => {
    event.preventDefault()
    register({ name, email, password, password_confirmation, setErrors })
  }

  return (
    <>
      <SignUp
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        setPasswordConfirmation={setPasswordConfirmation}
        submitForm={submitForm}
      />
    </>
  )
}

export default Register
