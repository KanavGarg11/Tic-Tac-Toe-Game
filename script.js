let player1score = 0;
let player2score = 0;
let player1IsX = true;
let status = 1;

const player1 = document.querySelector(".score1");
const player2 = document.querySelector(".score2");
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");
const boxes = document.querySelectorAll(".box");

const marker1 = document.querySelector(".marker1");
const marker2 = document.querySelector(".marker2");

let boardState = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function updateMarkers() {
    if (player1IsX) {
        marker1.innerText = "X";
        marker2.innerText = "O";
    } else {
        marker1.innerText = "O";
        marker2.innerText = "X";
    }
}

function resetBoard(forcePlayer1Start = false) {
    boxes.forEach(box => box.innerText = "");
    boardState = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    
    status = 1; 

    if (forcePlayer1Start) {
        player1IsX = true;
    } else {
        player1IsX = !player1IsX;
    }
    
    updateMarkers();
}

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] !== -1 && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}

boxes.forEach((box, index) => {
    box.onclick = () => {
        if (boardState[index] !== -1) return;

        if (status === 1) {
            box.innerText = "X";
            boardState[index] = 1;
            status = 0;
        } else {
            box.innerText = "O";
            boardState[index] = 0;
            status = 1;
        }

        let winnerSymbol = checkWinner();
        
        if (winnerSymbol !== null) {
            if (winnerSymbol === 1) {
                if (player1IsX) {
                    player1score++;
                } else {
                    player2score++;
                }
            } else {
                if (player1IsX) {
                    player2score++;
                } else {
                    player1score++;
                }
            }

            player1.innerText = player1score;
            player2.innerText = player2score;
            setTimeout(() => resetBoard(false), 200);
        } else if (!boardState.includes(-1)) {
            setTimeout(() => resetBoard(false), 200);
        }
    };
});

btn1.onclick = () => resetBoard(false);

btn2.onclick = () => {
    player1score = 0;
    player2score = 0;
    player1.innerText = "0";
    player2.innerText = "0";
    resetBoard(true);
};

btn3.onclick = () => {
    let rulesBox = document.querySelector(".rules");
    if (rulesBox) rulesBox.remove();
};

updateMarkers();