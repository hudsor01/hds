interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="from-slate 50 flex min-h-screen items-center justify-center bg-gradient-to-br to-slate-100 px-4 py-12 sm:px-6 lg:px-8 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">{children}</div>
    </div>
  )
}
