// lib/html-invoice-generator-simple.ts - SIMPLIFIED VERSION
import { Sale, Store } from "@/lib/generated/prisma/client";

interface InvoiceData {
    sale: Sale & { store: Store };
    lang?: 'en' | 'ar';
}

// Helper functions
const formatGoldType = (goldType: string, lang: 'en' | 'ar' = 'en') => {
    const goldTypes: Record<string, { en: string; ar: string }> = {
        'GOLD_14': { en: "14K Gold", ar: "ذهب عيار 14" },
        'GOLD_18': { en: "18K Gold", ar: "ذهب عيار 18" },
        'GOLD_21': { en: "21K Gold", ar: "ذهب عيار 21" },
        'GOLD_24': { en: "24K Gold", ar: "ذهب عيار 24" },
    };
    return goldTypes[goldType]?.[lang] || goldType;
};

const formatPaymentType = (paymentType: string, lang: 'en' | 'ar' = 'en') => {
    const types: Record<string, { en: string; ar: string }> = {
        'CASH': { en: "Cash", ar: "نقدي" },
        'SHAM_CASH': { en: "Sham Cash Transfer", ar: "تحويل شام كاش" },
        'OTHER': { en: "Other", ar: "أخرى" },
    };
    return types[paymentType]?.[lang] || paymentType;
};

const formatCurrency = (amount: number, currency: string, lang: 'en' | 'ar' = 'en') => {
    if (currency === 'USD') {
        return `${amount.toFixed(2)} USD`;
    } else {
        return lang === 'en' ? `${amount.toFixed(0)} SYP` : `${amount.toFixed(0)} ل.س`;
    }
};

