import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/protected')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/protected"!</div>
}
