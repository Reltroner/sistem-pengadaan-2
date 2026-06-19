import { ProcurementRepository } from "./procurement.repository";

export class ProcurementService {
  private repo = new ProcurementRepository();

  async getDashboardSummary() {
    const spks = await this.repo.getSPKs();
    const activities = await this.repo.getActivities();
    
    return {
      totalSpk: spks.length,
      draftSpk: spks.filter((s: any) => s.status === "SPK_DRAFT").length,
      submittedSpk: spks.filter((s: any) => s.status !== "SPK_DRAFT").length,
      inNegotiation: spks.filter((s: any) => s.workflow.stage === "NEGOTIATION").length,
      waitingManagerApproval: spks.filter((s: any) => s.workflow.stage === "MANAGER_APPROVAL").length,
      poDraftCreated: spks.filter((s: any) => s.workflow.stage === "PO_DRAFTING").length,
      highValueProcurement: 0,
      recentActivities: activities.slice(0, 5),
    };
  }

  async getActivities() {
    return this.repo.getActivities();
  }

  async getPipeline() {
    const spks = await this.repo.getSPKs();
    return [
      {
        stageId: "SPK_INPUT",
        title: "SPK Input",
        order: 1,
        items: spks.filter((s: any) => s.workflow.stage === "SPK_INPUT")
      },
      {
        stageId: "NEGOTIATION",
        title: "Vendor Negotiation",
        order: 2,
        items: spks.filter((s: any) => s.workflow.stage === "NEGOTIATION")
      },
      {
        stageId: "MANAGER_APPROVAL",
        title: "Manager Approval",
        order: 3,
        items: spks.filter((s: any) => s.workflow.stage === "MANAGER_APPROVAL")
      },
      {
        stageId: "PO_DRAFTING",
        title: "PO Drafting",
        order: 4,
        items: spks.filter((s: any) => s.workflow.stage === "PO_DRAFTING")
      }
    ];
  }

  async getSPKs() {
    return this.repo.getSPKs();
  }

  async getSPKById(id: string) {
    return this.repo.getSPKById(id);
  }

  async createSPK(payload: any) {
    const newSpk = {
      id: `spk-${Date.now()}`,
      spkNumber: `SPK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      title: payload.title,
      sourceType: payload.sourceType,
      customerName: payload.customerName,
      customerReference: payload.customerReference || null,
      projectName: payload.projectName,
      requestedBy: payload.requestedBy,
      owner: {
        id: "usr-sales-01",
        name: "Ayu (Sales)",
        role: "SALES_REPRESENTATIVE",
      },
      expectedDeliveryDate: payload.expectedDeliveryDate || null,
      priority: payload.priority,
      status: "SPK_DRAFT",
      workflow: {
        stage: "SPK_INPUT",
        status: "SPK_DRAFT",
        ownerRole: "SALES_REPRESENTATIVE",
        nextActionLabel: "Submit SPK",
      },
      notes: payload.notes || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return this.repo.createSPK(newSpk);
  }

  async getProcurementItemsBySPKId(id: string) {
    return this.repo.getProcurementItemsBySPKId(id);
  }

  async getVendorOffersBySPKId(id: string) {
    return this.repo.getVendorOffersBySPKId(id);
  }

  async getVendors() {
    return this.repo.getVendors();
  }

  async getVendorById(id: string) {
    return this.repo.getVendorById(id);
  }

  async getVendorOffersByVendorId(id: string) {
    return this.repo.getVendorOffersByVendorId(id);
  }

  async getNegotiations() {
    return this.repo.getNegotiations();
  }

  async getNegotiationById(id: string) {
    return this.repo.getNegotiationById(id);
  }

  async getNegotiationNotes(id: string) {
    return this.repo.getNegotiationNotes(id);
  }

  async getPriceComparison(id: string) {
    return this.repo.getPriceComparison(id);
  }

  async getPODrafts() {
    return this.repo.getPODrafts();
  }
}
