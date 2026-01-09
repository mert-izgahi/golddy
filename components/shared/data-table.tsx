"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  isLoading?: boolean
  lang?: "en" | "ar"
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onPageChange,
  onPageSizeChange,
  isLoading = false,
  lang = "en",
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pagination?.totalPages ?? 0,
  })

  const handlePreviousPage = () => {
    if (pagination?.hasPrevious) {
      onPageChange?.(pagination.page - 1)
    }
  }

  const handleNextPage = () => {
    if (pagination?.hasNext) {
      onPageChange?.(pagination.page + 1)
    }
  }

  return (
    <div
      className={cn("space-y-4", {
        "rtl text-right": lang === "ar",
        "ltr text-left": lang === "en",
      })}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      lang === "ar" ? "text-right" : "text-left",
                      header.column.getCanSort() && "cursor-pointer select-none"
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {lang === "en" ? "Loading..." : "جاري التحميل..."}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(lang === "ar" ? "text-right" : "text-left")}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {lang === "en" ? "No results." : "لا توجد نتائج."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 0 && (
        <div
          className={cn(
            "flex items-center justify-between px-2",
            lang === "ar" && "flex-row-reverse"
          )}
        >
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">
              {lang === "en" ? "Rows per page" : "عدد الصفوف"}
            </p>
            <Select
              value={pagination.limit.toString()}
              onValueChange={(value) => {
                onPageSizeChange?.(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pagination.limit.toString()} />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div
            className={cn(
              "flex items-center space-x-6 lg:space-x-8",
              lang === "ar" && "flex-row-reverse space-x-reverse"
            )}
          >
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              {lang === "en"
                ? `Page ${pagination.page} of ${pagination.totalPages}`
                : `صفحة ${pagination.page} من ${pagination.totalPages}`}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={handlePreviousPage}
                disabled={!pagination.hasPrevious || isLoading}
              >
                {lang === "en" ? "Previous" : "السابق"}
              </Button>
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={!pagination.hasNext || isLoading}
              >
                {lang === "en" ? "Next" : "التالي"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
