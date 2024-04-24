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






  