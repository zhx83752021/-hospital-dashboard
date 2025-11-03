@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   医院数字化大屏 - Windows启动脚本
echo ========================================
echo.

:menu
echo 请选择操作：
echo.
echo [1] 安装依赖
echo [2] 启动后端服务
echo [3] 启动前端服务
echo [4] 同时启动前后端（需要先安装依赖）
echo [5] 查看帮助
echo [0] 退出
echo.
set /p choice=请输入选项 (0-5): 

if "%choice%"=="1" goto install
if "%choice%"=="2" goto backend
if "%choice%"=="3" goto frontend
if "%choice%"=="4" goto both
if "%choice%"=="5" goto help
if "%choice%"=="0" goto end
goto menu

:install
echo.
echo ========================================
echo   正在安装依赖...
echo ========================================
echo.
echo [1/3] 安装根目录依赖...
call npm install
echo.
echo [2/3] 安装前端依赖...
cd frontend
call npm install
cd ..
echo.
echo [3/3] 安装后端依赖...
cd backend
call npm install
cd ..
echo.
echo ✅ 依赖安装完成！
echo.
pause
goto menu

:backend
echo.
echo ========================================
echo   启动后端服务...
echo ========================================
echo.
echo 后端服务将在 http://localhost:3000 启动
echo 按 Ctrl+C 可以停止服务
echo.
cd backend
call npm run dev
cd ..
pause
goto menu

:frontend
echo.
echo ========================================
echo   启动前端服务...
echo ========================================
echo.
echo 前端应用将在 http://localhost:5173 启动
echo 按 Ctrl+C 可以停止服务
echo.
cd frontend
call npm run dev
cd ..
pause
goto menu

:both
echo.
echo ========================================
echo   同时启动前后端...
echo ========================================
echo.
echo 后端: http://localhost:3000
echo 前端: http://localhost:5173
echo.
echo ⚠️  请确保已经运行过 [1] 安装依赖
echo.
call npm run dev
pause
goto menu

:help
echo.
echo ========================================
echo   帮助信息
echo ========================================
echo.
echo 🚀 快速开始：
echo    1. 首次使用请先选择 [1] 安装依赖
echo    2. 然后选择 [4] 同时启动前后端
echo    3. 在浏览器访问 http://localhost:5173
echo.
echo 📝 注意事项：
echo    - 需要安装 Node.js 16+ 环境
echo    - 确保端口 3000 和 5173 未被占用
echo    - 首次启动可能需要较长时间
echo.
echo 📚 更多信息：
echo    - 查看 README.md 了解项目详情
echo    - 查看 QUICK_START.md 快速开始指南
echo    - 查看 docs/ 目录下的详细文档
echo.
pause
goto menu

:end
echo.
echo 感谢使用！再见！
echo.
exit

