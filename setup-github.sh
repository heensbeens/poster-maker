#!/bin/bash

# 🚀 Poster Maker GitHub Setup Script
# This script helps you connect your local repository to GitHub

echo "🎨 Poster Maker GitHub Setup"
echo "=============================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "src/app/page.tsx" ]; then
    echo "❌ Error: Please run this script from the poster-maker directory"
    exit 1
fi

echo "✅ Found poster-maker project"
echo ""

# Check git status
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not initialized"
    echo "Please run: git init"
    exit 1
fi

echo "✅ Git repository found"
echo ""

# Check if remote already exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  Remote 'origin' already exists:"
    git remote get-url origin
    echo ""
    read -p "Do you want to update it? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Please provide your GitHub username:"
        read github_username
        git remote set-url origin "https://github.com/$github_username/poster-maker.git"
        echo "✅ Updated remote origin"
    else
        echo "Skipping remote update"
    fi
else
    echo "📝 Please provide your GitHub username:"
    read github_username
    
    if [ -z "$github_username" ]; then
        echo "❌ Error: Username cannot be empty"
        exit 1
    fi
    
    echo ""
    echo "🔗 Adding remote origin..."
    git remote add origin "https://github.com/$github_username/poster-maker.git"
    echo "✅ Added remote origin"
fi

echo ""
echo "📋 Current git status:"
git status --short

echo ""
echo "🚀 Ready to push to GitHub!"
echo ""
echo "📝 Next steps:"
echo "1. Create a repository on GitHub.com named 'poster-maker'"
echo "2. Run: git push -u origin main"
echo ""
echo "💡 Or use these commands:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""

# Ask if user wants to push now
read -p "Do you want to push to GitHub now? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Pushing to GitHub..."
    git branch -M main
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Success! Your poster maker is now on GitHub!"
        echo "🌐 Visit: https://github.com/$github_username/poster-maker"
    else
        echo ""
        echo "❌ Push failed. Please check:"
        echo "   - GitHub repository exists"
        echo "   - You have proper permissions"
        echo "   - Your credentials are correct"
    fi
else
    echo "📝 Remember to push manually when ready!"
fi

echo ""
echo "📚 For more help, see: setup-github.md"
echo "🎨 Happy coding with your Poster Maker!"
