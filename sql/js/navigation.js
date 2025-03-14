const topics = ['fundamentals', 'queries', 'management'];
const topicTitles = {
    'fundamentals': 'Fundamentos de Bases de Datos',
    'queries': 'Consultas SQL',
    'management': 'Gestión de Bases de Datos'
};

let currentTopicIndex = 0;

function updateNavigation() {
    const prevButton = document.getElementById('prev-topic');
    const nextButton = document.getElementById('next-topic');
    const currentTopicSpan = document.querySelector('.current-topic');

    prevButton.disabled = currentTopicIndex === 0;
    nextButton.disabled = currentTopicIndex === topics.length - 1;
    currentTopicSpan.textContent = topicTitles[topics[currentTopicIndex]];

    // Hide all content sections and show the current one
    document.querySelectorAll('.topic-content').forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById(`${topics[currentTopicIndex]}-content`).style.display = 'block';
}

function setupNavigation() {
    const prevButton = document.getElementById('prev-topic');
    const nextButton = document.getElementById('next-topic');

    prevButton.addEventListener('click', () => {
        if (currentTopicIndex > 0) {
            currentTopicIndex--;
            updateNavigation();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentTopicIndex < topics.length - 1) {
            currentTopicIndex++;
            updateNavigation();
        }
    });

    updateNavigation();
}

document.addEventListener('DOMContentLoaded', setupNavigation);