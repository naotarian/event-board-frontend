import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const VerifyEmail = () => {
  const { logout, resendEmailVerification } = useAuth({
    middleware: 'auth',
  })

  const [status, setStatus] = useState(null)

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
        <div className="mb-4 text-sm text-gray-600">
          ご登録ありがとうございます。
          <br />
          メールアドレスあてに確認メールを送信しました。
          <br />
          メールに含まれるURLより、メールアドレスの確認をお願いいたします。
          <br />
          確認メールを再送する場合は、「メール再送」ボタンを押してください。
          <br />
        </div>

        {status == 'verification-link-sent' && (
          <div className="mb-4 font-medium text-sm text-green-600">
            A new verification link has been sent to the email address you
            provided during registration.
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <Button onClick={() => resendEmailVerification({ setStatus })}>
            メール再送
          </Button>

          <button
            type="button"
            className="underline text-sm text-gray-600 hover:text-gray-900"
            onClick={logout}>
            ログアウト
          </button>
        </div>
      </AuthCard>
    </GuestLayout>
  )
}

export default VerifyEmail
