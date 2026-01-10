import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { ContextUser } from "./types";
import prisma from "./prisma";


export const getAuthUser = async (): Promise<ContextUser | null> => {
    try {
        const token = await cookies().then(cookies => cookies.get('token')?.value || null);
        if (!token) {
            return null;
        }
        const userPayload = await verifyToken(token);
        if (!userPayload) {
            const cookieStore = await cookies(); // Await the cookies()
            await cookieStore.delete('token');
            return null;
        }
        const user = await prisma.user.findUnique({
            where: { id: userPayload.id },
            select: {
                id: true,
                email: true,
                role: true,
                name: true,
                stores: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
}


