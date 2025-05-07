#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Testing tRPC API connection...${NC}"

# Create a temp file for the JSON request body
REQUEST_BODY_FILE=$(mktemp)
cat > "$REQUEST_BODY_FILE" << EOF
{
  "0": {
    "page": 1,
    "limit": 10
  }
}
EOF

# Make the actual API call with proper input
echo -e "${BLUE}Testing posts.list endpoint with proper JSON input...${NC}"
RESPONSE=$(curl -s -X GET "http://localhost:3000/api/trpc/posts.list?batch=1" \
  -H "Content-Type: application/json" \
  --data-binary @"$REQUEST_BODY_FILE")

# Clean up temp file
rm "$REQUEST_BODY_FILE"

# Check if the response is valid
if [[ "$RESPONSE" == *"\"result\""* ]]; then
  echo -e "${GREEN}✓ API call succeeded! Here's the first part of the response:${NC}"
  echo "$RESPONSE" | head -n 20
else
  echo -e "${RED}✗ API call failed. Response:${NC}"
  echo "$RESPONSE"
fi

echo -e "\n${BLUE}Debug information:${NC}"
echo "1. Make sure both frontend and backend are running"
echo "2. Frontend should be on port 3001, backend on port 3000"
echo "3. The .env.local file in frontend should have NEXT_PUBLIC_API_URL=http://localhost:3000"

echo -e "\n${BLUE}Suggested fixes:${NC}"
echo "1. Make sure the tRPC client is correctly configured with the transformer"
echo "2. Check that the frontend and backend are using compatible tRPC versions"
echo "3. Ensure the input validation on the server is properly handling the client input"