"use client";
import { useAdminGetStores } from '@/hooks/use-stores';
import React, { useState } from 'react';
import { useLangStore } from '@/store/lang-store';
import { DataTable } from '@/components/shared/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Store } from '../lib/generated/prisma';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Edit, Trash2, StoreIcon, Eye } from 'lucide-react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function AdminStoresPage() {
  const { lang, t } = useLangStore();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useAdminGetStores({ page, limit: pageSize });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  // Define columns for DataTable
  const columns: ColumnDef<Store>[] = [
    {
      accessorKey: "name",
      header: lang === "en" ? "Store Name" : "اسم المتجر",
      cell: ({ row }) => {
        const store = row.original;
        return (
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={store.logoUrl || undefined} alt={store.name} />
              <AvatarFallback className="bg-teal-100 text-teal-800">
                <StoreIcon className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{store.name}</span>
              <span className="text-xs text-muted-foreground">
                {store.city}, {store.address}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: lang === "en" ? "Status" : "الحالة",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const isActive = status === "ACTIVE";

        return (
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={
              isActive
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
            }
          >
            {isActive
              ? (lang === "en" ? "Active" : "نشط")
              : (lang === "en" ? "Inactive" : "غير نشط")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "currentGold24",
      header: lang === "en" ? "Gold 24K" : "ذهب ٢٤ عيار",
      cell: ({ row }) => {
        const value = row.getValue("currentGold24") as number;
        return (
          <div className="text-right font-medium">
            {value.toFixed(2)} g
          </div>
        );
      },
    },
    {
      accessorKey: "currentUSD",
      header: lang === "en" ? "Cash (USD)" : "نقدي (دولار)",
      cell: ({ row }) => {
        return formatCurrency(row.getValue("currentUSD"), "USD", lang);
      },
    },
    {
      accessorKey: "currentSYP",
      header: lang === "en" ? "Cash (SYP)" : "نقدي (ليرة)",
      cell: ({ row }) => {
        return formatCurrency(row.getValue("currentSYP"), "SYP", lang);
      },
    },
    {
      accessorKey: "createdAt",
      header: lang === "en" ? "Created" : "تاريخ الإنشاء",
      cell: ({ row }) => {
        return formatDate(row.getValue("createdAt"), lang);
      },
    },
    {
      id: "actions",
      header: lang === "en" ? "Actions" : "الإجراءات",
      cell: ({ row }) => {
        const store = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-8 w-8 p-0"
            >
              <Link href={`/admin/stores/${store.id}`}>
                <Eye className="h-4 w-4 text-teal-600" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {lang === "en" ? "Delete Store" : "حذف المتجر"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {lang === "en"
                      ? "Are you sure you want to delete this store? This will permanently remove all associated data including sales, purchases, and inventory. This action cannot be undone."
                      : "هل أنت متأكد من أنك تريد حذف هذا المتجر؟ سيتم حذف جميع البيانات المرتبطة بما في ذلك المبيعات والمشتريات والمخزون بشكل دائم. لا يمكن التراجع عن هذا الإجراء."
                    }
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    {lang === "en" ? "Cancel" : "إلغاء"}
                  </AlertDialogCancel>
                  <AlertDialogAction
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
      <div className="p-4">
        <div className="text-center text-red-500 py-8">
          {lang === "en" ? "Failed to load stores data" : "فشل في تحميل بيانات المتاجر"}
        </div>
      </div>
    );
  }

  const stores = data?.result || [];
  const pagination = data?.pagination;

  // Calculate totals
  const totals = stores.reduce(
    (acc, store) => ({
      totalGold24: acc.totalGold24 + (store.currentGold24 || 0),
      totalUSD: acc.totalUSD + (store.currentUSD || 0),
      totalSYP: acc.totalSYP + (store.currentSYP || 0),
      activeStores: acc.activeStores + (store.status === "ACTIVE" ? 1 : 0),
    }),
    { totalGold24: 0, totalUSD: 0, totalSYP: 0, activeStores: 0 }
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-teal-800">
            {lang === "en" ? "Stores Management" : "إدارة المتاجر"}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {lang === "en"
              ? "Manage all stores, view inventory, and monitor transactions."
              : "إدارة جميع المتاجر وعرض المخزون ومراقبة المعاملات."
            }
          </p>
        </div>

        <Button asChild className="bg-teal-800 hover:bg-teal-800/90 text-white">
          <Link href="/admin/stores/new">
            {lang === "en" ? "Add New Store" : "إضافة متجر جديد"}
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {lang === "en" ? "Total Stores" : "إجمالي المتاجر"}
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {stores.length}
              </p>
            </div>
            <div className="p-2 bg-teal-100 rounded-lg">
              <StoreIcon className="h-6 w-6 text-teal-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-green-600">
            <span className="font-medium">{totals.activeStores}</span> {lang === "en" ? "active" : "نشط"}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {lang === "en" ? "Total Gold 24K" : "إجمالي ذهب ٢٤ عيار"}
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {totals.totalGold24.toFixed(2)}g
              </p>
            </div>
            <div className="p-2 bg-amber-100 rounded-lg">
              <span className="text-amber-600 font-bold">24K</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {lang === "en" ? "Total Cash (USD)" : "إجمالي النقدي (دولار)"}
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {formatCurrency(totals.totalUSD, "USD", "en")}
              </p>
            </div>
            <div className="p-2 bg-emerald-100 rounded-lg">
              <span className="text-emerald-600 font-bold">USD</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {lang === "en" ? "Total Cash (SYP)" : "إجمالي النقدي (ليرة)"}
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {formatCurrency(totals.totalSYP, "SYP", "en")}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 font-bold">SYP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stores DataTable */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {lang === "en" ? "All Stores" : "جميع المتاجر"}
          </h2>
        </div>
        <div className="p-1">
          <DataTable
            columns={columns}
            data={stores}
            pagination={pagination}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            isLoading={isLoading}
            lang={lang}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button variant="outline" className="border-teal-200 text-teal-800 hover:bg-teal-50">
          {lang === "en" ? "Export to Excel" : "تصدير إلى Excel"}
        </Button>
        <Button variant="outline" className="border-teal-200 text-teal-800 hover:bg-teal-50">
          {lang === "en" ? "Print Report" : "طباعة التقرير"}
        </Button>
      </div>
    </div>
  );
}

export default AdminStoresPage;