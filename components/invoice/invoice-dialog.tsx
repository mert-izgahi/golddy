// components/invoice/invoice-dialog.tsx - FIXED VERSION
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Download, Printer, X, AlertCircle } from "lucide-react";
import { useLangStore } from "@/store/lang-store";
import { generateInvoicePDF, printInvoicePDF } from "@/lib/pdf-generator";
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

    // Fetch invoice data when dialog opens
    useEffect(() => {
        if (isOpen && saleId) {
            fetchInvoiceData();
        } else {
            // Reset state when dialog closes
            setInvoiceData(null);
            setError(null);
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
                
                // Fetch store data as well
                const storeResponse = await apiClient.get(`/stores/${sale.storeId}`);
                
                if (storeResponse.data.success) {
                    // Combine sale and store data for invoice
                    const invoiceData = {
                        sale: {
                            ...sale,
                            store: storeResponse.data.result
                        }
                    };
                    setInvoiceData(invoiceData);
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

    const handleDownloadPDF = async () => {
        if (!invoiceData) return;
        
        try {
            setIsLoading(true);
            const { dataUrl, filename } = await generateInvoicePDF(invoiceData);
            
            // Create download link
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            toast.success(
                lang === "en" ? "Invoice downloaded successfully" : "تم تنزيل الفاتورة بنجاح"
            );
        } catch (error) {
            console.error("Error generating PDF:", error);
            const errorMessage = lang === "en" 
                ? "Failed to generate invoice PDF" 
                : "فشل في إنشاء ملف PDF للفاتورة";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrintPDF = async () => {
        if (!invoiceData) return;
        
        try {
            setIsLoading(true);
            await printInvoicePDF(invoiceData);
            
            toast.success(
                lang === "en" ? "Print dialog opened" : "تم فتح نافذة الطباعة"
            );
        } catch (error) {
            console.error("Error printing PDF:", error);
            const errorMessage = lang === "en" 
                ? "Failed to prepare for printing" 
                : "فشل في التحضير للطباعة";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) {
                onClose();
            }
        }}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <div>
                        <DialogTitle>
                            {lang === "en" ? "Invoice Options" : "خيارات الفاتورة"}
                        </DialogTitle>
                        <DialogDescription>
                            {lang === "en" ? "Download or print the invoice" : "قم بتنزيل أو طباعة الفاتورة"}
                        </DialogDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>
                
                <div className="py-4">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                            <p className="text-muted-foreground">
                                {lang === "en" ? "Loading invoice data..." : "جاري تحميل بيانات الفاتورة..."}
                            </p>
                        </div>
                    ) : error ? (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    ) : invoiceData ? (
                        <div className="space-y-6">
                            {/* Invoice Preview Header */}
                            <div className="text-center mb-6 p-4 bg-muted rounded-lg">
                                <h3 className="text-xl font-bold mb-2">
                                    {lang === "en" ? "Invoice Preview" : "معاينة الفاتورة"}
                                </h3>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="text-lg font-semibold">
                                        {lang === "en" ? "Invoice #" : "فاتورة رقم"} {invoiceData.sale.invoiceNumber}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {new Date(invoiceData.sale.createdAt).toLocaleDateString(lang === "en" ? "en-US" : "ar-SA", {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Details Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-sm">
                                        {lang === "en" ? "Store Information" : "معلومات المتجر"}
                                    </h4>
                                    <div className="space-y-1 text-sm">
                                        <p><span className="font-medium">{invoiceData.sale.store.name}</span></p>
                                        {invoiceData.sale.store.address && (
                                            <p>{invoiceData.sale.store.address}</p>
                                        )}
                                        {invoiceData.sale.store.primaryPhoneNumber && (
                                            <p>{invoiceData.sale.store.primaryPhoneNumber}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-semibold text-sm">
                                        {lang === "en" ? "Sale Details" : "تفاصيل البيع"}
                                    </h4>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span>{lang === "en" ? "Gold Type" : "نوع الذهب"}:</span>
                                            <span className="font-medium">
                                                {(() => {
                                                    const goldTypes: Record<string, string> = {
                                                        'GOLD_14': lang === "en" ? "14K Gold" : "ذهب عيار ١٤",
                                                        'GOLD_18': lang === "en" ? "18K Gold" : "ذهب عيار ١٨",
                                                        'GOLD_21': lang === "en" ? "21K Gold" : "ذهب عيار ٢١",
                                                        'GOLD_24': lang === "en" ? "24K Gold" : "ذهب عيار ٢٤",
                                                    };
                                                    return goldTypes[invoiceData.sale.goldType] || invoiceData.sale.goldType;
                                                })()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>{lang === "en" ? "Weight" : "الوزن"}:</span>
                                            <span className="font-medium">{invoiceData.sale.weight.toFixed(2)}g</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>{lang === "en" ? "Total Amount" : "المبلغ الإجمالي"}:</span>
                                            <span className="font-medium">
                                                {(invoiceData.sale.currency === 'USD' 
                                                    ? invoiceData.sale.totalUSD 
                                                    : invoiceData.sale.totalSYP
                                                ).toFixed(2)} {invoiceData.sale.currency}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>{lang === "en" ? "Customer" : "العميل"}:</span>
                                            <span className="font-medium">
                                                {invoiceData.sale.customerName || (lang === "en" ? "Walk-in Customer" : "عميل مباشر")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                <Button
                                    onClick={handleDownloadPDF}
                                    disabled={isLoading}
                                    className="flex-1 h-12"
                                    size="lg"
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <Download className="mr-2 h-5 w-5" />
                                    )}
                                    {lang === "en" ? "Download PDF" : "تحميل PDF"}
                                </Button>
                                
                                <Button
                                    onClick={handlePrintPDF}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="flex-1 h-12"
                                    size="lg"
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <Printer className="mr-2 h-5 w-5" />
                                    )}
                                    {lang === "en" ? "Print" : "طباعة"}
                                </Button>
                            </div>
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