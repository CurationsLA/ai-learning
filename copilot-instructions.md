# GitHub Copilot Instructions for BUNKER Repository

## Repository Overview

**BUNKER** (formerly CURATIONS) is an open-source knowledge base for AI development, collaboration, and creativity containing documentation, cookbooks, and guides for AI agent development.

## Build System

### Primary: Astro + Starlight (Active)
- Framework: Astro 4.16.17 with Starlight 0.28.4
- Build: `npm run build` (~15s for 41 pages)
- Dev: `npm run dev`
- Output: `dist/` directory
- Search: Pagefind (6,763 words indexed)

### Legacy: BookGen (Functional, deprecated)
- Build: `./.bookgen/build.sh`
- Output: `_book/` directory

## File Structure

```
ai-learning/
├── src/content/docs/       # All markdown documentation
│   ├── cookbooks/          # AI cookbooks (foundations, rag, agents, tools, advanced-prompting, business, legendary)
│   └── *.md                # Root pages
├── src/content/config.ts   # Content schema (docsSchema)
├── astro.config.mjs        # Configuration (sidebar, site, base path)
├── package.json            # Dependencies and scripts
├── SUMMARY.md              # Legacy navigation (BookGen)
└── MIGRATION.md            # Migration documentation
```

## Configuration

**astro.config.mjs**: Site (`https://curationsla.github.io/ai-learning`), sidebar (Welcome, Community, auto-generated Cookbooks)
**package.json**: Scripts (dev, start, build, preview)
**config.ts**: Uses `docsSchema()` - all pages require `title` in frontmatter

## Working with Content

### Adding Pages
1. Create `.md` in `src/content/docs/` with required frontmatter
2. Update `astro.config.mjs` sidebar (if manual entry needed)
3. Cookbooks auto-generate sidebar entries

**Example frontmatter:**
```yaml
---
title: "Page Title"
---
```

**For titles with colons:**
```yaml
---
title: "Memory: Building Context-Aware Agents"
---
```

### Learning Labels Pattern
Cookbook pages use "Seedling Concept" for learning objectives:
```markdown
## 🌱 Seedling Concept

**Label**: Brief, memorable description

[Explanation of concept]
```

**Example:**
- Label: "Giving Your Agents a Memory"
- Used in: cookbooks/foundations/03-memory-management.md

### Content Categories
- **🏠 Welcome**: Core pages (about, get involved, design systems, architecture)
- **🌱 Community**: CurationsLA, Youth Curator Movement
- **📚 Cookbooks**: Technical guides
  - Foundations, RAG & Knowledge, Agent Development
  - Tools & Integration, Advanced Prompting
  - Business (Branding & Growth), Going Legendary

## Development Workflow

### Commands
```bash
npm install          # Install dependencies
npm run dev          # Dev server (http://localhost:4321)
npm run build        # Build for production (includes type checking)
npm run preview      # Preview production build
npx astro check      # Type check only
```

### Testing Changes
1. Run `npm run dev` and navigate to http://localhost:4321/ai-learning
2. Verify page renders and navigation works
3. Check internal links and frontmatter
4. Run `npm run build` to ensure production build succeeds
5. Preview with `npm run preview` to test search

### Build Verification
- ✅ Astro build completes without errors
- ✅ All pages have valid frontmatter
- ✅ Navigation links work correctly
- ✅ Search indexing completes (Pagefind)
- ✅ No orphaned files
- ✅ TypeScript validation passes

## CI/CD and Deployment

**Workflow**: `.github/workflows/deploy-pages.yml`
**Trigger**: Push to `main` or manual dispatch
**Steps**: Checkout → Setup Node 20.x → npm ci → Build → Deploy to GitHub Pages
**Target**: GitHub Pages at `https://curationsla.github.io/ai-learning`
**Future**: Cloudflare Pages documented but not implemented

## Migration Context (November 2025)

Migrated from BookGen (Python) to Astro 4.16 + Starlight 0.28
**Benefits**: Faster builds (~60s → ~15s), built-in search, modern UI
**Stats**: 41 pages, 6,763 words indexed, zero downtime
**Legacy files**: BOOKGEN.md, GITBOOK_INTEGRATION.md, .bookgen/, SUMMARY_BOOKGEN.md

## Important Constraints

**Do NOT reference** (not implemented): Silverlining, mintify
**Cloudflare Pages**: Documented for future, not current deployment
**What exists**: Astro + Starlight, GitHub Pages, 41 pages, learning labels, BookGen (legacy), Pagefind

## Code Style

**Markdown**: Frontmatter required, quote titles with colons, use emoji consistently
**Navigation**: Manual (Welcome/Community) in astro.config.mjs, auto-generated for Cookbooks
**SUMMARY.md**: Optional, BookGen compatibility only

**Example:**
```yaml
---
title: "Memory: Building Context-Aware Agents"
---
```

```javascript
sidebar: [
  {
    label: '🏠 Welcome',
    items: [
      { label: 'About BUNKER', link: '/about-bunker/' },
    ],
  },
]
```

## Common Tasks

### Add Cookbook Page
1. Create `src/content/docs/cookbooks/[category]/[name].md` with frontmatter
2. Include Seedling Concept section with label
3. Test with `npm run dev`
4. Verify auto-generated navigation appears

### Update Sidebar
Edit `astro.config.mjs` sidebar (manual entries only - cookbooks auto-generate)

### Troubleshooting
**Frontmatter**: Valid YAML, quote colons, check closing `---`
**TypeScript**: Run `npx astro check`, verify linked pages
**Build**: Clear node_modules, verify Node 20.x
**Navigation**: File in `src/content/docs/`, check frontmatter, review sidebar config

## Resources

- [Astro Documentation](https://docs.astro.build) - Astro framework guide
- [Starlight Documentation](https://starlight.astro.build) - Starlight theme documentation
- [MIGRATION.md](MIGRATION.md) - Detailed migration notes from BookGen to Astro
- [Repository README](readme.md) - Getting started guide and repository overview
