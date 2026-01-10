import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Store } from "@/lib/generated/prisma";
import { ApiResponseWithPagination } from "@/lib/types";


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


// Admin: Get all stores with pagination
export const useAdminGetStores = (params?: {
    page?: number;
    limit?: number;
    enabled?: boolean;
}) => {
    const { page = 1, limit = 10, enabled = true } = params || {};

    return useQuery<ApiResponseWithPagination<Store>>({
        queryKey: ["admin-stores", page, limit],
        queryFn: async () => {
            const response = await apiClient.get("/stores", {
                params: { page, limit }
            });
            const { success, ...data } = await response.data;

            if (!success) {
                throw new Error("Failed to fetch stores");
            }
            return data;
        },
        enabled,
    });
};