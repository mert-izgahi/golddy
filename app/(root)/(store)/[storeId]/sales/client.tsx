// app/(root)/(store)/[storeId]/sales/client.tsx
"use client";
import { Button } from '@/components/ui/button';
import { useLangStore } from '@/store/lang-store'
import { Plus, Edit, Trash2, Printer, Download } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useGetSalesByStore, useDeleteSale } from '@/hooks/use-sales';
import { useSaleInvoice } from '@/hooks/use-sale-invoice';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { DataTable } from '@/components/shared/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Sale } from '@/lib/generated/prisma/client';
import { formatCurrency, formatDate, getPaymentTypeLabel } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { generateInvoicePDF, printInvoicePDF } from '@/lib/pdf-generator';
import { InvoiceDialog } from '@/components/invoice/invoice-dialog';

interface Props {
    storeId: string
}

function SalesPage({ storeId }: Props) {
    const { lang, t } = useLangStore();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedSale, setSelectedSale] = useState<string | null>(null);

    const { data: salesData, isLoading, error } = useGetSalesByStore(storeId, page, pageSize);
    const deleteSaleMutation = useDeleteSale();

    // Hook for sale invoice data
    const { data: invoiceData, isLoading: isLoadingInvoice } = useSaleInvoice(selectedSale || '');

    const title = lang === "en" ? "Sales List" : "قائمة المبيعات";
    const description = lang === "en" ? "Manage and track your daily sales transactions." : "إدارة وتتبع معاملات المبيعات اليومية الخاصة بك.";

    const handleDeleteSale = async (saleId: string) => {
        try {
            await deleteSaleMutation.mutateAsync(saleId);
            toast.success(lang === "en" ? "Sale deleted successfully" : "تم حذف البيع بنجاح");
            queryClient.invalidateQueries({ queryKey: ["get-sales-by-store", storeId] });
        } catch (error) {
            toast.error(lang === "en" ? "Failed to delete sale" : "فشل في حذف البيع");
        }
    };


    const getGoldTypeLabel = (goldType: string) => {
        const labels = {
            GOLD_14: lang === "en" ? "14K" : "١٤ عيار",
            GOLD_18: lang === "en" ? "18K" : "١٨ عيار",
            GOLD_21: lang === "en" ? "21K" : "٢١ عيار",
            GOLD_24: lang === "en" ? "24K" : "٢٤ عيار"
        };
        return labels[goldType as keyof typeof labels] || goldType;
    };

    // const getPaymentTypeLabel = (paymentType: string) => {
    //     const labels = {
    //         CASH: lang === "en" ? "Cash" : "نقدي",
    //         TRANSFER: lang === "en" ? "Transfer" : "تحويل شام كاش",
    //         OTHER: lang === "en" ? "Other" : "أخرى"
    //     };
    //     return labels[paymentType as keyof typeof labels] || paymentType;
    // };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setPage(1); // Reset to first page when changing page size
    };

    // Define columns for DataTable
    const columns: ColumnDef<Sale>[] = [
        {
            accessorKey: "date",
            header: lang === "en" ? "Date" : "التاريخ",
            cell: ({ row }) => {
                return formatDate(row.getValue("date"), lang);
            },
        },
        {
            accessorKey: "customerName",
            header: lang === "en" ? "Customer" : "العميل",
            cell: ({ row }) => {
                const customerName = row.getValue("customerName") as string | null;
                return customerName || (lang === "en" ? "Walk-in" : "زائر");
            },
        },
        {
            accessorKey: "goldType",
            header: lang === "en" ? "Gold Type" : "نوع الذهب",
            cell: ({ row }) => {
                return (
                    <Badge variant="secondary">
                        {getGoldTypeLabel(row.getValue("goldType"))}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "weight",
            header: lang === "en" ? "Weight (g)" : "الوزن (جرام)",
            cell: ({ row }) => {
                return (row.getValue("weight") as number).toFixed(2);
            },
        },
        {
            accessorKey: "pricePerGramUSD",
            header: lang === "en" ? "Price/gram" : "السعر/جرام",
            cell: ({ row }) => {
                const val = row.getValue("pricePerGramUSD") as number;
                return formatCurrency(val, row.original.currency, lang);
            },
        },
        {
            accessorKey: "totalUSD",
            header: lang === "en" ? "Total" : "الإجمالي",
            cell: ({ row }) => {
                return (
                    <span className="font-medium">
                        {formatCurrency(row.getValue("totalUSD"), row.original.currency, lang)}
                    </span>
                );
            },
        },
        {
            accessorKey: "paymentType",
            header: lang === "en" ? "Payment" : "طريقة الدفع",
            cell: ({ row }) => {
                return (
                    <Badge variant="outline">
                        {getPaymentTypeLabel(row.getValue("paymentType"), lang)}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            header: lang === "en" ? "Actions" : "الإجراءات",
            cell: ({ row }) => {
                const sale = row.original;
                return (
                    <div className="flex space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                        >
                            <Link href={`/${storeId}/sales/${sale.id}`}>
                                <Edit className="h-4 w-4" />
                            </Link>
                        </Button>

                        {/* Invoice Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedSale(sale.id)}
                        >
                            <Download className="h-4 w-4" />
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
                                        {lang === "en" ? "Delete Sale" : "حذف البيع"}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {lang === "en"
                                            ? "Are you sure you want to delete this sale? This action cannot be undone."
                                            : "هل أنت متأكد من أنك تريد حذف هذا البيع؟ لا يمكن التراجع عن هذا الإجراء."
                                        }
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        {lang === "en" ? "Cancel" : "إلغاء"}
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleDeleteSale(sale.id)}
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
                    {lang === "en" ? "Failed to load sales data" : "فشل في تحميل بيانات المبيعات"}
                </div>
            </div>
        );
    }

    const sales = salesData?.result || [];
    const pagination = salesData?.pagination;

    return (
        <div className='p-4 space-y-6'>
            {/* Page Header */}
            <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col space-y-1">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>

                <Button asChild className='bg-teal-800 hover:bg-teal-800/80 text-white'>
                    <Link href={`/${storeId}/sales/new`}>
                        <Plus className='mr-2 h-4 w-4' />
                        {lang === "en" ? "New Sale" : "بيع جديد"}
                    </Link>
                </Button>
            </div>

            {/* Sales DataTable */}
            <DataTable
                columns={columns}
                data={sales}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                isLoading={isLoading}
                lang={lang}
            />
            {/* Invoice Dialog */}
            <InvoiceDialog
                saleId={selectedSale}
                isOpen={!!selectedSale && !isLoadingInvoice}
                onClose={() => setSelectedSale(null)}
            />
        </div>

    )
}

export default SalesPage