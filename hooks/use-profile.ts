import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ApiResponse, UserWithStores } from "@/lib/types";


// @description: Hook to perform sign-in mutation
// @returns: useMutation result
export const useGetProfileQuery = () => {
    return useQuery<UserWithStores>({
        queryKey: ["get-profile"],
        queryFn: async () => {
            const response = await apiClient.get("/auth/me");
            const {success,result} = await response.data;
            if(!success){
                throw new Error("Failed to fetch profile");
            }
            return result;
        },
    });
};

