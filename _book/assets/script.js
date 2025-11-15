// BookGen - Interactive Features

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Load saved theme or detect preference
const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Simple Search Functionality
const searchInput = document.getElementById('search-input');
let searchIndex = [];

// Build search index from page content
function buildSearchIndex() {
    const content = document.querySelector('.book-content');
    if (!content) return;
    
    const headings = content.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
        searchIndex.push({
            text: heading.textContent,
            element: heading,
            level: heading.tagName
        });
    });
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    if (query.length < 2) {
        clearHighlights();
        return;
    }
    
    clearHighlights();
    
    searchIndex.forEach(item => {
        if (item.text.toLowerCase().includes(query)) {
            item.element.style.backgroundColor = 'rgba(102, 126, 234, 0.2)';
            item.element.style.transition = 'background-color 0.3s';
        }
    });
    
    // Scroll to first match
    const firstMatch = searchIndex.find(item => 
        item.text.toLowerCase().includes(query)
    );
    if (firstMatch) {
        firstMatch.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

function clearHighlights() {
    searchIndex.forEach(item => {
        item.element.style.backgroundColor = '';
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mobile sidebar toggle
const sidebarToggle = document.createElement('button');
sidebarToggle.className = 'sidebar-toggle';
sidebarToggle.innerHTML = '☰';
sidebarToggle.style.cssText = `
    display: none;
    position: fixed;
    top: 70px;
    left: 10px;
    z-index: 101;
    background: var(--secondary-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 20px;
    cursor: pointer;
`;

if (window.innerWidth <= 768) {
    document.body.appendChild(sidebarToggle);
    sidebarToggle.style.display = 'block';
}

sidebarToggle.addEventListener('click', () => {
    const sidebar = document.querySelector('.book-sidebar');
    sidebar.classList.toggle('open');
});

// Initialize
buildSearchIndex();

// Back to top functionality
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if (!document.querySelector('.back-to-top')) {
            const backToTop = document.createElement('button');
            backToTop.className = 'back-to-top';
            backToTop.innerHTML = '↑';
            backToTop.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: var(--secondary-color);
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 24px;
                cursor: pointer;
                box-shadow: var(--shadow);
                z-index: 99;
                transition: all 0.3s;
            `;
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            document.body.appendChild(backToTop);
        }
    } else {
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.remove();
        }
    }
});
