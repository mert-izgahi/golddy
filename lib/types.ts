import type { User } from "../lib/generated/prisma"

export type ContextUser = Pick<User, "id" | "email" | "role">

