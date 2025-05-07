#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Testing connection between frontend and backend...${NC}"

# Check if backend is running
echo -e "${BLUE}Checking if backend is running on port 3000...${NC}"
if curl -s http://localhost:3000 > /dev/null; then
  echo -e "${GREEN}✓ Backend is running at http://localhost:3000${NC}"
else
  echo -e "${RED}✗ Backend is not running or not accessible at http://localhost:3000${NC}"
  echo "  Start the backend with: cd backend-blog && npm run dev"
  exit 1
fi

# Check if frontend is running
echo -e "${BLUE}Checking if frontend is running on port 3001...${NC}"
if curl -s http://localhost:3001 > /dev/null; then
  echo -e "${GREEN}✓ Frontend is running at http://localhost:3001${NC}"
else
  echo -e "${RED}✗ Frontend is not running or not accessible at http://localhost:3001${NC}"
  echo "  Start the frontend with: cd frontendblog && npm run dev -- -p 3001"
  exit 1
fi

# Test API endpoint
echo -e "${BLUE}Testing API endpoint...${NC}"
if curl -s http://localhost:3000/api/trpc/health.check?batch=1&input= | grep -q "result"; then
  echo -e "${GREEN}✓ API endpoint is working${NC}"
else
  echo -e "${RED}✗ API endpoint is not working${NC}"
  echo "  Check backend logs for errors"
  exit 1
fi

echo -e "${GREEN}Connection tests completed successfully!${NC}"
echo -e "${BLUE}You can now access your blog at:${NC}"
echo -e "  - Frontend: http://localhost:3001"
echo -e "  - Backend API: http://localhost:3000"