let userscore = 0;
let compscore = 0;
let user = document.querySelector("#user-score");
let comp = document.querySelector("#comp-score");
let msg = document.querySelector("#msg");
let resetbtn = document.querySelector(".resbutton");
const choices = document.querySelectorAll(".choice");
let reset = false;

function resetgame() {
    reset = true;
    userscore = 0;
    compscore = 0;
    user.innerText = userscore;
    comp.innerText = compscore;
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "";
}

function showwinner(key) {
    if (key === 3) {
        msg.innerText = "Game Draw";
        msg.style.backgroundColor = "rgb(203, 185, 48)";
    } else if (key === 1) {
        msg.innerText = "You Win";
        msg.style.backgroundColor = "green";
    } else if (key === 2) {
        msg.innerText = "You Lose";
        msg.style.backgroundColor = "red";
    }
}

function generate_comp_choice() {
    const options = ["rock", "paper", "scissor"];
    const comp_choice = Math.floor(Math.random() * 3);
    return options[comp_choice];
}

function playgame(userchoice) {
    if (reset) {
        reset = false;
        return;
    }
    const compchoice = generate_comp_choice();
    let key = 0;
    if (compchoice === "rock" && userchoice === "paper") {
        userscore++;
        key = 1;
    } else if (compchoice === "rock" && userchoice === "scissor") {
        compscore++;
        key = 2;
    } else if (compchoice === "paper" && userchoice === "rock") {
        compscore++;
        key = 2;
    } else if (compchoice === "paper" && userchoice === "scissor") {
        userscore++;
        key = 1;
    } else if (compchoice === "scissor" && userchoice === "rock") {
        userscore++;
        key = 1;
    } else if (compchoice === "scissor" && userchoice === "paper") {
        compscore++;
        key = 2;
    } else {
        key = 3;
    }
    user.innerText = userscore;
    comp.innerText = compscore;
    showwinner(key);
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        playgame(userchoice);
    });
});

resetbtn.addEventListener("click", resetgame);
