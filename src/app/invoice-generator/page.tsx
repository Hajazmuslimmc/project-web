'use client'

import { useState } from 'react';

export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState({
    number: '001',
    date: new Date().toISOString().split('T')[0],
    from: { name: '', address: '', email: '' },
    to: { name: '', address: '', email: '' },
    items: [{ description: '', quantity: 1, rate: 0 }]
  });

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: '', quantity: 1, rate: 0 }]
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoice({ ...invoice, items: newItems });
  };

  const total = invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);

  const generatePDF = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Invoice #${invoice.number}</title></head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>Invoice #${invoice.number}</h1>
            <p>Date: ${invoice.date}</p>
            <div style="margin: 20px 0;">
              <h3>From:</h3>
              <p>${invoice.from.name}<br>${invoice.from.address}<br>${invoice.from.email}</p>
            </div>
            <div style="margin: 20px 0;">
              <h3>To:</h3>
              <p>${invoice.to.name}<br>${invoice.to.address}<br>${invoice.to.email}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background: #f0f0f0;">
                <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Qty</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Rate</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Amount</th>
              </tr>
              ${invoice.items.map(item => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.description}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">$${item.rate}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">$${item.quantity * item.rate}</td>
                </tr>
              `).join('')}
            </table>
            <h3>Total: $${total.toFixed(2)}</h3>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          📊 Invoice Generator
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Invoice Details</h3>
              <input
                type="text"
                placeholder="Invoice Number"
                value={invoice.number}
                onChange={(e) => setInvoice({...invoice, number: e.target.value})}
                className="w-full p-3 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="date"
                value={invoice.date}
                onChange={(e) => setInvoice({...invoice, date: e.target.value})}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">From</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={invoice.from.name}
                onChange={(e) => setInvoice({...invoice, from: {...invoice.from, name: e.target.value}})}
                className="w-full p-3 border rounded-lg mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="text"
                placeholder="Your Address"
                value={invoice.from.address}
                onChange={(e) => setInvoice({...invoice, from: {...invoice.from, address: e.target.value}})}
                className="w-full p-3 border rounded-lg mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={invoice.from.email}
                onChange={(e) => setInvoice({...invoice, from: {...invoice.from, email: e.target.value}})}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Bill To</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Client Name"
                value={invoice.to.name}
                onChange={(e) => setInvoice({...invoice, to: {...invoice.to, name: e.target.value}})}
                className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="text"
                placeholder="Client Address"
                value={invoice.to.address}
                onChange={(e) => setInvoice({...invoice, to: {...invoice.to, address: e.target.value}})}
                className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="email"
                placeholder="Client Email"
                value={invoice.to.email}
                onChange={(e) => setInvoice({...invoice, to: {...invoice.to, email: e.target.value}})}
                className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Items</h3>
            {invoice.items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                  className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                  type="number"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                  className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  ${(item.quantity * item.rate).toFixed(2)}
                </div>
              </div>
            ))}
            
            <button
              onClick={addItem}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4"
            >
              Add Item
            </button>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Total: ${total.toFixed(2)}
            </h3>
            <button
              onClick={generatePDF}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}