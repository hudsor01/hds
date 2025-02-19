#!/bin/bash

# Kill all MCP processes
pkill -f "@modelcontextprotocol/server-filesystem"
pkill -f "@modelcontextprotocol/server-sequential-thinking"
pkill -f "@modelcontextprotocol/server-memory"
pkill -f "mcp-server-fetch"

# Restart services
npx -y @modelcontextprotocol/server-filesystem \
  /Users/richard/Developer/hds \
  /Users/richard/Developer/hds/app \
  /Users/richard/Developer/hds/components \
  /Users/richard/Developer/hds/emails \
  /Users/richard/Developer/hds/hooks \
  /Users/richard/Developer/hds/lib \
  /Users/richard/Developer/hds/middleware \
  /Users/richard/Developer/hds/server \
  /Users/richard/Developer/hds/supabase \
  /Users/richard/Developer/hds/types \
  /Users/richard/Developer/hds/utils \
  /Users/richard/Developer/hds/tests &

npx -y @modelcontextprotocol/server-sequential-thinking &
npx -y @modelcontextprotocol/server-memory &
/Users/richard/.local/bin/mcp-server-fetch &

echo "MCP servers restarted"
