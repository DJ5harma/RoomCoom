If deploying outside localhost:

🔥 You MUST configure:

Public IP

TURN / UDP ports

Firewall

Add to config.yaml:

rtc:
  use_external_ip: true


Open UDP ports (example):

ufw allow 7882:7900/udp


💡 If users are behind strict firewalls → add TURN server (coturn).