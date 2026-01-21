// hooks/use-sales.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiResponseWithPagination, ApiResponse } from '@/lib/types';
import { Sale } from '../lib/generated/prisma/client';
import { CreateSaleInput, UpdateSaleInput } from '@/lib/zod';

// Hook to get sales by store with pagination
export const useGetSalesByStore = (storeId: string, page: number = 1, limit: number = 10) => {
    return useQuery<ApiResponseWithPagination<Sale>>({
        queryKey: ['get-sales-by-store', storeId, page, limit],
        queryFn: async () => {
            try {
                const response = await apiClient.get<ApiResponseWithPagination<Sale>>(
                    `/sales/store/${storeId}?page=${page}&limit=${limit}`
                );
                return response.data;
            } catch (error: any) {
                console.error('Error fetching sales:', error);
                throw new Error(error?.response?.data?.message || 'Failed to fetch sales data');
            }
        },
        enabled: !!storeId,
        retry: 1,
    });
};

// Hook to get a single sale by ID
export const useGetSaleById = (saleId: string) => {
    return useQuery<Sale>({
        queryKey: ['get-sale-by-id', saleId],
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<Sale>>(`/sales/${saleId}`);
            return response.data.result;
        },
        enabled: !!saleId,
    });
};

// Hook to create a new sale
export const useCreateSale = () => {
    return useMutation({
        mutationFn: async ({ storeId, data }: { storeId: string; data: CreateSaleInput }) => {
            const response = await apiClient.post<ApiResponse<Sale>>(`/sales/store/${storeId}`, data);
            return response.data.result;
        },
    });
};

// Hook to update a sale
export const useUpdateSale = () => {
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateSaleInput }) => {
            const response = await apiClient.put<ApiResponse<Sale>>(`/sales/${id}`, data);
            return response.data.result;
        },
    });
};

// Hook to delete a sale
export const useDeleteSale = () => {
    return useMutation({
        mutationFn: async (saleId: string) => {
            const response = await apiClient.delete<ApiResponse<null>>(`/sales/${saleId}`);
            return response.data;
        },
    });
};

// Hook to get sales statistics
export const useGetSalesStats = (storeId: string) => {
    return useQuery({
        queryKey: ['get-sales-stats', storeId],
        queryFn: async () => {
            const response = await apiClient.get(`/sales/stats/store/${storeId}`);
            return response.data.result;
        },
        enabled: !!storeId,
    });
};