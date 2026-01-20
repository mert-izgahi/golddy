// components/invoice/invoice-dialog-simple.tsx - PDF ONLY VERSION
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Printer, AlertCircle } from "lucide-react";
import { useLangStore } from "@/store/lang-store";
import { generateInvoiceHTML, printInvoicePDF } from "@/lib/html-invoice-generator-simple";
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

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) onClose();
        }}>
            <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto" dir={lang === "ar" ? "rtl" : "ltr"}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-teal-900 flex items-center gap-2">
                        <div className="p-2 bg-teal-100 rounded-lg">
                            <Printer className="h-6 w-6 text-teal-700" />
                        </div>
                        {lang === "en" ? "Invoice Preview" : "معاينة الفاتورة"}
                    </DialogTitle>
                    <DialogDescription className="text-base">
                        {lang === "en" ? "Review and print your invoice" : "مراجعة وطباعة الفاتورة"}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="relative">
                                <Loader2 className="h-8 w-8 text-teal-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            <p className="text-teal-700 font-medium mt-6">
                                {lang === "en" ? "Loading invoice..." : "جاري تحميل الفاتورة..."}
                            </p>
                        </div>
                    ) : error ? (
                        <Alert variant="destructive" className="border-red-300 bg-red-50">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                            <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
                        </Alert>
                    ) : previewHtml ? (
                        <div className="space-y-6">
                            {/* Preview iframe */}
                            <div className="border-0 rounded-xs overflow-hidden shadow-lg bg-gray-50">
                                <div className="bg-teal-700 text-white px-4 py-2 text-sm font-medium">
                                    {lang === "en" ? "Invoice Preview" : "معاينة الفاتورة"}
                                </div>
                                <iframe
                                    srcDoc={previewHtml}
                                    className="w-full bg-white"
                                    style={{ height: '600px', border: 'none' }}
                                    title="Invoice Preview"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-4">
                                <Button
                                    onClick={handlePrint}
                                    disabled={isLoading}
                                    className="w-full bg-teal-700 hover:bg-teal-800 text-white shadow-lg"
                                    size="lg"
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <Printer className="mr-2 h-5 w-5" />
                                    )}
                                    {lang === "en" ? "Print Invoice (Save as PDF)" : "طباعة الفاتورة (حفظ كـ PDF)"}
                                </Button>

                                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <div className="text-sm text-blue-900">
                                            <p className="font-semibold mb-1">
                                                {lang === "en" ? "💡 Quick Tip:" : "💡 نصيحة سريعة:"}
                                            </p>
                                            <p>
                                                {lang === "en" 
                                                    ? "In the print dialog, choose 'Save as PDF' as your printer to download the invoice as a PDF file."
                                                    : "في نافذة الطباعة، اختر 'حفظ كـ PDF' كطابعة لتنزيل الفاتورة كملف PDF."
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <AlertCircle className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-gray-600 font-medium">
                                {lang === "en" ? "No invoice data available" : "لا توجد بيانات فاتورة متاحة"}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}