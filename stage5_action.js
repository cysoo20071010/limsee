document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startQuizBtn');
    const quizSection = document.querySelector('.quiz-section');
    const startSection = document.querySelector('.start-section');

    startBtn.addEventListener('click', () => {
        startSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "안드로이드 프로젝트는 2003년에 앤디 루빈에 의해 모바일 운영체제로 시작되었다.",
            type: "OX",
            answers: ["O", "X"],
            correct: 1 // "X"가 정답
        },
        {
            question: "켄 톰슨은 유닉스를 개발하면서 D 언어를 만들었다.",
            type: "OX",
            answers: ["O", "X"],
            correct: 1 // "X"가 정답
        },
        {
            question: "안드로이드 5.0 (Lollipop)에서 도입된 주요 기능은 무엇인가요?",
            type: "4",
            answers: ["다크 모드", "머티리얼 디자인(Material Design)", "제스처 네비게이션", "태블릿 통합 인터페이스"],
            correct: 1 // "머티리얼 디자인(Material Design)"이 정답
        },
        {
            question: "다음 중 C 언어를 개발한 사람은 누구인가요?",
            type: "4",
            answers: ["스티브 잡스", "빌 게이츠", "데니스 리치", "리누스 토르발즈"],
            correct: 2 // "데니스 리치"이 정답
        }
    ];

    let currentQuestion = 0;

    const questionText = document.querySelector('.quiz-question');
    const questionNumber = document.querySelector('.question-text'); // 문제 번호 텍스트
    const answersContainer = document.querySelector('.answers-container');
    const quizSection = document.querySelector('.quiz-section');
    const completionSection = document.querySelector('.quiz-completion');

    function loadQuestion() {
        const currentQuiz = quizData[currentQuestion];
        questionNumber.textContent = `문제 번호: ${currentQuestion + 1}`; // 문제 번호 업데이트
        questionText.textContent = currentQuiz.question;

        // 기존 버튼 제거
        answersContainer.innerHTML = "";

        // 새로운 버튼 생성
        currentQuiz.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('answer-btn');
            button.onclick = () => checkAnswer(index);
            answersContainer.appendChild(button);
        });

        // OX 퀴즈와 4지선다형 퀴즈 레이아웃 적용
        if (currentQuiz.type === "OX") {
            answersContainer.classList.add('ox-answers');
            answersContainer.classList.remove('multiple-choice-answers');
        } else {
            answersContainer.classList.add('multiple-choice-answers');
            answersContainer.classList.remove('ox-answers');
        }
    }

    function checkAnswer(selectedIndex) {
        const currentQuiz = quizData[currentQuestion];
        if (selectedIndex === currentQuiz.correct) {
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                endQuiz();
            }
        } else {
            alert("틀렸습니다! 다시 시도하세요.");
        }
    }

    function endQuiz() {
        // 퀴즈 성공 페이지로 이동
        location.href = 'stage5_problem_solved.html';
    }

    // 첫 문제 로드
    loadQuestion();
});

