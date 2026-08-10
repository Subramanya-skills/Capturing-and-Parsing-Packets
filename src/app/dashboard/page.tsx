"use client";

import Link from "next/link";
import { ShieldAlert, Activity, AlertTriangle, ArrowLeft, Radio, CheckCircle, Terminal } from "lucide-react";

export default function SecurityDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <Link href="/" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-bold text-lg text-slate-900">Network Security SOC Dashboard</h1>
            <p className="text-xs text-slate-500">Real-time packet throughput, DAI spoofing triggers & malicious payload metrics</p>
          </div>
        </div>

        <Link href="/" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-500/20">
          Live Stream Sniffer
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 uppercase">Packets Analyzed</span>
              <Activity className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">148,290</div>
            <div className="text-xs text-emerald-600 font-mono">Throughput: 1.2 GB/s</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 uppercase">Spoofing Blocks</span>
              <ShieldAlert className="w-5 h-5 text-rose-500" />
            </div>
            <div className="text-3xl font-extrabold text-rose-600 font-mono">42</div>
            <div className="text-xs text-rose-600 font-mono">Dynamic ARP Inspection</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 uppercase">DNS Anomaly Alerts</span>
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-amber-600 font-mono">7</div>
            <div className="text-xs text-amber-600 font-mono">Byte mismatch flagged</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 uppercase">Security Integrity</span>
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600 font-mono">99.8%</div>
            <div className="text-xs text-slate-500 font-mono">Promiscuous Mode Active</div>
          </div>
        </div>
      </main>
    </div>
  );
}
