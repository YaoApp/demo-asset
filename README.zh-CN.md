# 资产管理系统(示例)

![Image](docs/images/intro.png)

[English](README.md)

资产管理系统示例应用

参考文档: [https://yaoapps.com/doc](https://yaoapps.com/doc/%E4%BB%8B%E7%BB%8D/%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)

## 下载安装

### 使用 Docker 运行

```bash
docker run -d -p 5099:5099 --restart unless-stopped \
    -e YAO_INIT=demo \
    -e YAO_PROCESS_RESET=flows.setmenu \
    yaoapp/demo-asset:1.0.1-amd64
```

### 在本地运行

#### 下载源码

```bash
git clone https://github.com/YaoApp/demo-asset /app/path/asset

```

#### 设置环境变量

```bash

mkdir /app/path/asset/db
mkdir /app/path/asset/data
mkdir /app/path/asset/logs

cat << EOF
YAO_ENV=development # development | production
YAO_ROOT="/app/path/asset"
YAO_HOST="0.0.0.0"
YAO_PORT="5099"
YAO_SESSION="memory"
YAO_LOG="/app/path/asset/logs/application.log"
YAO_LOG_MODE="TEXT"  #  TEXT | JSON
YAO_JWT_SECRET="bLp@bi!oqo-2U+hoTRUG"
YAO_DB_DRIVER=sqlite3 # sqlite3 | mysql
YAO_DB_PRIMARY="/app/path/asset/db/yao.db"
EOF > /app/path/asset/.env
```

#### 项目初始化

```bash
cd /app/path/asset

# 创建数据表 & 设置菜单
yao migrate --reset
yao run flows.setmenu
```

#### 启动服务

```bash
cd /app/path/asset
yao start
```

## 管理后台

打开浏览器输入以下网址进入:

http://127.0.0.1:5099/xiang/login/admin

用户名: `xiang@iqka.com`
密码: `A123456p+`
