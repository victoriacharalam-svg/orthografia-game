const words = [
    // Ουσιαστικά σε -ι
    { article: 'το', stem: 'πουλ', option: 'ι', correct: 'ί', full: 'πουλί' },
    { article: 'το', stem: 'παιδ', option: 'ι', correct: 'ί', full: 'παιδί' },
    { article: 'το', stem: 'σκυλ', option: 'ι', correct: 'ί', full: 'σκυλί' },
    { article: 'το', stem: 'χέρ', option: 'ι', correct: 'ι', full: 'χέρι' },
    { article: 'το', stem: 'πόδ', option: 'ι', correct: 'ι', full: 'πόδι' },
    { article: 'το', stem: 'μαχαίρ', option: 'ι', correct: 'ι', full: 'μαχαίρι' },
    { article: 'το', stem: 'σπίτ', option: 'ι', correct: 'ι', full: 'σπίτι' },
    { article: 'το', stem: 'κουτ', option: 'ι', correct: 'ί', full: 'κουτί' },
    
    // Ουσιαστικά σε -η
    { article: 'η', stem: 'φων', option: 'η', correct: 'ή', full: 'φωνή' },
    { article: 'η', stem: 'βρύσ', option: 'η', correct: 'η', full: 'βρύση' },
    { article: 'η', stem: 'νίκ', option: 'η', correct: 'η', full: 'νίκη' },
    { article: 'η', stem: 'αγάπ', option: 'η', correct: 'η', full: 'αγάπη' },
    { article: 'η', stem: 'αυλ', option: 'η', correct: 'ή', full: 'αυλή' },
    { article: 'η', stem: 'βροχ', option: 'η', correct: 'ή', full: 'βροχή' },
    { article: 'η', stem: 'αράχν', option: 'η', correct: 'η', full: 'αράχνη' },

    // Ρήματα (-ει ή -ω)
    // Εδώ βάζουμε και ρήματα σε -ει και ρήματα σε -ω
    { article: 'αυτός', stem: 'τρέχ', option: 'ει', correct: 'ει', full: 'τρέχει' },
    { article: 'εγώ', stem: 'παίζ', option: 'ω', correct: 'ω', full: 'παίζω' },
    { article: 'αυτή', stem: 'γράφ', option: 'ει', correct: 'ει', full: 'γράφει' },
    { article: 'αυτός', stem: 'διαβάζ', option: 'ει', correct: 'ει', full: 'διαβάζει' },
    { article: 'εγώ', stem: 'βλέπ', option: 'ω', correct: 'ω', full: 'βλέπω' },
    { article: 'αυτό', stem: 'κλαί', option: 'ει', correct: 'ει', full: 'κλαίει' },
    { article: 'αυτή', stem: 'τραγουδά', option: 'ει', correct: 'ει', full: 'τραγουδάει' },
    { article: 'εγώ', stem: 'τρέχ', option: 'ω', correct: 'ω', full: 'τρέχω' },

    // Πληθυντικός Ουσιαστικών σε -οι
    { article: 'οι', stem: 'άνθρωπ', option: 'οι', correct: 'οι', full: 'άνθρωποι' },
    { article: 'οι', stem: 'δρόμ', option: 'οι', correct: 'οι', full: 'δρόμοι' },
    { article: 'οι', stem: 'φίλ', option: 'οι', correct: 'οι', full: 'φίλοι' },
    { article: 'οι', stem: 'λύκ', option: 'οι', correct: 'οι', full: 'λύκοι' },
    { article: 'οι', stem: 'κήπ', option: 'οι', correct: 'οι', full: 'κήποι' },
    { article: 'οι', stem: 'γιατρ', option: 'οι', correct: 'οί', full: 'γιατροί' },
    { article: 'οι', stem: 'δάσκαλ', option: 'οι', correct: 'οι', full: 'δάσκαλοι' },

    // Ουσιαστικά σε -ο
    { article: 'το', stem: 'βάζ', option: 'ο', correct: 'ο', full: 'βάζο' },
    { article: 'το', stem: 'μήλ', option: 'ο', correct: 'ο', full: 'μήλο' },
    { article: 'το', stem: 'βιβλί', option: 'ο', correct: 'ο', full: 'βιβλίο' },
    { article: 'το', stem: 'νερ', option: 'ο', correct: 'ό', full: 'νερό' },
    { article: 'το', stem: 'βουν', option: 'ο', correct: 'ό', full: 'βουνό' },
    { article: 'το', stem: 'δέντρ', option: 'ο', correct: 'ο', full: 'δέντρο' },
    { article: 'το', stem: 'φύλλ', option: 'ο', correct: 'ο', full: 'φύλλο' },
    { article: 'το', stem: 'χωρι', option: 'ο', correct: 'ό', full: 'χωριό' }
];

