-- SPK Records
CREATE TABLE IF NOT EXISTS spk_records (
  id TEXT PRIMARY KEY,
  spk_number TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  source_type TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_reference TEXT NULL,
  project_name TEXT NOT NULL,
  requested_by TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  owner_role TEXT NOT NULL,
  expected_delivery_date TEXT NULL,
  priority TEXT NOT NULL,
  status TEXT NOT NULL,
  workflow_stage TEXT NOT NULL,
  workflow_status TEXT NOT NULL,
  workflow_owner_role TEXT NOT NULL,
  workflow_next_action_label TEXT NOT NULL,
  notes TEXT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  submitted_at TEXT NULL
);

-- Procurement Items
CREATE TABLE IF NOT EXISTS procurement_items (
  id TEXT PRIMARY KEY,
  spk_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NULL,
  category TEXT NOT NULL,
  quantity REAL NOT NULL,
  unit TEXT NOT NULL,
  estimated_unit_price REAL NULL,
  estimated_total_price REAL NULL,
  required_specification TEXT NULL
);

-- Vendors
CREATE TABLE IF NOT EXISTS vendors (
  id TEXT PRIMARY KEY,
  vendor_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  legal_name TEXT NULL,
  status TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NULL,
  phone TEXT NULL,
  address_json TEXT NULL,
  tax_number TEXT NULL,
  bank_name TEXT NULL,
  bank_account_number TEXT NULL,
  bank_account_name TEXT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Negotiation Sessions
CREATE TABLE IF NOT EXISTS negotiation_sessions (
  id TEXT PRIMARY KEY,
  spk_id TEXT NOT NULL,
  status TEXT NOT NULL,
  opened_by_id TEXT NOT NULL,
  opened_by_name TEXT NOT NULL,
  opened_by_role TEXT NOT NULL,
  selected_vendor_offer_id TEXT NULL,
  decision_reason TEXT NULL,
  decision_note TEXT NULL,
  target_budget REAL NULL,
  opened_at TEXT NOT NULL,
  submitted_at TEXT NULL,
  closed_at TEXT NULL,
  updated_at TEXT NOT NULL
);

-- Negotiation Notes
CREATE TABLE IF NOT EXISTS negotiation_notes (
  id TEXT PRIMARY KEY,
  negotiation_id TEXT NOT NULL,
  spk_id TEXT NOT NULL,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  visibility TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Vendor Offers
CREATE TABLE IF NOT EXISTS vendor_offers (
  id TEXT PRIMARY KEY,
  spk_id TEXT NOT NULL,
  vendor_id TEXT NOT NULL,
  negotiation_id TEXT NULL,
  offer_number TEXT NOT NULL,
  status TEXT NOT NULL,
  subtotal REAL NOT NULL,
  discount_amount REAL NOT NULL,
  tax_amount REAL NOT NULL,
  grand_total REAL NOT NULL,
  lead_time_days INTEGER NOT NULL,
  valid_until TEXT NULL,
  submitted_at TEXT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  notes TEXT NULL
);

-- Vendor Offer Items
CREATE TABLE IF NOT EXISTS vendor_offer_items (
  id TEXT PRIMARY KEY,
  vendor_offer_id TEXT NOT NULL,
  procurement_item_id TEXT NOT NULL,
  item_name TEXT NOT NULL,
  quantity REAL NOT NULL,
  unit_price REAL NOT NULL,
  total_price REAL NOT NULL,
  notes TEXT NULL
);

-- Price Comparison Results
CREATE TABLE IF NOT EXISTS price_comparison_results (
  id TEXT PRIMARY KEY,
  negotiation_id TEXT NOT NULL,
  spk_id TEXT NOT NULL,
  vendor_offer_id TEXT NOT NULL,
  vendor_id TEXT NOT NULL,
  vendor_name TEXT NOT NULL,
  grand_total REAL NOT NULL,
  lead_time_days INTEGER NOT NULL,
  risk_level TEXT NOT NULL,
  price_score REAL NOT NULL,
  delivery_score REAL NOT NULL,
  risk_score REAL NOT NULL,
  compliance_score REAL NOT NULL,
  total_score REAL NOT NULL,
  rank INTEGER NOT NULL,
  recommended_reason TEXT NULL,
  is_recommended INTEGER NOT NULL
);

-- PO Drafts
CREATE TABLE IF NOT EXISTS po_drafts (
  id TEXT PRIMARY KEY,
  po_draft_number TEXT NOT NULL UNIQUE,
  spk_id TEXT NOT NULL,
  negotiation_id TEXT NOT NULL,
  selected_vendor_id TEXT NOT NULL,
  selected_vendor_offer_id TEXT NOT NULL,
  subtotal REAL NOT NULL,
  discount_amount REAL NOT NULL,
  tax_amount REAL NOT NULL,
  grand_total REAL NOT NULL,
  status TEXT NOT NULL,
  generated_by_id TEXT NOT NULL,
  generated_by_name TEXT NOT NULL,
  generated_by_role TEXT NOT NULL,
  created_at TEXT NOT NULL,
  handed_off_at TEXT NULL
);

-- Procurement Activities
CREATE TABLE IF NOT EXISTS procurement_activities (
  id TEXT PRIMARY KEY,
  spk_id TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  actor_name TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Procurement Audit Logs
CREATE TABLE IF NOT EXISTS procurement_audit_logs (
  id TEXT PRIMARY KEY,
  spk_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  actor_name TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  before_json TEXT NULL,
  after_json TEXT NULL,
  created_at TEXT NOT NULL
);

-- Procurement Notifications
CREATE TABLE IF NOT EXISTS procurement_notifications (
  id TEXT PRIMARY KEY,
  spk_id TEXT NOT NULL,
  recipient_role TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL,
  read_at TEXT NULL,
  created_at TEXT NOT NULL
);
