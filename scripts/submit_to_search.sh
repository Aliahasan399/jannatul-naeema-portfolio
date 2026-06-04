#!/usr/bin/env bash
# Submit sitemap to major search engines
set -e

SITE="https://aliahasan399.github.io/jannatul-naeema-portfolio"
SITEMAP="${SITE}/sitemap.xml"

echo "=== Submitting sitemap to search engines ==="

# Google - try multiple endpoints
echo -n "Google (sitemap-ping): "
curl -s -o /dev/null -w "%{http_code}" "https://www.google.com/ping?sitemap=${SITEMAP}" 2>/dev/null || echo "failed"

echo ""
echo -n "Google (webmasters/ping): "
curl -s -o /dev/null -w "%{http_code}" "https://www.google.com/webmasters/tools/ping?sitemap=${SITEMAP}" 2>/dev/null || echo "failed"

echo ""
echo -n "Google (new submit): "
curl -s -o /dev/null -w "%{http_code}" -L "https://search.google.com/search-console/inspect?resource_id=${SITE}" 2>/dev/null || echo "failed"

echo ""
# Bing
echo -n "Bing: "
curl -s -o /dev/null -w "%{http_code}" "https://www.bing.com/ping?sitemap=${SITEMAP}" 2>/dev/null || echo "failed"

echo ""
# IndexNow (Bing, Yandex)
echo -n "IndexNow: "
curl -s -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "{\"host\": \"aliahasan399.github.io\",\"key\": \"jannatul-naeema\",\"keyLocation\": \"${SITE}/indexnow.txt\",\"urlList\": [\"${SITE}/\"]}" \
  -o /dev/null -w "%{http_code}" 2>/dev/null || echo "failed"

echo ""
echo "=== Done ==="
