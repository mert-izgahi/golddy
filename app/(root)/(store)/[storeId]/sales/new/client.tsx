"use client";

import { useLangStore } from "@/store/lang-store";
import { CreateSaleForm } from "@/components/forms/create-sale-form";

interface Props {
    storeId: string;
}

function NewSalePage({ storeId }: Props) {
    const { lang } = useLangStore();
    
    const title = lang === "en" ? "Create New Sale" : "إنشاء بيع جديد";
    const description = lang === "en" 
        ? "Record a new gold sale transaction" 
        : "تسجيل معاملة بيع ذهب جديدة";

    return (
        <div className="p-4 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col space-y-1">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            {/* Create Sale Form */}
            <CreateSaleForm storeId={storeId} />
        </div>
    );
}

export default NewSalePage;