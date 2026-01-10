import React from 'react'
import EditUserPage from './client';
interface Props {
    params: Promise<{
        id: string
    }>
}
async function page({ params }: Props) {
    const { id } = await params;
    return (
        <EditUserPage userId={id}/>
    )
}

export default page