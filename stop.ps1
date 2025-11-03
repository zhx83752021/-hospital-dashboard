# 医院数字化大屏 - 停止脚本
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   医院数字化大屏系统 - 停止中..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 停止占用指定端口的进程
function Stop-PortProcess {
    param($Port, $Name)
    $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($connections) {
        $pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique
        foreach ($pid in $pids) {
            Write-Host "正在停止 $Name 服务 (PID: $pid, 端口: $Port)..." -ForegroundColor Yellow
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        }
        Write-Host "✅ $Name 服务已停止" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  $Name 服务未运行" -ForegroundColor Gray
    }
}

# 停止后端
Write-Host "1. 停止后端服务..." -ForegroundColor Yellow
Stop-PortProcess -Port 3000 -Name "后端"

Start-Sleep -Seconds 1

# 停止前端
Write-Host ""
Write-Host "2. 停止前端服务..." -ForegroundColor Yellow
Stop-PortProcess -Port 5173 -Name "前端"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ✅ 所有服务已停止" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

