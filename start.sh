#!/bin/bash

# 设置颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 清屏
clear

echo -e "${BLUE}========================================"
echo "  医院数字化大屏 - Linux/Mac启动脚本"
echo -e "========================================${NC}"
echo ""

# 主菜单函数
show_menu() {
    echo "请选择操作："
    echo ""
    echo -e "${GREEN}[1]${NC} 安装依赖"
    echo -e "${GREEN}[2]${NC} 启动后端服务"
    echo -e "${GREEN}[3]${NC} 启动前端服务"
    echo -e "${GREEN}[4]${NC} 同时启动前后端（需要先安装依赖）"
    echo -e "${GREEN}[5]${NC} 查看帮助"
    echo -e "${RED}[0]${NC} 退出"
    echo ""
    read -p "请输入选项 (0-5): " choice
    
    case $choice in
        1) install_deps ;;
        2) start_backend ;;
        3) start_frontend ;;
        4) start_both ;;
        5) show_help ;;
        0) exit 0 ;;
        *) 
            echo -e "${RED}无效选项，请重新选择${NC}"
            sleep 1
            show_menu
            ;;
    esac
}

# 安装依赖
install_deps() {
    echo ""
    echo -e "${BLUE}========================================"
    echo "  正在安装依赖..."
    echo -e "========================================${NC}"
    echo ""
    
    echo -e "${YELLOW}[1/3] 安装根目录依赖...${NC}"
    npm install
    
    echo ""
    echo -e "${YELLOW}[2/3] 安装前端依赖...${NC}"
    cd frontend
    npm install
    cd ..
    
    echo ""
    echo -e "${YELLOW}[3/3] 安装后端依赖...${NC}"
    cd backend
    npm install
    cd ..
    
    echo ""
    echo -e "${GREEN}✅ 依赖安装完成！${NC}"
    echo ""
    read -p "按回车键继续..."
    show_menu
}

# 启动后端
start_backend() {
    echo ""
    echo -e "${BLUE}========================================"
    echo "  启动后端服务..."
    echo -e "========================================${NC}"
    echo ""
    echo -e "后端服务将在 ${GREEN}http://localhost:3000${NC} 启动"
    echo -e "按 ${YELLOW}Ctrl+C${NC} 可以停止服务"
    echo ""
    cd backend
    npm run dev
    cd ..
}

# 启动前端
start_frontend() {
    echo ""
    echo -e "${BLUE}========================================"
    echo "  启动前端服务..."
    echo -e "========================================${NC}"
    echo ""
    echo -e "前端应用将在 ${GREEN}http://localhost:5173${NC} 启动"
    echo -e "按 ${YELLOW}Ctrl+C${NC} 可以停止服务"
    echo ""
    cd frontend
    npm run dev
    cd ..
}

# 同时启动
start_both() {
    echo ""
    echo -e "${BLUE}========================================"
    echo "  同时启动前后端..."
    echo -e "========================================${NC}"
    echo ""
    echo -e "后端: ${GREEN}http://localhost:3000${NC}"
    echo -e "前端: ${GREEN}http://localhost:5173${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  请确保已经运行过 [1] 安装依赖${NC}"
    echo ""
    npm run dev
}

# 显示帮助
show_help() {
    echo ""
    echo -e "${BLUE}========================================"
    echo "  帮助信息"
    echo -e "========================================${NC}"
    echo ""
    echo -e "${GREEN}🚀 快速开始：${NC}"
    echo "   1. 首次使用请先选择 [1] 安装依赖"
    echo "   2. 然后选择 [4] 同时启动前后端"
    echo "   3. 在浏览器访问 http://localhost:5173"
    echo ""
    echo -e "${GREEN}📝 注意事项：${NC}"
    echo "   - 需要安装 Node.js 16+ 环境"
    echo "   - 确保端口 3000 和 5173 未被占用"
    echo "   - 首次启动可能需要较长时间"
    echo ""
    echo -e "${GREEN}📚 更多信息：${NC}"
    echo "   - 查看 README.md 了解项目详情"
    echo "   - 查看 QUICK_START.md 快速开始指南"
    echo "   - 查看 docs/ 目录下的详细文档"
    echo ""
    read -p "按回车键继续..."
    show_menu
}

# 检查 Node.js
check_node() {
    if ! command -v node &> /dev/null; then
        echo -e "${RED}错误: 未检测到 Node.js${NC}"
        echo "请先安装 Node.js 16+ 版本"
        echo "访问: https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 16 ]; then
        echo -e "${YELLOW}警告: Node.js 版本过低 (当前: $(node -v))${NC}"
        echo "建议升级到 Node.js 16+ 版本"
        echo ""
    fi
}

# 主程序
main() {
    check_node
    show_menu
}

# 运行主程序
main

