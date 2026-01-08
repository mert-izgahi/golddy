import type { Store, User } from "../lib/generated/prisma"

export type ContextUser = Pick<User, "id" | "email" | "role">

export type UserWithStores = User & {
    stores: Store[]
}


export type ApiResponse<T> = {
    result: T;
    message: string;
    success: boolean;
}