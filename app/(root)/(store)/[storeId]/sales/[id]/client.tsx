// app/(root)/(store)/[storeId]/sales/[id]/client.tsx
"use client";

import { useLangStore } from "@/store/lang-store";
import { useGetSaleById } from "@/hooks/use-sales";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SaleForm } from "@/components/forms/sale-form";

interface Props {
    storeId: string;
    saleId: string;
}

function UpdateSalePage({ storeId, saleId }: Props) {
    const { lang } = useLangStore();
    const { data: sale, isLoading, error } = useGetSaleById(saleId);
    
    const title = lang === "en" ? "Update Sale" : "تحديث البيع";
    const description = lang === "en" 
        ? "Update the details of this sale transaction" 
        : "تحديث تفاصيل معاملة البيع هذه";

    if (error) {
        return (
            <div className="p-4">
                <div className="text-center text-red-500 py-8">
                    {lang === "en" ? "Failed to load sale data" : "فشل في تحميل بيانات البيع"}
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="p-4 space-y-6">
                {/* Page Header Skeleton */}
                <div className="flex flex-col space-y-1">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>

                {/* Form Skeleton */}
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <div className="flex justify-end gap-4">
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col space-y-1">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            {/* Update Sale Form */}
            <SaleForm mode="edit" saleId={saleId} storeId={storeId} />
        </div>
    );
}

export default UpdateSalePage;