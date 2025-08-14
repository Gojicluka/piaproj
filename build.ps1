# MEAN Stack Build Script
Write-Host "Starting MEAN Stack Build Process..." -ForegroundColor Green

# Build Shared Package
Write-Host "`nBuilding shared package..." -ForegroundColor Yellow
Set-Location -Path ".\shared"
if (Test-Path "package.json") {
    npm install
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Shared package built successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Shared package build failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✗ Shared package.json not found" -ForegroundColor Red
    exit 1
}

# Build Backend
Write-Host "`nBuilding backend..." -ForegroundColor Yellow
Set-Location -Path "..\backend"
if (Test-Path "package.json") {
    npm install
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Backend built successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Backend build failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✗ Backend package.json not found" -ForegroundColor Red
    exit 1
}

# # Build Frontend (Optional)
# Write-Host "`nBuilding frontend..." -ForegroundColor Yellow
# Set-Location -Path "..\frontend"
# if (Test-Path "package.json") {
#     npm install
#     npm run build
#     if ($LASTEXITCODE -eq 0) {
#         Write-Host "✓ Frontend built successfully" -ForegroundColor Green
#     } else {
#         Write-Host "✗ Frontend build failed" -ForegroundColor Red
#         exit 1
#     }
# } else {
#     Write-Host "✗ Frontend package.json not found" -ForegroundColor Red
#     exit 1
# }

# Return to root directory
Set-Location -Path ".."

Write-Host "`n🎉 All components built successfully!" -ForegroundColor Green
Write-Host "`nTo start the application:" -ForegroundColor Cyan
Write-Host "1. Start backend: cd backend && npm run dev" -ForegroundColor White
Write-Host "2. Start frontend: cd frontend && ng serve" -ForegroundColor White
