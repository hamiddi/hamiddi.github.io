# hamiddi.github.io

Personal research software portfolio for **Hamid D. Ismail, Ph.D.**

## What this site does

- Presents featured research software with scientific descriptions.
- Loads public repositories automatically from the GitHub REST API.
- Categorizes repositories using names, descriptions, topics, and languages.
- Provides live search, category filters, and sorting.
- Loads current GitHub profile statistics and profile image.
- Includes light/dark theme support and responsive mobile navigation.
- Links to GitHub, Google Scholar, ORCID, Routledge, NC A&T, LinkedIn, and hdismail.com.
- Uses only HTML, CSS, and JavaScript — no build step or external framework is required.

## Publish with GitHub Pages

1. On GitHub, create a new **public** repository named exactly:

   `hamiddi.github.io`

2. Copy all files from this folder into that repository.

3. Commit and push to the `main` branch.

4. In GitHub, open **Settings → Pages**.

5. Under **Build and deployment**, select:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**

6. Save. GitHub Pages will publish the site at:

   `https://hamiddi.github.io`

## Command-line upload

From inside this folder:

```bash
git init
git add .
git commit -m "Create research software portfolio"
git branch -M main
git remote add origin https://github.com/hamiddi/hamiddi.github.io.git
git push -u origin main
```

If the repository already exists locally, do not run `git init` again.

## Customize featured projects

Open `script.js` and edit the `FEATURED_PROJECTS` array. Each featured project can define:

- `repo`
- `label`
- `description`
- `tech`

If the GitHub repository exists, stars, forks, repository URL, and homepage are retrieved automatically.

## Automatic repository loading

The site calls:

`https://api.github.com/users/hamiddi/repos?per_page=100&sort=updated`

Public unauthenticated GitHub API requests are rate-limited. If the API is temporarily unavailable or rate-limited, the featured project links remain available and the repository section provides a direct link to GitHub.

## Custom domain

If you later want this site to use a custom domain such as `projects.hdismail.com`, configure the custom domain in **Settings → Pages** and add the required DNS record with your domain provider.

## Files

- `index.html` — site structure and content
- `style.css` — complete responsive visual design
- `script.js` — GitHub API integration, categories, search, filters, theme, animations
- `404.html` — GitHub Pages error page
- `assets/favicon.svg` — favicon


## Scholarly project links

Selected repositories are explicitly connected to their books, papers, or package documentation in `script.js` through the `PROJECT_LINKS` mapping. This currently includes `ngs`, `bioinfo-autoimmune`, `qml`, `FEPS`, `deepFEPS`, `psr-multitask-chaos-prediction`, and `pygdis`.
