---
title: 'How I Extended WiFi to My Doorbell Camera Using a Raspberry Pi'
description: 'Repurposing a Raspberry Pi as a dedicated WiFi access point to bridge a doorbell camera to an Orbi mesh network — including the full debugging session.'
pubDate: 'Feb 28 2026'
heroImage: '../../assets/Gemini_Generated_Image_il2ntuil2ntuil2n.png'
---

The Orbi mesh covers the house well, but the satellites don't quite reach the front door where my [Reolink](https://reolink.com) doorbell camera lives. Rather than buying another expensive Orbi satellite just for one device, I repurposed a Raspberry Pi I had lying around as a dedicated WiFi access point — bridging the doorbell to my existing ORBI13 mesh network.

This post covers the full setup and the debugging session that got it running reliably.

---

## Why I Built This

My Orbi mesh covers most of the house fine, but the front door sits in a dead zone. The doorbell camera needs a solid WiFi connection to stream video and send alerts — without it, notifications are delayed or missing entirely.

The obvious fix was another Orbi satellite, but they're expensive and I only needed coverage for one device a few feet outside the current range. I had a Raspberry Pi sitting unused and figured it could act as a cheap, dedicated bridge. Networking, Linux services, and iptables aren't familiar territory — but with AI helping navigate those parts, the scope felt manageable.

---

## The Goal

```
Reolink Doorbell
      │  (WiFi: "Doorbell_Wifi" / WPA2)
      ▼
   wlan1 (192.168.4.1) ← hostapd + dnsmasq
   Raspberry Pi "johnny5"
   wlan0 (10.0.0.124) ← connected to ORBI13
      │
      ▼
  ORBI13 → Internet
```

The Pi needs two wireless interfaces:
- **wlan0** — connects to ORBI13 as a regular WiFi client
- **wlan1** — a USB WiFi dongle that broadcasts a separate AP called `Doorbell_Wifi`

The doorbell connects to `Doorbell_Wifi`, the Pi forwards the traffic through to ORBI13, and the doorbell gets internet access.

---

## Hardware

- Raspberry Pi (running Raspberry Pi OS Bookworm)
- USB WiFi adapter (MediaTek MT7610U / `0e8d:7610`) for the second radio

---

## Software Stack

| Component | Role |
|-----------|------|
| `hostapd` | Broadcasts the `Doorbell_Wifi` access point on `wlan1` |
| `dnsmasq` | DHCP server — hands out IPs to devices on the doorbell network |
| `iptables` | NAT masquerade + packet forwarding between `wlan1` and `wlan0` |
| NetworkManager | Manages `wlan0` connection to ORBI13 |

---

## Initial Configuration

### `/etc/hostapd/hostapd.conf`

```ini
interface=wlan1
driver=nl80211
ssid=Doorbell_Wifi
hw_mode=g
channel=6
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=YourPasswordHere
wpa_key_mgmt=WPA-PSK
rsn_pairwise=CCMP
```

### `/etc/dnsmasq.conf` (relevant lines)

```ini
interface=wlan1
dhcp-range=192.168.4.2,192.168.4.20,255.255.255.0,24h
```

### IP forwarding

```bash
# /etc/sysctl.conf
net.ipv4.ip_forward=1
```

### NAT masquerade (so doorbell traffic exits via wlan0)

```bash
iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE
```

This was all working at some point — then the Pi got rebooted and things stopped working.

---

## Debugging Session

### Step 1 — Check the services

```bash
systemctl status hostapd
systemctl status dnsmasq
```

Both showed **active (running)**. So the services weren't the problem.

### Step 2 — Check network interfaces

```bash
ip addr show
```

Key findings:
- `wlan0` — connected to ORBI13 at `10.0.0.124` ✅
- `wlan1` — **UP but no IP address, NO-CARRIER** ❌

`wlan1` had no IP address. Without `192.168.4.1` on that interface, `dnsmasq` couldn't hand out leases and the doorbell couldn't reach the internet even if it connected to the AP.

### Step 3 — Why is there no IP?

The original setup used `/etc/dhcpcd.conf` to assign the static IP:

```ini
interface wlan1
static ip_address=192.168.4.1/24
nohook wpa_supplicant
```

But `dhcpcd` wasn't installed. Raspberry Pi OS Bookworm replaced `dhcpcd` with NetworkManager as the default network manager, and the old config file was silently ignored. NetworkManager had no profile for `wlan1`, so the interface came up with no IP.

### Step 4 — Why isn't wlan1 broadcasting?

```bash
sudo iw wlan1 info | grep type
# type managed
```

`wlan1` was in **managed** (client) mode instead of **AP** mode. The `hostapd` process from a previous boot was stale and had lost control of the interface. A restart fixed it:

