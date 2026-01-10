// hooks/use-stocks.ts
import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { ApiResponseWithPagination, ApiResponse } from '@/lib/types';
import { Stock } from '@/lib/generated/prisma/client';
import { CreateStockInput, UpdateStockInput } from '@/lib/zod';

// Hook to get stock movements by store with pagination
export const useGetStocksByStore = (storeId: string, page: number = 1, limit: number = 10) => {
    return useQuery<ApiResponseWithPagination<Stock>>({
        queryKey: ['get-stocks-by-store', storeId, page, limit],
        queryFn: async () => {
            const response = await axios.get<ApiResponseWithPagination<Stock>>(
                `/api/stock/store/${storeId}?page=${page}&limit=${limit}`
            );
            return response.data;
        },
        enabled: !!storeId,
    });
};

// Hook to get stock movements by store with infinite scroll
export const useGetStocksInfinite = (storeId: string, limit: number = 10) => {
    return useInfiniteQuery({
        queryKey: ['get-stocks-infinite', storeId],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axios.get<ApiResponseWithPagination<Stock>>(
                `/api/stock/store/${storeId}?page=${pageParam}&limit=${limit}`
            );
            return response.data;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.pagination.hasNext) {
                return lastPage.pagination.page + 1;
            }
            return undefined;
        },
        getPreviousPageParam: (firstPage) => {
            if (firstPage.pagination.hasPrevious) {
                return firstPage.pagination.page - 1;
            }
            return undefined;
        },
        enabled: !!storeId,
        initialPageParam: 1,
    });
};

// Hook to get stock movements by date range
export const useGetStocksByDateRange = (storeId: string, fromDate?: string, toDate?: string) => {
    return useQuery<Stock[]>({
        queryKey: ['get-stocks-by-date-range', storeId, fromDate, toDate],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (fromDate) params.append('from', fromDate);
            if (toDate) params.append('to', toDate);

            const response = await axios.get<ApiResponse<Stock[]>>(
                `/api/stock/store/${storeId}/date-range?${params.toString()}`
            );
            return response.data.result;
        },
        enabled: !!storeId,
    });
};

// Hook to get a single stock movement by ID
export const useGetStockById = (stockId: string) => {
    return useQuery<Stock>({
        queryKey: ['get-stock-by-id', stockId],
        queryFn: async () => {
            const response = await axios.get<ApiResponse<Stock>>(`/api/stock/${stockId}`);
            return response.data.result;
        },
        enabled: !!stockId,
    });
};

// Hook to create a new stock movement
export const useCreateStock = () => {
    return useMutation({
        mutationFn: async ({ storeId, data }: { storeId: string; data: CreateStockInput }) => {
            const response = await axios.post<ApiResponse<Stock>>(`/api/stock/store/${storeId}`, data);
            return response.data.result;
        },
    });
};

// Hook to update a stock movement
export const useUpdateStock = () => {
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateStockInput }) => {
            const response = await axios.put<ApiResponse<Stock>>(`/api/stock/${id}`, data);
            return response.data.result;
        },
    });
};

// Hook to delete a stock movement
export const useDeleteStock = () => {
    return useMutation({
        mutationFn: async (stockId: string) => {
            const response = await axios.delete<ApiResponse<null>>(`/api/stock/${stockId}`);
            return response.data;
        },
    });
};

// Hook to get stock statistics
export const useGetStockStats = (storeId: string) => {
    return useQuery({
        queryKey: ['get-stock-stats', storeId],
        queryFn: async () => {
            const response = await axios.get<ApiResponse<{
                currentStock: Record<string, number>;
                totalAdditions: number;
                totalRemovals: number;
                totalMovements: number;
                netChange: number;
            }>>(`/api/stock/stats/store/${storeId}`);
            return response.data.result;
        },
        enabled: !!storeId,
    });
};

// Hook to get current stock levels by gold type
export const useGetCurrentStock = (storeId: string) => {
    return useQuery({
        queryKey: ['get-current-stock', storeId],
        queryFn: async () => {
            const response = await axios.get<ApiResponse<{
                currentStock: Record<string, number>;
                totalAdditions: number;
                totalRemovals: number;
                totalMovements: number;
                netChange: number;
            }>>(`/api/stock/stats/store/${storeId}`);
            return response.data.result.currentStock;
        },
        enabled: !!storeId,
    });
};

// Hook to refresh stock data
export const useRefreshStocks = (storeId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            // Invalidate all stock-related queries for this store
            await queryClient.invalidateQueries({
                queryKey: ['get-stocks-by-store', storeId]
            });
            await queryClient.invalidateQueries({
                queryKey: ['get-stocks-infinite', storeId]
            });
            await queryClient.invalidateQueries({
                queryKey: ['get-stock-stats', storeId]
            });
            await queryClient.invalidateQueries({
                queryKey: ['get-current-stock', storeId]
            });
            return true;
        },
    });
};

// Hook to get stock summary (current stock + recent movements)
export const useGetStockSummary = (storeId: string) => {
    const { data: stats, isLoading: statsLoading, error: statsError } = useGetStockStats(storeId);
    const { data: recentMovements, isLoading: movementsLoading, error: movementsError } = useGetStocksByStore(storeId, 1, 5);

    return {
        data: {
            stats,
            recentMovements: recentMovements?.result,
        },
        isLoading: statsLoading || movementsLoading,
        error: statsError || movementsError,
    };
};