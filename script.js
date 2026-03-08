const words = [
    // Ουσιαστικά σε -ι
    { stem: 'πουλ', option: 'ι', correct: 'ί', full: 'πουλί' },
    { stem: 'παιδ', option: 'ι', correct: 'ί', full: 'παιδί' },
    { stem: 'σκυλ', option: 'ι', correct: 'ί', full: 'σκυλί' },
    { stem: 'χέρ', option: 'ι', correct: 'ι', full: 'χέρι' },
    { stem: 'πόδ', option: 'ι', correct: 'ι', full: 'πόδι' },
    { stem: 'μαχαίρ', option: 'ι', correct: 'ι', full: 'μαχαίρι' },
    { stem: 'σπίτ', option: 'ι', correct: 'ι', full: 'σπίτι' },
    { stem: 'κουτί', option: 'ι', correct: 'ί', full: 'κουτί' }, // wait stem is κουτ
    
    // Ουσιαστικά σε -η
    { stem: 'φων', option: 'η', correct: 'ή', full: 'φωνή' },
    { stem: 'βρύσ', option: 'η', correct: 'η', full: 'βρύση' },
    { stem: 'νίκ', option: 'η', correct: 'η', full: 'νίκη' },
    { stem: 'αγάπ', option: 'η', correct: 'η', full: 'αγάπη' },
    { stem: 'αυλ', option: 'η', correct: 'ή', full: 'αυλή' },
    { stem: 'βροχ', option: 'η', correct: 'ή', full: 'βροχή' },
    { stem: 'αράχν', option: 'η', correct: 'η', full: 'αράχνη' },

    // Ρήματα σε -ει
    { stem: 'τρέχ', option: 'ει', correct: 'ει', full: 'τρέχει' },
    { stem: 'παίζ', option: 'ει', correct: 'ει', full: 'παίζει' },
    { stem: 'γράφ', option: 'ει', correct: 'ει', full: 'γράφει' },
    { stem: 'διαβάζ', option: 'ει', correct: 'ει', full: 'διαβάζει' },
    { stem: 'βλέπ', option: 'ει', correct: 'ει', full: 'βλέπει' },
    { stem: 'κλαί', option: 'ει', correct: 'ει', full: 'κλαίει' },
    { stem: 'τραγουδά', option: 'ει', correct: 'ει', full: 'τραγουδάει' },

    // Πληθυντικός Ουσιαστικών σε -οι
    { stem: 'άνθρωπ', option: 'οι', correct: 'οι', full: 'άνθρωποι' },
    { stem: 'δρόμ', option: 'οι', correct: 'οι', full: 'δρόμοι' },
    { stem: 'φίλ', option: 'οι', correct: 'οι', full: 'φίλοι' },
    { stem: 'λύκ', option: 'οι', correct: 'οι', full: 'λύκοι' },
    { stem: 'κήπ', option: 'οι', correct: 'οι', full: 'κήποι' },
    { stem: 'γιατρ', option: 'οι', correct: 'οί', full: 'γιατροί' },
    { stem: 'δασκάλ', option: 'οι', correct: 'οι', full: 'δάσκαλοι' } // wait, δάσκαλ + οι.
];

// Διόρθωση μερικών λέξεων
words[7] = { stem: 'κουτ', option: 'ι', correct: 'ί', full: 'κουτί' };
words[26] = { stem: 'δάσκαλ', option: 'οι', correct: 'οι', full: 'δάσκαλοι' };

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

// Ήχοι (Προαιρετικό, αν θέλεις να προσθέσεις στο μέλλον)
const playCorrectSound = () => {
    try {
        const audio = new Audio('https://www.myinstants.com/media/sounds/correct-chime.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio error:', e));
    } catch (e) {}
};

const playWrongSound = () => {
    try {
        const audio = new Audio('https://www.myinstants.com/media/sounds/error-sound-effect.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio error:', e));
    } catch (e) {}
};

// Initialize Game
function initGame() {
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
    
    // Ενεργοποίηση κουμπιών με εφε
    optionBtns.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.transform = 'scale(1)';
    });
}

function updateScore() {
    correctScoreEl.textContent = correctScore;
    wrongScoreEl.textContent = wrongScore;
}

function handleOptionClick(event) {
    const selectedOption = event.target.getAttribute('data-ending');
    const currentWord = words[currentWordIndex];

    if (selectedOption === currentWord.option) {
        // Correct Answer
        playCorrectSound();
        wordEndingEl.textContent = currentWord.correct; // Βάζουμε το τονισμένο αν χρειάζεται
        wordEndingEl.className = 'missing filled-correct';
        wordCardEl.className = 'word-card correct-anim';
        
        feedbackMessageEl.textContent = 'Τέλεια! 🌟';
        feedbackMessageEl.className = 'feedback-message success pop-in';
        
        if (attemptsForWord === 0) {
            correctScore++;
            updateScore();
        }

        // Fire Confetti
        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#FF4757', '#2ED573', '#FFA502', '#1E90FF', '#FF69B4']
        });

        // Disable buttons
        optionBtns.forEach(btn => {
            btn.disabled = true;
            if (btn.getAttribute('data-ending') !== currentWord.option) {
                btn.style.opacity = '0.4';
                btn.style.transform = 'scale(0.95)';
            } else {
                btn.classList.add('pulse-btn');
            }
        });
        
        // Show next button
        nextBtn.classList.remove('hidden');
        
    } else {
        // Wrong Answer
        playWrongSound();
        attemptsForWord++;
        
        wordCardEl.classList.remove('shake');
        void wordCardEl.offsetWidth; // trigger reflow
        wordCardEl.classList.add('shake');
        
        feedbackMessageEl.textContent = 'Ωχ! Δοκίμασε ξανά... 🤔';
        feedbackMessageEl.className = 'feedback-message error';
        
        if (attemptsForWord === 1) {
            wrongScore++;
            updateScore();
        }
        
        // Disable the clicked wrong button
        event.target.disabled = true;
        event.target.style.opacity = '0.4';
        event.target.style.transform = 'scale(0.9)';
    }
}

// Event Listeners
optionBtns.forEach(btn => {
    btn.addEventListener('click', handleOptionClick);
});

nextBtn.addEventListener('click', () => {
    // Αφαίρεση pulse animation
    optionBtns.forEach(btn => btn.classList.remove('pulse-btn'));
    
    currentWordIndex++;
    if (currentWordIndex >= words.length) {
        // restart array
        initGame();
        feedbackMessageEl.textContent = 'Μπράβο! Τελείωσες όλες τις λέξεις! 🏆';
        feedbackMessageEl.className = 'feedback-message success pop-in';
    } else {
        loadWord();
    }
});

// Start the game on load
window.onload = initGame;
