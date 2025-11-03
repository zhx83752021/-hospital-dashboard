#!/bin/bash

# 医院数字化大屏 - 一键部署脚本
# 用途: 自动化部署到生产环境

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查命令是否存在
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 打印横幅
print_banner() {
    echo -e "${BLUE}"
    echo "========================================"
    echo "   医院数字化大屏 - 自动化部署"
    echo "========================================"
    echo -e "${NC}"
}

# 检查必要工具
check_requirements() {
    log_info "检查部署环境..."
    
    if ! command_exists docker; then
        log_error "Docker 未安装，请先安装 Docker"
        exit 1
    fi
    
    if ! command_exists docker-compose; then
        log_error "Docker Compose 未安装，请先安装 Docker Compose"
        exit 1
    fi
    
    if ! command_exists git; then
        log_error "Git 未安装，请先安装 Git"
        exit 1
    fi
    
    log_success "环境检查通过"
}

# 检查配置文件
check_config() {
    log_info "检查配置文件..."
    
    if [ ! -f .env.production ]; then
        log_warning ".env.production 不存在，从示例文件创建..."
        if [ -f .env.production.example ]; then
            cp .env.production.example .env.production
            log_warning "请编辑 .env.production 填入实际配置值"
            read -p "按回车继续..."
        else
            log_error ".env.production.example 不存在"
            exit 1
        fi
    fi
    
    log_success "配置文件检查完成"
}

# 备份旧版本
backup_old_version() {
    log_info "备份当前版本..."
    
    BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # 备份日志
    if [ -d "logs" ]; then
        cp -r logs "$BACKUP_DIR/"
    fi
    
    # 备份配置
    if [ -f ".env.production" ]; then
        cp .env.production "$BACKUP_DIR/"
    fi
    
    log_success "备份完成: $BACKUP_DIR"
}

# 拉取最新代码
pull_latest_code() {
    log_info "拉取最新代码..."
    
    # 保存本地修改
    git stash
    
    # 拉取最新代码
    git pull origin main
    
    # 恢复本地修改
    git stash pop || true
    
    log_success "代码更新完成"
}

# 构建 Docker 镜像
build_images() {
    log_info "构建 Docker 镜像..."
    
    docker-compose -f docker-compose.prod.yml build --no-cache
    
    log_success "镜像构建完成"
}

# 停止旧容器
stop_old_containers() {
    log_info "停止旧容器..."
    
    docker-compose -f docker-compose.prod.yml down
    
    log_success "旧容器已停止"
}

# 启动新容器
start_new_containers() {
    log_info "启动新容器..."
    
    docker-compose -f docker-compose.prod.yml up -d
    
    log_success "新容器已启动"
}

# 健康检查
health_check() {
    log_info "执行健康检查..."
    
    # 等待服务启动
    sleep 10
    
    # 检查后端
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        log_success "后端服务正常"
    else
        log_error "后端服务异常"
        docker-compose -f docker-compose.prod.yml logs backend
        exit 1
    fi
    
    # 检查前端
    if curl -f http://localhost/ > /dev/null 2>&1; then
        log_success "前端服务正常"
    else
        log_error "前端服务异常"
        docker-compose -f docker-compose.prod.yml logs frontend
        exit 1
    fi
    
    log_success "健康检查通过"
}

# 清理资源
cleanup() {
    log_info "清理无用资源..."
    
    docker system prune -af --volumes
    
    log_success "资源清理完成"
}

# 显示部署信息
show_deployment_info() {
    echo -e "${GREEN}"
    echo "========================================"
    echo "         部署成功！"
    echo "========================================"
    echo -e "${NC}"
    echo "前端地址: http://localhost"
    echo "后端API: http://localhost:3000"
    echo "健康检查: http://localhost:3000/api/health"
    echo ""
    echo "查看日志:"
    echo "  docker-compose -f docker-compose.prod.yml logs -f"
    echo ""
    echo "查看状态:"
    echo "  docker-compose -f docker-compose.prod.yml ps"
    echo ""
}

# 主函数
main() {
    print_banner
    
    # 执行部署流程
    check_requirements
    check_config
    backup_old_version
    
    # 询问是否拉取最新代码
    read -p "是否拉取最新代码? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        pull_latest_code
    fi
    
    build_images
    stop_old_containers
    start_new_containers
    health_check
    
    # 询问是否清理资源
    read -p "是否清理无用的 Docker 资源? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cleanup
    fi
    
    show_deployment_info
}

# 执行主函数
main

