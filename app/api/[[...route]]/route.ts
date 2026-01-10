
import { ContextUser } from '@/lib/types';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { handle } from 'hono/vercel'
// routes
import { authRoutes } from '@/routes/auth.routes';
import { storesRoutes } from '@/routes/stores.routes';
import { salesRoutes } from '@/routes/sales.routes';
import { stockRoutes } from '@/routes/stock.routes';
import { settingsRoutes } from '@/routes/settings.routes';

declare module "hono" {
    interface ContextVariableMap {
        user: ContextUser | null;
    }
}

const app = new Hono().basePath('/api');
app.use('*', logger())
app.use('*', cors())
app.get('/health', (c) => {
    return c.json({
        message: 'OK',
    })
})

app.route('/auth', authRoutes);
app.route('/stores', storesRoutes);
app.route('/sales', salesRoutes);
app.route('/stock', stockRoutes);
app.route('/settings',settingsRoutes);
// Not found
app.notFound((c) =>
    c.json(
        {
            success: false,
            message: "Not found",
            result: {
                message: "Not found",
                time: new Date().toISOString(),
            },
        },
        404
    )
);

// Error
app.onError((err, c) => {
    console.error(err);
    return c.json(
        {
            success: false,
            message: "Internal server error",
            result: {
                message: "An unexpected error occurred",
                time: new Date().toISOString(),
            },
        },
        500
    );
});



export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export const HEAD = handle(app);
export const OPTIONS = handle(app);