const formatDate = (dateString: string | Date, lang: 'en' | 'ar' = 'en'): string => {
    const date = new Date(dateString);

    if (lang === 'ar') {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    } else {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
};

// HTML Template
const getInvoiceTemplate = (): string => {
    return `<!DOCTYPE html>
<html lang="{{LANG}}" dir="{{DIR}}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice {{INVOICE_NUMBER}}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        @media print {
            body { margin: 0; padding: 0; }
            .no-print { display: none !important; }
            .invoice-container { box-shadow: none; margin: 0; padding: 15mm; }
            @page { size: A4; margin: 0; }
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background: #f5f5f5;
            padding: 10px;
            font-size: 12px;
            line-height: 1.4;
        }
        
        .invoice-container {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            padding: 15mm;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .invoice-header {
            text-align: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #333;
        }
        
        .invoice-title {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        
        .invoice-number {
            font-size: 14px;
            color: #666;
            margin-bottom: 3px;
        }
        
        .invoice-date {
            font-size: 11px;
            color: #999;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 15px;
        }
        
        .info-box {
            flex: 1;
        }
        
        .info-box-title {
            font-size: 11px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
            text-transform: uppercase;
            border-bottom: 1px solid #ddd;
            padding-bottom: 3px;
        }
        
        .info-line {
            font-size: 11px;
            color: #555;
            margin-bottom: 3px;
        }
        
        .info-line strong {
            color: #333;
        }
        
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        
        .details-table th {
            background: #f5f5f5;
            padding: 8px;
            text-align: left;
            font-size: 11px;
            font-weight: bold;
            border: 1px solid #ddd;
        }
        
        [dir="rtl"] .details-table th {
            text-align: right;
        }
        
        .details-table td {
            padding: 8px;
            border: 1px solid #ddd;
            font-size: 11px;
        }
        
        [dir="rtl"] .details-table td {
            text-align: right;
        }
        
        .summary-section {
            margin-top: 15px;
            margin-left: auto;
            width: 50%;
            min-width: 250px;
        }
        
        [dir="rtl"] .summary-section {
            margin-left: 0;
            margin-right: auto;
        }
        
        .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            font-size: 11px;
        }
        
        .summary-row.total {
            border-top: 2px solid #333;
            border-bottom: 2px solid #333;
            padding: 8px 0;
            margin-top: 5px;
            font-size: 13px;
            font-weight: bold;
        }
        
        .summary-row.paid {
            margin-top: 5px;
            font-weight: bold;
        }
        
        .summary-label {
            color: #555;
        }
        
        .summary-value {
            font-weight: bold;
            color: #333;
        }
        
        .exchange-note {
            font-size: 9px;
            color: #888;
            font-style: italic;
            margin-top: 5px;
            text-align: center;
        }
        
        .syp-compact {
            margin-top: 10px;
            padding: 8px;
            background: #f9f9f9;
            border: 1px solid #ddd;
            font-size: 10px;
        }
        
        .syp-compact-title {
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
        }
        
        .syp-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 3px;
        }
        
        .notes-section {
            margin-top: 15px;
            padding: 8px;
            background: #f9f9f9;
            border: 1px solid #ddd;
        }
        
        .notes-title {
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
        }
        
        .notes-content {
            font-size: 10px;
            color: #555;
            line-height: 1.5;
        }
        
        .invoice-footer {
            margin-top: 15px;
            padding-top: 8px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 10px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="invoice-header">
            <div class="invoice-title">{{TITLE}}</div>
            <div class="invoice-number">{{INVOICE_NUMBER_LABEL}} {{INVOICE_NUMBER}}</div>
            <div class="invoice-date">{{DATE}}</div>
        </div>
        
        <div class="info-row">
            <div class="info-box">
                <div class="info-box-title">{{STORE_HEADER}}</div>
                <div class="info-line"><strong>{{STORE_NAME}}</strong></div>
                {{STORE_ADDRESS}}
                {{STORE_CITY}}
                {{STORE_PHONE}}
            </div>
            
            <div class="info-box">
                <div class="info-box-title">{{CUSTOMER_HEADER}}</div>
                <div class="info-line"><strong>{{CUSTOMER_NAME}}</strong></div>
                {{CUSTOMER_PHONE}}
                <div class="info-line">{{PAYMENT_TYPE_LABEL}}: <strong>{{PAYMENT_TYPE}}</strong></div>
            </div>
        </div>
        
        <table class="details-table">
            <thead>
                <tr>
                    <th>{{GOLD_TYPE_LABEL}}</th>
                    <th>{{WEIGHT_LABEL}}</th>
                    <th>{{PRICE_PER_GRAM_LABEL}}</th>
                    <th>{{AMOUNT_LABEL}}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{GOLD_TYPE}}</td>
                    <td>{{WEIGHT}}</td>
                    <td>{{PRICE_PER_GRAM}}</td>
                    <td><strong>{{BASE_AMOUNT}}</strong></td>
                </tr>
            </tbody>
        </table>
        
        <div class="summary-section">
            <div class="summary-row">
                <span class="summary-label">{{BASE_AMOUNT_LABEL}}:</span>
                <span class="summary-value">{{BASE_AMOUNT}}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">{{PROFIT_LABEL}}:</span>
                <span class="summary-value">{{PROFIT_AMOUNT}}</span>
            </div>
            <div class="summary-row total">
                <span class="summary-label">{{TOTAL_LABEL}}:</span>
                <span class="summary-value">{{TOTAL_AMOUNT}}</span>
            </div>
            <div class="summary-row paid">
                <span class="summary-label">{{PAID_LABEL}}:</span>
                <span class="summary-value">{{PAID_AMOUNT}}</span>
            </div>
            {{BALANCE_ROW}}
        </div>
        
        <div class="exchange-note">{{EXCHANGE_RATE_NOTE}}</div>
        
        {{SYP_SECTION}}
        {{NOTES_SECTION}}
        
        <div class="invoice-footer">
            <div>{{FOOTER_MESSAGE}}</div>
            <div>{{FOOTER_DATE}}</div>
        </div>
    </div>
</body>
</html>`;
};

export const generateInvoiceHTML = (invoiceData: InvoiceData): string => {
    const { sale, lang = 'en' } = invoiceData;
    const isArabic = lang === 'ar';

    let template = getInvoiceTemplate();

    // Basic replacements
    const replacements: Record<string, string> = {
        '{{LANG}}': lang,
        '{{DIR}}': isArabic ? 'rtl' : 'ltr',
        '{{TITLE}}': isArabic ? 'فاتورة' : 'INVOICE',
        '{{INVOICE_NUMBER_LABEL}}': isArabic ? 'فاتورة رقم' : 'Invoice #',
        '{{INVOICE_NUMBER}}': sale.invoiceNumber,
        '{{DATE}}': formatDate(sale.createdAt, lang),
        
        // Store info
        '{{STORE_HEADER}}': isArabic ? 'معلومات المتجر' : 'Store Information',
        '{{STORE_NAME}}': sale.store.name,
        
        // Customer info
        '{{CUSTOMER_HEADER}}': isArabic ? 'معلومات العميل' : 'Customer Information',
        '{{CUSTOMER_NAME}}': sale.customerName || (isArabic ? 'عميل مباشر' : 'Walk-in Customer'),
        '{{PAYMENT_TYPE_LABEL}}': isArabic ? 'طريقة الدفع' : 'Payment',
        '{{PAYMENT_TYPE}}': formatPaymentType(sale.paymentType, lang),
        
        // Table headers
        '{{GOLD_TYPE_LABEL}}': isArabic ? 'نوع الذهب' : 'Gold Type',
        '{{WEIGHT_LABEL}}': isArabic ? 'الوزن (جرام)' : 'Weight (g)',
        '{{PRICE_PER_GRAM_LABEL}}': isArabic ? 'السعر/جرام' : 'Price/g',
        '{{AMOUNT_LABEL}}': isArabic ? 'المبلغ' : 'Amount',
        
        // Gold details
        '{{GOLD_TYPE}}': formatGoldType(sale.goldType, lang),
        '{{WEIGHT}}': `${sale.weight.toFixed(2)}${isArabic ? ' جرام' : ' g'}`,
        '{{PRICE_PER_GRAM}}': formatCurrency(sale.pricePerGramUSD, 'USD', lang),
        
        // Financial
        '{{BASE_AMOUNT_LABEL}}': isArabic ? 'المبلغ الأساسي' : 'Base Amount',
        '{{BASE_AMOUNT}}': formatCurrency(sale.totalUSD - sale.profitUSD, 'USD', lang),
        '{{PROFIT_LABEL}}': isArabic ? 'الربح' : 'Profit',
        '{{PROFIT_AMOUNT}}': `+${formatCurrency(sale.profitUSD, 'USD', lang)}`,
        '{{TOTAL_LABEL}}': isArabic ? 'المبلغ الإجمالي' : 'Total Amount',
        '{{TOTAL_AMOUNT}}': formatCurrency(sale.totalUSD, 'USD', lang),
        '{{PAID_LABEL}}': isArabic ? 'المبلغ المدفوع' : 'Amount Paid',
        '{{PAID_AMOUNT}}': formatCurrency(sale.amountPaid, sale.currency, lang),
        
        // Exchange rate
        '{{EXCHANGE_RATE_NOTE}}': isArabic 
            ? `سعر الصرف: 1 USD = ${sale.store.exchangeRateUSDtoSYP.toFixed(2)} ل.س`
            : `Exchange rate: 1 USD = ${sale.store.exchangeRateUSDtoSYP.toFixed(2)} SYP`,
        
        // Footer
        '{{FOOTER_MESSAGE}}': isArabic 
            ? 'شكراً لتعاملكم! يرجى الاحتفاظ بهذه الفاتورة للسجلات.'
            : 'Thank you for your business! Please keep this invoice for your records.',
        '{{FOOTER_DATE}}': isArabic
            ? `تم الإنشاء في ${new Date().toLocaleDateString('ar-SA')}`
            : `Generated on ${new Date().toLocaleDateString('en-US')}`,
    };

    // Store address (optional)
    if (sale.store.address) {
        replacements['{{STORE_ADDRESS}}'] = `<div class="info-line">${sale.store.address}</div>`;
    } else {
        replacements['{{STORE_ADDRESS}}'] = '';
    }

    // Store city (optional)
    if (sale.store.city) {
        replacements['{{STORE_CITY}}'] = `<div class="info-line">${sale.store.city}</div>`;
    } else {
        replacements['{{STORE_CITY}}'] = '';
    }

    // Store phone (optional)
    if (sale.store.primaryPhoneNumber) {
        replacements['{{STORE_PHONE}}'] = `<div class="info-line">${isArabic ? 'هاتف' : 'Tel'}: ${sale.store.primaryPhoneNumber}</div>`;
    } else {
        replacements['{{STORE_PHONE}}'] = '';
    }

    // Customer phone (optional)
    if (sale.customerPhone) {
        replacements['{{CUSTOMER_PHONE}}'] = `<div class="info-line">${isArabic ? 'هاتف' : 'Tel'}: ${sale.customerPhone}</div>`;
    } else {
        replacements['{{CUSTOMER_PHONE}}'] = '';
    }

    // Balance row (if applicable)
    const balance = sale.amountPaid - sale.totalUSD;
    if (Math.abs(balance) > 0.01) {
        const balanceLabel = balance > 0 
            ? (isArabic ? 'الباقي' : 'Change')
            : (isArabic ? 'المتبقي' : 'Balance Due');
        
        replacements['{{BALANCE_ROW}}'] = `
            <div class="summary-row" style="color: ${balance > 0 ? '#059669' : '#dc2626'};">
                <span class="summary-label">${balanceLabel}:</span>
                <span class="summary-value">${formatCurrency(Math.abs(balance), sale.currency, lang)}</span>
            </div>`;
    } else {
        replacements['{{BALANCE_ROW}}'] = '';
    }

    // SYP Section (compact)
    const syrBase = ((sale.totalUSD - sale.profitUSD) * sale.store.exchangeRateUSDtoSYP).toFixed(0);
    const syrProfit = (sale.profitUSD * sale.store.exchangeRateUSDtoSYP).toFixed(0);
    const syrTotal = (sale.totalUSD * sale.store.exchangeRateUSDtoSYP).toFixed(0);
    
    replacements['{{SYP_SECTION}}'] = `
        <div class="syp-compact">
            <div class="syp-compact-title">${isArabic ? 'المبلغ بالليرة السورية' : 'Amount in Syrian Pounds'}</div>
            <div class="syp-row">
                <span>${isArabic ? 'المبلغ الأساسي' : 'Base'}:</span>
                <strong>${syrBase} ${isArabic ? 'ل.س' : 'SYP'}</strong>
            </div>
            <div class="syp-row">
                <span>${isArabic ? 'الربح' : 'Profit'}:</span>
                <strong>+${syrProfit} ${isArabic ? 'ل.س' : 'SYP'}</strong>
            </div>
            <div class="syp-row" style="font-weight: bold; margin-top: 3px; padding-top: 3px; border-top: 1px solid #ddd;">
                <span>${isArabic ? 'الإجمالي' : 'Total'}:</span>
                <strong>${syrTotal} ${isArabic ? 'ل.س' : 'SYP'}</strong>
            </div>
        </div>`;

    // Notes section (optional)
    if (sale.description) {
        replacements['{{NOTES_SECTION}}'] = `
            <div class="notes-section">
                <div class="notes-title">${isArabic ? 'ملاحظات' : 'Notes'}</div>
                <div class="notes-content">${sale.description}</div>
            </div>`;
    } else {
        replacements['{{NOTES_SECTION}}'] = '';
    }

    // Apply all replacements
    Object.entries(replacements).forEach(([key, value]) => {
        template = template.replace(new RegExp(key, 'g'), value);
    });

    return template;
};

export const printInvoicePDF = async (invoiceData: InvoiceData): Promise<void> => {
    const html = generateInvoiceHTML(invoiceData);
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
        
        printWindow.onload = () => {
            setTimeout(() => {
                printWindow.focus();
                printWindow.print();
            }, 250);
        };
    }
};

export const downloadInvoiceHTML = (invoiceData: InvoiceData): void => {
    const html = generateInvoiceHTML(invoiceData);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${invoiceData.sale.invoiceNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
};