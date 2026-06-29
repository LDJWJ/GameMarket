// ===== 난이도 설정 =====
const DIFFICULTY_SETTINGS = {
    easy:   { label: '쉬움',   emoji: '🐢', minInterval: 1000, maxInterval: 1500, speedRate: 0.95, speedEvery: 10 },
    normal: { label: '보통',   emoji: '🐰', minInterval: 700,  maxInterval: 1200, speedRate: 0.90, speedEvery: 8  },
    hard:   { label: '어려움', emoji: '🚀', minInterval: 500,  maxInterval: 900,  speedRate: 0.85, speedEvery: 6  },
};

// 점수에 따른 레벨 임계값
const LEVEL_THRESHOLDS = [0, 5, 12, 20, 30, 42, 55, 70, 90, 999];
const GAME_DURATION = 30;
const GRID_SIZE = 3;

// ===== 게임 상태 =====
const state = {
    score: 0,
    timeLeft: GAME_DURATION,
    molePosition: null,
    isActive: false,
    hasStarted: false,
    level: 1,
    difficulty: 'normal',
    speedMultiplier: 1,
    moleTimer: null,
    gameTimer: null,
};

// ===== DOM 참조 =====
const els = {
    scoreValue:      document.getElementById('score-value'),
    timerValue:      document.getElementById('timer-value'),
    levelValue:      document.getElementById('level-value'),
    difficultyValue: document.getElementById('difficulty-value'),
    scoreBox:        document.getElementById('score-box'),
    timerBox:        document.getElementById('timer-box'),
    scoreboard:      document.getElementById('scoreboard'),
    holesGrid:       document.getElementById('holes-grid'),
    diffSection:     document.getElementById('difficulty-section'),
    startBtn:        document.getElementById('start-btn'),
    hintText:        document.getElementById('hint-text'),
    modalOverlay:    document.getElementById('modal-overlay'),
    modalScore:      document.getElementById('modal-score'),
    modalLevel:      document.getElementById('modal-level'),
    modalDifficulty: document.getElementById('modal-difficulty'),
    modalMessage:    document.getElementById('modal-message'),
    diffBtns:        document.querySelectorAll('.diff-btn'),
};

// ===== 구멍 초기 생성 =====
function buildGrid() {
    const total = GRID_SIZE * GRID_SIZE;
    for (let i = 0; i < total; i++) {
        const hole = document.createElement('div');
        hole.className = 'hole inactive';
        hole.dataset.index = i;
        hole.innerHTML = '<div class="hole-inner"></div>';
        hole.addEventListener('click', () => handleHoleClick(i));
        els.holesGrid.appendChild(hole);
    }
}

function getHoles() {
    return els.holesGrid.querySelectorAll('.hole');
}

// ===== 레벨 계산 =====
function calcLevel(score) {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
        if (score >= LEVEL_THRESHOLDS[i]) return i + 1;
    }
    return 1;
}

// ===== 랜덤 인터벌 =====
function randomInterval() {
    const s = DIFFICULTY_SETTINGS[state.difficulty];
    const base = Math.floor(Math.random() * (s.maxInterval - s.minInterval + 1)) + s.minInterval;
    return Math.floor(base * state.speedMultiplier);
}

// ===== 두더지 표시/숨기기 =====
function showMole(index) {
    const holes = getHoles();
    holes.forEach((h, i) => {
        const mole = h.querySelector('.mole');
        if (i === index) {
            if (!mole) {
                const m = document.createElement('div');
                m.className = 'mole';
                m.textContent = '🐹';
                h.appendChild(m);
            }
        } else {
            if (mole) mole.remove();
        }
    });
}

function hideMole() {
    getHoles().forEach(h => {
        const mole = h.querySelector('.mole');
        if (mole) mole.remove();
    });
}

// ===== 두더지 스폰 =====
function spawnMole() {
    if (!state.isActive) return;

    const total = GRID_SIZE * GRID_SIZE;
    let next;
    do {
        next = Math.floor(Math.random() * total);
    } while (next === state.molePosition);

    state.molePosition = next;
    showMole(next);

    state.moleTimer = setTimeout(spawnMole, randomInterval());
}

