import { getDbConnection, isFallback } from "../../db/connection";

// Helper to convert DB rows to Frontend format
function mapSpkRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    spkNumber: row.spk_number,
    title: row.title,
    sourceType: row.source_type,
    customerName: row.customer_name,
    customerReference: row.customer_reference,
    projectName: row.project_name,
    requestedBy: row.requested_by,
    owner: {
      id: row.owner_id,
      name: row.owner_name,
      role: row.owner_role,
    },
    expectedDeliveryDate: row.expected_delivery_date,
    priority: row.priority,
    status: row.status,
    workflow: {
      stage: row.workflow_stage,
      status: row.workflow_status,
      ownerRole: row.workflow_owner_role,
      nextActionLabel: row.workflow_next_action_label,
      updatedAt: row.updated_at,
    },
    documents: [],
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    submittedAt: row.submitted_at,
  };
}

function mapVendorRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    vendorCode: row.vendor_code,
    name: row.name,
    legalName: row.legal_name,
    status: row.status,
    riskLevel: row.risk_level,
    contactPerson: row.contact_person,
    email: row.email,
    phone: row.phone,
    address: row.address_json ? JSON.parse(row.address_json) : undefined,
    taxNumber: row.tax_number,
    bankName: row.bank_name,
    bankAccountNumber: row.bank_account_number,
    bankAccountName: row.bank_account_name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapProcurementItemRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    spkId: row.spk_id,
    name: row.name,
    description: row.description,
    category: row.category,
    quantity: row.quantity,
    unit: row.unit,
    estimatedUnitPrice: row.estimated_unit_price,
    estimatedTotalPrice: row.estimated_total_price,
    requiredSpecification: row.required_specification,
  };
}

function mapNegotiationRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    spkId: row.spk_id,
    status: row.status,
    openedBy: {
      id: row.opened_by_id,
      name: row.opened_by_name,
      role: row.opened_by_role,
    },
    selectedVendorOfferId: row.selected_vendor_offer_id,
    decisionReason: row.decision_reason,
    decisionNote: row.decision_note,
    targetBudget: row.target_budget,
    openedAt: row.opened_at,
    submittedAt: row.submitted_at,
    closedAt: row.closed_at,
    updatedAt: row.updated_at,
  };
}

function mapNegotiationNoteRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    negotiationId: row.negotiation_id,
    spkId: row.spk_id,
    author: {
      id: row.author_id,
      name: row.author_name,
      role: row.author_role,
    },
    visibility: row.visibility,
    content: row.content,
    createdAt: row.created_at,
  };
}

function mapVendorOfferRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    spkId: row.spk_id,
    vendorId: row.vendor_id,
    negotiationId: row.negotiation_id,
    offerNumber: row.offer_number,
    status: row.status,
    subtotal: row.subtotal,
    discountAmount: row.discount_amount,
    taxAmount: row.tax_amount,
    grandTotal: row.grand_total,
    leadTimeDays: row.lead_time_days,
    validUntil: row.valid_until,
    submittedAt: row.submitted_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    notes: row.notes,
  };
}

function mapPoDraftRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    poDraftNumber: row.po_draft_number,
    spkId: row.spk_id,
    negotiationId: row.negotiation_id,
    selectedVendorId: row.selected_vendor_id,
    selectedVendorOfferId: row.selected_vendor_offer_id,
    procurementItems: [], // will be populated
    subtotal: row.subtotal,
    discountAmount: row.discount_amount,
    taxAmount: row.tax_amount,
    grandTotal: row.grand_total,
    status: row.status,
    generatedBy: {
      id: row.generated_by_id,
      name: row.generated_by_name,
      role: row.generated_by_role,
    },
    documents: [],
    createdAt: row.created_at,
    handedOffAt: row.handed_off_at,
  };
}

function mapActivityRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    spkId: row.spk_id,
    type: row.type,
    title: row.title,
    description: row.description,
    actor: {
      id: row.actor_id,
      name: row.actor_name,
      role: row.actor_role,
    },
    createdAt: row.created_at,
  };
}

export class ProcurementRepository {
  private async query(sql: string, params: any[] = []) {
    const db = await getDbConnection();
    if (isFallback()) {
      return await db.all(sql, params);
    } else {
      return db.prepare(sql).all(params);
    }
  }

  private async queryOne(sql: string, params: any[] = []) {
    const db = await getDbConnection();
    if (isFallback()) {
      return await db.get(sql, params);
    } else {
      return db.prepare(sql).get(params);
    }
  }

