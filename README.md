# 🛡️ Advanced Network Security & Packet Inspector

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new)
[![Tech Stack](https://img.shields.io/badge/Stack-C%2B%2B%20%7C%20Python%20%7C%20Pcap-emerald?style=for-the-badge)](https://python.org)
[![Port](https://img.shields.io/badge/Port-3002-emerald?style=for-the-badge)](http://localhost:3002)

High-performance network packet capturing, DNS payload byte-level parsing, Dynamic ARP Inspection (DAI), and WEP security countermeasure defense suite.

---

## 🌟 Key Features

- 🔍 **DNS Byte-Level Parsing**: Inspects DNS queries and responses at raw hexadecimal/byte representation.
- 🛡️ **Dynamic ARP Inspection (DAI)**: Mitigates ARP spoofing and poisoning attacks in real time.
- 🔐 **WEP Defense Mechanisms**: Active defense protocols against ARP request/reply replay attacks.
- 📊 **Live Stream Visualizer**: Real-time traffic stream analysis for TCP, UDP, ICMP, DNS, and ARP frames.

---

## ⚙️ Environment Variables (.env)

```env
PORT=3002
NETWORK_INTERFACE="eth0"
DAI_INSPECTION_MODE="ACTIVE"
DNS_PARSER_LOG_LEVEL="DEBUG"
PROMISCUOUS_MODE=true
```

---

## 🚀 Local Setup & Execution

```bash
# Clone the repository
git clone https://github.com/<YOUR-USERNAME>/Capturing-and-Parsing-Packets.git
cd Capturing-and-Parsing-Packets

# Run local development engine
npm run dev
```

---

## 🌐 Deploying to Vercel

1. Push this repository to your personal GitHub account.
2. Import the project into Vercel dashboard.
3. Deploy instantly using pre-built `vercel.json` configuration.
