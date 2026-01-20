// lib/html-invoice-generator-simple.ts - SIMPLIFIED VERSION WITH LOGO
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
        return `$${amount.toFixed(2)}`;
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
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
};

// Simplified HTML Template with Clean Design
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
            body { margin: 0; padding: 0; background: white; }
            .no-print { display: none !important; }
            .invoice-container { box-shadow: none; margin: 0; padding: 15mm; }
            @page { size: A4; margin: 0; }
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #fafafa;
            padding: 10px;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
        }
        
        .invoice-container {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            padding: 15mm;
            border: 1px solid #ddd;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #2c3e50;
        }
        
        .store-info {
            flex: 1;
        }
        
        .store-logo {
            max-height: 60px;
            max-width: 150px;
            margin-bottom: 10px;
        }
        
        .store-name {
            font-size: 20px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
        }
        
        .store-details {
            font-size: 11px;
            color: #666;
            line-height: 1.3;
        }
        
        .invoice-info {
            text-align: right;
        }
        
        [dir="rtl"] .invoice-info {
            text-align: left;
        }
        
        .invoice-title {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        
        .invoice-number {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        
        .invoice-date {
            font-size: 12px;
            color: #999;
        }
        
        .content-row {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .info-box {
            flex: 1;
            padding: 15px;
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 4px;
        }
        
        .box-title {
            font-size: 13px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #ddd;
        }
        
        .info-line {
            font-size: 12px;
            color: #555;
            margin-bottom: 4px;
        }
        
        .info-line strong {
            color: #2c3e50;
        }
        
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        .details-table th {
            background: #f8f9fa;
            color: #2c3e50;
            padding: 10px;
            text-align: left;
            font-size: 12px;
            font-weight: 600;
            border: 1px solid #dee2e6;
        }
        
        [dir="rtl"] .details-table th {
            text-align: right;
        }
        
        .details-table td {
            padding: 10px;
            border: 1px solid #dee2e6;
            font-size: 12px;
        }
        
        [dir="rtl"] .details-table td {
            text-align: right;
        }
        
        .details-table tbody tr:nth-child(even) {
            background: #f8f9fa;
        }
        
        .summary {
            margin-top: 20px;
            width: 50%;
            margin-left: auto;
        }
        
        [dir="rtl"] .summary {
            margin-left: 0;
            margin-right: auto;
        }
        
        .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        
        .summary-row:last-child {
            border-bottom: none;
        }
        
        .summary-row.total {
            font-weight: bold;
            font-size: 14px;
            color: #2c3e50;
            padding-top: 10px;
            border-top: 2px solid #2c3e50;
        }
        
        .summary-row.paid {
            font-weight: 600;
            color: #27ae60;
        }
        
        .summary-row.balance {
            color: #e74c3c;
        }
        
        .summary-label {
            color: #666;
        }
        
        .summary-value {
            font-weight: 600;
        }
        
        .currency-note {
            font-size: 11px;
            color: #999;
            margin-top: 20px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 4px;
            text-align: center;
        }
        
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 11px;
            color: #999;
        }
        
        .thank-you {
            color: #2c3e50;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .compact-section {
            margin-top: 15px;
            padding: 12px;
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 4px;
        }
        
        .compact-title {
            font-size: 12px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
        }
        
        .compact-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
        }
        
        .compact-row.total {
            border-top: 1px solid #ddd;
            padding-top: 6px;
            margin-top: 6px;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="store-info">
                {{LOGO_HTML}}
                <div class="store-name">{{STORE_NAME}}</div>
                <div class="store-details">
                    {{STORE_ADDRESS}}
                    {{STORE_CITY}}
                    {{STORE_PHONE}}
                </div>
            </div>
            <div class="invoice-info">
                <div class="invoice-title">{{TITLE}}</div>
                <div class="invoice-number">{{INVOICE_NUMBER_LABEL}} {{INVOICE_NUMBER}}</div>
                <div class="invoice-date">{{DATE}}</div>
            </div>
        </div>
        
        <div class="content-row">
            <div class="info-box">
                <div class="box-title">{{CUSTOMER_HEADER}}</div>
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
                    <td><strong>{{GOLD_TYPE}}</strong></td>
                    <td>{{WEIGHT}}</td>
                    <td>{{PRICE_PER_GRAM}}</td>
                    <td><strong>{{BASE_AMOUNT}}</strong></td>
                </tr>
                {{PROFIT_ROW}}
            </tbody>
        </table>
        
        <div class="summary">
            <div class="summary-row">
                <span class="summary-label">{{BASE_AMOUNT_LABEL}}:</span>
                <span class="summary-value">{{BASE_AMOUNT}}</span>
            </div>
            {{PROFIT_SUMMARY}}
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
        
        <div class="currency-note">
            {{EXCHANGE_RATE_NOTE}}
        </div>
        
        {{SYP_SECTION}}
        {{NOTES_SECTION}}
        
        <div class="footer">
            <div class="thank-you">{{FOOTER_MESSAGE}}</div>
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

    // Calculations
    const baseAmountUSD = sale.weight * sale.pricePerGramUSD;
    const profitUSD = sale.profitUSD || 0;
    const totalUSD = baseAmountUSD + profitUSD;

    // Basic replacements
    const replacements: Record<string, string> = {
        '{{LANG}}': lang,
        '{{DIR}}': isArabic ? 'rtl' : 'ltr',
        '{{TITLE}}': isArabic ? 'فاتورة' : 'INVOICE',
        '{{INVOICE_NUMBER_LABEL}}': isArabic ? 'فاتورة رقم' : 'Invoice #',
        '{{INVOICE_NUMBER}}': sale.invoiceNumber,
        '{{DATE}}': formatDate(sale.createdAt, lang),
        
        // Store info
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
        '{{BASE_AMOUNT}}': formatCurrency(baseAmountUSD, 'USD', lang),
        '{{TOTAL_LABEL}}': isArabic ? 'المبلغ الإجمالي' : 'Total Amount',
        '{{TOTAL_AMOUNT}}': formatCurrency(totalUSD, 'USD', lang),
        '{{PAID_LABEL}}': isArabic ? 'المبلغ المدفوع' : 'Amount Paid',
        '{{PAID_AMOUNT}}': formatCurrency(sale.amountPaid, sale.currency, lang),
        
        // Exchange rate
        '{{EXCHANGE_RATE_NOTE}}': isArabic 
            ? `سعر الصرف: 1 USD = ${sale.store.exchangeRateUSDtoSYP.toFixed(2)} ل.س`
            : `Exchange rate: 1 USD = ${sale.store.exchangeRateUSDtoSYP.toFixed(2)} SYP`,
        
        // Footer
        '{{FOOTER_MESSAGE}}': isArabic 
            ? 'شكراً لتعاملكم معنا'
            : 'Thank you for your business',
        '{{FOOTER_DATE}}': isArabic
            ? `تم الإنشاء في ${new Date().toLocaleDateString('ar-SA')}`
            : `Generated on ${new Date().toLocaleDateString('en-US')}`,
    };

    // Store logo (if available)
    if (sale.store.logoUrl) {
        replacements['{{LOGO_HTML}}'] = `<img src="${sale.store.logoUrl}" alt="${sale.store.name}" class="store-logo">`;
    } else {
        replacements['{{LOGO_HTML}}'] = '';
    }

    // Store address (optional)
    if (sale.store.address) {
        replacements['{{STORE_ADDRESS}}'] = `<div>${sale.store.address}</div>`;
    } else {
        replacements['{{STORE_ADDRESS}}'] = '';
    }

    // Store city (optional)
    if (sale.store.city) {
        replacements['{{STORE_CITY}}'] = `<div>${sale.store.city}</div>`;
    } else {
        replacements['{{STORE_CITY}}'] = '';
    }

    // Store phone (optional)
    if (sale.store.primaryPhoneNumber) {
        replacements['{{STORE_PHONE}}'] = `<div>${isArabic ? 'هاتف' : 'Tel'}: ${sale.store.primaryPhoneNumber}</div>`;
    } else {
        replacements['{{STORE_PHONE}}'] = '';
    }

    // Customer phone (optional)
    if (sale.customerPhone) {
        replacements['{{CUSTOMER_PHONE}}'] = `<div class="info-line">${isArabic ? 'هاتف' : 'Tel'}: ${sale.customerPhone}</div>`;
    } else {
        replacements['{{CUSTOMER_PHONE}}'] = '';
    }

    // Profit row in table (if any profit)
    if (profitUSD > 0) {
        replacements['{{PROFIT_ROW}}'] = `
            <tr>
                <td><strong>${isArabic ? 'الأجور' : 'Profit'}</strong></td>
                <td></td>
                <td></td>
                <td><strong>+ ${formatCurrency(profitUSD, 'USD', lang)}</strong></td>
            </tr>`;
        
        replacements['{{PROFIT_SUMMARY}}'] = `
            <div class="summary-row">
                <span class="summary-label">${isArabic ? 'الأجور' : 'Profit'}:</span>
                <span class="summary-value">+ ${formatCurrency(profitUSD, 'USD', lang)}</span>
            </div>`;
    } else {
        replacements['{{PROFIT_ROW}}'] = '';
        replacements['{{PROFIT_SUMMARY}}'] = '';
    }

    // Balance row (if applicable)
    const balance = sale.amountPaid - totalUSD;
    if (Math.abs(balance) > 0.01) {
        const balanceLabel = balance > 0 
            ? (isArabic ? 'الباقي' : 'Change')
            : (isArabic ? 'المتبقي' : 'Balance Due');
        
        replacements['{{BALANCE_ROW}}'] = `
            <div class="summary-row balance">
                <span class="summary-label">${balanceLabel}:</span>
                <span class="summary-value">${formatCurrency(Math.abs(balance), sale.currency, lang)}</span>
            </div>`;
    } else {
        replacements['{{BALANCE_ROW}}'] = '';
    }

    // SYP Section (compact)
    const syrBase = (baseAmountUSD * sale.store.exchangeRateUSDtoSYP).toFixed(0);
    const syrProfit = (profitUSD * sale.store.exchangeRateUSDtoSYP).toFixed(0);
    const syrTotal = (totalUSD * sale.store.exchangeRateUSDtoSYP).toFixed(0);
    
    replacements['{{SYP_SECTION}}'] = `
        <div class="compact-section">
            <div class="compact-title">${isArabic ? 'المبلغ بالليرة السورية' : 'Amount in Syrian Pounds'}</div>
            <div class="compact-row">
                <span>${isArabic ? 'المبلغ الأساسي' : 'Base Amount'}:</span>
                <strong>${syrBase} ${isArabic ? 'ل.س' : 'SYP'}</strong>
            </div>
            ${profitUSD > 0 ? `<div class="compact-row">
                <span>${isArabic ? 'الأجور' : 'Profit'}:</span>
                <strong>+ ${syrProfit} ${isArabic ? 'ل.س' : 'SYP'}</strong>
            </div>` : ''}
            <div class="compact-row total">
                <span>${isArabic ? 'الإجمالي' : 'Total'}:</span>
                <strong>${syrTotal} ${isArabic ? 'ل.س' : 'SYP'}</strong>
            </div>
        </div>`;

    // Notes section (optional)
    if (sale.description) {
        replacements['{{NOTES_SECTION}}'] = `
            <div class="compact-section" style="margin-top: 10px;">
                <div class="compact-title">${isArabic ? 'ملاحظات' : 'Notes'}</div>
                <div style="font-size: 11px; color: #555; line-height: 1.3;">
                    ${sale.description}
                </div>
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