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
    let button = document.getElementById('button1');
    const start_btn = document.querySelector(".start_btn button");
    let queCount = 0;
    let queNumb = 1;
    let que=0;
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
    function updateQuiz(quiz,star) {
        
        fetch('/updateQuiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({quizNum: quiz, starNum: star})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update quiz');
            }
            return response.json();
        })
        .then(data => {
            console.log('Quiz updated successfully:', data);
        })
        .catch(error => console.error('Error updating quiz:', error)); 
       }

       function checkQuizUpdate(quiz, star) {
        // Send a request to fetch the quiz value for the specified quiz
        fetch(`/fetchQuizValue/${quiz}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz value');
                }
                return response.json();
            })
            .then(data => {
                const quizValue = data.quizValue;
                if (quizValue < star) {
                    updateQuiz(quiz, star);
                }
            })
            .catch(error => console.error('Error fetching quiz value:', error));
    }
    
    function updateDiamond(earnedDiamond) {
        fetch('/updateDiamond', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newDiamond: earnedDiamond })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update Diamond data');
                }
                console.log(' Diamond data updated successfully');
            })
            .catch(error => console.error('Error updating diamond data:', error));
    }
    function updateHints(newHints) {
        fetch('/updateHints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newHints: newHints })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update hints data');
                }
                console.log(' Hints data updated successfully');
            })
            .catch(error => console.error('Error updating hints data:', error));
    }
    
    

    function insertTitleAndDifficulty(title, difficulty) {
        const titleDiv = document.querySelector(".title");
        const difficultyDiv = document.querySelector(".difficulty");

        titleDiv.textContent = title;
        difficultyDiv.textContent = difficulty;
    }
 
   
    function insertExplaination(explain) {
        const explainationDiv = document.querySelector(".explanation");
        explainationDiv.innerHTML = ''; // Clear any existing content
        explainationDiv.style.display = 'block'; // Ensure the explanation div is visible
    
        // Typing effect
        let index = 0;
        const typingInterval = setInterval(function() {
            explainationDiv.textContent += explain[index];
            index++;
            if (index === explain.length) {
                clearInterval(typingInterval); // Stop typing when all characters are displayed
            }
        }, 50); // Typing speed: 50ms per character
    }
    function insertAnimation(path){
        const container = document.getElementById('animation');
        // Load the animation JSON file
        const animationData = {
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: `animations/${path}.json` // Path to your JSON animation file
        };
        const anim = lottie.loadAnimation(animationData);
    }
    function clearAnimationContainer() {
        const container = document.getElementById('animation');
        container.innerHTML = ''; // Clear the container by removing its contents
    }
    
    function clearExplanationContainer() {
        const explainationDiv = document.querySelector(".explanation");
        explainationDiv.innerHTML = ''; // Clear any existing content
        explainationDiv.style.display = 'none';
        
    }

    function showQuestions(index) {
        hintBtn.disabled = false;
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


    const messageContainer = document.getElementById("messageContainer");

// Function to display the message
function displayMessage(message) {
    // Create a new paragraph element
    const messageElement = document.createElement("div");
    // Set the class of the message element
    messageElement.classList.add("message");
    // Set the text content of the message element to the provided message
    messageElement.textContent = message;
    // Append the message element to the container
    messageContainer.appendChild(messageElement);
    
    // Show the message element
    messageElement.style.display = "block";

    // Hide the message after 3 seconds
    setTimeout(function() {
        messageElement.style.display = "none";
    }, 3000);
}


    const hintBtn = document.querySelector('.hint_btn'); // Assuming there's only one button with this class

    hintBtn.addEventListener('click', function() {

        fetch('/hint')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch hint data');
            }
            return response.json();
        })
        .then(data => {
            let hints = data.hints;
            if(hints != 0){
                const correctIndex = parseInt(questions[que].answer);
                const correctOption = optionList.children[correctIndex];
                let wrongIndex;
                do {
                    wrongIndex = Math.floor(Math.random() * 4);
                } while (wrongIndex === correctIndex);
                const wrongOption = optionList.children[wrongIndex];
                wrongOption.classList.add("hint");
                correctOption.classList.add("hint");
            
                const allOptions = optionList.children.length;
                for (let i = 0; i < allOptions; i++) {
                    if (i !== wrongIndex && i !== correctIndex) {
                        optionList.children[i].classList.add("disabled");
                    }
                }
            
                // Disable the hint button
                hintBtn.disabled = true;
                hints--;
                updateHints(hints);
               }
               else{
                displayMessage("Insufficient hints provided.");
               }
        })
        .catch(error => console.error('Error fetching hint data:', error)); 
    });
    
    

    function optionSelected(answer, index) {
        let userIndex = index;
        const correctIndex = parseInt(questions[que].answer);
        que++;
        if (userIndex === correctIndex) {
            userScore += 1;
            answer.classList.remove("hint");
            answer.classList.add("correct");
            headerScore(userScore);
            insertAnimation('right');
        } else {
            const explaination = questions[que-1].explanation;
            insertExplaination(explaination);
            answer.classList.remove("hint");
            answer.classList.add("incorrect");
            const correctOption = optionList.children[correctIndex];
            correctOption.classList.add("correct");
            insertAnimation('wrong');
        }

        const allOptions = optionList.children.length;
        for (let i = 0; i < allOptions; i++) {
            optionList.children[i].classList.add("disabled");
        }

        nextBtn.classList.add("show");
    }


    
  
               
    function showResult() {
        clearExplanationContainer();
            clearAnimationContainer();
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
                let quizNum = parseInt(quizNumber);
    
                infoBox.classList.remove("activeInfo");
                quizBox.classList.remove("activeQuiz");
                resultBox.classList.add("active");
    
                const scoreText = resultBox.querySelector(".score_text");
                const scoreText1 = resultBox.querySelector(".score_text1");
                const scoreText2 = resultBox.querySelector(".score_text2");
                const scoreText3 = resultBox.querySelector(".score_text3");
    
                let scoreTag1 = '<span>';
                let scoreTag = '<span>';
                let scoreTag2 = '<span>';
                let scoreTag3 = '<span>';
    
                if (userScore === 10) {
                    earnedCash += 50;
                    scoreTag += '&#11088;&#11088;&#11088;';
                    scoreTag1 += 'Congrats! You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p>. ';
                    scoreTag2 += `You are awesome! &#128181; ${earnedCash} $`;
                    checkQuizUpdate(parseInt(quizNumber), 3);
                    if (positionNumber % 3 === 0) {
                        scoreTag3 += '💎💎💎💎💎 ';
                        updateDiamond(10);
                    }
                    if (positionNumber === quizNum) {
                        updatePosition(parseInt(quizNumber) + 1);
                        updateLevel(parseInt(quizNumber) + 1);
                    }
                    congratulations();
                } else if (userScore >= 8 && userScore <= 9) {
                    earnedCash += 25;
                    scoreTag += '&#11088;&#11088;';
                    scoreTag1 += 'Nice, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p>. ';
                    scoreTag2 += `Keep it up! &#128181; ${earnedCash} $`;
                    checkQuizUpdate(parseInt(quizNumber), 2);
                    if (positionNumber % 3 === 0) {
                        scoreTag3 += '💎💎💎💎💎 ';
                        updateDiamond(10);
                    }
                    if (positionNumber === quizNum) {
                        updatePosition(parseInt(quizNumber) + 1);
                        updateLevel(parseInt(quizNumber) + 1);
                    }
                    congratulations();
                } else if (userScore >= 5 && userScore <= 7) {
                    earnedCash += 10;
                    scoreTag += '&#11088;';
                    scoreTag1 += 'Good, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p>. ';
                    scoreTag2 += `Well done! &#128181; ${earnedCash} $`;
                    checkQuizUpdate(parseInt(quizNumber), 1);
                    if (positionNumber % 3 === 0) {
                        scoreTag3 += '💎💎💎💎💎 ';
                        updateDiamond(10);
                    }
                    if (positionNumber === quizNum) {
                        updatePosition(parseInt(quizNumber) + 1);
                        updateLevel(parseInt(quizNumber) + 1);
                    }
                    congratulations();
                } else if (userScore >= 1 && userScore <= 4) {
                    scoreTag += '&#128557;&#128557;&#128557;';
                    scoreTag1 += 'Sorry, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p>. ';
                    scoreTag2 += 'You can do better! &#128546;';
                    const audio = new Audio('assets/fail.mp3');
                    audio.play();
                    const nextButton = resultBox.querySelector(".next_quiz");
                    nextButton.style.display = "none";
                }
                scoreTag3 += '</span>';
                scoreTag1 += '</span>';
                scoreTag += '</span>';
                scoreTag2 += '</span>';
                scoreText1.innerHTML = scoreTag1;
                scoreText.innerHTML = scoreTag;
                scoreText2.innerHTML = scoreTag2;
                scoreText3.innerHTML = scoreTag3;
    
                const circularProgress = document.querySelector('.circular-progress');
                const progressValue = document.querySelector('.progress-value');
    
                // Calculate progress values
                let progressStartValue = 0;
                let progressEndValue = (userScore / questions.length) * 100;
                let speed = 20;
    
                // Update progress value continuously
                let progress = setInterval(() => {
                    progressStartValue++;
                    progressValue.textContent = `${progressStartValue}%`;
                    const angle = (progressStartValue / 100) * 360; // Calculate angle in degrees
                    circularProgress.style.background = `conic-gradient(#007bff ${angle}deg, rgba(255,255,255,.1) ${angle}deg)`;
    
                    // Stop when reaching the end value
                    if (progressStartValue >= progressEndValue) {
                        clearInterval(progress);
                    }
                }, speed);
    
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
        return options;
    }
    // function shuffleOptions(options) {
    //     for (let i = options.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [options[i], options[j]] = [options[j], options[i]];
    //     }
    //     return options;
    // }
    
    function redirectToQuiz(quiz) {
        // Redirect to the quiz page with quizNumber and positionNumber in the URL
        window.location.href = `/bquiz?quiz=${quiz}`;
      }

    resbtn.addEventListener('click', () => redirectToQuiz(parseInt(quizNumber)));
    nextQuizBtn.addEventListener('click', () => redirectToQuiz(parseInt(quizNumber) + 1));
    
    
    button.addEventListener('click',function(){
        for(let i = 0; i < 50; i++)
        {
            let spark = document.createElement('i');
            spark.classList.add('spark');

            // randomly position the spark element
            const randomX = (Math.random() - 0.5) * window.innerWidth 
            const randomY = (Math.random() - 0.5) * window.innerHeight
            //randon size for spark
            const randomSize = Math.random()*8+5;
            spark.style.width = randomSize + 'px';
            spark.style.height = randomSize + 'px';

            // add animation to the spark elemnt
            document.body.appendChild(spark);
            const duration = Math.random() * 2 + 0.5;
            spark.style.animation = `animate ${duration}s ease-out forwards`;
            spark.style.setProperty('--x', randomX + 'px');
            spark.style.setProperty('--y', randomY + 'px');

            //remove spark after 2 minute
            setTimeout(function(){
                spark.remove();
            },2000);
        }
        headerScore(0);
    })

    function headerScore(num)
{
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${num}/ ${questions.length}`;
}

    
    startBtn.addEventListener("click", () => {
        start_btn.style.display = "none";
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
            clearExplanationContainer();
            clearAnimationContainer();
        } else {
            showResult();
        }
    });

    fetchQuestions();
});
