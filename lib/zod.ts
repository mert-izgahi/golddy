import {z} from "zod";

export const getSignInSchema = (lang: 'en' | 'ar') => {
    const emailMessage = lang === 'en' ? "Invalid email address" : "عنوان البريد الإلكتروني غير صالح";
    const passwordMessage = lang === 'en' ? "Password must be at least 6 characters long" : "يجب أن يكون طول كلمة المرور 6 أحرف على الأقل";

    return z.object({
        email: z.string().email(emailMessage),
        password: z.string().min(6, passwordMessage),
    });
};



export type SignInInput = z.infer<ReturnType<typeof getSignInSchema>>;