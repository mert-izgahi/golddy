import { authMiddleware } from '@/lib/auth-middlewares';
import { ContextUser } from '@/lib/types';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { handle } from 'hono/vercel'


declare module "hono" {
    interface ContextVariableMap {
        user: ContextUser | null;
    }
}

const app = new Hono().basePath('/api');
app.use('*', logger())
app.use('*', cors())
app.get('/health',authMiddleware, (c) => {
    return c.json({
        message: 'OK',
    })
})

export const GET = handle(app)
export const POST = handle(app)