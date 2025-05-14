#!/bin/bash

# Cleanup script for Animal Welfare NGO project
echo "🧹 Starting cleanup process..."

# Backup any important files first
mkdir -p ./backup/misc
echo "Creating backup of important files..."

# Remove unnecessary files
echo "Removing unnecessary files..."

# Clean test/development files
find . -name "*.test.*" -type f -not -path "./node_modules/*" -exec mv {} ./backup/misc/ \;
find . -name "*.dev.*" -type f -not -path "./node_modules/*" -exec mv {} ./backup/misc/ \;
find . -name "test-*.*" -type f -not -path "./node_modules/*" -exec mv {} ./backup/misc/ \;
find . -name "*.new" -type f -not -path "./node_modules/*" -exec rm {} \;

# Remove duplicate utility files
if [ -f "./src/utils/test-nav.ts" ]; then
  mv ./src/utils/test-nav.ts ./backup/misc/
fi

# Clean Next.js output
rm -rf ./.next/cache/* 2>/dev/null

# Remove old React Router navigation if it exists
if [ -f "./src/utils/router.ts" ]; then
  mv ./src/utils/router.ts ./backup/misc/
fi

# Clean up redundant components if they exist
if [ -f "./src/app/page.tsx.new" ]; then
  rm ./src/app/page.tsx.new
fi

# List created documentation files
echo ""
echo "📑 Documentation files created:"
ls -la ./*.md | grep -v "README.md"
echo ""

echo "🎉 Cleanup completed! Project structure has been optimized."