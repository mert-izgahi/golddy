// app/(root)/(store)/[storeId]/stock/client.tsx
"use client";

import { Button } from '@/components/ui/button';
import { useLangStore } from '@/store/lang-store';
import { Edit, Trash2, Package, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useGetStocksByStore, useDeleteStock, useGetStockStats } from '@/hooks/use-stocks';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import { DataTable } from '@/components/shared/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Stock } from '@/lib/generated/prisma/client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGoldTypeLabel } from '@/lib/utils';

interface Props {
    storeId: string;
}

function StockPage({ storeId }: Props) {
    const { lang } = useLangStore();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [activeTab, setActiveTab] = useState("movements");

    const { data: stocksData, isLoading, error } = useGetStocksByStore(storeId, page, pageSize);
    const { data: stockStats, isLoading: statsLoading } = useGetStockStats(storeId);
    const deleteStockMutation = useDeleteStock();

    const title = lang === "en" ? "Stock Management" : "إدارة المخزون";
    const description = lang === "en" ? "Track and manage your gold stock movements." : "تتبع وإدارة حركات مخزون الذهب الخاص بك.";

    const handleDeleteStock = async (stockId: string) => {
        try {
            await deleteStockMutation.mutateAsync({ stockId, storeId });
            toast.success(lang === "en" ? "Stock movement deleted successfully" : "تم حذف حركة المخزون بنجاح");
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || 
                (lang === "en" ? "Failed to delete stock movement" : "فشل في حذف حركة المخزون")
            );
        }
    };

    const getStockTypeLabel = (stockType: string) => {
        const labels = {
            ADD: lang === "en" ? "Addition" : "إضافة",
            REMOVE: lang === "en" ? "Removal" : "سحب"
        };
        return labels[stockType as keyof typeof labels] || stockType;
    };

    const getStockTypeBadge = (stockType: string) => {
        if (stockType === "ADD") {
            return <Badge className="bg-green-500 hover:bg-green-600">{getStockTypeLabel(stockType)}</Badge>;
        }
        return <Badge variant="destructive">{getStockTypeLabel(stockType)}</Badge>;
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setPage(1);
    };

    // Define columns for DataTable
    const columns: ColumnDef<Stock>[] = [
        {
            accessorKey: "createdAt",
            header: lang === "en" ? "Date" : "التاريخ",
            cell: ({ row }) => {
                return dayjs(row.getValue("createdAt")).format('DD/MM/YYYY HH:mm');
            },
        },
        {
            accessorKey: "type",
            header: lang === "en" ? "Type" : "النوع",
            cell: ({ row }) => {
                return getStockTypeBadge(row.getValue("type"));
            },
        },
        {
            accessorKey: "goldType",
            header: lang === "en" ? "Gold Type" : "نوع الذهب",
            cell: ({ row }) => {
                return (
                    <Badge variant="secondary">
                        {getGoldTypeLabel(lang, row.getValue("goldType"))}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "quantity",
            header: lang === "en" ? "Quantity (g)" : "الكمية (جرام)",
            cell: ({ row }) => {
                const quantity = row.getValue("quantity") as number;
                return (
                    <span className={`font-medium ${row.original.type === 'ADD' ? 'text-green-600' : 'text-red-600'}`}>
                        {row.original.type === 'ADD' ? '+' : '-'}{quantity.toFixed(2)}g
                    </span>
                );
            },
        },
        {
            accessorKey: "balanceAfter",
            header: lang === "en" ? "Balance After" : "الرصيد بعد",
            cell: ({ row }) => {
                const balance = row.getValue("balanceAfter") as number;
                return (
                    <span className="font-medium text-blue-600">
                        {balance.toFixed(2)}g
                    </span>
                );
            },
        },
        {
            accessorKey: "supplier",
            header: lang === "en" ? "Supplier" : "المورد",
            cell: ({ row }) => {
                const supplier = row.getValue("supplier") as string | null;
                return supplier || (
                    <span className="text-muted-foreground italic">-</span>
                );
            },
        },
        {
            accessorKey: "note",
            header: lang === "en" ? "Notes" : "ملاحظات",
            cell: ({ row }) => {
                const note = row.getValue("note") as string | null;
                return note ? (
                    <span className="text-sm">{note.slice(0, 50)}{note.length > 50 ? '...' : ''}</span>
                ) : (
                    <span className="text-muted-foreground italic">-</span>
                );
            },
        },
        {
            id: "actions",
            header: lang === "en" ? "Actions" : "الإجراءات",
            cell: ({ row }) => {
                const stock = row.original;
                return (
                    <div className="flex space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                        >
                            <Link href={`/${storeId}/stock/${stock.id}`}>
                                <Edit className="h-4 w-4" />
                            </Link>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {lang === "en" ? "Delete Stock Movement" : "حذف حركة المخزون"}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {lang === "en"
                                            ? "Are you sure you want to delete this stock movement? This action will revert the balance change and cannot be undone."
                                            : "هل أنت متأكد من أنك تريد حذف حركة المخزون هذه؟ سيتم إرجاع تغيير الرصيد ولا يمكن التراجع عن هذا الإجراء."
                                        }
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        {lang === "en" ? "Cancel" : "إلغاء"}
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleDeleteStock(stock.id)}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        {lang === "en" ? "Delete" : "حذف"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                );
            },
        },
    ];

    if (error) {
        return (
            <div className='p-4'>
                <div className="text-center text-red-500 py-8">
                    {lang === "en" ? "Failed to load stock data" : "فشل في تحميل بيانات المخزون"}
                </div>
            </div>
        );
    }

    const stocks = stocksData?.result || [];
    const pagination = stocksData?.pagination;

    return (
        <div className='p-4 space-y-6'>
            {/* Page Header */}
            <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col space-y-1">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <Button asChild className='bg-teal-800 hover:bg-teal-800/80 text-white'>
                    <Link href={`/${storeId}/stock/new`}>
                        <Package className='mr-2 h-4 w-4' />
                        {lang === "en" ? "New Stock Movement" : "حركة مخزون جديدة"}
                    </Link>
                </Button>
            </div>

            {/* Stock Overview Cards */}
            {!statsLoading && stockStats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                                {lang === "en" ? "Total Additions" : "إجمالي الإضافات"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                +{stockStats.totalAdditions.toFixed(2)}g
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <TrendingDown className="h-4 w-4 mr-2 text-red-600" />
                                {lang === "en" ? "Total Removals" : "إجمالي السحوبات"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                -{stockStats.totalRemovals.toFixed(2)}g
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Net Change" : "التغير الصافي"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${stockStats.netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {stockStats.netChange >= 0 ? '+' : ''}{stockStats.netChange.toFixed(2)}g
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Total Movements" : "إجمالي الحركات"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {stockStats.totalMovements}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Current Stock by Type */}
            {!statsLoading && stockStats && (
                <Card>
                    <CardHeader>
                        <CardTitle>{lang === "en" ? "Current Stock by Gold Type" : "المخزون الحالي حسب نوع الذهب"}</CardTitle>
                        <CardDescription>
                            {lang === "en" ? "Real-time gold stock levels" : "مستويات المخزون الحالية للذهب"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(stockStats.currentStock).map(([goldType, quantity]) => (
                                <div key={goldType} className="flex flex-col items-center justify-center p-4 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                                    <span className="text-sm text-muted-foreground font-medium">
                                        {getGoldTypeLabel(lang, goldType)}
                                    </span>
                                    <span className="text-3xl font-bold mt-2 text-yellow-700">
                                        {quantity.toFixed(2)}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {lang === "en" ? "grams" : "جرام"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Tabs for different views */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="movements">
                        {lang === "en" ? "Stock Movements" : "حركات المخزون"}
                    </TabsTrigger>
                    <TabsTrigger value="stats">
                        {lang === "en" ? "Statistics" : "الإحصائيات"}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="movements" className="space-y-4">
                    {/* Stock Movements DataTable */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{lang === "en" ? "Recent Movements" : "الحركات الأخيرة"}</CardTitle>
                            <CardDescription>
                                {lang === "en" ? "All stock additions and removals" : "جميع إضافات وسحوبات المخزون"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DataTable
                                columns={columns}
                                data={stocks}
                                pagination={pagination}
                                onPageChange={handlePageChange}
                                onPageSizeChange={handlePageSizeChange}
                                isLoading={isLoading}
                                lang={lang}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="stats" className="space-y-4">
                    {/* Statistics View */}
                    {statsLoading ? (
                        <div className="text-center py-8">
                            {lang === "en" ? "Loading statistics..." : "جاري تحميل الإحصائيات..."}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{lang === "en" ? "Detailed Statistics" : "إحصائيات مفصلة"}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 border rounded-lg">
                                                <h3 className="font-semibold mb-2 flex items-center">
                                                    <Package className="h-4 w-4 mr-2" />
                                                    {lang === "en" ? "Stock Summary" : "ملخص المخزون"}
                                                </h3>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span>{lang === "en" ? "Total Added:" : "الإجمالي المضاف:"}</span>
                                                        <span className="font-medium text-green-600">
                                                            +{stockStats?.totalAdditions.toFixed(2)}g
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>{lang === "en" ? "Total Removed:" : "الإجمالي المسحوب:"}</span>
                                                        <span className="font-medium text-red-600">
                                                            -{stockStats?.totalRemovals.toFixed(2)}g
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between border-t pt-2">
                                                        <span className="font-semibold">{lang === "en" ? "Net Change:" : "التغير الصافي:"}</span>
                                                        <span className={`font-bold ${stockStats?.netChange! >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {stockStats?.netChange! >= 0 ? '+' : ''}{stockStats?.netChange.toFixed(2)}g
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 border rounded-lg">
                                                <h3 className="font-semibold mb-2">{lang === "en" ? "Activity" : "النشاط"}</h3>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span>{lang === "en" ? "Total Movements:" : "إجمالي الحركات:"}</span>
                                                        <span className="font-medium">{stockStats?.totalMovements}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>{lang === "en" ? "Current Stock Types:" : "أنواع المخزون الحالي:"}</span>
                                                        <span className="font-medium">4</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>{lang === "en" ? "Total Stock Value:" : "قيمة المخزون الإجمالية:"}</span>
                                                        <span className="font-medium">
                                                            {Object.values(stockStats?.currentStock || {}).reduce((a, b) => a + b, 0).toFixed(2)}g
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default StockPage;