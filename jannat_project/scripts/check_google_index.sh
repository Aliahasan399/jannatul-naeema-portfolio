#!/usr/bin/env bash
# Google Index Checker — Silent until indexed
URL="https://aliahasan399.github.io/jannatul-naeema-portfolio/"

RESULT=$(curl -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  "https://www.google.com/search?q=site:aliahasan399.github.io/jannatul-naeema-portfolio/" 2>/dev/null \
  | grep -o 'aliahasan399\.github\.io' | head -1)

if [ -n "$RESULT" ]; then
  echo "✅ Jannatul Naeema portfolio is now INDEXED in Google Search!"
  echo ""
  echo "Search it: https://www.google.com/search?q=Jannatul+Naeema+Bangladesh+nurse"
  echo "Direct: ${URL}"
fi
exit 0
