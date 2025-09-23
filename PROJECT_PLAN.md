# Drupal Developer Documentation Automation Project

## Project Overview
Create an automated system that scrapes Drupal developer documentation, tracks changes, and generates an `Agents.md` file using AI assistance, with GitHub Pages integration for a custom documentation site.

## Project Goals
- Automatically scrape and track Drupal coding standards documentation
- Generate structured sitemap with change tracking
- Create markdown files for documentation pages
- Use AI to generate comprehensive `Agents.md` file
- Deploy results to GitHub Pages

---

## Phase 1: Project Setup & Infrastructure

### 1.1 Repository Structure Setup
- [ ] Create proper directory structure:
  ```
  /
  ├── .github/
  │   └── workflows/
  │       ├── sitemap-generator.yml
  │       ├── content-updater.yml
  │       └── agents-generator.yml
  ├── data/
  │   ├── sitemap.json
  │   └── pages/
  │       └── *.md
  ├── scripts/
  │   ├── sitemap-scraper.js
  │   ├── content-scraper.js
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
- [ ] Create `package.json` with required dependencies:
  - Playwright for web scraping
  - Node.js for automation scripts
  - GitHub Actions for CI/CD
- [ ] Set up Playwright browser installation in GitHub Actions

---

## Phase 2: Sitemap Generation System

### 2.1 Sitemap Scraper Development
- [ ] Create `scripts/sitemap-scraper.js`:
  - [ ] Navigate to https://www.drupal.org/docs/develop/standards
  - [ ] Extract all section headers (PHP, CSS, JavaScript, etc.)
  - [ ] Extract all documentation links under each section
  - [ ] Scrape last updated timestamps from each page
  - [ ] Generate structured JSON output

### 2.2 JSON Structure Implementation
- [ ] Implement the required JSON structure:
  ```json
  {
    "PHP Coding Standards": {
      "https://www.drupal.org/docs/develop/standards/php/php-coding-standards": "2024-01-15",
      "https://www.drupal.org/docs/develop/standards/php/php-coding-standards/php-coding-standards": "2024-01-10"
    },
    "CSS Coding Standards": {
      "https://www.drupal.org/docs/develop/standards/css": "2024-01-12"
    }
  }
  ```

### 2.3 GitHub Actions Workflow for Sitemap
- [ ] Create `.github/workflows/sitemap-generator.yml`:
  - [ ] Run on cron schedule (daily at 2 AM UTC)
  - [ ] Set up Playwright environment
  - [ ] Execute sitemap scraper
  - [ ] Compare with existing sitemap.json
  - [ ] Commit changes if updates detected
  - [ ] Trigger content updater workflow

---

## Phase 3: Content Management System

### 3.1 Content Scraper Development
- [ ] Create `scripts/content-scraper.js`:
  - [ ] Read sitemap.json
  - [ ] Compare last_updated timestamps
  - [ ] Scrape only changed pages
  - [ ] Convert HTML content to clean markdown
  - [ ] Save markdown files to `data/pages/`

### 3.2 Change Detection Logic
- [ ] Implement smart change detection:
  - [ ] Compare timestamps from sitemap
  - [ ] Check file modification dates
  - [ ] Hash content for additional verification
  - [ ] Only process truly changed content

### 3.3 GitHub Actions Workflow for Content Updates
- [ ] Create `.github/workflows/content-updater.yml`:
  - [ ] Triggered by sitemap changes
  - [ ] Run content scraper
  - [ ] Create pull request with changes
  - [ ] Add label "needs: agents.md update"
  - [ ] Include summary of updated pages

---

## Phase 4: AI-Powered Agents.md Generation

### 4.1 AI Integration Script
- [ ] Create `scripts/agents-generator.js`:
  - [ ] Read all markdown files from `data/pages/`
  - [ ] Combine content intelligently
  - [ ] Send to OpenAI API with structured prompt
  - [ ] Generate comprehensive `Agents.md` file
  - [ ] Handle API rate limiting and errors

### 4.2 Prompt Engineering
- [ ] Design effective prompt for ChatGPT:
  - [ ] Include context about Drupal coding standards
  - [ ] Specify desired output format
  - [ ] Include examples of good documentation structure
  - [ ] Request specific sections (overview, standards, examples, etc.)

### 4.3 GitHub Actions Workflow for AI Generation
- [ ] Create `.github/workflows/agents-generator.yml`:
  - [ ] Triggered by PRs with "needs: agents.md update" label
  - [ ] Only runs for user ronaltebrake
  - [ ] Run agents generator script
  - [ ] Create commit with updated `Agents.md`
  - [ ] Update PR with generated content
  - [ ] Remove the trigger label

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
