#!/bin/bash

echo "🔍 Git Repository Status Check"
echo "=============================="

# Check current branch
echo -e "\n📌 Current Branch:"
git branch --show-current

# Check for uncommitted changes
echo -e "\n📝 Uncommitted Changes:"
git status --porcelain

# Check unpushed commits
echo -e "\n📤 Unpushed Commits:"
git log origin/$(git branch --show-current)..HEAD --oneline

# Show recent commits
echo -e "\n📜 Recent Commits (last 5):"
git log --oneline -5

# Check remote status
echo -e "\n🌐 Remote Status:"
git remote -v

# Check if all files are tracked
echo -e "\n📁 Untracked Files:"
git ls-files --others --exclude-standard

echo -e "\n✅ Check Complete!"