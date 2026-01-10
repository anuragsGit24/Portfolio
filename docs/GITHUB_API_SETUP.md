# GitHub API Integration Setup

This guide explains how to set up and integrate the GitHub API with your portfolio website to display your real GitHub repositories and activity.

## Prerequisites

- A GitHub account
- Your portfolio website project

## Step 1: Create a GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "Portfolio Website API"
4. Select the following scopes:
   - `public_repo` (to read public repository information)
   - `read:user` (to read user profile information)
5. Click "Generate token"
6. **Important**: Copy the token immediately - you won't be able to see it again!

## Step 2: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values:

```env
GITHUB_ACCESS_TOKEN=ghp_your_actual_token_here
GITHUB_USERNAME=your_github_username_here
```

Example:
```env
GITHUB_ACCESS_TOKEN=ghp_1234567890abcdef1234567890abcdef12345678
GITHUB_USERNAME=john-doe
```

## Step 3: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit your portfolio website
3. Check the "GitHub Activity" section - it should now display your real pinned repositories

## How It Works

The integration uses GitHub's GraphQL API to fetch your pinned repositories. The code includes:

- **Authentication**: Uses your personal access token for API requests
- **Caching**: Results are cached for 1 hour (configurable via `GITHUB_API_CACHE_DURATION`)
- **Fallback**: If API credentials are missing or fail, it falls back to mock data
- **Error Handling**: Gracefully handles API errors and rate limits

## Security Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`
- Personal access tokens have full access to your GitHub account - keep them secure
- Consider using GitHub Apps instead of personal access tokens for production applications

## Troubleshooting

### "GitHub credentials not configured" warning
- Check that your `.env.local` file exists and contains the correct values
- Restart your development server after adding environment variables

### API Rate Limits
- GitHub allows 5,000 requests per hour with authentication
- Without authentication, you get 60 requests per hour
- The code includes caching to minimize API calls

### No repositories showing
- Make sure you have pinned repositories on GitHub
- Check that your `GITHUB_USERNAME` matches your GitHub username exactly
- Verify your token has the correct permissions

## Advanced Configuration

You can customize the behavior by modifying these environment variables:

- `GITHUB_API_CACHE_DURATION`: How long to cache API responses (in seconds, default: 3600)

## API Reference

The integration fetches:
- Repository name and description
- Star count
- Fork count
- Primary programming language
- Repository URL

For more information about the GitHub GraphQL API, visit: https://docs.github.com/en/graphql