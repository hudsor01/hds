'use client'

import useSupabaseData from '@/lib/supabase/use-supabase-data'

interface Todo {
  id: string
  title: string
}

export default function Page() {
  const { data: todos, error, loading } = useSupabaseData<'todos'>('todos')

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      <h1>My Todos</h1>
      {todos ? (
        <ul>
          {todos.map((todo: unknown) => {
            const t = todo as Todo
            return <li key={t.id}>{t.title}</li>
          })}
        </ul>
      ) : (
        <p>No todos yet.</p>
      )}
    </div>
  )
}
