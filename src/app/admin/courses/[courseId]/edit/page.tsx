
import { adminGetCourse } from '@/app/data/admin/admin-get-course'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import React from 'react'
import EditCourseForm from './_components/edit-course-form'
import CourseStructure from './_components/course-structure'

type Params = Promise<{ courseId: string }>
export default async function EditCourseRoute({ params }: { params: Params }) {
    const { courseId } = await params
    const data = await adminGetCourse(courseId)

    return (
        <div>
            <h1 className=''>
                Edit Course:
                <span className='text-primary underline'>{data.title}</span>

            </h1>
            <Tabs defaultValue='basic-info' className='w-full'>
                <TabsList className='grid grid-cols-2 w-full'>
                    <TabsTrigger value='basic-info'> Basic Info</TabsTrigger>
                    <TabsTrigger value='course-structure'> Course Structure</TabsTrigger>
                </TabsList>
                <TabsContent value='basic-info'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Info</CardTitle>
                            <CardDescription>
                                Edit the basic information of the course here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <EditCourseForm data={data} />

                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value='course-structure'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Structure</CardTitle>
                            <CardDescription>
                                Update Your course structure
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CourseStructure data={data} />

                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    )
}
