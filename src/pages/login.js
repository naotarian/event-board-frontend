import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from "styled-components"
//mui
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
//icon
import LoginIcon from '@mui/icons-material/Login'
//css
import loginCss from '../../styles/auth/login.module.css'
import { Typography } from '@mui/material'
const Title = styled(Typography)`
    text-align: center;
    font-weight: bold;
    font-size: 1.6rem;
    margin: 0 0 1rem
`
const ButtonArea = styled(Grid)`
    text-align: right;
`

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
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
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <a>
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </a>
                    </Link>
                }>

                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />

                <form onSubmit={submitForm} className={loginCss.login_card}>
                    <Title>ログイン</Title>
                    <dl className={loginCss.side_search_bar}>



                        <dt className="bold"><Label htmlFor="email">Email</Label></dt>
                        <dd className='ml100'>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                className={`wi100 ${loginCss.input}`}
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoFocus
                            />
                        </dd>
                        <dt className="bold"><Label htmlFor="password">Password</Label></dt>
                        <dd className='ml100'>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                className={`wi100 ${loginCss.input}`}
                                onChange={event => setPassword(event.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </dd>
                    </dl>

                    {/* Remember Me */}
                    <div>
                        <label
                            htmlFor="remember_me"
                            className="inline-flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />

                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                        <Link href="/forgot-password">
                            <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                Forgot your password?
                            </a>
                        </Link>
                    </div>

                    <ButtonArea>

                        {/* <LoadingButton
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<LoginIcon />}
                            variant="outlined"
                            >
                            Login
                        </LoadingButton> */}
                        <Button>Login</Button>
                    </ButtonArea>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Login
