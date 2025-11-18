
import { AdminGetCourseType } from '@/app/data/admin/admin-get-courses';
import { Card, CardContent } from '@/components/ui/card';
import { useConstructUrl } from '@/hooks/use-construct-url';
import { School, TimerIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface AdminCourseCardProps {
    data: AdminGetCourseType;
}
export default function AdminCourseCard({ data }: AdminCourseCardProps) {
    const thumbnailUrl = useConstructUrl(data.fileKey);
    return (
        <Card className='group relative'>
            <div></div>
            <Image src={thumbnailUrl} alt="Thumbnail image" width={600} height={400}
                className='w-full rounded-t-lg aspect-video h-full object-cover'
            />
            <CardContent>
                <Link href={`/admin/courses/${data.id}`}
                    className='font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors'
                >
                    {data.title}
                </Link>
                <p className='line-clamp-2 text-sm text-muted-foreground leading-tight mt-2'>{data.smallDescription}</p>
                <div className='mt-4 flex items-center gap-x-5'>
                    <div className='flex items-center gap-x-2'>
                        <TimerIcon className='size-6 p-1 rounded-md text-primary bg-primary/10'/>
                        <p className='text-sm text-muted-foreground'>{data.duration}h</p>
                    </div>
                     <div className='flex items-center gap-x-2'>
                        <School className='size-6 p-1 rounded-md text-primary bg-primary/10'/>
                        <p className='text-sm text-muted-foreground'>{data.level}</p>
                    </div>

                </div>
            </CardContent>

        </Card>
    )
}
