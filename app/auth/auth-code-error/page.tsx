import { Button } from '@mui/material'
import Link from 'next/link'

export default function AuthCodeErrorPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Authentication error
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        The authentication link is invalid or has
                        expired. Please try to sign in again.
                    </p>
                </div>
                <Button
                    component={Link}
                    href="/login"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Back to login
                </Button>
            </div>
        </div>
    )
}
