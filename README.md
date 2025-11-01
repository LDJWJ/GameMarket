# 게임 허브 (GameMarket)

웹 브라우저에서 즐길 수 있는 미니 게임 컬렉션입니다.

## 🎮 데모

**온라인 플레이:** https://ldjwj.github.io/GameMarket/

## 📋 게임 목록

### 1. 공 피하기 게임 (Ball Avoidance Game)
- **조작법:** 마우스로 플레이어 조종
- **게임 방식:** 적을 피하고 아이템을 수집하여 점수 획득
- **특징:**
  - 실시간 마우스 추적 시스템
  - 플레이어를 향해 추격하는 AI 적
  - 점수와 최고 점수 기록 (localStorage 사용)
  - 일시정지/재시작 기능

### 2. 테트리스 (Tetris)
- **조작법:** 키보드 화살표 키
  - ←/→: 좌우 이동
  - ↑: 회전
  - ↓: 빠른 낙하
- **게임 방식:** 떨어지는 블록을 배치하여 라인 완성
- **특징:**
  - 7가지 테트로미노 블록
  - 라인 완성 시 점수 증가
  - 난이도 증가 시스템

### 3. 사다리 게임 (Ladder Game)
- **조작법:** 클릭
- **게임 방식:** 참가자와 결과를 설정하고 사다리 타기
- **특징:**
  - 사용자 정의 참가자 및 결과
  - 랜덤 사다리 생성
  - 애니메이션 효과

## 🚀 시작하기

### 필요 사항
- 모던 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- 로컬 서버 (개발 시)

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/ldjwj/GameMarket.git
cd GameMarket
```

2. **로컬 서버 실행**

Python을 사용하는 경우:
```bash
python -m http.server 8000
```

Node.js를 사용하는 경우:
```bash
npx http-server
```

VS Code를 사용하는 경우:
- Live Server 확장 프로그램 설치
- `index.html` 우클릭 → "Open with Live Server"

3. **브라우저에서 열기**
```
http://localhost:8000
```

## 📁 프로젝트 구조

```
GameMarket/
├── index.html              # 게임 허브 메인 페이지
├── ball-game.html          # 공 피하기 게임 페이지
├── tetris.html             # 테트리스 게임 페이지
├── ladder.html             # 사다리 게임 페이지
├── css/
│   ├── hub.css            # 허브 페이지 스타일
│   ├── ball-game.css      # 공 피하기 게임 스타일
│   ├── tetris.css         # 테트리스 스타일
│   └── styles.css         # 공통 스타일
├── js/
│   ├── game.js            # 공 피하기 게임 로직
│   └── tetris.js          # 테트리스 게임 로직
└── CLAUDE.md              # 개발 가이드

```

## 🛠️ 기술 스택

- **HTML5**: 게임 구조 및 마크업
- **CSS3**: 스타일링 및 애니메이션
  - Flexbox/Grid 레이아웃
  - CSS 그라데이션
  - 키프레임 애니메이션
- **Vanilla JavaScript**: 게임 로직 및 상호작용
  - requestAnimationFrame API
  - localStorage API
  - DOM 조작
  - 이벤트 처리

## 🎯 주요 기능

### 공 피하기 게임
- ✅ 마우스 기반 플레이어 제어
- ✅ 적 AI (플레이어 추적)
- ✅ 수집 아이템 시스템
- ✅ 점수 및 최고 점수 기록
- ✅ 일시정지/재시작 기능
- ✅ 충돌 감지 (AABB)

### 테트리스
- ✅ 7가지 테트로미노 블록
- ✅ 블록 회전 및 이동
- ✅ 라인 완성 감지
- ✅ 점수 시스템
- ✅ 게임 오버 감지

### 사다리 게임
- ✅ 동적 사다리 생성
- ✅ 커스터마이징 가능한 참가자/결과
- ✅ 애니메이션 효과
- ✅ 결과 표시

## 📅 업데이트 히스토리

### 2025-11-01
- ✨ README.md 개선 및 업데이트 히스토리 섹션 추가
- 📝 프로젝트 문서화 강화
- 🐛 사다리 게임 결과 중복 버그 수정
  - 사다리 경로 추적 로직 개선 (row 기반 정확한 매칭)
  - 사다리 생성 시 같은 행에 겹치는 사다리 방지
  - 각 참가자가 고유한 발표 순서를 받도록 보장

### 2025-10-16
- 🎮 프로젝트 초기 릴리즈
- ✨ 공 피하기 게임 추가 (마우스 조작, 적 AI, 아이템 수집)
- ✨ 테트리스 게임 추가 (키보드 조작, 블록 회전/이동, 라인 완성)
- ✨ 사다리 게임 추가 (참가자/결과 커스터마이징, 애니메이션)
- 🎨 게임 허브 메인 페이지 구현
- 📱 반응형 디자인 적용
- 💾 localStorage를 활용한 최고 점수 저장 기능

## 📝 개발 가이드

게임 동작 방식, 코드 구조, 수정 방법 등 자세한 개발 정보는 [CLAUDE.md](CLAUDE.md) 파일을 참조하세요.

### 난이도 조정 (공 피하기 게임)

`js/game.js`의 `config` 객체를 수정:

```javascript
const config = {
    playerSpeed: 5,              // 플레이어 이동 속도
    enemySpeed: 2,               // 적 이동 속도
    enemySpawnRate: 2000,        // 적 생성 간격 (ms)
    collectibleSpawnRate: 3000   // 아이템 생성 간격 (ms)
};
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 오픈 소스이며 자유롭게 사용할 수 있습니다.

## 📞 연락처

프로젝트 링크: [https://github.com/ldjwj/GameMarket](https://github.com/ldjwj/GameMarket)

---

⭐ 이 프로젝트가 마음에 드신다면 Star를 눌러주세요!
