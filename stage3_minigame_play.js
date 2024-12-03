const appleOrder = ["File A", "File B", "File C", "File D"];
const msOrder = ["File 1", "File 2", "File 3", "File 4"];
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
