document.addEventListener('DOMContentLoaded', () => {
    const pageConfig = {
        '/': {
            title: 'Apuntes de Programación',
            icon: '<svg class="nav-icon"><use href="#dev-icon"/></svg>'
        },
        '/git/': {
            title: 'Git',
            icon: '<svg class="nav-icon"><use href="#git-icon"/></svg>'
        },
        '/js/': {
            title: 'JavaScript',
            icon: '<svg class="nav-icon"><use href="#js-icon"/></svg>'
        },
        '/java/': {
            title: 'Java',
            icon: '<svg class="nav-icon"><use href="#java-icon"/></svg>'
        },
        '/sql/': {
            title: 'SQL',
            icon: '<svg class="nav-icon"><use href="#sql-icon"/></svg>'
        }
    };

    function createNavigation() {
        const nav = document.createElement('nav');
        nav.className = 'top-nav';

        const currentPath = window.location.pathname
            .replace(/\/index\.html$/, '/')
            .replace(/^.*\/apuntes-programacion/, '');

        const config = pageConfig[currentPath] || pageConfig['/'];

        nav.innerHTML = `
            <div class="nav-content">
                <ul class="nav-links">
                    <li><a href="${currentPath === '/' ? '#' : '../index.html'}">Inicio</a></li>
                    <li><a href="${currentPath === '/git/' ? '#' : '../git/index.html'}"><svg class="nav-icon"><use href="#git-icon"/></svg>Git</a></li>
                    <li><a href="${currentPath === '/js/' ? '#' : '../js/index.html'}"><svg class="nav-icon"><use href="#js-icon"/></svg>JavaScript</a></li>
                    <li><a href="${currentPath === '/sql/' ? '#' : '../sql/index.html'}"><svg class="nav-icon"><use href="#sql-icon"/></svg>SQL</a></li>
                </ul>
                <div class="nav-title">
                    ${config.icon}
                    <h1>${config.title}</h1>
                </div>
                <button id="theme-toggle" class="theme-toggle">
                    <svg class="theme-icon sun"><use href="#sun-icon"/></svg>
                    <svg class="theme-icon moon"><use href="#moon-icon"/></svg>
                </button>
            </div>
        `;

        const existingNav = document.querySelector('.top-nav');
        if (existingNav) {
            existingNav.replaceWith(nav);
        } else {
            document.body.insertBefore(nav, document.body.firstChild);
        }
    }

    createNavigation();
});