// DOM Elements for Mode Selection
const startScreenEl = document.getElementById('start-screen');
const levelScreenEl = document.getElementById('level-screen');
const timeScreenEl = document.getElementById('time-screen');
const gameContainerEl = document.getElementById('game-container');
const timerDisplayEl = document.getElementById('timer-display');
const templateEl = document.getElementById('player-board-template');

// Global Instances
let playerBoards = [];
let selectedMode = null;
let selectedLevel = 1;
let gameTimer = null;

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

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

class PlayerBoard {
    constructor(containerElement, level) {
        this.level = level;
        // Clone the template
        this.boardEl = templateEl.content.cloneNode(true).querySelector('.player-board');
        containerElement.appendChild(this.boardEl);
        
        // Find specific elements within this board
        this.wordArticleEl = this.boardEl.querySelector('.word-article');
        this.wordStemEl = this.boardEl.querySelector('.word-stem');
        this.wordEndingEl = this.boardEl.querySelector('.word-ending');
        this.wordCardEl = this.boardEl.querySelector('.word-card');
        this.feedbackMessageEl = this.boardEl.querySelector('.feedback-message');
        this.optionBtns = this.boardEl.querySelectorAll('.option-btn');
        this.nextBtn = this.boardEl.querySelector('.next-btn');
        this.correctScoreEl = this.boardEl.querySelector('.correct-score');
        this.wrongScoreEl = this.boardEl.querySelector('.wrong-score');
        
        // Bind events
        this.optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleOptionClick(e));
        });
        this.nextBtn.addEventListener('click', () => this.handleNextClick());
        
        // Initialize Game State
        this.initGame();
    }
    
    initGame() {
        this.playerWords = shuffleArray(words);
        this.currentWordIndex = 0;
        this.correctScore = 0;
        this.wrongScore = 0;
        this.updateScore();
        this.loadWord();
    }
    
    loadWord() {
        this.attemptsForWord = 0;
        const currentWord = this.playerWords[this.currentWordIndex];
        
        // Reset UI
        if (currentWord.article && this.level === 1) {
            this.wordArticleEl.textContent = currentWord.article + ' ';
            this.wordArticleEl.style.display = 'inline';
        } else {
            this.wordArticleEl.style.display = 'none';
            this.wordArticleEl.textContent = '';
        }
        this.wordStemEl.textContent = currentWord.stem;
        this.wordEndingEl.textContent = '\u00A0';
        this.wordEndingEl.className = 'word-ending missing';
        this.wordCardEl.className = 'word-card';
        this.feedbackMessageEl.textContent = '';
        this.feedbackMessageEl.className = 'feedback-message';
        this.nextBtn.classList.add('hidden');
        
        // Ενεργοποίηση κουμπιών με εφε
        this.optionBtns.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1)';
        });
    }

    updateScore() {
        this.correctScoreEl.textContent = this.correctScore;
        this.wrongScoreEl.textContent = this.wrongScore;
    }

    handleOptionClick(event) {
        const selectedOption = event.target.getAttribute('data-ending');
        const currentWord = this.playerWords[this.currentWordIndex];

        if (selectedOption === currentWord.option) {
            // Correct Answer
            playCorrectSound();
            this.wordEndingEl.textContent = currentWord.correct;
            this.wordEndingEl.className = 'word-ending missing filled-correct';
            this.wordCardEl.className = 'word-card correct-anim';
            
            this.feedbackMessageEl.textContent = 'Τέλεια! 🌟';
            this.feedbackMessageEl.className = 'feedback-message success pop-in';
            
            if (this.attemptsForWord === 0) {
                this.correctScore++;
                this.updateScore();
            }

            // Fire Confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { 
                    x: this.boardEl.getBoundingClientRect().left / window.innerWidth + (this.boardEl.getBoundingClientRect().width / 2) / window.innerWidth,
                    y: this.boardEl.getBoundingClientRect().top / window.innerHeight + (this.boardEl.getBoundingClientRect().height / 2) / window.innerHeight
                },
                colors: ['#FF4757', '#2ED573', '#FFA502', '#1E90FF', '#FF69B4']
            });

            // Disable buttons
            this.optionBtns.forEach(btn => {
                btn.disabled = true;
                if (btn.getAttribute('data-ending') !== currentWord.option) {
                    btn.style.opacity = '0.4';
                    btn.style.transform = 'scale(0.95)';
                } else {
                    btn.classList.add('pulse-btn');
                }
            });
            
            // Show next button
            if (this.currentWordIndex === this.playerWords.length - 1) {
                this.nextBtn.textContent = 'Παίξε ξανά 🔄';
            } else {
                this.nextBtn.textContent = 'Επόμενη Λέξη ➔';
            }
            this.nextBtn.classList.remove('hidden');
            
        } else {
            // Wrong Answer
            playWrongSound();
            this.attemptsForWord++;
            
            this.wordCardEl.classList.remove('shake');
            void this.wordCardEl.offsetWidth; // trigger reflow
            this.wordCardEl.classList.add('shake');
            
            this.feedbackMessageEl.textContent = 'Ωχ! Δοκίμασε ξανά... 🤔';
            this.feedbackMessageEl.className = 'feedback-message error';
            
            if (this.attemptsForWord === 1) {
                this.wrongScore++;
                this.updateScore();
            }
            
            // Disable the clicked wrong button
            event.target.disabled = true;
            event.target.style.opacity = '0.4';
            event.target.style.transform = 'scale(0.9)';
        }
    }

    disable() {
        this.optionBtns.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.4';
        });
        this.nextBtn.classList.add('hidden');
        this.feedbackMessageEl.textContent = `⏰ Τέλος! Σωστά: ${this.correctScore} | Λάθος: ${this.wrongScore}`;
        this.feedbackMessageEl.className = 'feedback-message success pop-in';
    }

    handleNextClick() {
        // Αφαίρεση pulse animation
        this.optionBtns.forEach(btn => btn.classList.remove('pulse-btn'));
        
        this.currentWordIndex++;
        if (this.currentWordIndex >= this.playerWords.length) {
            // restart array
            this.initGame();
            this.feedbackMessageEl.textContent = 'Μπράβο! Τελείωσες όλες τις λέξεις και ξεκινάμε νέο γύρο! 🏆';
            this.feedbackMessageEl.className = 'feedback-message success pop-in';
        } else {
            this.loadWord();
        }
    }
}

