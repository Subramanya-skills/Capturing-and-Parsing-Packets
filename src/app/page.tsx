"use client";

import { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  Play, 
  Pause, 
  RefreshCw, 
  Terminal, 
  Radio, 
  Lock, 
  AlertTriangle, 
  CheckCircle2,
  Cpu,
  Zap
} from "lucide-react";

interface Packet {
  id: number;
  timestamp: string;
  protocol: "DNS" | "ARP" | "TCP" | "UDP" | "ICMP";
  srcIp: string;
  dstIp: string;
  length: number;
  info: string;
  hexDump: string;
  status: "NORMAL" | "SUSPICIOUS" | "MALICIOUS";
}

const INITIAL_PACKETS: Packet[] = [
  {
    id: 1001,
    timestamp: "10:58:12.441",
    protocol: "DNS",
    srcIp: "192.168.1.105",
    dstIp: "8.8.8.8",
    length: 74,
    info: "Standard query 0x1a2b A api.subramanya-ai.internal",
    hexDump: "4500 004a 1c2d 4000 4011 a2b4 c0a8 0169 0808 0808 0035 0035 0036 1a2b 0100",
    status: "NORMAL"
  },
  {
    id: 1002,
    timestamp: "10:58:13.102",
    protocol: "ARP",
    srcIp: "192.168.1.200",
    dstIp: "192.168.1.1",
    length: 42,
    info: "Who has 192.168.1.1? Tell 192.168.1.200 [DAI Inspection Triggered]",
    hexDump: "ffff ffff ffff 000c 298a 7f12 0806 0001 0800 0604 0001 000c 298a 7f12 c0a8",
    status: "SUSPICIOUS"
  },
  {
    id: 1003,
    timestamp: "10:58:14.055",
    protocol: "TCP",
    srcIp: "10.0.4.12",
    dstIp: "192.168.1.105",
    length: 128,
    info: "443 -> 54102 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0",
    hexDump: "4500 0080 3d12 4000 8006 7c10 0a00 040c c0a8 0169 01bb d356 0000 0000 a012",
    status: "NORMAL"
  },
  {
    id: 1004,
    timestamp: "10:58:15.912",
    protocol: "DNS",
    srcIp: "192.168.1.222",
    dstIp: "192.168.1.1",
    length: 148,
    info: "DNS Poisoning Attack Attempt - Malicious payload byte mismatch",
    hexDump: "ff00 a11c 99aa bbcc 1234 5678 90ab cdef 0000 1111 2222 3333 4444 5555 6666",
    status: "MALICIOUS"
  }
];

