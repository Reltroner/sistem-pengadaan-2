"use client";

import { useState } from "react";
import Link from "next/link";

export default function SPKCreatePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">✓</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">SPK Successfully Drafted</h2>
        <p className="text-gray-500 mb-8">
          The SPK prototype has been &quot;saved&quot;. This is a frontend prototype only, no data was persisted to the backend.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/spk/list" className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
            Back to List
          </Link>
          <button onClick={() => setIsSubmitted(false)} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create SPK</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter details for the new SPK request.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">SPK Title</label>
              <input type="text" id="title" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="e.g. Pengadaan Server Infrastruktur 2024" />
            </div>

            <div>
              <label htmlFor="sourceType" className="block text-sm font-medium text-gray-700 mb-1">Source Type</label>
              <select id="sourceType" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
                <option value="CUSTOMER_REQUEST">Customer Request</option>
                <option value="SALES_OPPORTUNITY">Sales Opportunity</option>
                <option value="INTERNAL_PROJECT">Internal Project</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select id="priority" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
                <option value="NORMAL">NORMAL</option>
                <option value="LOW">LOW</option>
                <option value="HIGH">HIGH</option>
                <option value="URGENT">URGENT</option>
              </select>
            </div>

            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input type="text" id="customerName" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" />
            </div>

            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input type="text" id="projectName" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" />
            </div>

            <div>
              <label htmlFor="requestedBy" className="block text-sm font-medium text-gray-700 mb-1">Requested By</label>
              <input type="text" id="requestedBy" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" />
            </div>

            <div>
              <label htmlFor="expectedDeliveryDate" className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery Date</label>
              <input type="date" id="expectedDeliveryDate" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea id="notes" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"></textarea>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <Link href="/spk/list" className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancel
          </Link>
          <button type="submit" className="px-4 py-2 bg-blue-600 border border-transparent text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Save Draft
          </button>
        </div>
      </form>
    </div>
  );
}
