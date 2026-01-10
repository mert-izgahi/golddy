import { getAuthUser } from '@/lib/actions'
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {
  const user = await getAuthUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  const store = await prisma.store.findFirst({
    where: {
      ownerId: user.id
    }
  })

  if (store) {
    redirect(`/${store.id}`)
  } else {
    redirect('/create-store')
  }

  return null
}

export default page