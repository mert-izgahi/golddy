import type { Store, User } from "../lib/generated/prisma"

export type ContextUser = Pick<User, "id" | "email" | "role">

export type UserWithStores = User & {
    stores: Store[]
}


export type ApiResponse<T> = {
    result: T;
}

export type ApiResponseWithPagination<T> = {
    result: T[],
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number,
        hasNext: boolean,
        hasPrevious: boolean
    },
}