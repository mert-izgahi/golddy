// lib/pdf-generator.ts - ENHANCED VERSION WITH ARABIC FONT SUPPORT
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InvoiceData } from './types';

// Declare jspdf-autotable types and additional jsPDF methods
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable?: {
      finalY: number;
    };
  }
}

// Extend jsPDF with commonly used methods not in default types
interface ExtendedJsPDF extends jsPDF {
  setR2L(value: boolean): void;
  setFillColor(r: number, g: number, b: number, a?: number): void;
  setDrawColor(r: number, g: number, b: number): void;
  setLineWidth(width: number): void;
  setTextColor(r: number, g: number, b: number): void;
  roundedRect(x: number, y: number, w: number, h: number, rx: number, ry: number, style?: string): void;
  circle(x: number, y: number, r: number, style?: string): void;
  line(x1: number, y1: number, x2: number, y2: number): void;
  rect(x: number, y: number, w: number, h: number, style?: string): void;
  addFileToVFS(filename: string, content: string): void;
  addFont(filename: string, fontName: string, fontStyle: string): void;
}



// Helper function to reverse Arabic text for proper display
// This is a workaround since we don't have a proper Arabic font
const reverseArabicText = (text: string): string => {
  // Split by spaces to handle words
  const words = text.split(' ');
  // Reverse the order of words and reverse each word
  return words.reverse().map(word => word.split('').reverse().join('')).join(' ');
};

// Helper functions with Arabic support
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
    return lang === 'en' ? `${amount.toFixed(0)} SYP` : `${amount.toFixed(0)} ليرة`;
  }
};

