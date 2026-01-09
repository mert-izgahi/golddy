import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { UserWithStores } from "@/lib/types";
import { Store } from "@/lib/generated/prisma";


export const useGetStoreById = (storeId: string) => {
    return useQuery<Store | null>({
        queryKey: ["get-store-by-id", storeId],
        queryFn: async () => {
            const response = await apiClient.get(`/stores/${storeId}`);
            const { success, result } = await response.data;
            console.log(result);
            
            if (!success) {
                throw new Error("Failed to fetch store");
            }
            return result;
        },
    });
}