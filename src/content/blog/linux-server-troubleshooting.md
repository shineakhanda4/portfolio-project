---
title: "Linux Server Troubleshooting: A Practical Introduction"
description: "A calm, evidence-led approach to Linux server problems: access, recent changes, disk, memory, services, logs, networking, DNS, and safe recovery."
excerpt: "The first rule of server troubleshooting is not to make the situation more interesting. Gather evidence, protect access, and change one thing at a time."
date: "2026-10-27"
updated: "2026-10-27"
category: "Linux & System Administration"
tags:
  - "Linux"
  - "Troubleshooting"
  - "Servers"
featured: false
order: 8
cover: "/blog/linux-server-troubleshooting.jpg"
coverAlt: "Minimal monochrome cover about Linux server troubleshooting"
---

A production server rarely fails politely. A website goes down, SSH stops responding, or a service starts and immediately exits. In that moment, the temptation is to restart everything or paste a command from a search result.

A better approach is to slow down enough to preserve evidence. The goal is not to look clever in a terminal. It is to restore service without destroying the ability to understand what happened.

## 1. Establish access and scope

Before changing anything, confirm how you can reach the machine:

- SSH session;
- out-of-band console or KVM;
- hosting control panel;
- rescue mode;
- serial console.

If you only have one SSH session, avoid making changes that could lock you out. Open a second session if possible, or use `tmux`/`screen` so a dropped connection does not kill a long-running command.

Then define the symptom in concrete terms:

- Is the whole server unreachable, or only the website?
- Does DNS resolve?
- Does the process run?
- Is the disk full?
- Is the failure constant or intermittent?
- When did it start, and what changed just before?

“The server is down” is not yet a diagnosis. “The host responds to ping and SSH, nginx is running, but HTTPS requests time out” gives you a much narrower search space.

## 2. Check recent changes first

Most unexpected failures follow a change: a package update, a configuration edit, a new firewall rule, a certificate renewal, a deployment, or a disk filling with logs.

Useful sources include:

```bash
history
last
journalctl --since "2 hours ago"
tail -n 100 /var/log/nginx/error.log
grep -R "recent-config-name" /etc
```

Access to shell history depends on the user and configuration. Hosting panels and deployment logs may hold the missing context. Ask what changed rather than assuming nothing did.

## 3. Check disk space and inodes

A full disk causes a remarkable variety of apparently unrelated failures. Services cannot write logs, databases stop accepting writes, and sessions may fail.

```bash
df -h
df -i
du -xhd1 /var | sort -h
```

Check inode usage as well as bytes. Millions of tiny files can exhaust inodes while `df -h` still reports free space.

Large logs, package caches, uploads, backups, and database files are common culprits. Do not delete files indiscriminately. Identify the growth, preserve anything needed for diagnosis, and address the cause. A log rotation or retention policy is usually more useful than another emergency cleanup.

## 4. Inspect memory and load

```bash
free -h
uptime
ps aux --sort=-%mem | head
```

High load does not always mean high CPU. Processes waiting on disk or network can raise load average without using much processor time.

Also check the kernel log for out-of-memory events:

```bash
dmesg -T | tail -n 50
journalctl -k --since "1 hour ago"
```

If the OOM killer terminated a service, adding memory may not be the only answer. A memory leak, an unbounded cache, or a configuration that allows too many workers may be the underlying problem.

## 5. Check the service, not just the port

Use the service manager to see whether a process is healthy:

```bash
systemctl status nginx
systemctl status php8.3-fpm
journalctl -u nginx --since today
```

Then verify the listening socket:

```bash
ss -ltnp
```

A process can be running but listening on the wrong interface or port. A firewall can accept a local connection while blocking the public internet. Test from more than one location when possible.

Do not restart a failing service repeatedly without reading its logs. A restart may clear the symptom for a moment while destroying the evidence that would explain it.

## 6. Separate DNS, TLS, and HTTP

When a site is unreachable, work through the layers.

**DNS**

```bash
dig example.com
dig +short example.com
```

Check that the domain resolves to the expected address and that the authoritative servers are responding.

**TCP**

```bash
curl -v --connect-timeout 5 https://example.com
```

A failure before the TLS handshake points to a different layer than an HTTP 500.

**TLS**

```bash
openssl s_client -connect example.com:443 -servername example.com
```

An expired certificate, wrong certificate, or hostname mismatch should be visible. Automated renewal can fail silently if the validation path changes.

**HTTP**

```bash
curl -I https://example.com
```

Check the status code, redirect chain, and server headers. If the application returns 502 or 504, inspect the upstream service and its logs.

## 7. Follow the logs with intent

Logs are evidence, not a haystack to search randomly. Identify the component that owns the failure, then filter by time.

Useful commands:

```bash
journalctl -xe
journalctl -u app.service -n 200 --no-pager
tail -f /var/log/nginx/access.log
grep -i "error\|fail\|timeout" /var/log/syslog
```

Be careful with log volume. A noisy error repeated thousands of times can hide the first occurrence. Use `--since`, `grep`, or time windows to narrow the view.

## 8. Protect access before a risky fix

Before editing firewall rules, SSH configuration, boot parameters, or storage configuration, ensure you have a way back in.

- Keep the current SSH session open while testing a new one.
- Take a configuration backup.
- Note the console or rescue access process.
- Confirm backups exist and are restorable, not merely present.
- Avoid `rm -rf` in a panic.
- Test a service configuration before reloading it where possible.

```bash
nginx -t
apachectl configtest
sshd -t
```

A configuration test is not a complete guarantee, but it catches the common syntax errors before they become an outage.

## 9. Boot and filesystem problems

If the server does not boot, the recovery path depends on access to a console or rescue environment.

Possible causes include:

- a full filesystem preventing services from starting;
- a failed disk or filesystem error;
- a kernel update without a compatible module;
- a broken bootloader or incorrect root device;
- an `/etc/fstab` entry that no longer resolves;
- a corrupted configuration introduced before reboot.

Do not run filesystem repair tools against a mounted production filesystem unless you understand the risk. Read the error messages, check storage health, and use the hosting provider's recovery options where available.

## 10. Restore, document, and prevent

After service is back:

- confirm the original symptom is actually gone;
- test the user-facing path, not just the process status;
- record the cause and the commands that resolved it;
- check whether monitoring could have caught it earlier;
- add a backup, retention policy, alert, or configuration test;
- tell the people who need to know.

A fix that leaves no operational change invites the same failure again.

## The mindset

Server troubleshooting is mostly disciplined observation. Use the least invasive command that can confirm or reject a theory. Separate the layers. Preserve access. Read before restarting. Protect data.

That approach is not unique to Linux, but Linux gives you the tools and the transparency to apply it well.

For hosting decisions, read [Bare-Metal Servers vs VPS Hosting](/blog/bare-metal-vs-vps).
