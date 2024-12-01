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
            question: "IBM은 1960년대에 처음으로 메인프레임 운영체제를 개발했다.",
            type: "OX",
            answers: ["O", "X"],
            correct: 0 // "O"가 정답
        },
        {
            question: "OS/360은 2000년대에 출시된 64비트 운영체제이다.",
            type: "OX",
            answers: ["O", "X"],
            correct: 1 // "X"가 정답
        },
        {
            question: "MVS는 어떤 운영체제의 후속 버전인가요?",
            type: "4",
            answers: ["OS/360", "z/OS", "CP/M", "Windows"],
            correct: 0 // "OS/360"이 정답
        },
        {
            question: "CP/M은 누구에 의해 처음 개발되었나요?",
            type: "4",
            answers: ["빌 게이츠", "게리 킬달", "스티브 잡스", "앨런 튜링"],
            correct: 1 // "게리 킬달"이 정답
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
        location.href = 'stage1_problem_solved.html';
    }

    // 첫 문제 로드
    loadQuestion();
});

