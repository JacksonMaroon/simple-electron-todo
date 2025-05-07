#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================================${NC}"
echo -e "${BLUE}      Blog Application Restart Instructions          ${NC}"
echo -e "${BLUE}=====================================================${NC}"
echo
echo -e "${GREEN}I fixed the tRPC version mismatch issue in your project.${NC}"
echo
echo -e "The backend was using tRPC version 10.45.1, but the frontend was using 'latest',"
echo -e "which could cause compatibility problems. I updated your package.json to use"
echo -e "the same version across both projects."
echo
echo -e "${BLUE}Follow these steps to restart your application:${NC}"
echo
echo -e "1. Install the updated frontend dependencies:"
echo -e "   cd /Users/jacksonmaroon/Documents/IncubatorGold/Blog/frontendblog"
echo -e "   npm install"
echo
echo -e "2. Restart both applications:"
echo -e "   cd /Users/jacksonmaroon/Documents/IncubatorGold/Blog"
echo -e "   ./start-both.sh"
echo
echo -e "${BLUE}=====================================================${NC}"
echo -e "This should resolve the errors you were seeing with cookies and tRPC requests."
echo -e "If you continue to have issues, you can run ./debug-tRPC.sh to test the API connection."