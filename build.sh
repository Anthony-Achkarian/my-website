#!/bin/bash
set -e
echo "=== Installing dependencies ==="
npm install
echo "=== Building Next.js app ==="
npm run build --workspace=apps/web
echo "=== Build complete ==="
