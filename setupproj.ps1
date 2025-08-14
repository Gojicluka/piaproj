# Create and setup backend
Write-Host "Setting up backend..." -ForegroundColor Green
Set-Location -Path ".\backend"

# Initialize package.json for backend
Write-Host "Initializing backend package.json..."
@"
{
  `"name`": `"mean-backend`",
  `"version`": `"1.0.0`",
  `"description`": `"MEAN Stack Backend with TypeScript`",
  `"main`": `"dist/server.js`",
  `"scripts`": {
    `"start`": `"node dist/server.js`",
    `"dev`": `"nodemon src/server.ts`",
    `"build`": `"tsc`",
    `"watch`": `"tsc -w`"
  },
  `"dependencies`": {
    `"express`": `"^4.18.2`",
    `"cors`": `"^2.8.5`",
    `"mongoose`": `"^7.4.0`",
    `"body-parser`": `"^1.20.2`",
    `"dotenv`": `"^16.3.1`"
  },
  `"devDependencies`": {
    `"@types/express`": `"^4.17.17`",
    `"@types/cors`": `"^2.8.13`",
    `"@types/node`": `"^18.15.11`",
    `"typescript`": `"^5.0.4`",
    `"ts-node`": `"^10.9.1`",
    `"nodemon`": `"^3.0.1`"
  }
}
"@ | Out-File -FilePath "package.json" -Encoding UTF8

# Install backend dependencies
Write-Host "Installing backend dependencies..."
npm install

# Create tsconfig.json for backend
@"
{
  `"compilerOptions`": {
    `"target`": `"es2018`",
    `"module`": `"commonjs`",
    `"outDir`": `"./dist`",
    `"rootDir`": `"./src`",
    `"strict`": true,
    `"esModuleInterop`": true,
    `"skipLibCheck`": true,
    `"forceConsistentCasingInFileNames`": true,
    `"moduleResolution`": `"node`",
    `"resolveJsonModule`": true,
    `"baseUrl`": `".`",
    `"paths`": {
      `"*`": [`"node_modules/*`"]
    }
  },
  `"include`": [`"src/**/*`"],
  `"exclude`": [`"node_modules`", `"dist`"]
}
"@ | Out-File -FilePath "tsconfig.json" -Encoding UTF8

# Install backend dependencies
Write-Host "Installing backend dependencies..."
npm install

# Create backend structure
Write-Host "Creating backend directory structure..."
New-Item -ItemType Directory -Path ".\src" -Force
New-Item -ItemType Directory -Path ".\src\models" -Force
New-Item -ItemType Directory -Path ".\src\routes" -Force
New-Item -ItemType Directory -Path ".\src\controllers" -Force
New-Item -ItemType Directory -Path ".\src\config" -Force
New-Item -ItemType Directory -Path ".\src\types" -Force

# Create main server file with TypeScript
@"
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { json } from 'body-parser';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/meanapp')
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
  });

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to MEAN Stack Application' });
});

const PORT: number = parseInt(process.env.PORT || '3000', 10);
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