export default function NetworkSnifferHomePage() {
  const [packets, setPackets] = useState<Packet[]>(INITIAL_PACKETS);
  const [isCapturing, setIsCapturing] = useState(true);
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(INITIAL_PACKETS[0]);
  const [filterProto, setFilterProto] = useState<string>("ALL");

  useEffect(() => {
    if (!isCapturing) return;
    const timer = setInterval(() => {
      const protos: Packet["protocol"][] = ["DNS", "ARP", "TCP", "UDP", "ICMP"];
      const randProto = protos[Math.floor(Math.random() * protos.length)];
      const isMal = Math.random() > 0.8;
      const isSusp = Math.random() > 0.7;

      const newPkt: Packet = {
        id: Date.now() % 10000,
        timestamp: new Date().toISOString().split("T")[1].slice(0, 12),
        protocol: randProto,
        srcIp: `192.168.1.${Math.floor(Math.random() * 250)}`,
        dstIp: randProto === "DNS" ? "8.8.8.8" : `192.168.1.${Math.floor(Math.random() * 250)}`,
        length: Math.floor(Math.random() * 200) + 40,
        info: isMal
          ? `${randProto} Anomaly detected - Potential Packet Poisoning`
          : `Captured live ${randProto} payload frame`,
        hexDump: Array.from({ length: 16 }, () => Math.floor(Math.random() * 255).toString(16).padStart(2, "0")).join(" "),
        status: isMal ? "MALICIOUS" : isSusp ? "SUSPICIOUS" : "NORMAL"
      };

      setPackets((prev) => [newPkt, ...prev.slice(0, 49)]);
    }, 2000);

    return () => clearInterval(timer);
  }, [isCapturing]);

  const filtered = packets.filter((p) => filterProto === "ALL" || p.protocol === filterProto);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="font-bold text-base bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              PACKET INSPECTOR APP
            </div>
            <div className="text-[10px] font-mono text-neutral-400">NETWORK SECURITY v4.2</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsCapturing(!isCapturing)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-lg ${
              isCapturing
                ? "bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20"
                : "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-emerald-500/20"
            }`}
          >
            {isCapturing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isCapturing ? "Stop Capture" : "Start Capture"}</span>
          </button>

          <button
            onClick={() => setPackets([])}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
            title="Clear Packets"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stream List */}
        <div className="lg:col-span-2 space-y-4 flex flex-col">
          <div className="flex items-center justify-between bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 text-xs">
            <div className="flex items-center space-x-2">
              <Radio className={`w-4 h-4 ${isCapturing ? "text-emerald-400 animate-pulse" : "text-neutral-500"}`} />
              <span className="font-mono text-neutral-300">Live Traffic Stream</span>
              <span className="text-neutral-500">({filtered.length} captured)</span>
            </div>

            <div className="flex items-center space-x-1">
              {["ALL", "DNS", "ARP", "TCP", "UDP"].map((proto) => (
                <button
                  key={proto}
                  onClick={() => setFilterProto(proto)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                    filterProto === proto
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {proto}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden flex-1 max-h-[500px] overflow-y-auto no-scrollbar">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-950 text-neutral-400 sticky top-0 border-b border-neutral-800">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Proto</th>
                  <th className="p-3">Source</th>
                  <th className="p-3">Destination</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {filtered.map((pkt) => (
                  <tr
                    key={pkt.id}
                    onClick={() => setSelectedPacket(pkt)}
                    className={`cursor-pointer transition-colors ${
                      selectedPacket?.id === pkt.id ? "bg-emerald-950/40 border-l-2 border-emerald-400" : "hover:bg-neutral-900/50"
                    }`}
                  >
                    <td className="p-3 text-neutral-500">#{pkt.id}</td>
                    <td className="p-3 text-neutral-300">{pkt.timestamp}</td>
                    <td className="p-3">
                      <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-emerald-400 font-bold">
                        {pkt.protocol}
                      </span>
                    </td>
                    <td className="p-3 text-neutral-300">{pkt.srcIp}</td>
                    <td className="p-3 text-neutral-300">{pkt.dstIp}</td>
                    <td className="p-3">
                      {pkt.status === "MALICIOUS" ? (
                        <span className="flex items-center space-x-1 text-rose-400 font-bold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>MALICIOUS</span>
                        </span>
                      ) : pkt.status === "SUSPICIOUS" ? (
                        <span className="flex items-center space-x-1 text-amber-400 font-bold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>SUSPICIOUS</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>OK</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Byte Inspector Panel */}
        <div className="space-y-4 flex flex-col">
          <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Byte-Level Payload Inspector</span>
            </h3>

            {selectedPacket ? (
              <div className="space-y-3 font-mono text-xs">
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 space-y-1">
                  <div className="text-neutral-400">Packet Metadata</div>
                  <div className="text-emerald-400 font-bold">{selectedPacket.info}</div>
                  <div className="text-neutral-500">Payload Length: {selectedPacket.length} bytes</div>
                </div>

                <div>
                  <label className="block text-neutral-400 text-[11px] mb-1">Hexadecimal Payload Dump</label>
                  <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-emerald-400/90 text-[11px] leading-relaxed break-all font-mono">
                    {selectedPacket.hexDump}
                  </div>
                </div>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 space-y-2">
                  <div className="text-neutral-300 font-bold flex items-center space-x-1">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Security Engine Analysis</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">
                    {selectedPacket.status === "MALICIOUS"
                      ? "ALERT: Malicious byte payload detected. DAI engine blocked spoofing attempt."
                      : "Packet checksum verified. Payload structure matches protocol standard."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-500 text-xs">
                Select a packet from stream to inspect payload bytes.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
