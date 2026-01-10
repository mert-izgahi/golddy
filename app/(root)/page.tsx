import { getAuthUser } from '@/lib/actions'
import { Role } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

async function page() {
  const user = await getAuthUser();

  if (!user) {
    redirect('/auth/sign-in');
  }


  const role = await user.role;

  if (role === Role.ADMIN) {
    redirect("/admin")
  }

  const store = await prisma.store.findFirst({
    where: {
      ownerId: user.id
    }
  });



  if (store) {
    redirect(`/${store.id}`)
  } else {
    redirect('/create-store')
  }

  return null
}

export default page