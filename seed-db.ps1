# Database Seeding Script
Write-Host "🌱 MEAN Stack Database Seeding" -ForegroundColor Green

# Check if MongoDB is running
Write-Host "`nChecking MongoDB connection..." -ForegroundColor Yellow
try {
    $mongoStatus = mongo --eval "print('MongoDB is running')" --quiet 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MongoDB is running" -ForegroundColor Green
    } else {
        Write-Host "⚠️ MongoDB might not be running. Please start MongoDB service." -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️ MongoDB CLI not found or MongoDB not running" -ForegroundColor Yellow
}

# Navigate to collections folder
Set-Location -Path ".\collections"

# Install dependencies if needed
if (!(Test-Path "node_modules")) {
    Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow
    npm install
}

# Run the seeding script
Write-Host "`nRunning database seeding..." -ForegroundColor Yellow
npm run seed

# Return to root directory
Set-Location -Path ".."

Write-Host "`n🎉 Database seeding completed!" -ForegroundColor Green
Write-Host "`nYou can now start your backend server and the mock users will be available." -ForegroundColor Cyan
