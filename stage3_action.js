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
            question: " Apple DOS 3.3은 디스크 저장 공간의 효율성을 크게 개선한 버전이다.",
            type: "OX",
            answers: ["O", "X"],
            correct: 0 // "O"가 정답
        },
        {
            question: "MS-DOS 1.0은 IBM의 PC용으로 개발되기 전에 'QDOS'로 불렸다.",
            type: "OX",
            answers: ["O", "X"],
            correct: 0 // "O"가 정답
        },
        {
            question: "Apple DOS 3.2의 주요 개선 사항은 무엇인가요?",
            type: "4",
            answers: ["디스크 저장 공간 효율성", "애플 II 플러스와의 호환성 개선", "네트워크 기능 추가", "하드 디스크 지원"],
            correct: 1 // "애플 II 플러스와의 호환성 개선"이 정답
        },
        {
            question: "MS-DOS 2.0에서 추가된 기능이 아닌 것은 무엇인가요?",
            type: "4",
            answers: ["디렉토리 트리 구조", "하드 디스크 지원", "네트워크 기능", "명령줄 인터페이스 개선"],
            correct: 2 // "네트워크 기능"이 정답
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
        location.href = 'stage3_problem_solved.html';
    }

    // 첫 문제 로드
    loadQuestion();
});

