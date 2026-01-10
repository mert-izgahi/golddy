"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Role } from '@/lib/generated/prisma';

export default function page() {
  const router = useRouter();

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      const response = await apiClient.get('/auth/me');
      return response.data;
    },
    retry: false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/auth/sign-in');
      } else if (user?.role === Role.ADMIN) {
        router.push('/admin');
      } else {
        // Check if user has a store
        apiClient.get(`/stores/user/${user.id}`).then((response) => {
          const store = response.data;
          if (!store) {
            router.push('/create-store');
          } else {
            router.push(`/${store.id}`);
          }
        });
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>Loading...</div>
    </div>
  );
}