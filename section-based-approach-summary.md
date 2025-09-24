# Section-Based Agents.md Generation

## Overview

The new section-based approach generates individual `Agents.md` files per sitemap section, making the prompts much smaller and more manageable. This allows for targeted updates when only specific sections change.

## Benefits

### 🎯 **Smaller Prompts**
- **Before**: 85,000+ tokens (entire documentation)
- **After**: 5,000-15,000 tokens per section
- **Result**: Much more manageable and cost-effective

### 🔄 **Targeted Updates**
- Only regenerate sections that have changed
- Faster processing for individual sections
- Better error isolation

### 📊 **Better Organization**
- Each section is self-contained
- Easier to review and debug individual sections
- Clear separation of concerns

## New Scripts

### 1. `scripts/section-agents-generator.js`
- Generates individual Agents.md files per section
- Filters bullet points by section
- Creates section-specific prompts
- Saves prompts for review

### 2. `scripts/agents-merger.js`
- Merges all section files into final Agents.md
- Adds project overview and table of contents
- Handles proper formatting and anchors

## New Commands

```bash
# Generate individual sections
npm run section-agents

# Merge sections into final Agents.md
npm run merge-agents

# Full pipeline with section-based approach
npm run full-pipeline
```

## File Structure

```
data/
├── sections/           # Individual section Agents.md files
│   ├── php.md
│   ├── css.md
│   ├── accessibility-coding-standards.md
│   └── ...
├── prompts/           # Section-specific prompts
│   ├── php-prompt.txt
│   ├── css-prompt.txt
│   └── ...
└── bullets/           # Bullet points (unchanged)
    └── ...
```

## Prompt Sizes

| Section | Prompt Size | Bullet Files |
|---------|-------------|--------------|
| PHP | ~136KB | 9 files |
| CSS | ~85KB | 7 files |
| Accessibility | ~24KB | 1 file |
| JavaScript | ~65KB | 5 files |
| SQL | ~45KB | 4 files |
| Others | ~15-30KB | 1 file each |

## Workflow

1. **Generate Sitemap** - Extract documentation links
2. **Download Content** - Get HTML from Drupal.org
3. **Convert to Markdown** - Clean HTML to markdown
4. **Generate Bullet Points** - AI-powered bullet extraction
5. **Generate Sections** - Create individual Agents.md per section
6. **Merge Sections** - Combine into final Agents.md

## Advantages

- ✅ **Manageable prompts** - Each section is 5-15K tokens
- ✅ **Targeted updates** - Only regenerate changed sections
- ✅ **Better debugging** - Isolate issues to specific sections
- ✅ **Cost effective** - Smaller API calls
- ✅ **Maintainable** - Clear separation of concerns
- ✅ **Scalable** - Easy to add new sections

## Next Steps

- Update GitHub Actions to use section-based approach
- Implement smart section update detection
- Add section-specific error handling
- Optimize prompt templates per section type
