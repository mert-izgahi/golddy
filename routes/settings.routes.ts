import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { authenticate, authorize } from "@/lib/auth-middlewares";
import { zValidator } from "@hono/zod-validator";
import { getUpdateSettingsSchema } from "@/lib/zod";
import { Role } from "@/lib/generated/prisma";

const settingsRoutes = new Hono();



settingsRoutes
    // @desc    Get current settings
    // @route   GET /settings
    // @access  Private (Admin)
    .get("/", authenticate, async (c) => {
        try {
            const settingsData = await prisma.settings.findFirst({
                orderBy: { date: "desc" }
            });

            if (!settingsData) {
                return c.json({ message: "No settings found", result: null, success: true }, 200);
            }

            return c.json({ message: "Settings fetched successfully", result: settingsData, success: true }, 200);
        } catch (error) {
            console.error("Error fetching settings:", error);
            return c.json({ message: "Failed to fetch settings", result: null, success: false }, 500);
        }
    })


    // @desc    Update settings
    // @route   PUT /settings/:id
    // @access  Private (Admin)
    .put(
        "/:id",
        authenticate,
        authorize([Role.ADMIN]),
        zValidator("json", getUpdateSettingsSchema("en")), // Default to Arabic for validation messages
        async (c) => {
            const id = c.req.param("id");
            const data = c.req.valid("json");

            try {
                const updatedSettings = await prisma.settings.update({
                    where: { id },
                    data
                });

                return c.json({ message: "Settings updated successfully", result: updatedSettings, success: true }, 200);
            } catch (error) {
                console.error("Error updating settings:", error);
                return c.json({ message: "Failed to update settings", result: null, success: false }, 500);
            }
        }
    );

export { settingsRoutes };