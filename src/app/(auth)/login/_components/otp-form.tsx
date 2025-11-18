"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { authClient } from "@/lib/auth-client"
import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "sonner"

export function OTPForm({ ...props }: React.ComponentProps<typeof Card>) {
    const router = useRouter()
    const [emailPending, startEmailTransition] = useTransition()
    const [otp, setOtp] = useState('')
    const params = useSearchParams()
    const email = params.get('email') as string
    const isOtpCompleted = otp.length === 6;

    function verifyOtp() {
        startEmailTransition(async () => {
            await authClient.signIn.emailOtp({
                email: email,
                otp: otp,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('Email verified')
                        router.push('/')
                    },
                    onError: () => {
                        toast.error('Error verifying Email')
                    }
                }
            })
        })
    }

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Enter verification code</CardTitle>
                <CardDescription>We sent a 6-digit code to your email.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="otp">Verification code</FieldLabel>
                            <InputOTP value={otp} onChange={(value) => setOtp(value)} maxLength={6} id="otp" required>
                                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            <FieldDescription>
                                Enter the 6-digit code sent to your email.
                            </FieldDescription>
                        </Field>
                        <FieldGroup>
                            <Button onClick={verifyOtp} disabled={emailPending || !isOtpCompleted} type="submit">
                                {emailPending ?
                                    (<>
                                        <Loader2 className="size-4 animate-spin" />
                                        <span>Loading...</span>
                                    </>) : (
                                        <>
                                            <span>Verify OTP</span>
                                        </>
                                    )

                                }

                            </Button>
                            <FieldDescription className="text-center">
                                Didn&apos;t receive the code? <a href="#">Resend</a>
                            </FieldDescription>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
