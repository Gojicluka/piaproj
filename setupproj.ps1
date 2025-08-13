# Create and setup backend
Write-Host "Setting up backend..." -ForegroundColor Green
Set-Location -Path ".\backend"

# Initialize package.json for backend
Write-Host "Initializing backend package.json..."
@"
{
  `"name`": `"mean-backend`",
  `"version`": `"1.0.0`",
  `"description`": `"MEAN Stack Backend`",
  `"main`": `"server.js`",
  `"scripts`": {
    `"start`": `"node server.js`",
    `"dev`": `"nodemon server.js`"
  },
  `"dependencies`": {
    `"express`": `"^4.18.2`",
    `"cors`": `"^2.8.5`",
    `"mongoose`": `"^7.4.0`",
    `"body-parser`": `"^1.20.2`",
    `"dotenv`": `"^16.3.1`"
  },
  `"devDependencies`": {
    `"nodemon`": `"^3.0.1`"
  }
}
"@ | Out-File -FilePath "package.json" -Encoding UTF8

# Install backend dependencies
Write-Host "Installing backend dependencies..."
npm install

# Create backend structure
Write-Host "Creating backend directory structure..."
New-Item -ItemType Directory -Path ".\models"
New-Item -ItemType Directory -Path ".\routes"
New-Item -ItemType Directory -Path ".\controllers"
New-Item -ItemType Directory -Path ".\config"

# Create main server file
@"
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/meanapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.error('MongoDB Connection Error:', err);
});

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to MEAN Stack Application' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
"@ | Out-File -FilePath "server.js" -Encoding UTF8

# Create .env file
@"
MONGODB_URI=mongodb://localhost:27017/meanapp
PORT=3000
"@ | Out-File -FilePath ".env" -Encoding UTF8

# Setup Frontend
Write-Host "`nSetting up frontend..." -ForegroundColor Green
Set-Location -Path ".."
Set-Location -Path ".\frontend"

# Initialize Angular project
Write-Host "Creating Angular project..."
npx @angular/cli@18.2.5 new frontend --style=scss --routing=true --skip-git=true --skip-tests=true --defaults

Set-Location -Path ".\frontend"

# Add Bootstrap to index.html
$indexPath = ".\src\index.html"
$indexContent = Get-Content $indexPath
$indexContent = $indexContent -replace "</head>", "  <link rel=`"stylesheet`" href=`"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css`">`n</head>"
$indexContent | Set-Content $indexPath

# Update angular.json to use Bootstrap
$angularJson = Get-Content ".\angular.json" | ConvertFrom-Json
$angularJson.projects.frontend.architect.build.options.styles += "node_modules/bootstrap/dist/css/bootstrap.min.css"
$angularJson | ConvertTo-Json -Depth 100 | Set-Content ".\angular.json"

# Install additional frontend dependencies
Write-Host "Installing additional frontend dependencies..."
npm install bootstrap@4.5.2 jquery@3.5.1 @popperjs/core@2.5.4

Write-Host "`nProject setup completed!" -ForegroundColor Green
Write-Host "To start the backend server:" -ForegroundColor Yellow
Write-Host "1. cd backend" -ForegroundColor Yellow
Write-Host "2. npm run dev" -ForegroundColor Yellow
Write-Host "`nTo start the frontend development server:" -ForegroundColor Yellow
Write-Host "1. cd frontend" -ForegroundColor Yellow
Write-Host "2. ng serve" -ForegroundColor Yellow
