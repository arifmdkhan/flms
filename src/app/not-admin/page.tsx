import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ShieldX } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function NotAdminRoute
    () {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Card className='max-w-md w-full'>
                <CardHeader>
                    <div className='bg-destructive/10 rounded-full p-4 w-fit mx-auto'>
                        <ShieldX className='size-16 text-destructive' />
                    </div>
                    <CardTitle className='text-center mt-4 text-2xl font-semibold'>
                        Access Denied
                    </CardTitle>
                    <CardDescription className='text-center mt-2 text-muted-foreground'>
                        You do not have the necessary permissions to access this page.
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <Link href="/" className={buttonVariants({className:'w-full mt-4',variant:'outline'})}>
                        <ArrowLeft className='mr-1 size-4' />
                        Back to home</Link>
                </CardContent>
            </Card>

        </div>
    )
}
