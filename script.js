'use strict';

const GITHUB_USERNAME = 'hamiddi';
const API_BASE = 'https://api.github.com';


const PROJECT_LINKS = {
  'ngs': {
    type: 'Book companion repository',
    title: 'Bioinformatics: A Practical Guide to Next Generation Sequencing Data Analysis',
    url: 'https://www.routledge.com/Bioinformatics-A-Practical-Guide-to-Next-Generation-Sequencing-Data-Analysis/Ismail/p/book/9781032408910',
    action: 'View book ↗'
  },
  'bioinfo-autoimmune': {
    type: 'Book companion repository',
    title: 'Bioinformatics of Autoimmune Diseases',
    url: 'https://www.routledge.com/Bioinformatics-of-Autoimmune-Diseases/Ismail/p/book/9781041166115',
    action: 'View book ↗'
  },
  'qml': {
    type: 'Book companion repository',
    title: 'Quantum Machine Learning: Theory, Algorithms, and Practical Implementation',
    url: 'https://www.routledge.com/Quantum-Machine-Learning-Theory-Algorithms-and-Practical-Implementation/Ismail/p/book/9781041364511',
    action: 'View book ↗'
  },
  'FEPS': {
    type: 'Associated publication',
    title: 'FEPS research publication',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35696075/',
    action: 'View publication ↗'
  },
  'deepFEPS': {
    type: 'Associated preprint',
    title: 'deepFEPS research paper',
    url: 'https://arxiv.org/abs/2511.22821',
    action: 'View paper ↗'
  },
  'psr-multitask-chaos-prediction': {
    type: 'Associated publication',
    title: 'Attention-Based Multitask Learning With Phase-Space Reconstruction for Early Detection of Instability and Chaos in the Lorenz System',
    url: 'https://ieeexplore.ieee.org/document/11570096',
    action: 'View IEEE paper ↗'
  },
  'pygdis': {
    type: 'Python package',
    title: 'pyGDIS documentation and package site',
    url: 'https://hdismail.com/pygdis/',
    action: 'Package documentation ↗'
  }
};

const FEATURED_PROJECTS = [
  {
    repo: 'transcriptomic-dynamics',
    label: 'Transcriptomics · Dynamical Systems',
    description: 'A reproducible framework for detecting early dynamical signatures of transcriptomic state transitions using trajectory reconstruction, Lyapunov analysis, recurrence quantification, bootstrap uncertainty, and the Transcriptomic Dynamical Instability Score (TDIS).',
    tech: ['Python', 'scRNA-seq', 'RQA', 'Lyapunov', 'Reproducibility']
  },
  {
    repo: 'pygdis',
    label: 'Scientific Computing · Instability Analysis',
    description: 'Python implementation of the Generalized Dynamical Instability Score (GDIS), a physics-based framework for quantifying instability, bifurcations, and chaos across nonlinear dynamical systems.',
    tech: ['Python', 'Nonlinear Dynamics', 'Chaos', 'Bifurcations']
  },
  {
    repo: 'QDRFormer',
    label: 'Scientific AI · Dynamical Systems',
    description: 'Quantum-inspired density representation learning with Random Forest-guided Transformer networks for early prediction of phase-locked-loop instability and chaotic dynamics.',
    tech: ['Python', 'Transformers', 'Machine Learning', 'PLL']
  },
  {
    repo: 'psr-multitask-chaos-prediction',
    label: 'Deep Learning · Chaos Prediction',
    description: 'A hybrid deep-learning framework for early detection of instability and chaos using phase-space reconstruction, multitask learning, and attention-based classification.',
    tech: ['Python', 'Deep Learning', 'Phase Space', 'Multitask Learning']
  },
  {
    repo: 'deepFEPS',
    label: 'Bioinformatics · Representation Learning',
    description: 'A bioinformatics toolkit that converts DNA, RNA, and protein FASTA sequences into numerical feature representations using modern machine-learning and deep-learning embeddings.',
    tech: ['Python', 'ESM2', 'ProtBERT', 'DNABERT', 'Sequence Analysis']
  },
  {
    repo: 'qml',
    label: 'Book Companion · Quantum Machine Learning',
    description: 'Companion code and practical implementations for Quantum Machine Learning: Theory, Algorithms, and Practical Implementation, connecting quantum-computing concepts with executable examples and machine-learning workflows.',
    tech: ['Quantum Computing', 'Machine Learning', 'Python', 'Education']
  },
  {
    repo: 'FEPS',
    label: 'Bioinformatics · Protein Features',
    description: 'A web-oriented bioinformatics tool for extracting thousands of sequence-derived protein features across multiple feature groups for downstream machine-learning and analysis workflows.',
    tech: ['Bioinformatics', 'Protein Sequences', 'Feature Extraction', 'ML']
  },
  {
    repo: 'ngs',
    label: 'Book Companion · Next-Generation Sequencing',
    description: 'Supplementary data and code supporting the textbook Bioinformatics: A Practical Guide to Next Generation Sequencing Data Analysis, designed for practical and reproducible learning.',
    tech: ['NGS', 'Genomics', 'Education', 'Reproducible Analysis']
  },
  {
    repo: 'bioinfo-autoimmune',
    label: 'Book Companion · Bioinformatics',
    description: 'Source code, scripts, and hands-on materials accompanying Bioinformatics of Autoimmune Diseases, with practical examples and reproducible analysis workflows.',
    tech: ['Python', 'Bioinformatics', 'Autoimmune Disease', 'Education']
  }
];

