import type {
  IDRAmount,
  ISODateString,
  ISODateTimeString,
  ProcurementDocumentRef,
  ProcurementId,
} from "./procurement-common.types";

export type VendorOfferStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "NEGOTIATED"
  | "SELECTED"
  | "REJECTED"
  | "EXPIRED";

export type VendorOfferItem = {
  id: ProcurementId;
  procurementItemId: ProcurementId;
  itemName: string;
  quantity: number;
  unitPrice: IDRAmount;
  totalPrice: IDRAmount;
  notes?: string;
};

export type VendorOffer = {
  id: ProcurementId;
  spkId: ProcurementId;
  vendorId: ProcurementId;
  negotiationId?: ProcurementId;
  offerNumber: string;
  status: VendorOfferStatus;
  offeredItems: VendorOfferItem[];
  subtotal: IDRAmount;
  discountAmount: IDRAmount;
  taxAmount: IDRAmount;
  grandTotal: IDRAmount;
  leadTimeDays: number;
  validUntil?: ISODateString;
  documents: ProcurementDocumentRef[];
  submittedAt?: ISODateTimeString;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
  notes?: string;
};

export type CreateVendorOfferPayload = {
  spkId: ProcurementId;
  vendorId: ProcurementId;
  offerNumber: string;
  offeredItems: VendorOfferItem[];
  discountAmount?: IDRAmount;
  taxAmount?: IDRAmount;
  leadTimeDays: number;
  validUntil?: ISODateString;
  notes?: string;
};
