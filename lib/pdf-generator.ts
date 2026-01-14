// lib/pdf-generator.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Sale } from '@/lib/generated/prisma';
import { formatCurrency, formatDate } from '@/lib/utils';

export interface InvoiceData {
  sale: Sale & {
    store: {
      name: string;
      address?: string;
      city?: string;
      primaryPhoneNumber?: string;
    };
  };
  settings?: {
    exchangeRateUSDtoSYP: number;
  };
}

export class PDFGenerator {
  private doc: jsPDF;

  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
  }

  async generateInvoice(data: InvoiceData): Promise<void> {
    const { sale, settings } = data;
    const pageWidth = this.doc.internal.pageSize.getWidth();
    const pageHeight = this.doc.internal.pageSize.getHeight();
    
    // Set font sizes
    const titleFont = 20;
    const headerFont = 12;
    const bodyFont = 10;
    const smallFont = 8;
    
    let yPosition = 20;

    // Title
    this.doc.setFontSize(titleFont);
    this.doc.setFont(undefined, 'bold');
    this.doc.text('SALE INVOICE', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Store Information
    this.doc.setFontSize(headerFont);
    this.doc.setFont(undefined, 'bold');
    this.doc.text('Store Information:', 20, yPosition);
    yPosition += 8;

    this.doc.setFontSize(bodyFont);
    this.doc.setFont(undefined, 'normal');
    this.doc.text(`${sale.store.name}`, 20, yPosition);
    yPosition += 6;
    
    if (sale.store.address) {
      this.doc.text(`Address: ${sale.store.address}`, 20, yPosition);
      yPosition += 6;
    }
    
    if (sale.store.city) {
      this.doc.text(`City: ${sale.store.city}`, 20, yPosition);
      yPosition += 6;
    }
    
    if (sale.store.primaryPhoneNumber) {
      this.doc.text(`Phone: ${sale.store.primaryPhoneNumber}`, 20, yPosition);
      yPosition += 6;
    }

    yPosition += 10;

    // Invoice Details (Right Column)
    let rightColumnY = 45;
    this.doc.setFontSize(headerFont);
    this.doc.setFont(undefined, 'bold');
    this.doc.text('Invoice Details:', pageWidth - 60, rightColumnY);
    rightColumnY += 8;

    this.doc.setFontSize(bodyFont);
    this.doc.setFont(undefined, 'normal');
    this.doc.text(`Invoice #: ${sale.invoiceNumber}`, pageWidth - 60, rightColumnY);
    rightColumnY += 6;
    this.doc.text(`Date: ${formatDate(sale.createdAt, 'en')}`, pageWidth - 60, rightColumnY);
    rightColumnY += 6;
    this.doc.text(`Payment: ${this.getPaymentTypeLabel(sale.paymentType)}`, pageWidth - 60, rightColumnY);

    // Customer Information
    yPosition += 10;
    this.doc.setFontSize(headerFont);
    this.doc.setFont(undefined, 'bold');
    this.doc.text('Customer Information:', 20, yPosition);
    yPosition += 8;

    this.doc.setFontSize(bodyFont);
    this.doc.setFont(undefined, 'normal');
    this.doc.text(`Name: ${sale.customerName || 'Walk-in Customer'}`, 20, yPosition);
    yPosition += 6;
    
    if (sale.customerPhone) {
      this.doc.text(`Phone: ${sale.customerPhone}`, 20, yPosition);
      yPosition += 6;
    }

    yPosition += 10;

    // Sale Details Table
    this.doc.setFontSize(headerFont);
    this.doc.setFont(undefined, 'bold');
    this.doc.text('Sale Details:', 20, yPosition);
    yPosition += 8;

    // Table Headers
    const tableTop = yPosition;
    const tableHeaders = ['Gold Type', 'Weight (g)', 'Price/g', 'Total'];
    const columnWidths = [40, 40, 40, 40];
    const tableWidth = columnWidths.reduce((a, b) => a + b, 0);

    this.doc.setFontSize(bodyFont);
    this.doc.setFont(undefined, 'bold');
    
    tableHeaders.forEach((header, index) => {
      const x = 20 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
      this.doc.text(header, x, tableTop);
    });

    // Table Line
    yPosition += 5;
    this.doc.line(20, yPosition, 20 + tableWidth, yPosition);
    yPosition += 8;

    // Table Row
    this.doc.setFont(undefined, 'normal');
    const goldTypeLabel = this.getGoldTypeLabel(sale.goldType);
    const weight = sale.weight.toFixed(2);
    const pricePerGram = sale.currency === 'USD' ? sale.pricePerGramUSD : sale.pricePerGramSYP;
    const total = sale.currency === 'USD' ? sale.totalUSD : sale.totalSYP;
    const pricePerGramText = pricePerGram.toFixed(2);
    const totalText = total.toFixed(2);

    this.doc.text(goldTypeLabel, 20, yPosition);
    this.doc.text(weight, 20 + columnWidths[0], yPosition);
    this.doc.text(`${pricePerGramText} ${sale.currency}`, 20 + columnWidths[0] + columnWidths[1], yPosition);
    this.doc.text(`${totalText} ${sale.currency}`, 20 + columnWidths[0] + columnWidths[1] + columnWidths[2], yPosition);

    // Table Bottom Line
    yPosition += 8;
    this.doc.line(20, yPosition, 20 + tableWidth, yPosition);
    yPosition += 15;

    // Payment Summary
    this.doc.setFontSize(headerFont);
    this.doc.setFont(undefined, 'bold');
    this.doc.text('Payment Summary:', 20, yPosition);
    yPosition += 8;

    this.doc.setFontSize(bodyFont);
    this.doc.setFont(undefined, 'normal');
    this.doc.text(`Amount Paid: ${formatCurrency(sale.amountPaid, sale.currency, 'en')}`, 20, yPosition);
    yPosition += 6;

    const currentTotal = sale.currency === 'USD' ? sale.totalUSD : sale.totalSYP;
    const difference = sale.amountPaid - currentTotal;
    
    if (Math.abs(difference) > 0.01) {
      const diffText = difference > 0 ? 'Change Due:' : 'Remaining Balance:';
      const diffAmount = Math.abs(difference).toFixed(2);
      this.doc.text(`${diffText} ${formatCurrency(parseFloat(diffAmount), sale.currency, 'en')}`, 20, yPosition);
      yPosition += 6;
    } else {
      this.doc.text('Payment: Full', 20, yPosition);
      yPosition += 6;
    }

    // Currency Exchange (if USD)
    if (sale.currency === 'USD' && settings?.exchangeRateUSDtoSYP) {
      yPosition += 10;
      this.doc.setFontSize(headerFont);
      this.doc.setFont(undefined, 'bold');
      this.doc.text('Currency Exchange:', 20, yPosition);
      yPosition += 8;

      this.doc.setFontSize(bodyFont);
      this.doc.setFont(undefined, 'normal');
      const sypEquivalent = sale.totalUSD * settings.exchangeRateUSDtoSYP;
      this.doc.text(`Equivalent in SYP: ${formatCurrency(sypEquivalent, 'SYP', 'en')}`, 20, yPosition);
      this.doc.text(`Exchange Rate: 1 USD = ${settings.exchangeRateUSDtoSYP.toFixed(2)} SYP`, 20, yPosition + 6);
    }

    // Description (if exists)
    if (sale.description) {
      yPosition += 15;
      this.doc.setFontSize(headerFont);
      this.doc.setFont(undefined, 'bold');
      this.doc.text('Notes:', 20, yPosition);
      yPosition += 8;

      this.doc.setFontSize(bodyFont);
      this.doc.setFont(undefined, 'normal');
      const splitDescription = this.doc.splitTextToSize(sale.description, pageWidth - 40);
      this.doc.text(splitDescription.join('\n'), 20, yPosition);
    }

    // Footer
    const footerY = pageHeight - 20;
    this.doc.setFontSize(smallFont);
    this.doc.setFont(undefined, 'italic');
    this.doc.text('Thank you for your business!', pageWidth / 2, footerY, { align: 'center' });
    this.doc.text(`Generated on ${formatDate(new Date(), 'en')}`, pageWidth / 2, footerY + 5, { align: 'center' });
  }

  private getGoldTypeLabel(goldType: string): string {
    const labels = {
      'GOLD_14': '14K Gold',
      'GOLD_18': '18K Gold',
      'GOLD_21': '21K Gold',
      'GOLD_24': '24K Gold'
    };
    return labels[goldType as keyof typeof labels] || goldType;
  }

  private getPaymentTypeLabel(paymentType: string): string {
    const labels = {
      'CASH': 'Cash',
      'TRANSFER': 'Bank Transfer',
      'OTHER': 'Other'
    };
    return labels[paymentType as keyof typeof labels] || paymentType;
  }

  async savePDF(filename?: string): Promise<void> {
    const defaultFilename = `invoice-${new Date().toISOString().split('T')[0]}.pdf`;
    this.doc.save(filename || defaultFilename);
  }

  async printPDF(): Promise<void> {
    // Create a blob and open in new window for printing
    const pdfBlob = this.doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const printWindow = window.open(pdfUrl, '_blank');
    
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
        // Clean up after printing
        setTimeout(() => {
          printWindow.close();
          URL.revokeObjectURL(pdfUrl);
        }, 100);
      };
    }
  }

  getPDFData(): string {
    return this.doc.output('datauristring');
  }
}

// Utility function for generating invoice
export const generateInvoicePDF = async (data: InvoiceData): Promise<{ dataUrl: string; filename: string }> => {
  const generator = new PDFGenerator();
  await generator.generateInvoice(data);
  
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `invoice-${data.sale.invoiceNumber}-${timestamp}.pdf`;
  const dataUrl = generator.getPDFData();
  
  return { dataUrl, filename };
};

// Utility function for printing invoice directly
export const printInvoicePDF = async (data: InvoiceData): Promise<void> => {
  const generator = new PDFGenerator();
  await generator.generateInvoice(data);
  await generator.printPDF();
};