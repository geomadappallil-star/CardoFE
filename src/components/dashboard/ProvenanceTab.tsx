import React, { useEffect, useState } from 'react';
import { fetchSources, fetchQuality } from '../../api/client.js';
import { ShieldCheck, Database, FileCheck, CheckCircle, AlertTriangle } from 'lucide-react';

export const ProvenanceTab: React.FC = () => {
  const [sources, setSources] = useState<any[]>([]);
  const [quality, setQuality] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchSources(), fetchQuality()])
      .then(([srcRes, qRes]) => {
        setSources(srcRes.data);
        setQuality(qRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Trust Principle Charter */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-800/40">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-600 text-white shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">The Cardo Board Trust Principle</h3>
            <p className="text-xs text-emerald-300/80">Every dashboard figure must be verifiable, transparent, and reproducible</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 text-xs text-slate-300">
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="font-semibold text-emerald-400 block mb-1">1. Never Fabricate History</span>
            <p className="text-slate-400">All data in Cardo Board is backed by official commodity boards, climate reanalysis, or statistical ministries. No fake data for demos.</p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="font-semibold text-emerald-400 block mb-1">2. Explicit Missingness</span>
            <p className="text-slate-400">Missing observations are explicitly tracked and never silently replaced with zero or interpolated without audit tags.</p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="font-semibold text-emerald-400 block mb-1">3. Source-Specific Signatures</span>
            <p className="text-slate-400">The Python ETL verifies column signatures and stops ingestion immediately if upstream schemas change to prevent silent corruption.</p>
          </div>
        </div>
      </div>

      {/* Verified Primary Data Sources Table */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Registered Primary Data Sources</h3>
            <p className="text-xs text-slate-400">Authoritative origins, licenses, and methodology references</p>
          </div>
          <span className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-800 text-emerald-400 border border-slate-700">
            {sources.length} Active Feeds
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-medium">Organization</th>
                <th className="py-2.5 px-3 font-medium">Dataset</th>
                <th className="py-2.5 px-3 font-medium">Source Type</th>
                <th className="py-2.5 px-3 font-medium">License</th>
                <th className="py-2.5 px-3 font-medium">Retrieved At</th>
                <th className="py-2.5 px-3 font-medium">Methodology</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {sources.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-white">{s.organization}</td>
                  <td className="py-2.5 px-3 text-slate-300">{s.dataset_name}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                      {s.source_type}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">{s.license || 'Open'}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">{s.retrieved_at?.slice(0, 10)}</td>
                  <td className="py-2.5 px-3">
                    <a
                      href={s.methodology_url || s.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      Documentation ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quality Runs & Status Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Quality breakdown */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <h3 className="text-sm font-semibold text-white mb-2">Record Quality Distribution</h3>
          <p className="text-xs text-slate-400 mb-4">Total fact records loaded in canonical warehouse: <span className="font-bold text-white">{quality?.total_records?.toLocaleString()}</span></p>
          
          <div className="space-y-3">
            {quality?.quality_breakdown?.map((qb: any) => (
              <div key={qb.quality_status} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white">{qb.quality_status}</span>
                </div>
                <span className="font-mono text-emerald-300">{qb.count.toLocaleString()} rows</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Run Logs */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <h3 className="text-sm font-semibold text-white mb-2">Data Quality Pipeline Audit Runs</h3>
          <p className="text-xs text-slate-400 mb-4">Logged to <code className="text-emerald-400">data_quality_run</code> on every execution</p>
          
          <div className="space-y-3">
            {quality?.runs?.map((run: any) => (
              <div key={run.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white">{run.dataset_name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {run.status}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 font-mono text-[11px] mt-2">
                  <span>Read: {run.rows_read?.toLocaleString()}</span>
                  <span>Loaded: {run.rows_loaded?.toLocaleString()}</span>
                  <span>Rejected: {run.rows_rejected || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
