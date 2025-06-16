// Main JavaScript for the Orus Language website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    setupMobileNav();
    
    // Code copy buttons
    setupCodeCopyButtons();
    
    // Installation tab switching
    setupInstallTabs();
    
    // Search functionality
    setupSearch();
});

// Mobile navigation
function setupMobileNav() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }
}

// Code copy functionality
function setupCodeCopyButtons() {
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block, .hero-code');
            const codeElement = codeBlock.querySelector('pre code') || codeBlock.querySelector('pre');
            
            if (codeElement) {
                navigator.clipboard.writeText(codeElement.textContent).then(() => {
                    // Show "Copied!" text
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                });
            }
        });
    });
}

// Installation tab switching
function setupInstallTabs() {
    const tabButtons = document.querySelectorAll('.install-tab-button');
    
    if (tabButtons.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and content
                document.querySelectorAll('.install-tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.install-tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

// Simple search functionality
function setupSearch() {
    const searchButton = document.querySelector('.search-button');
    const searchOverlay = document.querySelector('.search-overlay');
    
    if (searchButton && searchOverlay) {
        // Open search overlay
        searchButton.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            document.querySelector('.search-input').focus();
        });
        
        // Close search overlay on click outside or escape key
        document.querySelector('.search-close').addEventListener('click', function() {
            searchOverlay.classList.remove('active');
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
        });
    }
}

// Optional: Add syntax highlighting for code examples
if (typeof hljs !== 'undefined') {
    hljs.configure({
        languages: ['orus', 'bash', 'javascript', 'rust', 'cpp']
    });
    hljs.highlightAll();
}

// Optional: Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});