  // SPK
  async getSPKs() {
    const rows = await this.query("SELECT * FROM spk_records ORDER BY created_at DESC");
    return rows.map(mapSpkRow);
  }

  async getSPKById(id: string) {
    const row = await this.queryOne("SELECT * FROM spk_records WHERE id = ?", [id]);
    return mapSpkRow(row);
  }

  async createSPK(data: any) {
    const db = await getDbConnection();
    
    const sql = `
      INSERT INTO spk_records (
        id, spk_number, title, source_type, customer_name, customer_reference, project_name, requested_by,
        owner_id, owner_name, owner_role, expected_delivery_date, priority, status,
        workflow_stage, workflow_status, workflow_owner_role, workflow_next_action_label, notes,
        created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?
      )
    `;
    
    const params = [
      data.id, data.spkNumber, data.title, data.sourceType, data.customerName, data.customerReference || null, data.projectName, data.requestedBy,
      data.owner.id, data.owner.name, data.owner.role, data.expectedDeliveryDate || null, data.priority, data.status,
      data.workflow.stage, data.workflow.status, data.workflow.ownerRole, data.workflow.nextActionLabel, data.notes || null,
      data.createdAt, data.updatedAt
    ];

    if (isFallback()) {
      await db.run(sql, params);
    } else {
      db.prepare(sql).run(params);
    }

    return await this.getSPKById(data.id);
  }

  // Activities
  async getActivities() {
    const rows = await this.query("SELECT * FROM procurement_activities ORDER BY created_at DESC");
    return rows.map(mapActivityRow);
  }

  // Vendors
  async getVendors() {
    const rows = await this.query("SELECT * FROM vendors ORDER BY name ASC");
    return rows.map(mapVendorRow);
  }

  async getVendorById(id: string) {
    const row = await this.queryOne("SELECT * FROM vendors WHERE id = ?", [id]);
    return mapVendorRow(row);
  }

  // Items
  async getProcurementItemsBySPKId(spkId: string) {
    const rows = await this.query("SELECT * FROM procurement_items WHERE spk_id = ?", [spkId]);
    return rows.map(mapProcurementItemRow);
  }

  // Negotiations
  async getNegotiations() {
    const rows = await this.query("SELECT * FROM negotiation_sessions ORDER BY opened_at DESC");
    return rows.map(mapNegotiationRow);
  }

  async getNegotiationById(id: string) {
    const row = await this.queryOne("SELECT * FROM negotiation_sessions WHERE id = ?", [id]);
    return mapNegotiationRow(row);
  }

  async getNegotiationNotes(negotiationId: string) {
    const rows = await this.query("SELECT * FROM negotiation_notes WHERE negotiation_id = ? ORDER BY created_at ASC", [negotiationId]);
    return rows.map(mapNegotiationNoteRow);
  }

  async getPriceComparison(negotiationId: string) {
    const rows = await this.query("SELECT * FROM price_comparison_results WHERE negotiation_id = ? ORDER BY rank ASC", [negotiationId]);
    return rows.map((r: any) => ({
      id: r.id,
      negotiationId: r.negotiation_id,
      spkId: r.spk_id,
      vendorOfferId: r.vendor_offer_id,
      vendor: { id: r.vendor_id, name: r.vendor_name },
      grandTotal: r.grand_total,
      leadTimeDays: r.lead_time_days,
      riskLevel: r.risk_level,
      priceScore: r.price_score,
      deliveryScore: r.delivery_score,
      riskScore: r.risk_score,
      complianceScore: r.compliance_score,
      totalScore: r.total_score,
      rank: r.rank,
      recommendedReason: r.recommended_reason,
      isRecommended: r.is_recommended === 1,
    }));
  }

  // Offers
  async getVendorOffersBySPKId(spkId: string) {
    const rows = await this.query("SELECT * FROM vendor_offers WHERE spk_id = ?", [spkId]);
    return rows.map(mapVendorOfferRow);
  }
  
  async getVendorOffersByVendorId(vendorId: string) {
    const rows = await this.query("SELECT * FROM vendor_offers WHERE vendor_id = ?", [vendorId]);
    return rows.map(mapVendorOfferRow);
  }

  // PO Drafts
  async getPODrafts() {
    const drafts = await this.query("SELECT * FROM po_drafts ORDER BY created_at DESC");
    const mapped = drafts.map(mapPoDraftRow);
    // Populate items
    for (const d of mapped) {
      d.procurementItems = await this.getProcurementItemsBySPKId(d.spkId);
    }
    return mapped;
  }
}
