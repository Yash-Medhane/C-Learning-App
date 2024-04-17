document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.querySelector(".start_btn button");
    const infoBox = document.querySelector(".info_box");
    const exitBtn = document.querySelector(".buttons .quit");
    const resbtn = document.querySelector(".resbtn");
    const nextQuizBtn = document.querySelector(".next_quiz");
    const quizBox = document.querySelector(".quiz_box");
    const resultBox = document.querySelector(".result_box");
    const optionList = document.querySelector(".option_list");
    const nextBtn = document.querySelector("footer .next_btn");
    const bottomQuesCounter = document.querySelector("footer .total_que");
    const hintBtn = document.querySelector(".hint-btn");

    let queCount = 0;
    let queNumb = 1;
    let userScore = 0;
    let questions = [];
    let quizNumber = null;

    function fetchQuestions() {
        const urlParams = new URLSearchParams(window.location.search);
        quizNumber = urlParams.get('quiz');
        fetch(`/quiz/quiz${quizNumber}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                return response.json();
            })
            .then(data => {
                questions = data;
                if (questions.length > 0) {
                    questions = shuffleArray(questions);
                    startBtn.classList.add("show");
                    insertTitleAndDifficulty(questions[0].title, questions[0].difficulty);
                } else {
                    console.log("No questions available.");
                }
            })
            .catch(error => console.error('Error fetching questions:', error));
    }

    function updatePosition(newPosition) {
        fetch('/updatePosition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newPosition: newPosition })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update position');
            }
            return response.json();
        })
        .then(data => {
            console.log('Position updated successfully:', data.position);
        })
        .catch(error => console.error('Error updating position:', error));
    }
    function updateLevel(newPosition) {
        // Define a mapping of positions to level strings
        const levelMap = {
            16: { level: 'Apprentice', badge: 'Silver' },
            31: { level: 'Journeyman', badge: 'Gold' },
            46: { level: 'Veteran', badge: 'Platinum' },
            61: { level: 'Master', badge: 'Diamond' }
            // Add more mappings as needed
        };
    
        // Check if the new position is in the level map
        if (levelMap[newPosition]) {
            const { level, badge } = levelMap[newPosition];
            fetch('/updateLevel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newLevel: level, newBadge: badge })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update level');
                }
                return response.json();
            })
            .then(data => {
                console.log('Level updated successfully:', data.level);
                console.log('Badge updated successfully:', data.badge);
            })
            .catch(error => console.error('Error updating level:', error));   
        }
    }
    
    
    

    function insertTitleAndDifficulty(title, difficulty) {
        const titleDiv = document.querySelector(".title");
        const difficultyDiv = document.querySelector(".difficulty");

        titleDiv.textContent = title;
        difficultyDiv.textContent = difficulty;
    }

    function showQuestions(index) {
        const queText = document.querySelector(".que_text");
        let queTag = '<span>' + questions[index].question + '</span>';
        let optionTag = shuffleOptions([...questions[index].options]).map(option =>
            `<div class="option"><span>${option}</span></div>`).join('');
        queText.innerHTML = queTag;
        optionList.innerHTML = optionTag;

        const option = optionList.querySelectorAll(".option");
        option.forEach((opt, i) => {
            opt.addEventListener("click", () => optionSelected(opt, i));
        });
    }

    function optionSelected(answer, index) {
        let userAns = answer.textContent;
        let correctAns = questions[queCount].answer;

        if (userAns === correctAns) {
            userScore += 1;
            answer.classList.add("correct");
        } else {
            answer.classList.add("incorrect");
            const correctAnswerIndex = questions[queCount].options.indexOf(correctAns);
            const correctOption = optionList.children[correctAnswerIndex];
            correctOption.classList.add("correct");
        }

        const allOptions = optionList.children.length;
        for (let i = 0; i < allOptions; i++) {
            optionList.children[i].classList.add("disabled");
        }

        nextBtn.classList.add("show");
    }


    hintBtn.addEventListener("click", () => {
        let correctAns = questions[queCount].answer;
        const correctAnswerIndex = questions[queCount].options.indexOf(correctAns);
        const correctOption = optionList.children[correctAnswerIndex];
        correctOption.classList.add("correct");
        nextBtn.classList.add("show");
        const allOptions = optionList.children.length;
        for (let i = 0; i < allOptions; i++) {
            optionList.children[i].classList.add("disabled");
        }
    });
    
    function showResult() {
        fetch('/position')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch position data');
                }
                return response.json();
            })
            .then(data => {
                let positionNumber = data.position;
                let earnedCash = 0;
                console.log(earnedCash);
                let quizNum = parseInt(quizNumber);
                infoBox.classList.remove("activeInfo");
                quizBox.classList.remove("activeQuiz");
                resultBox.classList.add("activeResult");
                const scoreText1 = resultBox.querySelector(".score_text1");
                const scoreText = resultBox.querySelector(".score_text");
                const scoreText2 = resultBox.querySelector(".score_text2");
                let scoreTag1 = '<span>';
                let scoreTag = '<span>';
                let scoreTag2 = '<span>';
    
                if (userScore === 10) {
                    earnedCash += 50;
                    scoreTag1 += '&#11088;&#11088;&#11088;';
                    scoreTag += 'Congrats! You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p>. ';
                    scoreTag2 += `You are awesome! &#128181; ${earnedCash} $`;
                    if (positionNumber === quizNum) {
                        updatePosition(parseInt(quizNumber) + 1);
                        updateLevel(parseInt(quizNumber) + 1);
                    }
                    congratulations();
                } else if (userScore >= 8 && userScore <= 9) {
                    earnedCash += 25;
                    scoreTag1 += '&#11088;&#11088;';
                    scoreTag += 'Nice, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p>. ';
                    scoreTag2 += `Keep it up! &#128181; ${earnedCash} $`;
                    if (positionNumber === quizNum) {
                        updatePosition(parseInt(quizNumber) + 1);
                        updateLevel(parseInt(quizNumber) + 1);
                    }
                    congratulations();
                } else if (userScore >= 5 && userScore <= 7) {
                    earnedCash += 10;
                    scoreTag1 += '&#11088;';
                    scoreTag += 'Good, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p>. ';
                    scoreTag2 += `Well done! &#128181; ${earnedCash} $`;
                    if (positionNumber === quizNum) {
                        updatePosition(parseInt(quizNumber) + 1);
                        updateLevel(parseInt(quizNumber) + 1);
                    }
                    congratulations();
                } else if (userScore >= 1 && userScore <= 4) {
                    scoreTag1 += '&#128557;&#128557;&#128557;';
                    scoreTag += 'Sorry, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p>. ';
                    scoreTag2 += 'You can do better! &#128546;';
                    const audio = new Audio('assets/fail.mp3');
                    audio.play();
                    const nextButton = resultBox.querySelector(".next_quiz");
                    nextButton.style.display = "none";
                }
                scoreTag1 += '</span>';
                scoreTag += '</span>';
                scoreTag2 += '</span>';
                scoreText1.innerHTML = scoreTag1;
                scoreText.innerHTML = scoreTag;
                scoreText2.innerHTML = scoreTag2;
    
                // Send updated cash to the server
                fetch('/updateCash', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newCash: earnedCash })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to update cash data');
                        }
                        console.log('Cash data updated successfully');
                    })
                    .catch(error => console.error('Error updating cash data:', error));
            })
            .catch(error => console.error('Error fetching position data:', error));
    }
    


    function congratulations() {
        const start = () => {
            setTimeout(function () {
                confetti.start()
            }, 1);
        };

        const stop = () => {
            setTimeout(function () {
                confetti.stop()
            }, 10000);
        };

        start();
        stop();
        const audio = new Audio('assets/congratulations.mp3');
        audio.play();
    }

    function queCounter(index) {
        let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
        bottomQuesCounter.innerHTML = totalQueCounTag;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function shuffleOptions(options) {
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        return options;
    }
    function redirectToQuiz(quiz) {
        // Redirect to the quiz page with quizNumber and positionNumber in the URL
        window.location.href = `/bquiz?quiz=${quiz}`;
      }

    resbtn.addEventListener('click', () => redirectToQuiz(parseInt(quizNumber)));
    nextQuizBtn.addEventListener('click', () => redirectToQuiz(parseInt(quizNumber) + 1));
    

    startBtn.addEventListener("click", () => {
        quizBox.classList.add("activeQuiz");
        showQuestions(queCount);
        queCounter(queNumb);
    });

    exitBtn.addEventListener("click", () => {
        infoBox.classList.remove("activeInfo");
    });

    nextBtn.addEventListener("click", () => {
        if (queCount < questions.length - 1) {
            queCount++;
            queNumb++;
            showQuestions(queCount);
            queCounter(queNumb);
            nextBtn.classList.remove("show");
        } else {
            showResult();
        }
    });

    fetchQuestions();
});
