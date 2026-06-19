import { Router } from "express";
import { ProcurementController } from "./procurement.controller";

export const procurementRouter = Router();

// Overview & Activities
procurementRouter.get("/procurement/overview", ProcurementController.getOverview);
procurementRouter.get("/procurement/activities", ProcurementController.getActivities);
procurementRouter.get("/procurement/pipeline", ProcurementController.getPipeline);

// SPK
procurementRouter.get("/spk", ProcurementController.getSPKs);
procurementRouter.post("/spk", ProcurementController.createSPK);
procurementRouter.get("/spk/:spkId", ProcurementController.getSPKById);
procurementRouter.get("/spk/:spkId/items", ProcurementController.getSPKItems);
procurementRouter.get("/spk/:spkId/vendor-offers", ProcurementController.getSPKVendorOffers);

// Vendors
procurementRouter.get("/vendors", ProcurementController.getVendors);
procurementRouter.get("/vendors/:vendorId", ProcurementController.getVendorById);
procurementRouter.get("/vendors/:vendorId/offers", ProcurementController.getVendorOffers);

// Negotiations
procurementRouter.get("/negotiations", ProcurementController.getNegotiations);
procurementRouter.get("/negotiations/:negotiationId", ProcurementController.getNegotiationById);
procurementRouter.get("/negotiations/:negotiationId/notes", ProcurementController.getNegotiationNotes);
procurementRouter.get("/negotiations/:negotiationId/comparison", ProcurementController.getPriceComparison);

// PO Drafts
procurementRouter.get("/purchase-orders/draft", ProcurementController.getPODrafts);
