#!/bin/bash

# 医院数字化大屏 - 健康检查脚本

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 检查结果
ALL_HEALTHY=true

echo -e "${BLUE}========================================"
echo "  医院数字化大屏 - 系统健康检查"
echo "========================================${NC}"
echo ""

# 检查前端服务
echo -n "检查前端服务... "
if curl -sf http://localhost/ > /dev/null 2>&1; then
    echo -e "${GREEN}✓ 正常${NC}"
else
    echo -e "${RED}✗ 异常${NC}"
    ALL_HEALTHY=false
fi

# 检查后端 API
echo -n "检查后端 API... "
if curl -sf http://localhost:3000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ 正常${NC}"
else
    echo -e "${RED}✗ 异常${NC}"
    ALL_HEALTHY=false
fi

# 检查 Redis
echo -n "检查 Redis... "
if docker exec hospital-redis redis-cli -a "${REDIS_PASSWORD:-password}" ping 2>/dev/null | grep -q PONG; then
    echo -e "${GREEN}✓ 正常${NC}"
else
    echo -e "${RED}✗ 异常${NC}"
    ALL_HEALTHY=false
fi

# 检查容器状态
echo ""
echo -e "${BLUE}容器状态:${NC}"
docker-compose -f docker-compose.prod.yml ps

# 检查资源使用
echo ""
echo -e "${BLUE}资源使用:${NC}"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"

# 检查磁盘使用
echo ""
echo -e "${BLUE}磁盘使用:${NC}"
df -h | grep -E "Filesystem|/$|/opt"

# 检查日志错误
echo ""
echo -e "${BLUE}最近的错误日志 (最多10条):${NC}"
if [ -d "logs" ]; then
    find logs -name "*.log" -type f -exec grep -i "error" {} \; 2>/dev/null | tail -10
else
    echo "日志目录不存在"
fi

# 总结
echo ""
echo -e "${BLUE}========================================"
if [ "$ALL_HEALTHY" = true ]; then
    echo -e "${GREEN}系统状态: 健康 ✓${NC}"
    exit 0
else
    echo -e "${RED}系统状态: 异常 ✗${NC}"
    echo -e "${YELLOW}请检查上述异常项${NC}"
    exit 1
fi
echo "========================================"

