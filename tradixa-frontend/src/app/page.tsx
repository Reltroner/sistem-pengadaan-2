export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/40">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Tradixa Frontend Prototype
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            e-Procurement & Sales Management System
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
            Workflow-driven frontend prototype for SPK input, negotiation,
            approval, PO vendor, delivery, BAST, invoice, and AR/SP2D tracking.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="font-semibold text-white">Current Phase</h2>
            <p className="mt-2 text-sm text-slate-400">
              Phase 1 Architecture Snapshot
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="font-semibold text-white">Current Module</h2>
            <p className="mt-2 text-sm text-slate-400">
              M1 Procurement & Negotiation Management
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="font-semibold text-white">Architecture Mode</h2>
            <p className="mt-2 text-sm text-slate-400">
              Workflow-first, not CRUD-first
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
