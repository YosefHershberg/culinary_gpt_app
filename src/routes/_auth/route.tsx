import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user) {
      const hasAuthed = localStorage.getItem('hasAuthed')

      throw redirect({
        to: '/signin/$',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})