/**
 * Este script maneja la visualización del banner de lenguaje
 * Solo se muestra en las páginas principales de cada lenguaje
 */

const LanguageBanner = {
    init() {
        // Determinar si estamos en una página principal de lenguaje
        const path = window.location.pathname;
        const pathSegments = path.split('/').filter(p => p);
        
        // Si estamos en la raíz de un lenguaje (ejemplo: /python/index.html)
        // y no en una subpágina (ejemplo: /python/advanced/index.html)
        const isMainLanguagePage = pathSegments.length === 1 || 
            (pathSegments.length === 2 && pathSegments[1] === 'index.html');
        
        // Obtener el elemento header que contiene el banner
        const header = document.querySelector('header');
        
        if (header) {
            // Mostrar u ocultar el banner según corresponda
            if (isMainLanguagePage) {
                header.style.display = 'flex';
                header.style.flexDirection = 'column';
                header.style.alignItems = 'center';
                header.style.justifyContent = 'center';
            } else {
                header.style.display = 'none';
            }
        }
    }
};

// Exportar el módulo
export default LanguageBanner;