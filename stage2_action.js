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
            question: "유닉스 커널은 최초 개발 당시부터 C 언어로 작성되었다.",
            type: "OX",
            answers: ["O", "X"],
            correct: 1 // "X"가 정답
        },
        {
            question: "리눅스 커널은 리누스 토발즈에 의해 개발이 시작되었다.",
            type: "OX",
            answers: ["O", "X"],
            correct: 0 // "O"가 정답
        },
        {
            question: "1984년, BSD 유닉스는 어떤 기능을 추가하여 인터넷 통합에 중요한 역할을 했나요?",
            type: "4",
            answers: ["GUI 환경", "멀티태스킹", "파일 시스템", "TCP/IP 프로토콜"],
            correct: 3 // "OS/360"이 정답
        },
        {
            question: "우분투(Ubuntu)는 어떤 리눅스 배포판 계열에서 파생되었나요?",
            type: "4",
            answers: ["레드햇 계열", "슬랙웨어 계열", "데비안 계열", "아치 리눅스 계열"],
            correct: 2 // "데비안 계열"이 정답
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
        location.href = 'stage2_problem_solved.html';
    }

    // 첫 문제 로드
    loadQuestion();
});

