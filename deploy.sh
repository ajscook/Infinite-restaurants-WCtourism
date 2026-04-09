#!/bin/bash
# deploy.sh
# Usage: ./deploy.sh "your commit message"
# Place this file in the root of your Infinite-restaurants-WCtourism repo.
# Run it from that directory after dropping in updated files.

set -e

MSG="${1:-update platform}"

echo ""
echo "deploying: $MSG"
echo ""

# Stage only the src files that change during platform development
git add src/App.jsx
git add src/PromptGenerator.jsx
git add src/promptTemplates.js
git add public/llms.txt

# Commit - only if there are staged changes
if git diff --cached --quiet; then
  echo "nothing to commit - files unchanged"
  exit 0
fi

git commit -m "$MSG"
git push origin main

echo ""
echo "pushed. vercel is deploying."
echo "watch at: https://vercel.com/ajscook/infinite-restaurants-wctourism"
echo ""
