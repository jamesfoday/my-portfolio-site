// Delayed logo and nav animation (after preloader)
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector('.logo').classList.add('show');
        document.querySelector('.desktop-nav').classList.add('show');
    }, 1300); // Use your preferred delay
});

// Preloader fade out
window.addEventListener('load', function () {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hide');
        setTimeout(() => {
            document.getElementById('preloader').style.display = 'none';
        }, 800);
    }, 1200); // Give time for animation to finish before fading out
});

// --- SCROLL EFFECTS AND MENU HIGHLIGHTING --- //
// Only declare once!
const allNavLinks = document.querySelectorAll('.desktop-nav a');
const scrollSections = [...document.querySelectorAll('section[id]')];
const header = document.querySelector('.site-header');

// Handle both header style and menu highlighting on scroll
window.addEventListener('scroll', () => {
    // Header bg (e.g. white on scroll)
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // ScrollSpy: menu highlighting
    let scrollY = window.pageYOffset;
    scrollSections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120; // Adjust for fixed header
        const sectionId = section.getAttribute('id');
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            allNavLinks.forEach(link => {
                link.classList.remove('active');
                // Accepts both "#about" and "about"
                if (link.getAttribute('href').replace('#', '') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});




// Table Accordion Function
document.querySelectorAll('.table-accordion-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        const tabContent = btn.closest('.tab-content');
        const hiddenRows = tabContent.querySelectorAll('.extra-row');
        const isOpen = hiddenRows[0]?.classList.contains('visible');
        hiddenRows.forEach(row => row.classList.toggle('visible'));
        btn.textContent = isOpen ? 'View More' : 'View Less';
    });
});

// CV Modal logic
const cvModalBtn = document.getElementById('cv-modal-btn');
const cvModal = document.getElementById('cv-modal');
const cvModalClose = document.getElementById('cv-modal-close');

cvModalBtn.addEventListener('click', () => {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
});

cvModalClose.addEventListener('click', () => {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Optional: Close modal if background is clicked
cvModal.addEventListener('click', e => {
    if (e.target === cvModal) {
        cvModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// portfolio

// Tab content 
document.querySelectorAll('.jmf-tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Set button active state
        document.querySelectorAll('.jmf-tab-btn').forEach(b => b.classList.remove('jmf-tab-active'));
        btn.classList.add('jmf-tab-active');

        // Hide all panels
        document.querySelectorAll('.jmf-tab-panel').forEach(panel => panel.style.display = 'none');

        // Show selected panel
        const tab = btn.dataset.jmfTab;
        document.getElementById(tab + '-panel').style.display = '';
    });
});


// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(this.dataset.tab).classList.add('active');
    });
});

// Accordion
document.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
        const row = this.closest('.accordion-row');
        row.classList.toggle('open');
        // Optionally close others:
        // document.querySelectorAll('.accordion-row').forEach(r => { if(r!==row) r.classList.remove('open'); });
    });
});
document.querySelectorAll('.jmf-skill-accordion-close').forEach(btn => {
    btn.addEventListener('click', function () {
        const acc = btn.closest('.jmf-skill-accordion');
        const toggleBtn = acc.querySelector('.jmf-skill-accordion-btn');
        acc.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.innerHTML = 'See More <i class="fas fa-chevron-down"></i>';
    });
});





// accordionm


function jmfToggleSkillRows() {
    var rows = document.querySelectorAll('.jmf-skill-more');
    var btn = document.getElementById('jmf-skill-toggle-btn');
    var showing = btn.textContent.includes('Less');
    rows.forEach(row => {
        row.style.display = showing ? 'none' : '';
    });
    btn.textContent = showing ? "View More" : "View Less";
}

document.querySelectorAll('.jmf-skill-accordion-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const acc = btn.closest('.jmf-skill-accordion');
        acc.classList.toggle('open');
        btn.classList.toggle('active');
        // Optionally, toggle icon
        const icon = btn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }
    });
});


// portfolio mobile

