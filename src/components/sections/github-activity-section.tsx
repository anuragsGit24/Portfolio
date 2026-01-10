import { SectionWrapper } from "./section-wrapper";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GitFork, Star, Github as GithubIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface GitHubRepo {
  id: string;
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  url: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

async function getPinnedRepos(): Promise<GitHubRepo[]> {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_ACCESS_TOKEN;

  if (!username || !token) {
    console.warn("GitHub credentials not configured, falling back to mock data");
    return getMockRepos();
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              id
              name
              description
              stargazerCount
              forkCount
              url
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: parseInt(process.env.GITHUB_API_CACHE_DURATION || '3600') }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors);
      return getMockRepos();
    }

    const repos = data.data?.user?.pinnedItems?.nodes || [];

    // If no pinned repos, try to fetch recent repos instead
    if (repos.length === 0) {
      console.log('No pinned repositories found, fetching recent repositories...');
      return await getRecentRepos(username, token);
    }

    return repos;

  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    return getMockRepos();
  }
}

async function getRecentRepos(username: string, token: string): Promise<GitHubRepo[]> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        repositories(first: 6, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
          nodes {
            id
            name
            description
            stargazerCount
            forkCount
            url
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: parseInt(process.env.GITHUB_API_CACHE_DURATION || '3600') }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors);
      return getMockRepos();
    }

    const repos = data.data?.user?.repositories?.nodes || [];
    return repos.length > 0 ? repos : getMockRepos();

  } catch (error) {
    console.error('Failed to fetch recent repos:', error);
    return getMockRepos();
  }
}

function getMockRepos(): GitHubRepo[] {
  return [
    {
      id: "1",
      name: "personal-portfolio",
      description: "The source code for this very website, built with Next.js and Tailwind CSS.",
      stargazerCount: 128,
      forkCount: 24,
      url: "#",
      primaryLanguage: { name: "TypeScript", color: "#3178c6" },
    },
    {
      id: "2",
      name: "dotfiles",
      description: "My personal development environment configuration.",
      stargazerCount: 72,
      forkCount: 12,
      url: "#",
      primaryLanguage: { name: "Shell", color: "#89e051" },
    },
    {
      id: "3",
      name: "ai-content-summarizer",
      description: "A tool to summarize long articles and documents using generative AI.",
      stargazerCount: 256,
      forkCount: 55,
      url: "#",
      primaryLanguage: { name: "Python", color: "#3572A5" },
    }
  ];
}


export async function GithubActivitySection() {
    let repos;
    try {
        repos = await getPinnedRepos();
    } catch(error) {
        console.error("Failed to fetch GitHub repos:", error);
        return null; // Don't render the section if the fetch fails
    }

  return (
    <SectionWrapper id="github-activity">
      <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-4">GitHub Activity</h2>
      <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        A snapshot of my pinned repositories and recent projects from GitHub.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map(repo => (
          <Card key={repo.id} className="flex flex-col hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <GithubIcon className="w-5 h-5"/>
                <Link href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{repo.name}</Link>
              </CardTitle>
              <CardDescription>{repo.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                 {repo.primaryLanguage && (
                   <div className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-full" style={{backgroundColor: repo.primaryLanguage.color}} />
                      <span>{repo.primaryLanguage.name}</span>
                  </div>
                 )}
                 <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{repo.stargazerCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  <span>{repo.forkCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <Button size="lg" asChild>
          <Link href={`https://github.com/${process.env.GITHUB_USERNAME || ''}`} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="mr-2 h-5 w-5"/>
            View All on GitHub
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
