// app/(root)/admin/users/client.tsx
"use client";
import { Button } from '@/components/ui/button';
import { useLangStore } from '@/store/lang-store'
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useGetUsers, useDeleteUser } from '@/hooks/use-users';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { DataTable } from '@/components/shared/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/lib/generated/prisma/client';
import { formatDate } from '@/lib/utils';

function AdminUsersPage() {
    const { lang, t } = useLangStore();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data: usersData, isLoading, error } = useGetUsers(page, pageSize);
    const deleteUserMutation = useDeleteUser();

    const title = lang === "en" ? "Users List" : "قائمة المستخدمين";
    const description = lang === "en" ? "Manage system users and their access levels." : "إدارة مستخدمي النظام ومستويات وصولهم.";

    const handleDeleteUser = async (userId: string) => {
        try {
            await deleteUserMutation.mutateAsync(userId);
            toast.success(lang === "en" ? "User deleted successfully" : "تم حذف المستخدم بنجاح");
            queryClient.invalidateQueries({ queryKey: ["get-users"] });
        } catch (error) {
            toast.error(lang === "en" ? "Failed to delete user" : "فشل في حذف المستخدم");
        }
    };

    const getRoleLabel = (role: string) => {
        const labels = {
            ADMIN: lang === "en" ? "Admin" : "مدير",
            STORE: lang === "en" ? "Store" : "متجر"
        };
        return labels[role as keyof typeof labels] || role;
    };

    const getRoleBadgeVariant = (role: string) => {
        return role === "ADMIN" ? "destructive" : "secondary";
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setPage(1); // Reset to first page when changing page size
    };

    // Define columns for DataTable
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: lang === "en" ? "Name" : "الاسم",
            cell: ({ row }) => {
                const name = row.getValue("name") as string | null;
                return name || (lang === "en" ? "N/A" : "غير متوفر");
            },
        },
        {
            accessorKey: "email",
            header: lang === "en" ? "Email" : "البريد الإلكتروني",
            cell: ({ row }) => {
                return row.getValue("email");
            },
        },
        {
            accessorKey: "phoneNumber",
            header: lang === "en" ? "Phone Number" : "رقم الهاتف",
            cell: ({ row }) => {
                const phoneNumber = row.getValue("phoneNumber") as string | null;
                return phoneNumber || (lang === "en" ? "N/A" : "غير متوفر");
            },
        },
        {
            accessorKey: "role",
            header: lang === "en" ? "Role" : "الدور",
            cell: ({ row }) => {
                return (
                    <Badge variant={getRoleBadgeVariant(row.getValue("role"))}>
                        {getRoleLabel(row.getValue("role"))}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: lang === "en" ? "Created At" : "تاريخ الإنشاء",
            cell: ({ row }) => {
                return formatDate(row.getValue("createdAt"), lang);
            },
        },
        {
            id: "actions",
            header: lang === "en" ? "Actions" : "الإجراءات",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                        >
                            <Link href={`/admin/users/${user.id}`}>
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
                                        {lang === "en" ? "Delete User" : "حذف المستخدم"}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {lang === "en"
                                            ? "Are you sure you want to delete this user? This action cannot be undone."
                                            : "هل أنت متأكد من أنك تريد حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء."
                                        }
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        {lang === "en" ? "Cancel" : "إلغاء"}
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleDeleteUser(user.id)}
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
                    {lang === "en" ? "Failed to load users data" : "فشل في تحميل بيانات المستخدمين"}
                </div>
            </div>
        );
    }

    const users = usersData?.result || [];
    const pagination = usersData?.pagination;

    return (
        <div className='p-4 space-y-6'>
            {/* Page Header */}
            <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col space-y-1">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>

                <Button asChild className='bg-teal-800 hover:bg-teal-800/80 text-white'>
                    <Link href={`/admin/users/new`}>
                        <Plus className='mr-2 h-4 w-4' />
                        {lang === "en" ? "New User" : "مستخدم جديد"}
                    </Link>
                </Button>
            </div>

            {/* Users DataTable */}
            <DataTable
                columns={columns}
                data={users}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                isLoading={isLoading}
                lang={lang}
            />
        </div>
    )
}

export default AdminUsersPage