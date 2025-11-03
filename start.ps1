# 医院数字化大屏 - 启动脚本
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   医院数字化大屏系统 - 启动中..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查并结束占用端口的进程
function Stop-PortProcess {
    param($Port)
    $process = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($process) {
        $pid = $process.OwningProcess
        Write-Host "发现端口 $Port 被进程 $pid 占用，正在结束..." -ForegroundColor Yellow
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 1
    }
}

# 清理端口
Write-Host "1. 检查端口占用情况..." -ForegroundColor Green
Stop-PortProcess -Port 3000
Stop-PortProcess -Port 5173

Write-Host ""
Write-Host "2. 启动后端服务 (端口 3000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; node server.js"

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "3. 启动前端服务 (端口 5173)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Start-Sleep -Seconds 5

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ✅ 启动完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "前端访问地址: http://localhost:5173" -ForegroundColor Yellow
Write-Host "后端API地址:  http://localhost:3000" -ForegroundColor Yellow
Write-Host "健康检查:     http://localhost:3000/api/health" -ForegroundColor Yellow
Write-Host ""
Write-Host "按任意键退出启动脚本（服务将继续在后台运行）..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

