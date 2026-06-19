import { getDbConnection, isFallback } from "./connection";

async function seed() {
  console.log("Starting database seed...");
  try {
    const db = await getDbConnection();

    // Utility to run a query
    const run = async (sql: string, params: any[]) => {
      if (isFallback()) {
        await db.run(sql, params);
      } else {
        db.prepare(sql).run(params);
      }
    };

    // 1. SPK Records
    const spks = [
      ["spk-001", "SPK-2026-0001", "Pengadaan Laptop Tim Sales", "INTERNAL_PROJECT", "Internal Tradixa", null, "Sales Enablement Device Refresh", "Ayu Pratama", "user-sales-ayu", "Ayu (Sales)", "SALES", "2026-07-15", "NORMAL", "SPK_DRAFT", "SPK_INPUT", "DRAFT", "SALES", "Complete SPK draft and submit to negotiation", "Draft pengadaan laptop untuk refresh device sales.", "2026-06-10T03:00:00.000Z", "2026-06-10T03:00:00.000Z", null],
      ["spk-002", "SPK-2026-0002", "Pengadaan Server Development", "INTERNAL_PROJECT", "Internal Tradixa", null, "Development Infrastructure Upgrade", "Bima Santoso", "user-sales-bima", "Bima (Sales)", "SALES", "2026-07-30", "HIGH", "VENDOR_SELECTED", "NEGOTIATION", "IN_PROGRESS", "SALES", "Submit selected vendor to manager approval", "Butuh server untuk environment development dan staging.", "2026-06-11T02:00:00.000Z", "2026-06-12T05:30:00.000Z", "2026-06-11T04:00:00.000Z"],
      ["spk-003", "SPK-2026-0003", "Pengadaan Lisensi Software Finance", "SALES_OPPORTUNITY", "PT Pelanggan Strategis", "RFQ-FIN-2026-018", "Finance Operations System", "Ayu Pratama", "user-sales-ayu", "Ayu (Sales)", "SALES", "2026-08-05", "URGENT", "WAITING_MANAGER_APPROVAL", "MANAGER_APPROVAL", "WAITING_APPROVAL", "MANAGER", "Manager review required", "Customer membutuhkan lisensi software finance untuk operasional Q3.", "2026-06-13T02:00:00.000Z", "2026-06-13T08:00:00.000Z", "2026-06-13T03:15:00.000Z"]
    ];

    for (const s of spks) {
      await run(`INSERT INTO spk_records (
        id, spk_number, title, source_type, customer_name, customer_reference, project_name, requested_by,
        owner_id, owner_name, owner_role, expected_delivery_date, priority, status, workflow_stage, workflow_status,
        workflow_owner_role, workflow_next_action_label, notes, created_at, updated_at, submitted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, s);
    }

    // 2. Vendors
    const vendors = [
      ["vendor-001", "VND-001", "PT Nusantara Digital Solusi", "PT Nusantara Digital Solusi", "ACTIVE", "LOW", "Andra Wibowo", "andra@nusadigital.example", "+62-21-555-0101", JSON.stringify({line1: "Jl. Sudirman No. 10", city: "Jakarta", province: "DKI Jakarta", country: "Indonesia"}), "01.234.567.8-901.000", "Bank Mandiri", "1234567890", "PT Nusantara Digital Solusi", "2026-01-05T09:00:00.000Z", "2026-06-01T09:00:00.000Z"],
      ["vendor-002", "VND-002", "CV Pilar Teknologi", "CV Pilar Teknologi", "ACTIVE", "MEDIUM", "Sari Lestari", "sari@pilartech.example", "+62-22-555-0202", JSON.stringify({line1: "Jl. Asia Afrika No. 20", city: "Bandung", province: "Jawa Barat", country: "Indonesia"}), "02.234.567.8-901.000", null, null, null, "2026-01-10T09:00:00.000Z", "2026-06-01T09:00:00.000Z"],
      ["vendor-003", "VND-003", "PT Artha Infrastruktur Data", "PT Artha Infrastruktur Data", "ACTIVE", "LOW", "Gilang Mahendra", "gilang@artha-data.example", "+62-31-555-0303", JSON.stringify({line1: "Jl. Pemuda No. 30", city: "Surabaya", province: "Jawa Timur", country: "Indonesia"}), "03.234.567.8-901.000", null, null, null, "2026-01-15T09:00:00.000Z", "2026-06-01T09:00:00.000Z"],
      ["vendor-004", "VND-004", "PT Cakra Logistik Prima", "PT Cakra Logistik Prima", "UNDER_REVIEW", "MEDIUM", "Melati Anjani", "melati@cakralogistik.example", "+62-24-555-0404", JSON.stringify({line1: "Jl. Pandanaran No. 40", city: "Semarang", province: "Jawa Tengah", country: "Indonesia"}), null, null, null, null, "2026-02-01T09:00:00.000Z", "2026-06-01T09:00:00.000Z"],
      ["vendor-005", "VND-005", "CV Sumber Office Mandiri", "CV Sumber Office Mandiri", "ACTIVE", "HIGH", "Hendra Saputra", "hendra@sumberoffice.example", "+62-274-555-0505", JSON.stringify({line1: "Jl. Kaliurang No. 50", city: "Yogyakarta", province: "DI Yogyakarta", country: "Indonesia"}), null, null, null, null, "2026-02-10T09:00:00.000Z", "2026-06-01T09:00:00.000Z"]
    ];

    for (const v of vendors) {
      await run(`INSERT INTO vendors (
        id, vendor_code, name, legal_name, status, risk_level, contact_person, email, phone, address_json,
        tax_number, bank_name, bank_account_number, bank_account_name, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, v);
    }

    // 3. Procurement Items
    const items = [
      ["item-001-001", "spk-001", "Laptop Business Series", "Laptop untuk tim sales.", "HARDWARE", 10, "UNIT", 12000000, 120000000, "Intel i5/Ryzen 5, RAM 16GB, SSD 512GB."],
      ["item-002-001", "spk-002", "Rack Server", "Server fisik untuk development dan staging.", "HARDWARE", 2, "UNIT", 45000000, 90000000, "CPU 16 core, RAM 128GB, SSD enterprise."],
      ["item-002-002", "spk-002", "Network Switch Managed", "Switch managed untuk koneksi rack server.", "HARDWARE", 2, "UNIT", 8000000, 16000000, "24 port managed gigabit switch."],
      ["item-003-001", "spk-003", "Finance Software License", "Lisensi software finance untuk 40 user.", "SOFTWARE", 40, "YEAR", 2500000, 100000000, "Annual license, support included."]
    ];
    for (const i of items) {
      await run(`INSERT INTO procurement_items (id, spk_id, name, description, category, quantity, unit, estimated_unit_price, estimated_total_price, required_specification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, i);
    }

    // 4. Negotiations
    const negotiations = [
      ["negotiation-002", "spk-002", "VENDOR_SELECTED", "user-sales-bima", "Bima (Sales)", "SALES", "offer-002-002", "BEST_VALUE", "Vendor selected because total score is strongest.", 106000000, "2026-06-11T04:30:00.000Z", null, "2026-06-12T05:30:00.000Z", "2026-06-12T05:30:00.000Z"],
      ["negotiation-003", "spk-003", "SUBMITTED_TO_APPROVAL", "user-sales-ayu", "Ayu (Sales)", "SALES", "offer-003-001", "BEST_PRICE", "Vendor selected because it provides the lowest price.", 100000000, "2026-06-13T03:30:00.000Z", "2026-06-13T08:00:00.000Z", null, "2026-06-13T08:00:00.000Z"]
    ];
    for (const n of negotiations) {
      await run(`INSERT INTO negotiation_sessions (id, spk_id, status, opened_by_id, opened_by_name, opened_by_role, selected_vendor_offer_id, decision_reason, decision_note, target_budget, opened_at, submitted_at, closed_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, n);
    }

    // 5. Vendor Offers
    const offers = [
      ["offer-002-001", "spk-002", "vendor-002", "negotiation-002", "OFF-2026-001", "SUBMITTED", 102000000, 0, 11220000, 113220000, 21, "2026-07-11T00:00:00.000Z", "2026-06-11T08:00:00.000Z", "2026-06-11T08:00:00.000Z", "2026-06-11T08:00:00.000Z", "Harga sudah fix"],
      ["offer-002-002", "spk-002", "vendor-003", "negotiation-002", "OFF-2026-002", "SELECTED", 98200000, 2200000, 10560000, 106560000, 14, "2026-07-12T00:00:00.000Z", "2026-06-12T09:00:00.000Z", "2026-06-11T09:00:00.000Z", "2026-06-12T05:30:00.000Z", "Discount for immediate PO"]
    ];
    for (const o of offers) {
      await run(`INSERT INTO vendor_offers (id, spk_id, vendor_id, negotiation_id, offer_number, status, subtotal, discount_amount, tax_amount, grand_total, lead_time_days, valid_until, submitted_at, created_at, updated_at, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, o);
    }

    // 6. PO Drafts
    const poDrafts = [
      ["po-draft-002", "POD-2026-0002", "spk-002", "negotiation-002", "vendor-003", "offer-002-002", 98200000, 2200000, 10560000, 106560000, "DRAFT", "user-finance-nadia", "Nadia (Finance)", "FINANCE", "2026-06-12T06:00:00.000Z", null]
    ];
    for (const p of poDrafts) {
      await run(`INSERT INTO po_drafts (id, po_draft_number, spk_id, negotiation_id, selected_vendor_id, selected_vendor_offer_id, subtotal, discount_amount, tax_amount, grand_total, status, generated_by_id, generated_by_name, generated_by_role, created_at, handed_off_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, p);
    }

    console.log("Database seed completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