const portfolio = [
    {
        title: "myFlix Angular Client",
        image: "img/p1.png",
        tags: ["Angular", "Frontend", "SPA", "TypeScript"],
        link: "angulat-client.html"
    },
    {
        title: "Movie API Backend",
        image: "img/movieapi.png",
        tags: ["Node.js", "Backend", "REST", "MongoDB"],
        link: "movieapi.html"
    },
    {
        title: "Meet App",
        image: "img/meet1.png",
        tags: ["React", "Frontend", "Fullstack", "Testing"],
        link: "meet.html"
    },
    {
        title: "myFlix React Client",
        image: "img/react.png",
        tags: ["React", "Frontend", "Movie", "SPA"],
        link: "myflix-react.html"
    },
    {
        title: "Pokemon App",
        image: "img/poke2.png",
        tags: ["JavaScript", "Frontend", "API"],
        link: "pokemon.html"
    },
    {
        title: "ChatApp",
        image: "img/chatapp1.jpg",
        tags: ["React Native", "Mobile", "Firebase", "Expo"],
        link: "chatapp.html"
    }
];

// 1. Unique tags (for slider/autocomplete)
const allTags = [...new Set(portfolio.flatMap(item => item.tags))];

// DOM
const tagSlider = document.getElementById('tag-slider');
const grid = document.getElementById('portfolio-grid');
const searchBar = document.getElementById('search-bar');
const autocomplete = document.getElementById('autocomplete');

// State
let currentTag = "All";
let currentSearch = "";

// Tag slider render
function renderTagSlider() {
    tagSlider.innerHTML = "";
    const tags = ["All", ...allTags];
    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn' + (currentTag === tag ? ' active' : '');
        btn.textContent = tag;
        btn.onclick = () => {
            currentTag = tag;
            currentSearch = "";
            searchBar.value = "";
            renderTagSlider();
            renderGrid();
        };
        tagSlider.appendChild(btn);
    });
}

// Portfolio grid render
function renderGrid() {
    let filtered = portfolio;
    if (currentTag !== "All") {
        filtered = filtered.filter(item => item.tags.includes(currentTag));
    }
    if (currentSearch) {
        const s = currentSearch.toLowerCase();
        filtered = filtered.filter(item =>
            item.title.toLowerCase().includes(s) ||
            item.tags.some(t => t.toLowerCase().includes(s))
        );
    }
    grid.innerHTML = filtered.map(item => `
    <div class="portfolio-card1">
      <a href="${item.link}"><img src="${item.image}" alt="${item.title}"></a>
      <div class="portfolio-title">${item.title}</div>
      <div class="portfolio-tags">
        ${item.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('') || `<div style="grid-column: 1 / -1; text-align:center; color:#888; margin-top:2rem">No projects found</div>`;
}

// Autocomplete logic
searchBar.addEventListener('input', function () {
    currentSearch = this.value;
    if (this.value.length > 0) {
        const matches = allTags.filter(tag =>
            tag.toLowerCase().includes(this.value.toLowerCase())
        );
        if (matches.length) {
            autocomplete.style.display = 'block';
            autocomplete.innerHTML = matches.map(tag =>
                `<div class="auto-tag" style="padding:.7rem;cursor:pointer;">${tag}</div>`
            ).join('');
            Array.from(autocomplete.children).forEach((el, idx) => {
                el.onclick = () => {
                    searchBar.value = matches[idx];
                    currentSearch = matches[idx];
                    autocomplete.style.display = 'none';
                    renderGrid();

                    // Scroll to portfolio section after short delay (let rendering happen)
                    setTimeout(() => {
                        const target = document.getElementById('portfolio-section');
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 50);
                };

            });
        } else {
            autocomplete.style.display = 'none';
        }
    } else {
        autocomplete.style.display = 'none';
        currentSearch = "";
    }
    renderGrid();
});
searchBar.addEventListener('focus', function () {
    if (this.value) searchBar.dispatchEvent(new Event('input'));
});
document.body.addEventListener('click', e => {
    if (!searchBar.contains(e.target) && !autocomplete.contains(e.target)) {
        autocomplete.style.display = 'none';
    }
});

// Init
renderTagSlider();
renderGrid();



// Open modal
document.getElementById('my-popup-btn').onclick = function () {
    document.getElementById('my-popup-modal').classList.add('active');
};

// Close modal (with close button)
document.getElementById('my-popup-modal-close').onclick = function () {
    document.getElementById('my-popup-modal').classList.remove('active');
};

// Optional: close modal when clicking outside modal content
document.getElementById('my-popup-modal').onclick = function (e) {
    if (e.target === this) this.classList.remove('active');
};



