

$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop:true,
      margin:10,
      nav:true,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      center: true,
      navText: [
          "<i class='fa fa-angle-left'></i>",
          "<i class='fa fa-angle-right'></i>"
      ],
      responsive:{
          0:{
              items:1
          },
          600:{
              items:1
          },
          1000:{
              items:3
          }
      }
    });
  

  const buyBtn1 = document.querySelector("#buy-1");
  const buyBtn2 = document.querySelector("#buy-2");
  buyBtn1.addEventListener("click", () => {
    fetch('/cash')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch hint data');
        }
        return response.json();
    })
    .then(data => {
        let Cash = data.cash;
        if(Cash >= 200)
        {
          fetch('/hint')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to fetch hint data');
              }
              return response.json();
          })
          .then(data => {
              let hints = data.hints;
          newCash=Cash-200;
          let newHint=hints+1;
          updateCash(newCash);
          updateHints(newHint);
          MsgPrint("+1 Hint");
        })
        .catch(error => console.error('Error fetching hint data:', error)); 
        }
        else{
          MsgPrint("Insufficient Cash.");
        }
      })
    .catch(error => console.error('Error fetching cash data:', error)); 
});
buyBtn2.addEventListener("click", () => {
  fetch('/diamond')
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to fetch hint data');
      }
      return response.json();
  })
  .then(data => {
      let diamond = data.diamond;
      console.log(diamond);
      if(diamond >= 5)
      {
        fetch('/hint')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch hint data');
            }
            return response.json();
        })
        .then(data => {
            let hints = data.hints;
        let newDiamond= -5;
        let newHint =hints+1;
        updateDiamond(newDiamond);
        updateHints(newHint);
        MsgPrint("+1 Hint");
      })
      .catch(error => console.error('Error fetching hint data:', error)); 
      }
      else{
        MsgPrint("Insufficient Diamonds.");
      }
    })
  .catch(error => console.error('Error fetching diamond data:', error)); 
    
});
  const spans = document.querySelectorAll('.progress-bar span');

spans.forEach((span) => {
    span.style.width = span.dataset.width;
    span.innerHTML = span.dataset.width;
});

document.getElementById('shop-btn').addEventListener('click', function() {
  window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
  });
});
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
function updateCash(newCash) {
    console.log(newCash);
fetch('/updateNewCash', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newCash: newCash })
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update cash data');
        }
        console.log(' Cash data updated successfully');
    })
    .catch(error => console.error('Error updating hints data:', error));
}
function updateDiamond(newDiamond) {
  fetch('/updateDiamond', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newDiamond: newDiamond })
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to update diamond data');
          }
          console.log(' diamond data updated successfully');
      })
      .catch(error => console.error('Error updating hints data:', error));
  }
});


function toggleProfile() {
  var profileMenu = document.getElementById("profileMenu");
  var helpMenu = document.getElementById("helpMenu");
  var ruleMenu = document.getElementById("rulesMenu");
  var shopMenu = document.getElementById("shopMenu");
  var achievementsMenu = document.getElementById("achievementsMenu");

  profileMenu.classList.toggle("active");
  helpMenu.classList.remove("active");
  ruleMenu.classList.remove("active");
  shopMenu.classList.remove("active");
  achievementsMenu.classList.remove("active");
}

function toggleHelp() {
  var profileMenu = document.getElementById("profileMenu");
  var helpMenu = document.getElementById("helpMenu");
  var ruleMenu = document.getElementById("rulesMenu");
  var shopMenu = document.getElementById("shopMenu");
  var achievementsMenu = document.getElementById("achievementsMenu");

  helpMenu.classList.toggle("active");
  profileMenu.classList.remove("active");
  ruleMenu.classList.remove("active");
  shopMenu.classList.remove("active");
  achievementsMenu.classList.remove("active");
}

function toggleRules() {
  var profileMenu = document.getElementById("profileMenu");
  var helpMenu = document.getElementById("helpMenu");
  var ruleMenu = document.getElementById("rulesMenu");
  var shopMenu = document.getElementById("shopMenu");
  var achievementsMenu = document.getElementById("achievementsMenu");

  ruleMenu.classList.toggle("active");
  profileMenu.classList.remove("active");
  helpMenu.classList.remove("active");
  shopMenu.classList.remove("active");
  achievementsMenu.classList.remove("active");
}

function toggleShop() {
  var profileMenu = document.getElementById("profileMenu");
  var helpMenu = document.getElementById("helpMenu");
  var ruleMenu = document.getElementById("rulesMenu");
  var shopMenu = document.getElementById("shopMenu");
  var achievementsMenu = document.getElementById("achievementsMenu");

  shopMenu.classList.toggle("active");
  profileMenu.classList.remove("active");
  helpMenu.classList.remove("active");
  ruleMenu.classList.remove("active");
  achievementsMenu.classList.remove("active");
}

function toggleAchievements() {
  var profileMenu = document.getElementById("profileMenu");
  var helpMenu = document.getElementById("helpMenu");
  var ruleMenu = document.getElementById("rulesMenu");
  var shopMenu = document.getElementById("shopMenu");
  var achievementsMenu = document.getElementById("achievementsMenu");

  achievementsMenu.classList.toggle("active");
  profileMenu.classList.remove("active");
  helpMenu.classList.remove("active");
  ruleMenu.classList.remove("active");
  shopMenu.classList.remove("active");
}

function LockedSection(){
    MsgPrint("Please complete the previous Section.");
}

function MsgPrint(msg) {
  const messageBox = document.querySelector('.msg');
  var messageElement = document.getElementById("m-id");
  messageElement.textContent = msg;
  messageBox.style.display = 'block';
  setTimeout(() => {
      messageBox.style.display = 'none';
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
  
const container1 = document.getElementById('animation-container1');
const animationData1 = {
    container: container1,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animations/level1.json' // Path to your JSON animation file
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
    path: 'animations/level2.json' // Path to your JSON animation file
};

// Render the animation
const anim2 = lottie.loadAnimation(animationData2);

const container3 = document.getElementById('animation-container3');
const animationData3 = {
    container: container3,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animations/level3.json' // Path to your JSON animation file
};

// Render the animation
const anim3 = lottie.loadAnimation(animationData3);

const container4 = document.getElementById('animation-container4');
const animationData4 = {
    container: container4,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animations/level4.json' // Path to your JSON animation file
};

// Render the animation
const anim4 = lottie.loadAnimation(animationData4);
const container5 = document.getElementById('animation-container5');
const animationData5 = {
    container: container5,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animations/level5.json' // Path to your JSON animation file
};

// Render the animation
const anim5 = lottie.loadAnimation(animationData5);
});