const CATEGORY_RULES = [
  {
    name: 'Bioinformatics & Genomics',
    terms: ['bioinfo', 'bioinformatics', 'genomics', 'genome', 'protein', 'dna', 'rna', 'sequence', 'ngs', 'transcript', 'scrna', 'fasta', 'feps', 'autoimmune']
  },
  {
    name: 'Dynamical Systems',
    terms: ['chaos', 'dynamical', 'instability', 'bifurcation', 'lyapunov', 'recurrence', 'qdr', 'pll', 'gdis', 'phase-space', 'phase space']
  },
  {
    name: 'Machine Learning & AI',
    terms: ['machine learning', 'deep learning', 'transformer', 'neural', 'ai', 'ml', 'bert', 'attention', 'random forest']
  },
  {
    name: 'Research & Education',
    terms: ['book', 'textbook', 'education', 'tutorial', 'supplementary', 'reproducib']
  }
];

let repositories = [];
let repoByName = new Map();

const el = (id) => document.getElementById(id);

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function categoryFor(repo) {
  const searchable = [repo.name, repo.description || '', repo.language || '', ...(repo.topics || [])].join(' ').toLowerCase();
  for (const category of CATEGORY_RULES) {
    if (category.terms.some(term => searchable.includes(term))) return category.name;
  }
  return 'Other Projects';
}

function formatDate(dateString) {
  if (!dateString) return '—';
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(dateString));
}

function truncate(text, length = 175) {
  if (!text) return 'Open-source research software and computational resources.';
  return text.length > length ? `${text.slice(0, length).trim()}…` : text;
}

function repoTopicsHtml(repo, max = 4) {
  const topics = (repo.topics || []).slice(0, max);
  if (!topics.length) return '';
  return `<div class="repo-topics">${topics.map(topic => `<span class="repo-topic">${escapeHtml(topic)}</span>`).join('')}</div>`;
}

function relatedResource(name) {
  return PROJECT_LINKS[name] || PROJECT_LINKS[Object.keys(PROJECT_LINKS).find(key => key.toLowerCase() === String(name).toLowerCase())];
}

function scholarlyContextHtml(name, compact = false) {
  const resource = relatedResource(name);
  if (!resource) return '';
  return `<div class="scholarly-context${compact ? ' compact' : ''}">
    <span class="scholarly-type">${escapeHtml(resource.type)}</span>
    <span class="scholarly-title">${escapeHtml(resource.title)}</span>
  </div>`;
}

