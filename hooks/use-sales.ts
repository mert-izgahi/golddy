import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { ApiResponseWithPagination, ApiResponse } from '@/lib/types';
import { Sale } from '@/lib/generated/prisma/client';


// Hook to get sales by store with pagination
export const useGetSalesByStore = (storeId: string, page: number = 1, limit: number = 10) => {
    return useQuery<ApiResponseWithPagination<Sale>>({
        queryKey: ['get-sales-by-store', storeId, page, limit],
        queryFn: async () => {
            const response = await axios.get<ApiResponseWithPagination<Sale>>(
                `/api/sales/store/${storeId}?page=${page}&limit=${limit}`
            );
            return response.data;
        },
        enabled: !!storeId,
    });
};

// Hook to get a single sale by ID
export const useGetSaleById = (saleId: string) => {
    return useQuery<Sale>({
        queryKey: ['get-sale-by-id', saleId],
        queryFn: async () => {
            const response = await axios.get<ApiResponse<Sale>>(`/api/sales/${saleId}`);
            return response.data.result;
        },
        enabled: !!saleId,
    });
};

// Hook to create a new sale
export const useCreateSale = () => {
    return useMutation({
        mutationFn: async (newSale: Omit<Sale, 'id' | 'date'>) => {
            const response = await axios.post<ApiResponse<Sale>>('/api/sales', newSale);
            return response.data.result;
        },
    });
};

// Hook to update a sale
export const useUpdateSale = () => {
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<Sale> }) => {
            const response = await axios.put<ApiResponse<Sale>>(`/api/sales/${id}`, data);
            return response.data.result;
        },
    });
};

// Hook to delete a sale
export const useDeleteSale = () => {
    return useMutation({
        mutationFn: async (saleId: string) => {
            const response = await axios.delete<ApiResponse<null>>(`/api/sales/${saleId}`);
            return response.data;
        },
    });
};

// Hook to get sales statistics
export const useGetSalesStats = (storeId: string) => {
    return useQuery({
        queryKey: ['get-sales-stats', storeId],
        queryFn: async () => {
            const response = await axios.get(`/api/sales/stats/store/${storeId}`);
            return response.data.result;
        },
        enabled: !!storeId,
    });
};