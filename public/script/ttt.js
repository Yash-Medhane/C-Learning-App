let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".resbutton"); // Changed to querySelector
let msg_container = document.querySelector(".msg_container");
let Msg = document.querySelector("#msg");
let turnx = true;

const win_patterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click", function () {
            if (turnx) {
                box.innerText = "X";
                turnx = false;
            } else {
                box.innerText = "O";
                turnx = true;
            }
            box.disabled = true;
            checkwinner();
        });
});

function resetgame(){
    turnx = true;
    enablebox();
    msg_container.classList.add("hide");
}

function enablebox(){
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

function disablebox(){
    for (let box of boxes) {
        box.disabled = true;
    }
}

function showwinner(win) {
   if(win==='X') {
        Msg.innerText = "Congratulations X player wins !! ";
   } else {
        Msg.innerText = "Congratulations O player wins !! ";
   }
    msg_container.classList.remove("hide");
    disablebox();
}

function checkwinner() {
    for (let pattern of win_patterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showwinner(pos1);
            }
        }
    }
}

resetbtn.addEventListener("click", resetgame); // Added event listener to the single reset button
