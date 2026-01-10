import { getPinnedRepos } from './src/components/sections/github-activity-section';

async function testGitHubAPI() {
  console.log('Testing GitHub API...');
  try {
    const repos = await getPinnedRepos();
    console.log('Success! Found', repos.length, 'repositories:');
    repos.forEach(repo => {
      console.log(`- ${repo.name}: ${repo.description}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

testGitHubAPI();