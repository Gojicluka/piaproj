# Collections - Mock Data

This folder contains mock data and seeding scripts for the MEAN stack project.

## Files

- `users.json` - Mock user data with various user types
- `seed.ts` - TypeScript seeding script
- `package.json` - Dependencies for the seeding script

## Mock Users

The mock data includes:

### Tourists (turista)
- marko_tourist - Marko Petrović (VISA card)
- milica_tourist - Milica Stojanović (VISA card)  
- jovana_tourist - Jovana Radić (VISA card)

### Weekend House Owners (vlasnik_vikendice)
- ana_owner - Ana Jovanović (MASTERCARD)
- nikola_owner - Nikola Milanović (MASTERCARD)
- vladimir_owner - Vladimir Đorđević (DINERS)

### Administrators (administrator)
- admin_stefan - Stefan Nikolić (DINERS)
- jelena_admin - Jelena Kostić (MASTERCARD)

## Usage

### Method 1: Using PowerShell Script (Recommended)
```powershell
.\seed-db.ps1
```

### Method 2: Manual
```bash
cd collections
npm install
npm run seed
```

## Notes

- All passwords follow the validation rules (6-10 chars, 1 uppercase, 3 lowercase, 1 number, 1 special char)
- Credit card numbers are valid according to the specified patterns
- The script will clear existing users before inserting new ones
- Make sure MongoDB is running before executing the script
