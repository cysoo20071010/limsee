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
            question: "Mac OS X는 2001년에 유닉스 기반으로 출시되었다.",
            type: "OX",
            answers: ["O", "X"],
            correct: 0 // "O"가 정답
        },
        {
            question: "Windows 95는 시작 버튼과 작업 표시줄을 도입한 첫 윈도우 운영체제이다.",
            type: "OX",
            answers: ["O", "X"],
            correct: 0 // "O"가 정답
        },
        {
            question: "macOS Big Sur는 어떤 중요한 전환점을 발표했나요?",
            type: "4",
            answers: ["애플 실리콘 칩 전환", "코코아(Cocoa) 프레임워크 도입", "MS-DOS와의 통합", "유닉스 기반으로의 전환"],
            correct: 0 // "애플 실리콘 칩 전환"이 정답
        },
        {
            question: "MS-DOS 2.0에서 추가된 기능이 아닌 것은 무엇인가요?",
            type: "4",
            answers: ["시작 메뉴와 작업 표시줄", "그래픽 기반 인터페이스 도입", "지속적인 업데이트 모델", "안정성과 사용 편의성"],
            correct: 3 // "안정성과 사용 편의성"이 정답
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
        location.href = 'stage4_problem_solved.html';
    }

    // 첫 문제 로드
    loadQuestion();
});

