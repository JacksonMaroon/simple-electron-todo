#!/bin/bash

# Start the backend in the background
echo "Starting backend on port 3000..."
cd "$(dirname "$0")/backend-blog" && npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start initializing
sleep 2

# Start the frontend with a different port
echo "Starting frontend on port 3001..."
cd "$(dirname "$0")/frontendblog" && npm run dev -- -p 3001

# If frontend is stopped, also kill the backend
kill $BACKEND_PID