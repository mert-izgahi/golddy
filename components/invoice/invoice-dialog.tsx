// components/invoice/invoice-dialog-simple.tsx - SIMPLIFIED VERSION
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Download, Printer, X, AlertCircle } from "lucide-react";
import { useLangStore } from "@/store/lang-store";
import { generateInvoiceHTML, printInvoicePDF, downloadInvoiceHTML } from "@/lib/html-invoice-generator-simple";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface InvoiceDialogProps {
    saleId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export function InvoiceDialog({ saleId, isOpen, onClose }: InvoiceDialogProps) {
    const { lang } = useLangStore();
    const [isLoading, setIsLoading] = useState(false);
    const [invoiceData, setInvoiceData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [previewHtml, setPreviewHtml] = useState<string>('');

    useEffect(() => {
        if (isOpen && saleId) {
            fetchInvoiceData();
        } else {
            setInvoiceData(null);
            setError(null);
            setPreviewHtml('');
        }
    }, [isOpen, saleId]);

    const fetchInvoiceData = async () => {
        if (!saleId) {
            setError(lang === "en" ? "No sale ID provided" : "لم يتم توفير معرف البيع");
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const response = await apiClient.get(`/sales/${saleId}`);

            if (response.data.success) {
                const sale = response.data.result;
                const storeResponse = await apiClient.get(`/stores/${sale.storeId}`);

                if (storeResponse.data.success) {
                    const data = {
                        sale: {
                            ...sale,
                            store: storeResponse.data.result
                        },
                        lang: lang
                    };
                    setInvoiceData(data);
                    
                    // Generate preview HTML
                    const html = generateInvoiceHTML(data);
                    setPreviewHtml(html);
                } else {
                    throw new Error("Failed to fetch store data");
                }
            } else {
                throw new Error(response.data.message || "Failed to fetch sale data");
            }
        } catch (error: any) {
            console.error("Error fetching invoice data:", error);
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                (lang === "en" ? "Failed to load invoice data" : "فشل في تحميل بيانات الفاتورة");
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrint = async () => {
        if (!invoiceData) return;

        try {
            setIsLoading(true);
            await printInvoicePDF(invoiceData);
            toast.success(lang === "en" ? "Print dialog opened" : "تم فتح نافذة الطباعة");
        } catch (error) {
            console.error("Error printing invoice:", error);
            toast.error(lang === "en" ? "Failed to print" : "فشل في الطباعة");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadHTML = () => {
        if (!invoiceData) return;
        downloadInvoiceHTML(invoiceData);
        toast.success(lang === "en" ? "Invoice downloaded" : "تم تنزيل الفاتورة");
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) onClose();
        }}>
            <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto" dir={lang === "ar" ? "rtl" : "ltr"}>
                <DialogHeader className="flex flex-row items-center justify-between">
                    <div>
                        <DialogTitle>
                            {lang === "en" ? "Invoice Preview" : "معاينة الفاتورة"}
                        </DialogTitle>
                        <DialogDescription>
                            {lang === "en" ? "Print or download the invoice" : "طباعة أو تنزيل الفاتورة"}
                        </DialogDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                <div className="py-4">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                            <p className="text-muted-foreground">
                                {lang === "en" ? "Loading invoice..." : "جاري تحميل الفاتورة..."}
                            </p>
                        </div>
                    ) : error ? (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    ) : previewHtml ? (
                        <div className="space-y-4">
                            {/* Preview iframe */}
                            <div className="border rounded-lg overflow-hidden bg-gray-50">
                                <iframe
                                    srcDoc={previewHtml}
                                    className="w-full"
                                    style={{ height: '600px', border: 'none' }}
                                    title="Invoice Preview"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                                <Button
                                    onClick={handlePrint}
                                    disabled={isLoading}
                                    className="flex-1"
                                    size="lg"
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <Printer className="mr-2 h-5 w-5" />
                                    )}
                                    {lang === "en" ? "Print Invoice" : "طباعة الفاتورة"}
                                </Button>

                                <Button
                                    onClick={handleDownloadHTML}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="flex-1"
                                    size="lg"
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <Download className="mr-2 h-5 w-5" />
                                    )}
                                    {lang === "en" ? "Download HTML" : "تحميل HTML"}
                                </Button>
                            </div>

                            <p className="text-xs text-center text-muted-foreground">
                                {lang === "en" 
                                    ? "Tip: Use Print to save as PDF or download HTML for editing"
                                    : "نصيحة: استخدم الطباعة للحفظ كـ PDF أو تنزيل HTML للتعديل"
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">
                                {lang === "en" ? "No invoice data available" : "لا توجد بيانات فاتورة متاحة"}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}