# navidrome

适用于万由U-NAS 6的navidrome套件程序。本项目是将[navidrome](https://github.com/navidrome/navidrome)进行封装作为U-NAS套件，使其能在万由U-NAS系统上进行可视化的配置管理以及服务的启停操作。

## 项目说明

此项目是对万由U-NAS系统进行适配navidrome套件程序，因为万由官方还未完成第三方开发者文档的梳理，所以此项目是靠者自己摸索尝试进行开发的，目前已经支持上架官方应用市场，大家可以到U-NAS 6测试源的App Manager中的第三方应用中进行下载，源码100%开源，大家可以自行查看、使用

## 使用方法

- 方法1：下载项目源码，然后将整个项目上传到U-NAS，解压到`/unas/apps`目录下，注意需要保持目录名为navidrome，然后登录U-NAS的web端，打开控制中心，即可找到应用
- 方法2：在release中下载编译好的zip，解压得到deb文件，然后再U-NAS 6的端，打开App Manager，点击手动安装，选择deb文件进行安装即可
- 方法3：如果是U-NAS 6的测试源，目前App Manager已经支持第三方应用，可以直接在其中进行安装

## 特别说明

因为官方文档未开放，所以目前开发主要靠自己摸索，可能存在不足的地方，遇见问题大家可以提交Issues，也欢迎大佬修改代码提交Pr