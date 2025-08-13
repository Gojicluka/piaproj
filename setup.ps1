# Check if Chocolatey is installed, if not install it
if (!(Test-Path -Path "$env:ProgramData\chocolatey\choco.exe")) {
    Write-Host "Installing Chocolatey..."
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
}

# Install Node.js using Chocolatey
Write-Host "Installing Node.js..."
choco install nodejs -y

# Install MongoDB using Chocolatey
Write-Host "Installing MongoDB..."
choco install mongodb -y

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Install global npm packages
Write-Host "Installing Angular 1.8 and Express.js..."
npm install -g angular@1.8.3
npm install -g angular/cli@18.2.5
npm install -g express
npm install -g express-generator

Write-Host "Setup completed! Here's what was installed:"
Write-Host "- Node.js"
Write-Host "- MongoDB"
Write-Host "- Angular 1.8"
Write-Host "- Express.js"

Write-Host "`nTo verify installations, you can run:"
Write-Host "node --version"
Write-Host "mongo --version"
Write-Host "npm list -g angular"
Write-Host "express --version"
