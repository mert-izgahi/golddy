"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { UserWithStores } from "@/lib/types";
import { User } from "@/lib/generated/prisma";
import { UpdatePasswordInput, UpdateProfileInput } from "@/lib/zod";


// @description: Hook to perform sign-in mutation
// @returns: useMutation result
export const useGetProfileQuery = () => {
    return useQuery<UserWithStores>({
        queryKey: ["get-profile"],
        queryFn: async () => {
            const response = await apiClient.get("/auth/me");
            const { success, result } = await response.data;
            if (!success) {
                throw new Error("Failed to fetch profile");
            }
            return result;
        },
    });
};

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: async (data: Partial<UpdateProfileInput>) => {
            const response = await apiClient.put("/auth/me", data);
            const { success, result } = await response.data;
            if (!success) {
                throw new Error("Failed to update profile");
            }
            return result;
        },
    });
};

export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: async (data: UpdatePasswordInput) => {
            const response = await apiClient.put("/auth/me/password", data);
            const { success, result } = await response.data;
            if (!success) {
                throw new Error("Failed to update password");
            }
            return result;
        },
    });
};

export const useGetProfileStore = () => {
    const { data: profile } = useGetProfileQuery();
    return profile?.stores || [];
}

