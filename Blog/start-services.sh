#!/bin/bash

# Start both the backend and frontend services

echo "Starting the backend service..."
cd /Users/jacksonmaroon/Documents/IncubatorGold/Blog/backend-blog
pnpm prisma generate
pnpm dev &
BACKEND_PID=$!

echo "Waiting for backend to initialize (5 seconds)..."
sleep 5

echo "Starting the frontend service..."
cd /Users/jacksonmaroon/Documents/IncubatorGold/Blog/frontendblog
pnpm dev &
FRONTEND_PID=$!

echo "Services started successfully!"
echo "Backend running on port 3000 with PID $BACKEND_PID"
echo "Frontend running on port 3001 with PID $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for user to press Ctrl+C
wait $BACKEND_PID $FRONTEND_PID