// Tutorial sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const mainContent = document.querySelector('.main-with-sidebar');
    const resizeHandle = document.querySelector('.sidebar-resize-handle');
    
    // Default sidebar width
    const defaultWidth = 250;
    const minWidth = 180;
    const maxWidth = 400;
    
    // Mobile detection
    const isMobile = () => window.innerWidth <= 1000;
    
    // Initialize sidebar state
    const savedWidth = localStorage.getItem('orusSidebarWidth');
    const savedCollapsed = localStorage.getItem('orusSidebarCollapsed');
    
    if (savedWidth) {
        sidebar.style.width = savedWidth + 'px';
        mainContent.style.marginLeft = savedWidth + 'px';
    }
    
    if (savedCollapsed === 'true') {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('full-width');
        sidebar.style.transform = 'translateX(-100%)';
    }
    
    // Update sidebar state based on screen size
    function updateSidebarState() {
        if (isMobile()) {
            // In mobile view
            if (!sidebar.classList.contains('open')) {
                sidebar.style.transform = 'translateX(-100%)';
            }
            // Always ensure toggle button shows bars icon on mobile
            sidebarToggle.querySelector('i').className = 'fas fa-bars';
        } else {
            // In desktop view
            sidebar.style.transform = sidebar.classList.contains('collapsed') ? 'translateX(-100%)' : 'translateX(0)';
            // Update icon based on sidebar state
            if (sidebar.classList.contains('collapsed')) {
                sidebarToggle.querySelector('i').className = 'fas fa-bars';
            } else {
                sidebarToggle.querySelector('i').className = 'fas fa-chevron-left';
            }
        }
    }
    
    // Toggle sidebar 
    sidebarToggle.addEventListener('click', function() {
        if (isMobile()) {
            // Mobile behavior
            sidebar.classList.toggle('open');
            if (sidebar.classList.contains('open')) {
                sidebar.style.transform = 'translateX(0)';
            } else {
                sidebar.style.transform = 'translateX(-100%)';
            }
        } else {
            // Desktop behavior
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('full-width');
            
            if (sidebar.classList.contains('collapsed')) {
                sidebar.style.transform = 'translateX(-100%)';
                localStorage.setItem('orusSidebarCollapsed', 'true');
                // Change icon to bars
                sidebarToggle.querySelector('i').className = 'fas fa-bars';
            } else {
                sidebar.style.transform = 'translateX(0)';
                localStorage.setItem('orusSidebarCollapsed', 'false');
                // Change icon to chevron-left
                sidebarToggle.querySelector('i').className = 'fas fa-chevron-left';
            }
        }
    });
    
    // Collapse/expand functionality moved to the toggle button
    
    // Resize handle functionality
    if (resizeHandle) {
        let isResizing = false;
        
        resizeHandle.addEventListener('mousedown', function(e) {
            isResizing = true;
            document.body.classList.add('no-select');
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isResizing) return;
            
            // Calculate new width based on mouse position
            let newWidth = e.clientX;
            
            // Apply min/max constraints
            newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
            
            // Apply new width
            sidebar.style.width = newWidth + 'px';
            mainContent.style.marginLeft = newWidth + 'px';
            
            // Save width
            localStorage.setItem('orusSidebarWidth', newWidth);
        });
        
        document.addEventListener('mouseup', function() {
            if (isResizing) {
                isResizing = false;
                document.body.classList.remove('no-select');
            }
        });
    }
    
    // Update on resize
    window.addEventListener('resize', updateSidebarState);
    
    // Initial setup
    updateSidebarState();
});
