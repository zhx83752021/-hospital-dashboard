#!/bin/bash

# 医院数字化大屏 - 数据备份脚本

set -e

# 配置
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================"
echo "  医院数字化大屏 - 数据备份"
echo "========================================${NC}"
echo "备份时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 备份 Redis 数据
echo -e "${BLUE}[1/4] 备份 Redis 数据...${NC}"
if docker ps | grep -q hospital-redis; then
    docker exec hospital-redis redis-cli -a "${REDIS_PASSWORD:-password}" SAVE 2>/dev/null
    docker cp hospital-redis:/data/dump.rdb "$BACKUP_DIR/redis_$DATE.rdb"
    echo -e "${GREEN}✓ Redis 数据备份完成${NC}"
else
    echo "Redis 容器未运行，跳过"
fi

# 备份配置文件
echo -e "${BLUE}[2/4] 备份配置文件...${NC}"
if [ -f ".env.production" ]; then
    tar -czf "$BACKUP_DIR/config_$DATE.tar.gz" \
        .env.production \
        docker-compose.prod.yml \
        frontend/nginx.conf 2>/dev/null || true
    echo -e "${GREEN}✓ 配置文件备份完成${NC}"
else
    echo "配置文件不存在，跳过"
fi

# 备份日志文件
echo -e "${BLUE}[3/4] 备份日志文件...${NC}"
if [ -d "logs" ]; then
    tar -czf "$BACKUP_DIR/logs_$DATE.tar.gz" logs/
    echo -e "${GREEN}✓ 日志文件备份完成${NC}"
else
    echo "日志目录不存在，跳过"
fi

# 清理旧备份
echo -e "${BLUE}[4/4] 清理 ${RETENTION_DAYS} 天前的备份...${NC}"
find "$BACKUP_DIR" -name "*.rdb" -mtime +$RETENTION_DAYS -delete 2>/dev/null || true
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete 2>/dev/null || true
echo -e "${GREEN}✓ 清理完成${NC}"

# 显示备份文件
echo ""
echo -e "${BLUE}备份文件列表:${NC}"
ls -lh "$BACKUP_DIR" | grep "$DATE"

# 计算备份大小
BACKUP_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
echo ""
echo -e "${GREEN}========================================"
echo "备份完成！"
echo "======================================${NC}"
echo "备份位置: $BACKUP_DIR"
echo "备份大小: $BACKUP_SIZE"
echo "保留时间: ${RETENTION_DAYS} 天"

