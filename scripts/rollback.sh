#!/bin/bash

# 医院数字化大屏 - 版本回滚脚本

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

VERSION=$1

# 检查参数
if [ -z "$VERSION" ]; then
    echo -e "${RED}错误: 请指定要回滚的版本${NC}"
    echo "用法: $0 <version>"
    echo "示例: $0 v1.0.0"
    echo "      $0 abc123def"
    exit 1
fi

echo -e "${BLUE}========================================"
echo "  医院数字化大屏 - 版本回滚"
echo "========================================${NC}"
echo "回滚到版本: ${YELLOW}$VERSION${NC}"
echo ""

# 确认回滚
read -p "确认要回滚到版本 $VERSION 吗? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "已取消回滚"
    exit 0
fi

# 备份当前版本
echo -e "${BLUE}[1/5] 备份当前版本...${NC}"
BACKUP_DIR="backups/rollback_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

if [ -d "logs" ]; then
    cp -r logs "$BACKUP_DIR/"
fi

if [ -f ".env.production" ]; then
    cp .env.production "$BACKUP_DIR/"
fi

echo -e "${GREEN}✓ 备份完成: $BACKUP_DIR${NC}"

# 拉取指定版本代码
echo -e "${BLUE}[2/5] 切换到版本 $VERSION...${NC}"
git fetch --all
git checkout $VERSION
echo -e "${GREEN}✓ 代码切换完成${NC}"

# 停止当前服务
echo -e "${BLUE}[3/5] 停止当前服务...${NC}"
docker-compose -f docker-compose.prod.yml down
echo -e "${GREEN}✓ 服务已停止${NC}"

# 重新构建镜像
echo -e "${BLUE}[4/5] 重新构建镜像...${NC}"
docker-compose -f docker-compose.prod.yml build --no-cache
echo -e "${GREEN}✓ 镜像构建完成${NC}"

# 启动服务
echo -e "${BLUE}[5/5] 启动服务...${NC}"
docker-compose -f docker-compose.prod.yml up -d
echo -e "${GREEN}✓ 服务已启动${NC}"

# 健康检查
echo ""
echo -e "${BLUE}执行健康检查...${NC}"
sleep 10

if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ 后端服务正常${NC}"
else
    echo -e "${RED}✗ 后端服务异常${NC}"
    echo "查看日志: docker-compose -f docker-compose.prod.yml logs backend"
fi

if curl -f http://localhost/ > /dev/null 2>&1; then
    echo -e "${GREEN}✓ 前端服务正常${NC}"
else
    echo -e "${RED}✗ 前端服务异常${NC}"
    echo "查看日志: docker-compose -f docker-compose.prod.yml logs frontend"
fi

echo ""
echo -e "${GREEN}========================================"
echo "回滚完成！"
echo "========================================${NC}"
echo "当前版本: $VERSION"
echo "备份位置: $BACKUP_DIR"
echo ""
echo "如需查看服务状态:"
echo "  docker-compose -f docker-compose.prod.yml ps"
echo ""
echo "如需查看日志:"
echo "  docker-compose -f docker-compose.prod.yml logs -f"

