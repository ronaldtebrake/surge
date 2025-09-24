# Drupal Developer Documentation Automation Project

## Project Overview
Create an automated system that scrapes Drupal developer documentation, tracks changes, and generates an `Agents.md` file using AI assistance, with GitHub Pages integration for a custom documentation site.

## Project Goals
- Automatically scrape and track Drupal coding standards documentation
- Generate structured sitemap with change tracking and real last updated dates
- Use AI to generate comprehensive `Agents.md` file from sitemap data
- Deploy results to GitHub Pages

---

## Phase 1: Project Setup & Infrastructure

### 1.1 Repository Structure Setup
- [X] Create proper directory structure:
  ```
  /
  ├── .github/
  │   └── workflows/
  │       ├── sitemap-generator.yml
  │       ├── content-updater.yml
  │       └── agents-generator.yml
  ├── data/
  │   └── sitemap.json
  ├── scripts/
  │   ├── sitemap-scraper.js
  │   └── agents-generator.js
  ├── docs/
  │   └── Agents.md
  ├── README.md
  └── index.html (for GitHub Pages)
  ```

### 1.2 GitHub Repository Configuration
- [X] Set up GitHub repository with proper permissions
- [X] Configure GitHub Pages settings
- [X] Create necessary GitHub secrets:
  - `GITHUB_TOKEN` (PAT token for repository access)
  - `OPENAI_API_KEY` (for ChatGPT integration)
  - `PLAYWRIGHT_BROWSERS` (for Playwright setup)

### 1.3 Dependencies & Package Management
- [X] Create `package.json` with required dependencies:
  - curl for web scraping (via child_process)
  - OpenAI for AI integration
  - fs-extra for file operations
  - Node.js for automation scripts
  - GitHub Actions for CI/CD

---

## Phase 2: Sitemap Generation System

### 2.1 Sitemap Scraper Development
- [X] Create `scripts/sitemap-scraper.js`:
  - [X] Download https://www.drupal.org/docs/develop/standards using curl
  - [X] Extract all section headers (PHP, CSS, JavaScript, etc.)
  - [X] Extract all documentation links under each section
  - [X] Scrape last updated timestamps from each page using curl
  - [X] Generate structured JSON output

### 2.2 JSON Structure Implementation
- [X] Implement the required JSON structure:
  ```json
  {
    "PHP": {
      "https://www.drupal.org/docs/develop/standards/php": "2024-04-11",
      "https://www.drupal.org/docs/develop/standards/php/php-coding-standards": "2025-08-16"
    },
    "CSS": {
      "https://www.drupal.org/docs/develop/standards/css": "2023-01-19"
    }
  }
  ```

### 2.3 GitHub Actions Workflow for Sitemap
- [X] Create `.github/workflows/sitemap-generator.yml`:
  - [X] Run on cron schedule (daily at 2 AM UTC)
  - [X] Execute sitemap scraper (no Playwright needed)
  - [X] Compare with existing sitemap.json
  - [X] Create pull request if changes detected
  - [X] Label PR with "needs: content update"

---

## Phase 3: AI-Powered Agents.md Generation

### 3.1 Agents Generator Development
- [X] Create `scripts/agents-generator.js`:
  - [X] Read sitemap.json with all documentation links and dates
  - [X] Generate comprehensive Agents.md using AI (OpenAI GPT-4)
  - [X] Use smart prompts with sitemap data for context
  - [X] Include fallback content generation when API unavailable

### 3.2 Smart Prompt Engineering
- [X] Implement intelligent prompt system:
  - [X] Analyze sitemap structure and extract topics
  - [X] Generate detailed prompts with section breakdowns
  - [X] Include last updated dates and page counts
  - [X] Create comprehensive requirements for AI generation

### 3.3 GitHub Actions Workflow for Agents.md Updates
- [X] Create `.github/workflows/agents-generator.yml`:
  - [X] Triggered by sitemap changes (PRs with "needs: agents.md update" label)
  - [X] Run agents generator with OpenAI API
  - [X] Generate comprehensive Agents.md file
  - [X] Commit changes to the PR branch

---

## Phase 5: GitHub Pages Integration

### 5.1 Static Site Generation
- [ ] Create `index.html` for GitHub Pages:
  - [ ] Beautiful minimal design
  - [ ] Display `Agents.md` content

### 5.2 Documentation Enhancement
- [ ] Update main `README.md`:
  - [ ] Project description and goals
  - [ ] Usage instructions
  - [ ] Link to GitHub Pages site
  - [ ] Contributing guidelines
  - [ ] Status badges and metrics

### 5.3 GitHub Pages Workflow
- [ ] Configure automatic deployment:
  - [ ] Deploy on every main branch update

---

*This plan provides a comprehensive roadmap for creating an automated Drupal documentation system. Each phase builds upon the previous one, ensuring a solid foundation for the entire project.*