// ===== 구멍 클릭 처리 =====
function handleHoleClick(index) {
    if (!state.isActive) return;
    if (state.molePosition !== index) return;

    state.score++;
    const newLevel = calcLevel(state.score);
    if (newLevel !== state.level) {
        state.level = newLevel;
        els.levelValue.textContent = state.level;
    }

    state.molePosition = null;
    hideMole();
    updateScoreDisplay();
}

// ===== UI 업데이트 =====
function updateScoreDisplay() {
    els.scoreValue.textContent = state.score;
    // 점수 팝 애니메이션
    els.scoreBox.classList.remove('pop');
    void els.scoreBox.offsetWidth; // reflow
    els.scoreBox.classList.add('pop');
    setTimeout(() => els.scoreBox.classList.remove('pop'), 300);
}

function updateTimerDisplay() {
    els.timerValue.textContent = state.timeLeft + '초';
    if (state.timeLeft <= 10) {
        els.timerBox.classList.add('warning');
    } else {
        els.timerBox.classList.remove('warning');
    }
}

function setHolesActive(active) {
    getHoles().forEach(h => {
        h.classList.toggle('inactive', !active);
    });
}

function showScoreboard(visible) {
    els.scoreboard.style.display = visible ? 'flex' : 'none';
}

function showDiffSection(visible) {
    els.diffSection.style.display = visible ? 'block' : 'none';
}

function showStartBtn(visible) {
    els.startBtn.style.display = visible ? 'inline-block' : 'none';
}

function showHint(visible) {
    els.hintText.style.display = visible ? 'block' : 'none';
}

function showModal(visible) {
    els.modalOverlay.classList.toggle('hidden', !visible);
}

// ===== 게임 시작 =====
function startGame() {
    clearTimeout(state.moleTimer);
    clearInterval(state.gameTimer);

    state.score = 0;
    state.timeLeft = GAME_DURATION;
    state.molePosition = null;
    state.isActive = true;
    state.hasStarted = true;
    state.level = 1;
    state.speedMultiplier = 1;

    hideMole();
    setHolesActive(true);
    showScoreboard(true);
    showDiffSection(false);
    showStartBtn(false);
    showHint(true);
    showModal(false);

    els.scoreValue.textContent = '0';
    els.levelValue.textContent = '1';
    els.timerValue.textContent = GAME_DURATION + '초';
    els.timerBox.classList.remove('warning');
    els.difficultyValue.textContent = DIFFICULTY_SETTINGS[state.difficulty].label;
    els.startBtn.textContent = '다시 시작 🔄';

    // 첫 두더지 딜레이
    state.moleTimer = setTimeout(spawnMole, 500);

    // 1초 카운트다운
    let elapsed = 0;
    state.gameTimer = setInterval(() => {
        elapsed++;
        state.timeLeft--;

        // 속도 증가
        const s = DIFFICULTY_SETTINGS[state.difficulty];
        if (elapsed % s.speedEvery === 0) {
            state.speedMultiplier *= s.speedRate;
        }

        updateTimerDisplay();

        if (state.timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// ===== 게임 종료 =====
function endGame() {
    clearTimeout(state.moleTimer);
    clearInterval(state.gameTimer);

    state.isActive = false;
    state.molePosition = null;
    hideMole();
    setHolesActive(false);
    showHint(false);

    // 모달 내용 채우기
    els.modalScore.textContent = state.score + '점';
    els.modalLevel.textContent = '레벨 ' + state.level;
    els.modalDifficulty.textContent = DIFFICULTY_SETTINGS[state.difficulty].label;

    const msg = state.score >= 25 ? '🏆 대단해요! 두더지 마스터!'
               : state.score >= 15 ? '🌟 훌륭해요! 실력이 좋네요!'
               : state.score >= 10 ? '👍 잘했어요! 조금만 더 연습해요!'
               : '💪 다음엔 더 잘할 수 있어요!';
    els.modalMessage.textContent = msg;

    showModal(true);
}

// ===== 난이도 버튼 이벤트 =====
els.diffBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        state.difficulty = btn.dataset.difficulty;
        els.diffBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ===== 시작 버튼 이벤트 =====
els.startBtn.addEventListener('click', startGame);

// ===== 모달 재시작 버튼 =====
document.getElementById('modal-restart-btn').addEventListener('click', () => {
    showModal(false);
    showDiffSection(true);
    showStartBtn(true);
});

// ===== 초기화 =====
buildGrid();
showScoreboard(false);
showHint(false);
showModal(false);
