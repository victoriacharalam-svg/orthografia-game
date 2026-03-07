const words = [
    // Nouns in -ι
    { stem: 'πουλ', ending: 'ι', full: 'πουλί' },
    { stem: 'παιδ', ending: 'ι', full: 'παιδί' },
    { stem: 'σκυλ', ending: 'ι', full: 'σκυλί' },
    { stem: 'χερ', ending: 'ι', full: 'χέρι' },
    { stem: 'ποδ', ending: 'ι', full: 'πόδι' },
    { stem: 'μαχαιρ', ending: 'ι', full: 'μαχαίρι' },
    
    // Nouns in -η
    { stem: 'φων', ending: 'η', full: 'φωνή' },
    { stem: 'βρυσ', ending: 'η', full: 'βρύση' },
    { stem: 'νικ', ending: 'η', full: 'νίκη' },
    { stem: 'αγαπ', ending: 'η', full: 'αγάπη' },
    { stem: 'αυλ', ending: 'η', full: 'αυλή' },
    { stem: 'βροχ', ending: 'η', full: 'βροχή' },

    // Verbs in -ει
    { stem: 'τρεχ', ending: 'ει', full: 'τρέχει' },
    { stem: 'παιζ', ending: 'ει', full: 'παίζει' },
    { stem: 'γραφ', ending: 'ει', full: 'γράφει' },
    { stem: 'διαβαζ', ending: 'ει', full: 'διαβάζει' },
    { stem: 'βλεπ', ending: 'ει', full: 'βλέπει' },
    { stem: 'κλαι', ending: 'ει', full: 'κλαίει' },

    // Plural Nouns in -οι
    { stem: 'ανθρωπ', ending: 'οι', full: 'άνθρωποι' },
    { stem: 'δρομ', ending: 'οι', full: 'δρόμοι' },
    { stem: 'φιλ', ending: 'οι', full: 'φίλοι' },
    { stem: 'λυκ', ending: 'οι', full: 'λύκοι' },
    { stem: 'κηπ', ending: 'οι', full: 'κήποι' },
    { stem: 'γιατρ', ending: 'οι', full: 'γιατροί' }
];

let currentWordIndex = 0;
let correctScore = 0;
let wrongScore = 0;
let attemptsForWord = 0; // tracking if they missed the first try

// DOM Elements
const wordStemEl = document.getElementById('word-stem');
const wordEndingEl = document.getElementById('word-ending');
const wordCardEl = document.getElementById('word-card');
const feedbackMessageEl = document.getElementById('feedback-message');
const optionBtns = document.querySelectorAll('.option-btn');
const nextBtn = document.getElementById('next-btn');
const correctScoreEl = document.getElementById('correct-score');
const wrongScoreEl = document.getElementById('wrong-score');

// Initialize Game
function initGame() {
    // Shuffle words for random order testing
    words.sort(() => Math.random() - 0.5);
    currentWordIndex = 0;
    correctScore = 0;
    wrongScore = 0;
    updateScore();
    loadWord();
}

function loadWord() {
    attemptsForWord = 0;
    const currentWord = words[currentWordIndex];
    
    // Reset UI
    wordStemEl.textContent = currentWord.stem;
    wordEndingEl.textContent = '_';
    wordEndingEl.className = 'missing';
    wordCardEl.className = 'word-card';
    feedbackMessageEl.textContent = '';
    feedbackMessageEl.className = 'feedback-message';
    nextBtn.classList.add('hidden');
    
    // Enable all buttons
    optionBtns.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
    });
}

function updateScore() {
    correctScoreEl.textContent = correctScore;
    wrongScoreEl.textContent = wrongScore;
}

function handleOptionClick(event) {
    const selectedEnding = event.target.getAttribute('data-ending');
    const currentWord = words[currentWordIndex];

    if (selectedEnding === currentWord.ending) {
        // Correct Answer
        wordEndingEl.textContent = selectedEnding;
        wordEndingEl.className = 'missing filled-correct';
        wordCardEl.className = 'word-card correct-anim';
        
        feedbackMessageEl.textContent = 'Μπράβο! Σωστό!';
        feedbackMessageEl.className = 'feedback-message success';
        
        if (attemptsForWord === 0) {
            correctScore++;
            updateScore();
        }

        // Fire Confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2ed573', '#1dd1a1', '#ffeccc']
        });

        // Disable buttons
        optionBtns.forEach(btn => btn.disabled = true);
        
        // Show next button
        nextBtn.classList.remove('hidden');
        
    } else {
        // Wrong Answer
        attemptsForWord++;
        
        wordCardEl.classList.remove('shake');
        // trigger reflow
        void wordCardEl.offsetWidth;
        wordCardEl.classList.add('shake');
        
        feedbackMessageEl.textContent = 'Ωχ! Δοκίμασε ξανά...';
        feedbackMessageEl.className = 'feedback-message error';
        
        if (attemptsForWord === 1) {
            wrongScore++;
            updateScore();
        }
        
        // Disable the clicked wrong button
        event.target.disabled = true;
        event.target.style.opacity = '0.3';
    }
}

// Event Listeners
optionBtns.forEach(btn => {
    btn.addEventListener('click', handleOptionClick);
});

nextBtn.addEventListener('click', () => {
    currentWordIndex++;
    if (currentWordIndex >= words.length) {
        // restart array
        initGame();
    } else {
        loadWord();
    }
});

// Start the game on load
window.onload = initGame;
