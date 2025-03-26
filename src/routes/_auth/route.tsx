import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user) {
      const hasAuthed = localStorage.getItem('hasAuthed')

      throw redirect({
        to: hasAuthed ? '/signin/$' : '/signup/$',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})