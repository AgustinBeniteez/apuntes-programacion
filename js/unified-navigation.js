import ProgressTracker from './progress.js';

const UnifiedNavigation = {
    // Configuration for different sections and their topics
    sections: {
        git: {
            topics: ['basics', 'collaboration', 'advanced'],
            titles: {
                'basics': 'Fundamentos de Git',
                'collaboration': 'Colaboración en Equipo',
                'advanced': 'Git Avanzado'
            }
        },
        javascript: {
            topics: ['fundamentals', 'functions', 'objects', 'async'],
            titles: {
                'fundamentals': 'Fundamentos',
                'functions': 'Funciones y Scope',
                'objects': 'Objetos y Arrays',
                'async': 'Asincronía'
            }
        },
        sql: {
            topics: ['fundamentals', 'queries', 'management'],
            titles: {
                'fundamentals': 'Fundamentos de Bases de Datos',
                'queries': 'Consultas SQL',
                'management': 'Gestión de Bases de Datos'
            }
        }
    },

    currentTopicIndex: 0,
    currentSection: '',

    init() {
        // Determine current section from URL
        const path = window.location.pathname;
        this.currentSection = path.split('/').filter(p => p)[0] || 'home';

        if (this.sections[this.currentSection]) {
            this.setupNavigation();
            this.updateProgress();
        }
    },

    setupNavigation() {
        const prevButton = document.getElementById('prev-topic');
        const nextButton = document.getElementById('next-topic');

        if (!prevButton || !nextButton) return;

        prevButton.addEventListener('click', () => this.navigate('prev'));
        nextButton.addEventListener('click', () => this.navigate('next'));

        this.updateTopicVisibility();
    },

    navigate(direction) {
        const sectionConfig = this.sections[this.currentSection];
        if (!sectionConfig) return;

        const currentTopic = sectionConfig.topics[this.currentTopicIndex];
        
        // Update progress for current topic before navigation
        ProgressTracker.updateSection(
            this.currentSection,
            currentTopic,
            true
        );

        // Navigate to next/prev topic
        if (direction === 'prev' && this.currentTopicIndex > 0) {
            this.currentTopicIndex--;
        } else if (direction === 'next' && 
                   this.currentTopicIndex < sectionConfig.topics.length - 1) {
            this.currentTopicIndex++;
        }

        this.updateTopicVisibility();
        this.updateProgress();
    },

    updateTopicVisibility() {
        const sectionConfig = this.sections[this.currentSection];
        if (!sectionConfig) return;

        const prevButton = document.getElementById('prev-topic');
        const nextButton = document.getElementById('next-topic');
        const currentTopicSpan = document.querySelector('.current-topic');

        if (prevButton && nextButton) {
            prevButton.disabled = this.currentTopicIndex === 0;
            nextButton.disabled = 
                this.currentTopicIndex === sectionConfig.topics.length - 1;
        }

        // Update topic title
        const currentTopic = sectionConfig.topics[this.currentTopicIndex];
        if (currentTopicSpan && sectionConfig.titles[currentTopic]) {
            currentTopicSpan.textContent = sectionConfig.titles[currentTopic];
        }

        // Update content visibility
        sectionConfig.topics.forEach(topic => {
            const content = document.getElementById(`${topic}-content`);
            if (content) {
                content.style.display = 
                    topic === currentTopic ? 'block' : 'none';
            }
        });
    },

    updateProgress() {
        const progress = ProgressTracker.getLanguageProgress(this.currentSection);
        if (!progress) return;

        // Update progress bars
        document.querySelectorAll('[data-section]').forEach(section => {
            const sectionId = section.dataset.section;
            const progressBar = section.querySelector('.progress');
            if (progressBar) {
                const sectionProgress = progress.sections.find(
                    s => s.id === sectionId
                );
                if (sectionProgress && sectionProgress.completed) {
                    progressBar.style.width = '100%';
                    section.classList.add('completed');
                }
            }
        });
    }
};

// Initialize navigation system
document.addEventListener('DOMContentLoaded', () => {
    UnifiedNavigation.init();
});

export default UnifiedNavigation;