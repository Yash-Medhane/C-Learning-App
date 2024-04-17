document.addEventListener('DOMContentLoaded', function() {
    const quiz1Btn = document.getElementById('button1');
    const quiz2Btn = document.getElementById('button2');
    const quiz3Btn = document.getElementById('button3');
  
    quiz1Btn.addEventListener('click', () => redirectToQuiz(1));
    quiz2Btn.addEventListener('click', () => redirectToQuiz(2));
    quiz3Btn.addEventListener('click', () => redirectToQuiz(3));
  
    function redirectToQuiz(quizNumber) {
      window.location.href = `/bquiz?quiz=${quizNumber}`;
    }
  });

  
  
