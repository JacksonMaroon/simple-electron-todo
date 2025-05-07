# Blog Application Installation Instructions

## Fixed Issues:

1. **tRPC Version Mismatch**: Aligned the tRPC versions between frontend and backend
2. **React Compatibility**: Downgraded React from v19 to v18 since tRPC 10.x doesn't support React 19 yet
3. **Next.js Compatibility**: Downgraded Next.js to 14.1.0 for better compatibility with React 18
4. **date-fns Compatibility**: Downgraded date-fns from 4.1.0 to ^2.30.0 for compatibility with react-day-picker

## Installation Steps:

```bash
# Clean node_modules and package-lock.json to ensure clean install
cd /Users/jacksonmaroon/Documents/IncubatorGold/Blog/frontendblog
rm -rf node_modules package-lock.json

# Install packages with the updated versions and bypass peer dependency checks
npm install --legacy-peer-deps

# Return to main directory
cd ..

# Start both applications (backend on port 3000, frontend on port 3001)
./start-both.sh
```

## Troubleshooting:

If you still encounter issues, try forcing the installation:

```bash
cd /Users/jacksonmaroon/Documents/IncubatorGold/Blog/frontendblog
npm install --force
```

## What Changed:

1. Updated package.json to use fixed versions:
   - Changed React from v19 to v18 (and React types to match)
   - Changed Next.js from 15.2.4 to v14.x
   - Set tRPC packages to match backend version (^10.45.1)
   - Changed date-fns from 4.1.0 to ^2.30.0 (for compatibility with react-day-picker)
   - Changed @tanstack/react-query from v5 to v4.29.5 (required by tRPC v10)

2. Fixed cookies handling in the frontend code:
   - Updated server-client.ts to properly handle cookies
   - Made server context creation more robust

Now the frontend and backend should be able to communicate without port conflicts or version mismatches.