import { supabase } from '@/utils/supabase/server'
import { Info } from 'react-feather'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = await supabase()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return redirect('/sign-in')
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-foreground flex items-center gap-3 rounded-md p-3 px-5 text-sm">
          <Info size={16} strokeWidth={2} />
          This is a protected page that you can only see as an authenticated user
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <h2 className="mb-4 text-2xl font-bold">Your user details</h2>
        <pre className="max-h-32 overflow-auto rounded border p-3 font-mono text-xs">
          {JSON.stringify(session?.user, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className="mb-4 text-2xl font-bold">Next steps</h2>
      </div>
    </div>
  )
}