```bash
sudo systemctl restart hostapd
sudo iw wlan1 info | grep type
# type AP  ✅
```

### Step 5 — Internet not passing through

Even after fixing the IP and AP mode, internet didn't work on the doorbell. Checking the iptables FORWARD chain revealed:

```bash
sudo iptables -L FORWARD -n -v
# Chain FORWARD (policy DROP)
# Only Docker rules present — no wlan1 ↔ wlan0 rules
```

The forwarding rules were missing. They had been added previously but **Docker wiped them**. Docker manages and rebuilds the `FORWARD` chain on startup, removing any manually added rules.

The fix: add the rules to the `DOCKER-USER` chain instead. Docker explicitly leaves this chain alone.

---

## The Full Fix

### 1. Tell NetworkManager to leave wlan1 alone

```bash
# /etc/NetworkManager/conf.d/unmanaged-wlan1.conf
[keyfile]
unmanaged-devices=interface-name:wlan1
```

```bash
sudo nmcli general reload
```

### 2. Create a systemd service to set the IP and routing rules on every boot

```ini
# /etc/systemd/system/wlan1-static-ip.service
[Unit]
Description=Set static IP 192.168.4.1 on wlan1 for doorbell AP
After=hostapd.service
Requires=hostapd.service

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/sbin/ip addr replace 192.168.4.1/24 dev wlan1
ExecStart=/sbin/ip link set wlan1 up
ExecStart=/bin/sh -c '/sbin/iptables -C DOCKER-USER -i wlan1 -o wlan0 -j ACCEPT || /sbin/iptables -I DOCKER-USER -i wlan1 -o wlan0 -j ACCEPT'
ExecStart=/bin/sh -c '/sbin/iptables -C DOCKER-USER -i wlan0 -o wlan1 -m state --state RELATED,ESTABLISHED -j ACCEPT || /sbin/iptables -I DOCKER-USER -i wlan0 -o wlan1 -m state --state RELATED,ESTABLISHED -j ACCEPT'

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now wlan1-static-ip
```

A few notes on this service:

- **`ip addr replace`** instead of `ip addr add` — idempotent, won't fail if the address is already set
- **`-C` check before `-I`** — only inserts the iptables rule if it doesn't already exist, preventing duplicates on service restarts
- **`DOCKER-USER` chain** — Docker never flushes this chain, so rules here survive Docker restarts
- **`After=hostapd.service`** — ensures hostapd has put `wlan1` into AP mode before we configure the IP

---

## Why DOCKER-USER and Not FORWARD?

Docker manages the `FORWARD` chain directly. On startup it flushes and rebuilds `DOCKER-FORWARD` and inserts its jump rules into `FORWARD`. Any rules you manually add to `FORWARD` can disappear when Docker restarts.

`DOCKER-USER` is a chain that Docker creates but intentionally never modifies — it's the officially supported place to put your own forwarding rules that need to coexist with Docker. All traffic through `FORWARD` passes through `DOCKER-USER` first, so rules there are evaluated before Docker's own rules.

---

## Verifying It Works

```bash
# wlan1 is in AP mode
sudo iw wlan1 info | grep type
# type AP

# IP is assigned
ip addr show wlan1 | grep inet
# inet 192.168.4.1/24

# Internet routing works from the doorbell subnet
ping -c 3 -I 192.168.4.1 8.8.8.8
# 3 packets transmitted, 3 received, 0% packet loss

# hostapd shows the doorbell connected
sudo journalctl -u hostapd -n 10
# wlan1: AP-ENABLED
# wlan1: STA xx:xx:xx:xx:xx:xx WPA: pairwise key handshake completed (RSN)
```

---

## Quick Troubleshooting Reference

| Symptom | Check | Fix |
|---------|-------|-----|
| `Doorbell_Wifi` not visible | `sudo iw wlan1 info \| grep type` shows `managed` | `sudo systemctl restart hostapd` |
| Doorbell connects but no internet | `sudo iptables -L DOCKER-USER -n` — ACCEPT rules missing | `sudo systemctl restart wlan1-static-ip` |
| `wlan1` has no IP | `ip addr show wlan1` shows no `inet` line | `sudo systemctl restart wlan1-static-ip` |
| wlan0 lost ORBI13 connection | `nmcli dev status` shows wlan0 disconnected | `sudo nmcli con up preconfigured` |

---

## Key Files

```
/etc/hostapd/hostapd.conf               # AP SSID, password, channel
/etc/dnsmasq.conf                       # DHCP range for doorbell network
/etc/NetworkManager/conf.d/
  unmanaged-wlan1.conf                  # Keeps NM away from wlan1
/etc/systemd/system/
  wlan1-static-ip.service               # Sets IP + iptables on boot
```
