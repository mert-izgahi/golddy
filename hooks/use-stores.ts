import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Store } from "@/lib/generated/prisma";
import { ApiResponseWithPagination } from "@/lib/types";
import { StoreInput } from "@/lib/zod";


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




// Create store mutation
export const useCreateStore = () => {
    return useMutation({
        mutationFn: async (data: StoreInput) => {
            const response = await apiClient.post("/stores", data);
            const { success, result } = await response.data;

            if (!success) {
                throw new Error("Failed to create store");
            }
            return result;
        },
    });
};

// Update store mutation
export const useUpdateStore = () => {
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<StoreInput> }) => {
            const response = await apiClient.put(`/stores/${id}`, data);
            const { success, result } = await response.data;

            if (!success) {
                throw new Error("Failed to update store");
            }
            return result;
        },
    });
};


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