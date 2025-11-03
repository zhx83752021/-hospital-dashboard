@echo off
REM 安装云端部署所需的依赖 (Windows)

echo 🚀 Installing dependencies for cloud deployment...
echo.

REM 后端依赖
echo 📦 Installing backend dependencies...
cd backend
call npm install ioredis@^5.3.2 @upstash/redis@^1.25.0
cd ..

echo.
echo ✅ Dependencies installed successfully!
echo.
echo 📝 Next steps:
echo 1. Follow FREE_DEPLOYMENT_QUICKSTART.md for deployment
echo 2. Or use DEPLOYMENT_CHECKLIST.md for detailed steps
echo.
pause

