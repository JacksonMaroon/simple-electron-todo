#!/bin/bash

# Update all imports from server.ts to server-client.ts
find /Users/jacksonmaroon/Documents/IncubatorGold/Blog/frontendblog/app -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/import { serverClient } from "@\/lib\/trpc\/server"/import { serverClient } from "@\/lib\/trpc\/server-client"/g'

echo "Imports updated successfully!"