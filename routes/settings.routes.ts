// routes/sales.routes.ts
import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { authenticate } from "@/lib/auth-middlewares";
import { zValidator } from "@hono/zod-validator";
import { getCreateSaleSchema, getUpdateSaleSchema } from "@/lib/zod";
