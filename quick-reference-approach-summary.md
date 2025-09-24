# Quick Reference Approach - Summary

## Overview

The new Quick Reference approach generates individual Quick Reference pages for each Drupal documentation page, making the prompts much smaller and the output more concise and actionable.

## Key Improvements

### 🎯 **Much Smaller Prompts**
- **Before**: 85,000+ tokens (entire documentation) or 136KB per section
- **After**: 5,000-8,000 tokens per page (5-8KB)
- **Result**: 95% reduction in prompt size

### 📄 **Page-Based Generation**
- **Before**: 11 sections (some very large like PHP with 9 pages)
- **After**: 32 individual pages (each page gets its own Quick Reference)
- **Result**: Better granularity and targeted updates

### ⚡ **Quick Reference Format**
- **Before**: Full comprehensive content
- **After**: Concise, scannable Quick Reference lists
- **Result**: More actionable and easier to use

## New Scripts

### 1. `scripts/page-agents-generator.js`
- Generates individual Quick Reference pages
- Creates page-specific prompts (5-8KB each)
- Focuses on essential rules and guidelines
- Saves prompts for review

### 2. `scripts/quickref-merger.js`
- Merges all Quick Reference pages into final Agents.md
- Adds project overview and table of contents
- Handles proper formatting and anchors

## New Commands

```bash
# Generate individual Quick Reference pages
npm run page-agents

# Merge Quick Reference pages into final Agents.md
npm run merge-quickref

# Full pipeline with Quick Reference approach
npm run full-pipeline
```

## File Structure

```
data/
├── pages/              # Individual Quick Reference pages
│   ├── php-quickref.md
│   ├── css-quickref.md
│   ├── spelling-quickref.md
│   └── ...
├── prompts/            # Page-specific prompts
│   ├── php-quickref-prompt.txt
│   ├── css-quickref-prompt.txt
│   └── ...
└── bullets/            # Bullet points (unchanged)
    └── ...
```

## Prompt Sizes

| Page Type | Prompt Size | Content |
|-----------|-------------|---------|
| Simple pages | ~5KB | 1 bullet file |
| Complex pages | ~8KB | Multiple bullet files |
| PHP pages | ~6-8KB | Individual PHP topics |

## Quick Reference Format

Each page follows this structure:

```markdown
# [Topic] - Quick Reference

## Key Rules
- [Essential rule 1]
- [Essential rule 2]

## Naming Conventions
- [Naming rule 1]
- [Naming rule 2]

## Best Practices
- [Best practice 1]
- [Best practice 2]

## Common Standards
- [Standard 1]
- [Standard 2]

## Important Notes
- [Important note 1]
- [Important note 2]

---
*Source: [URL]*
```

## Results

### 📊 **Generation Stats**
- **Total pages**: 34 (33 generated successfully)
- **Final file size**: 77.9 KB
- **Prompt size reduction**: 95% (from 85KB to 5-8KB per page)
- **Content format**: Quick Reference lists

### ✅ **Benefits**
- **Manageable prompts** - Each page is 5-8KB instead of 85KB+
- **Targeted updates** - Only regenerate changed pages
- **Better debugging** - Isolate issues to specific pages
- **Cost effective** - Much smaller API calls
- **Scannable content** - Quick Reference format is easier to use
- **Granular control** - Each Drupal page gets its own Quick Reference

### 🎯 **Quality Improvements**
- **Concise content** - Focus on essential rules only
- **Actionable guidelines** - Each point is something AI can implement
- **Consistent format** - Standardized Quick Reference structure
- **Source attribution** - Each page links to original documentation

## Example Output

**Spelling Quick Reference:**
```markdown
# Spelling - Quick Reference

## Key Rules
- Drupal Core uses US English spelling for all source code
- Core code is automatically checked for spelling by CSpell
- For in line documentation settings use all lower case for cspell

## Best Practices
- Use the `cspell:ignore` directive for ignored words
- Disable CSpell for non-English or nonsense strings
- Use `// cspell:disable-next-line` for single lines

## Common Standards
- Words are listed alphabetically with single space between
- Use multiple lines to meet character per line limits
- Note that `cspell` is always lower case

---
*Source: https://www.drupal.org/docs/develop/standards/spelling*
```

The Quick Reference approach provides a much more efficient, manageable, and actionable system for generating Drupal coding standards for AI agents! 🚀
