// Define the language progress tracking system
const ProgressTracker = {
    languages: {
        git: {
            name: 'Git',
            sections: [
                { id: 'basics', title: 'Conceptos Básicos', completed: false },
                { id: 'branching', title: 'Ramas y Fusiones', completed: false },
                { id: 'remote', title: 'Repositorios Remotos', completed: false },
                { id: 'advanced', title: 'Características Avanzadas', completed: false }
            ],
            totalProgress: 0
        },
        javascript: {
            name: 'JavaScript',
            sections: [
                { id: 'fundamentals', title: 'Fundamentos', completed: false },
                { id: 'functions', title: 'Funciones y Scope', completed: false },
                { id: 'objects', title: 'Objetos y Arrays', completed: false },
                { id: 'async', title: 'Asincronía', completed: false }
            ],
            totalProgress: 0
        },
        sql: {
            name: 'SQL',
            sections: [
                { id: 'basics', title: 'Consultas Básicas', completed: false },
                { id: 'joins', title: 'Joins y Relaciones', completed: false },
                { id: 'advanced', title: 'Consultas Avanzadas', completed: false },
                { id: 'optimization', title: 'Optimización', completed: false }
            ],
            totalProgress: 0
        }
    },

    // Initialize progress from localStorage or set default values
    init() {
        const savedProgress = localStorage.getItem('learningProgress');
        if (savedProgress) {
            const parsed = JSON.parse(savedProgress);
            Object.keys(this.languages).forEach(lang => {
                if (parsed[lang]) {
                    this.languages[lang].sections = parsed[lang].sections;
                    this.languages[lang].totalProgress = parsed[lang].totalProgress;
                }
            });
        }
    },

    // Save current progress to localStorage
    saveProgress() {
        localStorage.setItem('learningProgress', JSON.stringify(this.languages));
    },

    // Update section completion status
    updateSection(language, sectionId, completed) {
        const lang = this.languages[language];
        if (lang) {
            const section = lang.sections.find(s => s.id === sectionId);
            if (section) {
                section.completed = completed;
                this.updateTotalProgress(language);
                this.saveProgress();
            }
        }
    },

    // Calculate and update total progress for a language
    updateTotalProgress(language) {
        const lang = this.languages[language];
        if (lang) {
            const completedSections = lang.sections.filter(s => s.completed).length;
            lang.totalProgress = (completedSections / lang.sections.length) * 100;
        }
    },

    // Get progress for a specific language
    getLanguageProgress(language) {
        return this.languages[language] || null;
    },


};

// Initialize progress tracking system
document.addEventListener('DOMContentLoaded', () => {
    ProgressTracker.init();
});

// Export the ProgressTracker object
export default ProgressTracker;