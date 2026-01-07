import { Hono } from "hono";
import { z } from "zod";
import { hashPassword, comparePassword } from "@/lib/hash-password";
import { generateToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { Role } from "@/lib/generated/prisma";
import { authenticate, getAuthUser } from "@/lib/auth-middlewares";


export const authRoutes = new Hono();