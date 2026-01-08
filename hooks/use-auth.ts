import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { SignInInput } from "@/lib/zod";


// @description: Hook to perform sign-in mutation
// @returns: useMutation result
export const useSignInMutation = () => {
    return useMutation({
        mutationKey: ["sign-in"],
        mutationFn: async (args: SignInInput) => {
            const response = await apiClient.post("/auth/sign-in", args);            
            return response.data;
        },
    });
};


export const useSignOutMutation = () => {
    return useMutation<void>({
        mutationKey: ["sign-out"],
        mutationFn: async () => {
            const response = await apiClient.post("/auth/sign-out");
            return response.data;
        },
    });
};
