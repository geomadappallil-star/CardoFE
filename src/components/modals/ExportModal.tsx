import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, FileJson, Check } from 'lucide-react';
import { PriceSeriesPoint } from '../../types/index.js';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  priceSeries: PriceSeriesPoint[];
  spice: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  priceSeries,
  spice
}) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const exportCSV = () => {
    if (!priceSeries || priceSeries.length === 0) return;
    const headers = ['Date', 'Unweighted_Mean_Price_INR', 'Weighted_Mean_Price_INR', 'Min_Price_INR', 'Max_Price_INR', 'Total_Arrivals_kg', 'Total_Sold_kg', 'Auction_Count'];
    const rows = priceSeries.map(p => [
      p.date,
      p.unweighted_mean,
      p.weighted_mean,
      p.min_price,
      p.max_price,
      p.total_arrived_kg,
      p.total_sold_kg,
      p.auction_count
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cardo_board_${spice}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const exportJSON = () => {
    if (!priceSeries || priceSeries.length === 0) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(priceSeries, null, 2))}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `cardo_board_${spice}_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Analytics Data</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <p className="text-slate-300">
            Download the active filtered series for <span className="font-semibold text-emerald-400">{spice}</span> ({priceSeries.length} points).
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={exportCSV}
              className="p-4 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 flex flex-col items-center gap-2 text-slate-200 transition-colors"
            >
              <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
              <span className="font-semibold">CSV Format</span>
              <span className="text-[10px] text-slate-400">Spreadsheets / Excel</span>
            </button>

            <button
              onClick={exportJSON}
              className="p-4 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 flex flex-col items-center gap-2 text-slate-200 transition-colors"
            >
              <FileJson className="w-6 h-6 text-cyan-400" />
              <span className="font-semibold">JSON Format</span>
              <span className="text-[10px] text-slate-400">Raw Objects / API</span>
            </button>
          </div>

          {downloaded && (
            <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 flex items-center justify-center gap-2 text-xs">
              <Check className="w-4 h-4" />
              <span>Download started successfully!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
