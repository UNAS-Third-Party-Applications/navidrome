#!/bin/bash

if [[ $1 == */ ]]; then
  INSTALL_PATH=${1%?}
else
  INSTALL_PATH=$1
fi

# 配置目录
if [[ $2 == */ ]]; then
  CONFIG_PATH=${2%?}
else
  CONFIG_PATH=$2
fi

RED_COLOR='\e[1;31m'
GREEN_COLOR='\e[1;32m'
YELLOW_COLOR='\e[1;33m'
BLUE_COLOR='\e[1;34m'
PINK_COLOR='\e[1;35m'
SHAN='\e[1;33;5m'
RES='\e[0m'
clear

if [ "$(id -u)" != "0" ]; then
  echo -e "\r\n${RED_COLOR}出错了，请使用 root 权限重试！${RES}\r\n" 1>&2
  exit 1
fi

if [ ! -f "$INSTALL_PATH/navidrome" ]; then
  echo -e "\r\n${RED_COLOR}出错了${RES}，当前系统未安装 Navidrome\r\n"
  exit 1
fi

# 创建 systemd
cat >/etc/systemd/system/navidrome.service <<EOF
[Unit]
Description=UNAS Navidrome service
After=remote-fs.target network.target
AssertPathExists=$CONFIG_PATH

[Service]
Type=simple
WorkingDirectory=$CONFIG_PATH
ExecStart=$INSTALL_PATH/navidrome  --configfile "$CONFIG_PATH/navidrome.json"
TimeoutStopSec=20
KillMode=process
Restart=on-failure

[Install]
WantedBy=multi-user.target

# See https://www.freedesktop.org/software/systemd/man/systemd.exec.html
DevicePolicy=closed
NoNewPrivileges=yes
PrivateTmp=yes
PrivateUsers=yes
ProtectControlGroups=yes
ProtectKernelModules=yes
ProtectKernelTunables=yes
RestrictAddressFamilies=AF_UNIX AF_INET AF_INET6
RestrictNamespaces=yes
RestrictRealtime=yes
SystemCallFilter=~@clock @debug @module @mount @obsolete @reboot @setuid @swap
ReadWritePaths=$CONFIG_PATH

# You can uncomment the following line if you're not using the jukebox This
# will prevent navidrome from accessing any real (physical) devices
#PrivateDevices=yes

# You can change the following line to `strict` instead of `full` if you don't
# want navidrome to be able to write anything on your filesystem outside of
# /var/lib/navidrome.
ProtectSystem=full

# You can uncomment the following line if you don't have any media in /home/*.
# This will prevent navidrome from ever reading/writing anything there.
#ProtectHome=true

# You can customize some Navidrome config options by setting environment variables here. Ex:
#Environment=ND_BASEURL="/navidrome"
EOF

# 添加开机启动
systemctl daemon-reload
systemctl enable navidrome >/dev/null 2>&1
# 启动服务
systemctl start navidrome >/dev/null 2>&1

