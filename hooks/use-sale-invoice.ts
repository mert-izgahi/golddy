// hooks/use-sale-invoice.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { ApiResponse } from '@/lib/types';
import { Sale } from '../lib/generated/prisma';

export const useSaleInvoice = (saleId: string) => {
    return useQuery({
        queryKey: ['sale-invoice', saleId],
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<{
                sale: Sale & {
                    store: {
                        name: string;
                        address?: string;
                        city?: string;
                        primaryPhoneNumber?: string;
                    };
                };
                settings?: {
                    exchangeRateUSDtoSYP: number;
                };
            }>>(`/sales/${saleId}/invoice`);
            return response.data.result;
        },
        enabled: !!saleId,
    });
};