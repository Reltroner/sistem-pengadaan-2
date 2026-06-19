import { Request, Response, NextFunction } from "express";
import { ProcurementService } from "./procurement.service";
import { successResponse } from "../../shared/http";
import { Errors } from "../../shared/errors";

const service = new ProcurementService();

export class ProcurementController {
  
  static async getOverview(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getDashboardSummary();
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }

  static async getActivities(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getActivities();
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }

  static async getPipeline(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getPipeline();
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }

  // SPK
  static async getSPKs(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getSPKs();
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }

  static async getSPKById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getSPKById(req.params.spkId as string);
      if (!data) throw Errors.NOT_FOUND("SPK not found");
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }

  static async createSPK(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.createSPK(req.body);
      res.status(201).json(successResponse(data));
    } catch (err) { next(err); }
  }

  static async getSPKItems(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getProcurementItemsBySPKId(req.params.spkId as string);
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }

  static async getSPKVendorOffers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getVendorOffersBySPKId(req.params.spkId as string);
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }

  // Vendors
  static async getVendors(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getVendors();
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }

  static async getVendorById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getVendorById(req.params.vendorId as string);
      if (!data) throw Errors.NOT_FOUND("Vendor not found");
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }
  
  static async getVendorOffers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getVendorOffersByVendorId(req.params.vendorId as string);
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }

  // Negotiations
  static async getNegotiations(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getNegotiations();
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }

  static async getNegotiationById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getNegotiationById(req.params.negotiationId as string);
      if (!data) throw Errors.NOT_FOUND("Negotiation not found");
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }

  static async getNegotiationNotes(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getNegotiationNotes(req.params.negotiationId as string);
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }

  static async getPriceComparison(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getPriceComparison(req.params.negotiationId as string);
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }

  // PO Drafts
  static async getPODrafts(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getPODrafts();
      res.json(successResponse(data));
    } catch (err) { next(err); }
  }
}
