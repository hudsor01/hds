import { auth } from 'my-app/app/lib/auth/auth'
import { authConfig } from 'my-app/app/lib/auth/config'

export default auth(authConfig)

export const middlewareConfig = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
