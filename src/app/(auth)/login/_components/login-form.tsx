"use client"

import { GalleryVerticalEnd, Loader, Loader2, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useState, useTransition } from "react"
import { GithubIcon } from "@/components/ui/icons/github-icon"
import { useRouter } from "next/navigation"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter()

    const [gitHubPending, startGithubTransition] = useTransition()
    const [emailPending, startEmailTransition] = useTransition()
    const [email, setEmail] = useState('')
    async function signInWithGithub() {
        startGithubTransition(async () => {
            await authClient.signIn.social({
                provider: 'github',
                callbackURL: '/',
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('Signed in with Github')
                    },
                    onError: (error) => {
                        toast.error(error.error.message)
                    }
                }
            })
        })

    }


    async function signInWithEmail() {
        startEmailTransition(async () => {
            await authClient.emailOtp.sendVerificationOtp({
                email: email,
                type: 'sign-in',
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("OTP sent to your email")
                        router.push(`/verify-request?email=${email}`)
                    },
                    onError: () => {
                        toast.error('Error sending OTP to email')
                    }
                }
            })
        })

    }



    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex size-8 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-6" />
                            </div>
                            <span className="sr-only">FinLume</span>
                        </a>
                        <h1 className="text-xl font-bold">Welcome to FinLume</h1>
                        <FieldDescription>
                            Don&apos;t have an account? <a href="#">Sign up</a>
                        </FieldDescription>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </Field>
                    <Field>
                        <Button onClick={signInWithEmail} disabled={emailPending} type="submit">
                            {emailPending ?
                                (<>
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>Loading...</span>
                                </>) : (
                                    <>
                                        <Send className="size-4" />
                                        <span>Continue with email</span>
                                    </>
                                )

                            }

                        </Button>
                    </Field>
                    <FieldSeparator>Or</FieldSeparator>
                    <Field >
                        <Button
                            disabled={gitHubPending}
                            onClick={signInWithGithub}
                            variant="outline" type="button">
                            {gitHubPending ? (
                                <>
                                    <Loader className="size-4 animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <>
                                    <GithubIcon />
                                    Login with GitHub
                                </>
                            )

                            }

                        </Button>
                    </Field>
                </FieldGroup>
            </form>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    )
}
