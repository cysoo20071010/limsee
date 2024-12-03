const keywords = [
  "리눅스", "유닉스", "간결하고 모듈화된 설계 철학", "멀티태스킹과 다중 사용자 지원", "이식성과 표준화", 
  "BSD유닉스", "유닉스 커널", "데니스 리치", "리누스 토르발즈", "오픈소스와 커뮤니티 중심 개발", 
  "폭넓은 플랫폼 호환성", "안정성과 보안", "데비안 프로젝트", "우분투", "사용자 친화적"
];

// Duplicate and shuffle keywords
const cards = [...keywords, ...keywords].sort(() => 0.3 - Math.random());

const gameBoard = document.getElementById("gameBoard");
const resultElement = document.getElementById("result");
let flippedCards = [];
let matchedCards = 0;
let startTime = Date.now();

// Create card elements
cards.forEach((keyword, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.keyword = keyword;
  card.dataset.index = index;

  const front = document.createElement("div");
  front.classList.add("front");
  front.textContent = "";

  const back = document.createElement("div");
  back.classList.add("back");
  back.textContent = keyword;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", () => {
      if (
          card.classList.contains("flipped") || 
          card.classList.contains("matched") ||
          flippedCards.length === 2
      ) {
          return;
      }

      card.classList.add("flipped");
      flippedCards.push(card);

      if (flippedCards.length === 2) {
          setTimeout(checkMatch, 500);
      }
  });

  gameBoard.appendChild(card);
});

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.keyword === card2.dataset.keyword) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedCards += 2;

      if (matchedCards === cards.length) {
          setTimeout(() => {
              const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
              showResult(elapsedTime);
          }, 500);
      }
  } else {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
  }

  flippedCards = [];
}

function showResult(elapsedTime) {
  gameBoard.style.display = "none";
  if (elapsedTime <= 100) {
      resultElement.innerHTML = `<p>축하합니다! 성공하셨습니다! 걸린 시간: ${elapsedTime}초</p><button onclick="location.href='index.html'">돌아가기</button>`;
  } else {
      resultElement.innerHTML = `<p>시간 초과! 실패하셨습니다! 걸린 시간: ${elapsedTime}초</p><button onclick="location.reload()">다시하기</button>`;
  }
  resultElement.style.display = "block";
}