window.selectMode = function(mode) {
    selectedMode = mode;
    startScreenEl.classList.add('hidden');
    levelScreenEl.classList.remove('hidden');
};

window.selectLevel = function(level) {
    selectedLevel = level;
    levelScreenEl.classList.add('hidden');
    timeScreenEl.classList.remove('hidden');
};

window.goBackToStart = function() {
    levelScreenEl.classList.add('hidden');
    startScreenEl.classList.remove('hidden');
};

window.goBackToLevel = function() {
    timeScreenEl.classList.add('hidden');
    levelScreenEl.classList.remove('hidden');
};

// Start Game based on Mode and Time
window.startGame = function(seconds) {
    timeScreenEl.classList.add('hidden');
    gameContainerEl.classList.remove('hidden');

    // Clear any existing boards just in case (except the home button)
    const boards = gameContainerEl.querySelectorAll('.player-board');
    boards.forEach(b => b.remove());
    gameContainerEl.className = 'game-container'; // reset classes

    playerBoards = [];

    if (selectedMode === 'single') {
        gameContainerEl.classList.add('mode-single');
        playerBoards.push(new PlayerBoard(gameContainerEl, selectedLevel));
    } else if (selectedMode === 'tablet') {
        gameContainerEl.classList.add('mode-tablet');
        playerBoards.push(new PlayerBoard(gameContainerEl, selectedLevel));
        playerBoards.push(new PlayerBoard(gameContainerEl, selectedLevel));
    } else if (selectedMode === 'board') {
        gameContainerEl.classList.add('mode-board');
        playerBoards.push(new PlayerBoard(gameContainerEl, selectedLevel));
        playerBoards.push(new PlayerBoard(gameContainerEl, selectedLevel));
    }

    startTimer(seconds);
};

function startTimer(seconds) {
    if (gameTimer) clearInterval(gameTimer);
    let timeRemaining = seconds;

    function updateDisplay() {
        const mins = Math.floor(timeRemaining / 60);
        const secs = timeRemaining % 60;
        timerDisplayEl.textContent = mins > 0
            ? `⏱️ ${mins}:${secs.toString().padStart(2, '0')}`
            : `⏱️ ${secs}`;
        if (timeRemaining <= 10) {
            timerDisplayEl.classList.add('timer-urgent');
        } else {
            timerDisplayEl.classList.remove('timer-urgent');
        }
    }

    updateDisplay();
    gameTimer = setInterval(() => {
        timeRemaining--;
        updateDisplay();
        if (timeRemaining <= 0) {
            clearInterval(gameTimer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    timerDisplayEl.textContent = '⏰ Τέλος χρόνου!';
    timerDisplayEl.classList.remove('timer-urgent');
    timerDisplayEl.classList.add('timer-ended');
    playerBoards.forEach(board => board.disable());
}


