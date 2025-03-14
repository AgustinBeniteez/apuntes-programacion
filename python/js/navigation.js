// Python navigation script
document.addEventListener('DOMContentLoaded', () => {
    // Set up navigation between topics
    const prevButton = document.getElementById('prev-topic');
    const nextButton = document.getElementById('next-topic');
    const topics = ['basics', 'data-structures', 'modules', 'advanced'];
    const topicTitles = {
        'basics': 'Fundamentos de Python',
        'data-structures': 'Estructuras de Datos',
        'modules': 'Módulos y Paquetes',
        'advanced': 'Características Avanzadas'
    };
    
    let currentTopicIndex = 0;
    
    function updateTopicVisibility() {
        // Update button states
        prevButton.disabled = currentTopicIndex === 0;
        nextButton.disabled = currentTopicIndex === topics.length - 1;
        
        // Update current topic title
        document.querySelector('.current-topic').textContent = topicTitles[topics[currentTopicIndex]];
        
        // Show current topic content, hide others
        topics.forEach(topic => {
            const content = document.getElementById(`${topic}-content`);
            if (content) {
                content.style.display = topic === topics[currentTopicIndex] ? 'block' : 'none';
            }
        });
    }
    
    // Set up button event listeners
    if (prevButton && nextButton) {
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
        
        // Initialize visibility
        updateTopicVisibility();
    }
});