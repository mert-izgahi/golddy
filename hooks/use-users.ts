"use client";

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { UserInput } from "@/lib/zod";
import { apiClient } from "@/lib/api-client";
import { User, Role } from "../lib/generated/prisma";
import { ApiResponse, ApiResponseWithPagination, QueryParams } from "@/lib/types";

interface GetUsersParams extends QueryParams {
    role?: Role
}

interface PaginatedUsersResponse extends ApiResponseWithPagination<User> { };


// Hook to get all users with pagination (following sales pattern)
export const useGetUsers = (page: number = 1, limit: number = 10) => {
    return useQuery<ApiResponseWithPagination<User>>({
        queryKey: ['get-users', page, limit],
        queryFn: async () => {
            const response = await apiClient.get<ApiResponseWithPagination<User>>(
                `/users?page=${page}&limit=${limit}`
            );
            return response.data;
        },
    });
};

// Hook to get a single user by ID (following sales pattern)
export const useGetUserById = (userId: string) => {
    return useQuery<User>({
        queryKey: ['get-user-by-id', userId],
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<User>>(`/users/${userId}`);
            return response.data.result;
        },
        enabled: !!userId,
    });
};

// Hook to create a new user (following sales pattern)
export const useCreateUser = () => {
    return useMutation({
        mutationFn: async (data: UserInput) => {
            const response = await apiClient.post<ApiResponse<User>>(`/users`, data);
            return response.data.result;
        },
    });
};

// Hook to update a user (following sales pattern)
export const useUpdateUser = () => {
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<UserInput> }) => {
            const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, data);
            return response.data.result;
        },
    });
};

// Hook to delete a user (following sales pattern)
export const useDeleteUser = () => {
    return useMutation({
        mutationFn: async (userId: string) => {
            const response = await apiClient.delete<ApiResponse<null>>(`/users/${userId}`);
            return response.data;
        },
    });
};

// Hook for managing users (existing functionality)
export const useUsers = () => {
    const queryClient = useQueryClient();

    // Get all users with pagination
    const getUsers = async (params?: GetUsersParams, options?: UseQueryOptions<PaginatedUsersResponse>) => {
        const { page = 1, limit = 10, search = "", role } = params || {};

        return useQuery<PaginatedUsersResponse>({
            queryKey: ["users", page, limit, search, role],
            queryFn: async () => {
                const response = await apiClient.get("/users", {
                    params: { page, limit, search, role }
                });
                return response.data;
            },
            ...options,
        });
    };

    // Get single user by ID
    const getUserById = (id: string, options?: UseQueryOptions<User>) => {
        return useQuery<User>({
            queryKey: ["user", id],
            queryFn: async () => {
                const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
                return response.data.result;
            },
            enabled: !!id,
            ...options,
        });
    };

    // Create user mutation
    const createUserMutation = useMutation({
        mutationFn: async (data: UserInput) => {
            const response = await apiClient.post<ApiResponse<User>>("/users", data);
            return response.data.result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    // Update user mutation
    const updateUserMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<UserInput> }) => {
            const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, data);
            return response.data.result;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
        },
    });

    // Delete user mutation
    const deleteUserMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await apiClient.delete<ApiResponse<null>>(`/users/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    // Get current user profile
    const getCurrentUser = (options?: UseQueryOptions<User>) => {
        return useQuery<User>({
            queryKey: ["current-user"],
            queryFn: async () => {
                const response = await apiClient.get<ApiResponse<User>>("/users/me");
                return response.data.result;
            },
            ...options,
        });
    };

    // Update user profile (non-admin)
    const updateProfileMutation = useMutation({
        mutationFn: async (data: Partial<UserInput>) => {
            const response = await apiClient.patch<ApiResponse<User>>("/users/profile", data);
            return response.data.result;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["current-user"] });
            queryClient.invalidateQueries({ queryKey: ["users"] });
            // If we know the user ID, invalidate their specific query too
            if (data?.id) {
                queryClient.invalidateQueries({ queryKey: ["user", data.id] });
            }
        },
    });

    // Toggle user status (active/inactive)
    const toggleUserStatusMutation = useMutation({
        mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
            const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}/status`, { isActive });
            return response.data.result;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
        },
    });

    // Bulk delete users
    const bulkDeleteUsersMutation = useMutation({
        mutationFn: async (ids: string[]) => {
            const response = await apiClient.post<ApiResponse<null>>("/users/bulk-delete", { ids });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    return {
        // Queries
        getUsers,
        getUserById,
        getCurrentUser,

        // Mutations
        createUser: createUserMutation.mutateAsync,
        isCreatingUser: createUserMutation.isPending,
        createUserError: createUserMutation.error,

        updateUser: updateUserMutation.mutateAsync,
        isUpdatingUser: updateUserMutation.isPending,
        updateUserError: updateUserMutation.error,

        deleteUser: deleteUserMutation.mutateAsync,
        isDeletingUser: deleteUserMutation.isPending,
        deleteUserError: deleteUserMutation.error,

        updateProfile: updateProfileMutation.mutateAsync,
        isUpdatingProfile: updateProfileMutation.isPending,
        updateProfileError: updateProfileMutation.error,

        toggleUserStatus: toggleUserStatusMutation.mutateAsync,
        isTogglingUserStatus: toggleUserStatusMutation.isPending,
        toggleUserStatusError: toggleUserStatusMutation.error,

        bulkDeleteUsers: bulkDeleteUsersMutation.mutateAsync,
        isBulkDeletingUsers: bulkDeleteUsersMutation.isPending,
        bulkDeleteUsersError: bulkDeleteUsersMutation.error,
    };
};