function featuredCard(project) {
  const repo = repoByName.get(project.repo.toLowerCase());
  const url = repo?.html_url || `https://github.com/${GITHUB_USERNAME}/${project.repo}`;
  const stars = repo?.stargazers_count ?? 0;
  const forks = repo?.forks_count ?? 0;
  return `
    <article class="featured-card reveal">
      <div class="featured-top">
        <span class="featured-label">${escapeHtml(project.label)}</span>
        <span class="repo-stats" title="GitHub statistics">★ ${stars} &nbsp;⑂ ${forks}</span>
      </div>
      <h3>${escapeHtml(project.repo)}</h3>
      <p>${escapeHtml(project.description)}</p>
      ${scholarlyContextHtml(project.repo)}
      <div class="tech-row">${project.tech.map(item => `<span class="repo-topic">${escapeHtml(item)}</span>`).join('')}</div>
      <div class="featured-links">
        <a href="${url}" target="_blank" rel="noopener noreferrer">GitHub repository ↗</a>
        ${relatedResource(project.repo) ? `<a href="${escapeHtml(relatedResource(project.repo).url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(relatedResource(project.repo).action)}</a>` : ''}
        ${repo?.homepage && (!relatedResource(project.repo) || repo.homepage !== relatedResource(project.repo).url) ? `<a href="${escapeHtml(repo.homepage)}" target="_blank" rel="noopener noreferrer">Project site ↗</a>` : ''}
      </div>
    </article>`;
}

function renderFeatured() {
  el('featuredGrid').innerHTML = FEATURED_PROJECTS.map(featuredCard).join('');
  observeReveals();
}

function repoCard(repo) {
  const category = categoryFor(repo);
  return `
    <article class="repo-card">
      <span class="repo-category">${escapeHtml(category)}</span>
      <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${escapeHtml(repo.name)} ↗</a></h3>
      <p class="repo-description">${escapeHtml(truncate(repo.description))}</p>
      ${scholarlyContextHtml(repo.name, true)}
      ${repoTopicsHtml(repo)}
      ${relatedResource(repo.name) ? `<a class="related-resource-link" href="${escapeHtml(relatedResource(repo.name).url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(relatedResource(repo.name).action)}</a>` : ''}
      <div class="repo-footer">
        <span class="repo-language">${repo.language ? '<i class="language-dot" aria-hidden="true"></i>' : ''}${escapeHtml(repo.language || 'Repository')}</span>
        <span>★ ${repo.stargazers_count ?? 0}</span>
        <span>${formatDate(repo.updated_at)}</span>
      </div>
    </article>`;
}

function populateCategoryFilter() {
  const categories = [...new Set(repositories.map(categoryFor))].sort();
  const select = el('categoryFilter');
  select.innerHTML = '<option value="all">All categories</option>' + categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
}

function renderRepositories() {
  const query = el('repoSearch').value.trim().toLowerCase();
  const category = el('categoryFilter').value;
  const sort = el('sortRepos').value;

  let filtered = repositories.filter(repo => {
    const haystack = [repo.name, repo.description || '', repo.language || '', ...(repo.topics || []), categoryFor(repo)].join(' ').toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesCategory = category === 'all' || categoryFor(repo) === category;
    return matchesQuery && matchesCategory;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'stars') return (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0) || a.name.localeCompare(b.name);
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  el('repoStatus').textContent = `${filtered.length} of ${repositories.length} public repositories shown.`;
  el('repoGrid').innerHTML = filtered.length
    ? filtered.map(repoCard).join('')
    : '<div class="empty-state">No repositories match the current search and filter.</div>';
}

async function fetchGitHubData() {
  try {
    const [profileResponse, repoResponse] = await Promise.all([
      fetch(`${API_BASE}/users/${GITHUB_USERNAME}`, { headers: { Accept: 'application/vnd.github+json' } }),
      fetch(`${API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers: { Accept: 'application/vnd.github+json' } })
    ]);

    if (!profileResponse.ok || !repoResponse.ok) {
      throw new Error(`GitHub API request failed (${profileResponse.status}/${repoResponse.status}).`);
    }

    const profile = await profileResponse.json();
    const repoData = await repoResponse.json();

    repositories = repoData.filter(repo => !repo.fork && !repo.archived);
    repoByName = new Map(repositories.map(repo => [repo.name.toLowerCase(), repo]));

    el('repoCount').textContent = profile.public_repos ?? repositories.length;
    el('followerCount').textContent = profile.followers ?? '—';
    if (profile.bio) el('profileBio').textContent = profile.bio;
    if (profile.location) el('profileLocation').textContent = profile.location;

    populateCategoryFilter();
    renderFeatured();
    renderRepositories();
  } catch (error) {
    console.error(error);
    el('repoCount').textContent = '10+';
    el('followerCount').textContent = '—';
    el('repoStatus').innerHTML = `GitHub's API could not be reached right now. <a href="https://github.com/${GITHUB_USERNAME}?tab=repositories" target="_blank" rel="noopener noreferrer">View all repositories on GitHub ↗</a>`;
    el('repoGrid').innerHTML = '<div class="empty-state">Repository cards will appear automatically when the GitHub API is available. Featured projects remain accessible above.</div>';
    renderFeatured();
  }
}

function initTheme() {
  const stored = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  el('themeIcon').textContent = theme === 'dark' ? '☀' : '☾';
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);
}

function initNavigation() {
  el('navToggle').addEventListener('click', () => {
    const links = el('navLinks');
    const open = links.classList.toggle('open');
    el('navToggle').setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('#navLinks a').forEach(link => link.addEventListener('click', () => {
    el('navLinks').classList.remove('open');
    el('navToggle').setAttribute('aria-expanded', 'false');
  }));
}

let observer;
function observeReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(node => node.classList.add('visible'));
    return;
  }
  if (!observer) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
  }
  document.querySelectorAll('.reveal:not(.visible)').forEach(node => observer.observe(node));
}

function initFilters() {
  el('repoSearch').addEventListener('input', renderRepositories);
  el('categoryFilter').addEventListener('change', renderRepositories);
  el('sortRepos').addEventListener('change', renderRepositories);
}

function init() {
  initTheme();
  initNavigation();
  initFilters();
  observeReveals();
  el('themeToggle').addEventListener('click', toggleTheme);
  el('year').textContent = new Date().getFullYear();
  fetchGitHubData();
}

document.addEventListener('DOMContentLoaded', init);
