document.addEventListener("DOMContentLoaded", function() {
    // Select the container element
    const container = document.getElementById('animation-container');
  
    // Load the animation JSON file
    const animationData = {
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animations/main-animation.json' // Path to your JSON animation file
    };
  
    // Render the animation
    const anim = lottie.loadAnimation(animationData);

    const container1 = document.getElementById('animation-container1');
    const animationData1 = {
        container: container1,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animations/head-animation.json' // Path to your JSON animation file
    };
  
    // Render the animation
    const anim1 = lottie.loadAnimation(animationData1);
  
    // Load the animation JSON file
    const container2 = document.getElementById('animation-container2');
    const animationData2 = {
        container: container2,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animations/tic-tac-toe.json' // Path to your JSON animation file
    };
  
    // Render the animation
    const anim2 = lottie.loadAnimation(animationData2);

    const container3 = document.getElementById('animation-container3');
    const animationData3 = {
        container: container3,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animations/stone-paper-scissor.json' // Path to your JSON animation file
    };
  
    // Render the animation
    const anim3 = lottie.loadAnimation(animationData3);

    const container4 = document.getElementById('animation-container4');
    const animationData4 = {
        container: container4,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animations/guess-number.json' // Path to your JSON animation file
    };
  
    // Render the animation
    const anim4 = lottie.loadAnimation(animationData4);
    const container5 = document.getElementById('animation-container5');
    const animationData5 = {
        container: container5,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animations/help1.json' // Path to your JSON animation file
    };
  
    // Render the animation
    const anim5 = lottie.loadAnimation(animationData5);
    const container6 = document.getElementById('animation-container6');
    const animationData6 = {
        container: container6,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animations/help2.json' // Path to your JSON animation file
    };
  
    // Render the animation
    const anim6 = lottie.loadAnimation(animationData6);
  });
  
  

  function scrollToSection(sectionId) {
    document.querySelector(sectionId).scrollIntoView({
      behavior: 'smooth'
    });
  }

  // Event listeners for each link
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Event listener for the home link
  document.querySelector('a[href="#home-section"]').addEventListener('click', function(e) {
    e.preventDefault();
    scrollToTop();
  });

  document.querySelector('a[href="#about-section"]').addEventListener('click', function(e) {
    e.preventDefault();
    scrollToSection('#about-section');
  });
  document.querySelector('a[href="#games-section"]').addEventListener('click', function(e) {
    e.preventDefault();
    scrollToSection('#games-section');
  });
  document.querySelector('a[href="#contact-section"]').addEventListener('click', function(e) {
    e.preventDefault();
    scrollToSection('#contact-section');
  });