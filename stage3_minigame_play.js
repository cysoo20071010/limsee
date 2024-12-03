const appleOrder = ["Apple II", "최초의 디스크 기반 운영체제 지원", "디스크 드라이브", "간단한 명령어 인터페이스", "최적화된 디스크 관리", "간결환 명령어", "독창적인 파일 시스템"];
const msOrder = ["IBM PC와 함께 출시", "PC 산업 표준으로 자리잡은 운영체제", "CP/M 압도", "간결하고 효율적인 구조", "제한된 하드웨어에서 잘 돌아감", "폭넓은 소프트웨어 호환성", "점차 윈도우와 통합"];
let draggedFile = null;

document.getElementById("startButton").addEventListener("click", startGame);

function startGame() {
    const filePool = document.getElementById("filePool");
    filePool.innerHTML = "";

    const allFiles = [...appleOrder, ...msOrder]
        .sort(() => Math.random() - 0.5);

    allFiles.forEach(file => {
        const fileElement = document.createElement("div");
        fileElement.classList.add("file");
        fileElement.textContent = file;
        fileElement.draggable = true;

        fileElement.addEventListener("dragstart", () => {
            draggedFile = fileElement;
        });

        filePool.appendChild(fileElement);
    });

    setDropZones();
}

function setDropZones() {
    const appleZone = document.getElementById("appleZone");
    const msZone = document.getElementById("msZone");

    [appleZone, msZone].forEach(zone => {
        zone.innerHTML = "";

        zone.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            if (draggedFile) {
                zone.appendChild(draggedFile);
                draggedFile = null;
                checkWinCondition();
            }
        });
    });
}

function checkWinCondition() {
    const appleZone = Array.from(document.getElementById("appleZone").children)
        .map(el => el.textContent);
    const msZone = Array.from(document.getElementById("msZone").children)
        .map(el => el.textContent);

    const appleCorrect = appleZone.join(",") === appleOrder.join(",");
    const msCorrect = msZone.join(",") === msOrder.join(",");

    if (appleCorrect && msCorrect) {
        document.getElementById("result").style.display = "block";
        document.getElementById("result").textContent = "Congratulations! Files are correctly recovered!";
    }
}
