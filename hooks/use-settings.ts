"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateSettingsInput } from "@/lib/zod";
import { ApiResponse } from "@/lib/types";
import { apiClient } from "@/lib/api-client";
import { Settings } from "@/lib/generated/prisma";

export const useSettings = () => {
    const queryClient = useQueryClient();

    // Get current settings
    const {
        data: settings,
        isLoading: isLoadingSettings,
        error: settingsError,
    } = useQuery({
        queryKey: ["settings"],
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<Settings>>("/settings");
            return response.data.result;
        },
    });

    // Update settings
    const updateSettingsMutation = useMutation({
        mutationFn: async ({ id, args }: { id: string; args: UpdateSettingsInput }) => {
            const response = await apiClient.put<ApiResponse<Settings>>(`/settings/${id}`, args);
            return response.data.result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
    });

    return {
        // Queries
        settings,
        isLoadingSettings,
        settingsError,

        // Mutations
        updateSettings: updateSettingsMutation.mutateAsync,
        isUpdatingSettings: updateSettingsMutation.isPending,
        updateSettingsError: updateSettingsMutation.error,
    };
};