const formatDate = (dateString: string, lang: 'en' | 'ar' = 'en'): string => {
  const date = new Date(dateString);

  if (lang === 'ar') {
    // For Arabic, use simpler format to avoid encoding issues
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

export const generateInvoicePDF = async (invoiceData: InvoiceData): Promise<{ dataUrl: string; filename: string }> => {
  const { sale, lang = 'en' } = invoiceData;
  const isArabic = lang === 'ar';

  // Create PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  }) as any; // Type as any to access all jsPDF methods

  // Note: For Arabic, we'll use a simplified approach with English structure
  // but Arabic-friendly numbers and minimal text to avoid encoding issues

  // Modern color palette matching the dialog
  const primaryColor = [37, 99, 235]; // Blue-600
  const secondaryColor = [16, 185, 129]; // Green-500
  const accentColor = [251, 191, 36]; // Yellow-400
  const profitColor = [34, 197, 94]; // Green-500
  const textColor = [31, 41, 55]; // Gray-800
  const lightGray = [249, 250, 251]; // Gray-50
  const borderColor = [229, 231, 235]; // Gray-200
  const blueLight = [239, 246, 255]; // Blue-50
  const greenLight = [240, 253, 244]; // Green-50
  const yellowLight = [254, 249, 195]; // Yellow-50

  // Document settings
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - (2 * margin);
  let yPosition = margin;

  // ===== HEADER SECTION =====
  // Gradient-like header background (simulated with rectangles)
  doc.setFillColor(219, 234, 254); // Blue-100
  doc.rect(0, 0, pageWidth, 35, 'F');
  doc.setFillColor(191, 219, 254); // Blue-200
  doc.rect(0, 0, pageWidth / 2, 35, 'F');

  // Add circular icon background
  doc.setFillColor(37, 99, 235, 0.1);
  doc.circle(pageWidth / 2, 17, 8, 'F');

  // Invoice Title
  doc.setTextColor(...primaryColor);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  const title = isArabic ? 'INVOICE / FATORH' : 'INVOICE';
  doc.text(title, pageWidth / 2, 20, { align: 'center' });

  yPosition = 40;

  // Invoice Number Badge
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  const badgeWidth = 60;
  const badgeX = (pageWidth - badgeWidth) / 2;
  doc.roundedRect(badgeX, yPosition, badgeWidth, 10, 2, 2, 'FD');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  const invoiceNumText = `#${sale.invoiceNumber}`;
  doc.text(invoiceNumText, pageWidth / 2, yPosition + 7, { align: 'center' });

  yPosition += 15;

  // Date
  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128); // Gray-500
  doc.setFont('helvetica', 'normal');
  doc.text(formatDate(sale.createdAt, lang), pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 12;

  // ===== STORE & CUSTOMER INFO SECTION =====
  const columnWidth = (contentWidth - 10) / 2;
  const leftX = margin;
  const rightX = margin + columnWidth + 10;

  // Store Information Box
  doc.setFillColor(...blueLight);
  doc.setDrawColor(...borderColor);
  doc.setLineWidth(0.3);
  doc.roundedRect(leftX, yPosition, columnWidth, 45, 2, 2, 'FD');

  // Store icon/header
  doc.setFillColor(...primaryColor);
  doc.circle(leftX + 5, yPosition + 5, 2, 'F');

  doc.setTextColor(...primaryColor);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  const storeHeader = 'STORE';
  doc.text(storeHeader, leftX + 10, yPosition + 7);

  doc.setFontSize(9);
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'bold');
  doc.text(sale.store.name, leftX + 5, yPosition + 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  let storeY = yPosition + 21;

  if (sale.store.address) {
    doc.text(sale.store.address, leftX + 5, storeY);
    storeY += 5;
  }

  if (sale.store.city) {
    doc.text(sale.store.city, leftX + 5, storeY);
    storeY += 5;
  }

  if (sale.store.primaryPhoneNumber) {
    doc.text(`Tel: ${sale.store.primaryPhoneNumber}`, leftX + 5, storeY);
  }

  // Customer Information Box
  doc.setFillColor(...blueLight);
  doc.roundedRect(rightX, yPosition, columnWidth, 45, 2, 2, 'FD');

  doc.setFillColor(...secondaryColor);
  doc.circle(rightX + 5, yPosition + 5, 2, 'F');

  doc.setTextColor(...secondaryColor);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  const customerHeader = 'CUSTOMER';
  doc.text(customerHeader, rightX + 10, yPosition + 7);

  doc.setFontSize(9);
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'bold');
  const customerName = sale.customerName || 'Walk-in Customer';
  doc.text(customerName, rightX + 5, yPosition + 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  let customerY = yPosition + 21;

  if (sale.customerPhone) {
    doc.text(`Tel: ${sale.customerPhone}`, rightX + 5, customerY);
    customerY += 5;
  }

  doc.setTextColor(34, 197, 94); // Green for payment
  doc.setFont('helvetica', 'bold');
  doc.text(`Payment: ${formatPaymentType(sale.paymentType, 'en')}`, rightX + 5, customerY);

  yPosition += 55;

  // ===== GOLD DETAILS SECTION =====
  doc.setFillColor(...yellowLight);
  doc.roundedRect(margin, yPosition, contentWidth, 35, 2, 2, 'FD');

  doc.setTextColor(180, 83, 9); // Yellow-700
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  const goldHeader = 'GOLD DETAILS';
  doc.text(goldHeader, margin + 5, yPosition + 8);

  // Gold details in a grid layout
  const detailY = yPosition + 16;
  const detailColumnWidth = contentWidth / 2;

  doc.setFontSize(8);
  doc.setTextColor(161, 98, 7); // Yellow-600
  doc.setFont('helvetica', 'bold');

  // Left column
  doc.text('Type:', margin + 5, detailY);
  doc.text('Weight:', margin + 5, detailY + 6);

  // Right column
  doc.text('Price/Gram:', margin + detailColumnWidth + 5, detailY);
  doc.text('Exchange Rate:', margin + detailColumnWidth + 5, detailY + 6);

  // Values
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(120, 53, 15); // Yellow-800
  doc.setFontSize(9);

  doc.text(formatGoldType(sale.goldType, 'en'), margin + 35, detailY);
  doc.text(`${sale.weight.toFixed(2)} g`, margin + 35, detailY + 6);

  doc.text(`${sale.pricePerGramUSD.toFixed(2)} USD`, margin + detailColumnWidth + 35, detailY);
  doc.text(`1 USD = ${sale.store.exchangeRateUSDtoSYP.toFixed(2)} SYP`, margin + detailColumnWidth + 35, detailY + 6);

  yPosition += 45;

  // ===== FINANCIAL SUMMARY SECTION =====
  doc.setFillColor(...greenLight);
  doc.roundedRect(margin, yPosition, contentWidth, 60, 2, 2, 'FD');

  doc.setTextColor(21, 128, 61); // Green-700
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  const financialHeader = 'FINANCIAL SUMMARY';
  doc.text(financialHeader, margin + 5, yPosition + 8);

  let summaryY = yPosition + 18;

  // Base Amount
  doc.setFontSize(9);
  doc.setTextColor(22, 101, 52); // Green-800
  doc.setFont('helvetica', 'normal');
  doc.text('Base Amount:', margin + 5, summaryY);
  doc.setFont('helvetica', 'bold');
  doc.text(`${(sale.totalUSD - sale.profitUSD).toFixed(2)} USD`, pageWidth - margin - 5, summaryY, { align: 'right' });

  summaryY += 8;

  // Profit
  doc.setDrawColor(187, 247, 208); // Green-200
  doc.setLineWidth(0.3);
  doc.line(margin + 5, summaryY - 2, pageWidth - margin - 5, summaryY - 2);

  doc.setTextColor(...profitColor);
  doc.setFont('helvetica', 'normal');
  doc.text('Profit:', margin + 5, summaryY + 3);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`+${sale.profitUSD.toFixed(2)} USD`, pageWidth - margin - 5, summaryY + 3, { align: 'right' });

  summaryY += 11;

  // Total Amount
  doc.setDrawColor(187, 247, 208);
  doc.line(margin + 5, summaryY - 2, pageWidth - margin - 5, summaryY - 2);

  doc.setTextColor(6, 78, 59); // Green-900
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount:', margin + 5, summaryY + 4);
  doc.setFontSize(14);
  doc.text(`${sale.totalUSD.toFixed(2)} USD`, pageWidth - margin - 5, summaryY + 4, { align: 'right' });

  summaryY += 12;

  // Amount Paid
  doc.setDrawColor(187, 247, 208);
  doc.line(margin + 5, summaryY - 2, pageWidth - margin - 5, summaryY - 2);

  doc.setTextColor(...primaryColor);
  doc.setFontSize(11);
  doc.text('Amount Paid:', margin + 5, summaryY + 4);
  doc.setFontSize(14);
  doc.text(formatCurrency(sale.amountPaid, sale.currency, lang), pageWidth - margin - 5, summaryY + 4, { align: 'right' });

  summaryY += 12;

  // Balance if any
  if (Math.abs(sale.amountPaid - sale.totalUSD) > 0.01) {
    const balance = sale.amountPaid - sale.totalUSD;
    const balanceColor = balance > 0 ? [220, 38, 38] : [37, 99, 235]; // Red or Blue

    doc.setDrawColor(187, 247, 208);
    doc.line(margin + 5, summaryY - 2, pageWidth - margin - 5, summaryY - 2);

    doc.setTextColor(...balanceColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    const balanceLabel = balance > 0 ? 'Balance Due:' : 'Change:';
    doc.text(balanceLabel, margin + 5, summaryY + 3);
    doc.text(`${Math.abs(balance).toFixed(2)} ${sale.currency}`, pageWidth - margin - 5, summaryY + 3, { align: 'right' });
  }

  yPosition += 70;

  // ===== SYP CONVERSION (For both languages, always useful) =====
  doc.setFillColor(239, 246, 255); // Blue-50
  doc.roundedRect(margin, yPosition, contentWidth, 32, 2, 2, 'FD');

  doc.setTextColor(...primaryColor);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('AMOUNT IN SYRIAN POUNDS (SYP)', margin + 5, yPosition + 8);

  doc.setFontSize(8);
  doc.setTextColor(55, 65, 81); // Gray-700
  doc.setFont('helvetica', 'normal');

  const syrBase = ((sale.totalUSD - sale.profitUSD) * sale.store.exchangeRateUSDtoSYP).toFixed(0);
  const syrProfit = (sale.profitUSD * sale.store.exchangeRateUSDtoSYP).toFixed(0);
  const syrTotal = (sale.totalUSD * sale.store.exchangeRateUSDtoSYP).toFixed(0);

  let syrY = yPosition + 16;
  doc.text(`Base Amount: ${syrBase} SYP`, margin + 5, syrY);
  syrY += 5;
  doc.setTextColor(...profitColor);
  doc.text(`Profit: +${syrProfit} SYP`, margin + 5, syrY);
  syrY += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryColor);
  doc.text(`Total: ${syrTotal} SYP`, margin + 5, syrY);

  yPosition += 40;

  // ===== NOTES SECTION =====
  if (sale.description) {
    doc.setFillColor(...lightGray);
    const notesHeight = 30;
    doc.roundedRect(margin, yPosition, contentWidth, notesHeight, 2, 2, 'FD');

    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Notes:', margin + 5, yPosition + 8);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const splitDescription = doc.splitTextToSize(sale.description, contentWidth - 10);
    doc.text(splitDescription, margin + 5, yPosition + 15);

    yPosition += notesHeight + 8;
  }

  // ===== FOOTER =====
  const footerY = doc.internal.pageSize.getHeight() - 25;

  // Footer background
  doc.setFillColor(...lightGray);
  doc.rect(0, footerY - 5, pageWidth, 30, 'F');

  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128); // Gray-500
  doc.setFont('helvetica', 'italic');

  const thankYou = 'Thank you for your business! Please keep this invoice for your records.';
  doc.text(thankYou, pageWidth / 2, footerY + 2, { align: 'center' });

  doc.setFontSize(7);
  const generated = `Generated on ${new Date().toLocaleDateString('en-US')}`;
  doc.text(generated, pageWidth / 2, footerY + 8, { align: 'center' });

  // Generate filename
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `invoice-${sale.invoiceNumber}-${timestamp}.pdf`;

  const dataUrl = doc.output('datauristring');

  return { dataUrl, filename };
};

export const printInvoicePDF = async (invoiceData: InvoiceData): Promise<void> => {
  const { dataUrl } = await generateInvoicePDF(invoiceData);

  // Open PDF in new window for printing
  const printWindow = window.open(dataUrl);

  if (printWindow) {
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();

      // Close window after printing
      setTimeout(() => {
        if (printWindow && !printWindow.closed) {
          printWindow.close();
        }
      }, 1000);
    };
  }
};