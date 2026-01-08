import { getAuthUser } from '@/lib/actions';
import { Role } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

async function page() {

  const user = await getAuthUser();

  if (!user) {
    // Redirect to authentication page
    redirect("/auth/sign-in");
  }

  if (user?.role === Role.ADMIN) {
    // Redirect to admin dashboard
    redirect("/admin");
  }

  const store = await prisma.store.findFirst({
    where: {
      ownerId: user?.id
    }
  })

  if (user && !store) {
    // Redirect to store creation page
    // Note: In Next.js 13, you can use redirect from 'next/navigation'
    // but since this is a server component, we can return a redirect response.
    redirect('/create-store')
  } else {
    redirect(`/${store?.id}`)
  }

  return null;
}

export default page