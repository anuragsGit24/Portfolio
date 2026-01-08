import { SectionWrapper } from "./section-wrapper";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GitFork, Star, Github as GithubIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

async function getPinnedRepos() {
  // In a real application, use the GitHub GraphQL API for this.
  // This is mock data for demonstration purposes.
  // The API requires authentication which can't be safely done here without user setup.
  const mockRepos = [
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
  
  // Simulate network delay
  await new Promise(res => setTimeout(res, 1000));
  
  return mockRepos;
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
        A snapshot of my recent work and open-source contributions. This is mock data, but in a real app, it would be live from the GitHub API.
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
                 <div className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full" style={{backgroundColor: repo.primaryLanguage.color}} />
                    <span>{repo.primaryLanguage.name}</span>
                </div>
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
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            <GithubIcon className="mr-2 h-5 w-5"/>
            View All on GitHub
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
