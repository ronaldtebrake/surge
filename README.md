# Surge Coding Standards

An automated system that tracks Drupal coding standards documentation changes and generates comprehensive `Agents.md` files using AI assistance, with GitHub Pages integration for a custom documentation site.

> Part of the [Drupal Surge](https://www.drupal.org/project/surge) ecosystem - giving AI tools a sense of Drupal.

## 🎯 Project Goals

- Automatically track Drupal coding standards documentation changes
- Generate structured sitemap with real last updated dates
- Use AI to generate comprehensive `Agents.md` file from sitemap data
- Deploy results to GitHub Pages

## 🚀 Features

- **Smart Sitemap Generation**: Daily sitemap generation using curl (bypasses bot detection)
- **Real Last Updated Dates**: Fetches actual modification dates from Drupal pages
- **AI Integration**: ChatGPT-powered documentation generation with smart prompts
- **GitHub Actions**: Fully automated CI/CD pipeline
- **GitHub Pages**: Beautiful static site deployment

## 📁 Project Structure

```
/
├── .github/workflows/     # GitHub Actions workflows
├── data/                  # Generated data
│   └── sitemap.json      # Generated sitemap with real dates
├── scripts/              # Automation scripts
│   ├── sitemap-scraper.js
│   └── agents-generator.js
├── docs/                 # Generated documentation
│   └── Agents.md
└── package.json          # Dependencies
```

## 🔧 Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure GitHub secrets**:
   - `GITHUB_TOKEN`: PAT token for repository access
   - `OPENAI_API_KEY`: OpenAI API key for ChatGPT integration

3. **Run locally**:
   ```bash
   # Generate sitemap
   npm run sitemap

   # Generate Agents.md
   npm run agents
   ```

## 🤖 Automation

The system runs automatically via GitHub Actions:

1. **Daily Sitemap Generation** (2 AM UTC) - Downloads main page and extracts all links with real last updated dates
2. **AI Documentation Generation** (triggered by sitemap changes) - Generates comprehensive Agents.md using smart prompts

## 📊 Status

- [x] Repository setup
- [x] GitHub Actions workflows
- [x] Sitemap generation (curl-based)
- [x] AI integration with smart prompts
- [x] Fallback content generation
- [ ] GitHub Pages deployment

## 🤖 Drupal Surge Integration

This project is part of the [Drupal Surge](https://www.drupal.org/project/surge) ecosystem, which aims to give AI tools a sense of Drupal and ensure diverse setups shape the context needed to guide AI to write for, and work with Drupal.

### AGENTS.md Standard

The generated `Agents.md` file follows the emerging AGENTS.md standard used by 20k+ open-source projects and works with modern AI-powered development tools including:

- **Cursor** - Modern AI-powered code editor
- **Claude** - Anthropic's AI assistant  
- **Codex** - OpenAI's code generation model
- **Amp, Jules, Factory, RooCode** - And 10+ other modern agents

### How It Works

1. **Automated Scraping**: Daily extraction of Drupal coding standards
2. **AI Processing**: ChatGPT generates comprehensive Agents.md file
3. **IDE Integration**: Works seamlessly with AI-powered development tools
4. **Community Guidelines**: Automatically merges project-specific guidelines

## 🔗 Links

- [Project Plan](./PROJECT_PLAN.md)
- [Generated Documentation](./docs/Agents.md)
- [Drupal Surge Project](https://www.drupal.org/project/surge)
- [Drupal Official Docs](https://www.drupal.org/docs/develop/standards)

## 📝 License

MIT License - see LICENSE file for details.
