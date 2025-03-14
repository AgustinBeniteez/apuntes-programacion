document.addEventListener('DOMContentLoaded', () => {
    const topics = ['basics', 'collaboration', 'advanced'];
    let currentTopicIndex = 0;

    const prevButton = document.getElementById('prev-topic');
    const nextButton = document.getElementById('next-topic');
    const currentTopicSpan = document.querySelector('.current-topic');

    function updateTopicVisibility() {
        topics.forEach(topic => {
            const content = document.getElementById(`${topic}-content`);
            content.style.display = topic === topics[currentTopicIndex] ? 'block' : 'none';
        });

        prevButton.disabled = currentTopicIndex === 0;
        nextButton.disabled = currentTopicIndex === topics.length - 1;

        const currentSection = document.querySelector(`[data-section="${topics[currentTopicIndex]}"]`);
        currentTopicSpan.textContent = currentSection.querySelector('h2').textContent;
    }

    prevButton.addEventListener('click', () => {
        if (currentTopicIndex > 0) {
            currentTopicIndex--;
            updateTopicVisibility();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentTopicIndex < topics.length - 1) {
            currentTopicIndex++;
            updateTopicVisibility();
        }
    });
}));