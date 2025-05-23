document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeToggleText();
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleText();
    });
    
    function updateThemeToggleText() {
        const currentTheme = html.getAttribute('data-theme');
        themeToggle.textContent = currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';
    }
    
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !mobileMenuToggle.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
    
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-100px 0px -70% 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.sidebar nav a[href="#${id}"]`);
            
            if (entry.isIntersecting) {
                document.querySelectorAll('.sidebar nav a').forEach(link => {
                    link.style.fontWeight = 'normal';
                });
                if (navLink) {
                    navLink.style.fontWeight = 'bold';
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });
});