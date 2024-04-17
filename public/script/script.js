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



function toggleProfile() {
  var profileMenu = document.getElementById("profileMenu");
  var helpMenu = document.getElementById("helpMenu");
  var ruleMenu = document.getElementById("rulesMenu");

  profileMenu.classList.toggle("active");
  helpMenu.classList.remove("active");
  ruleMenu.classList.remove("active");
}

function togglehelp() {
  var profileMenu = document.getElementById("profileMenu");
  var helpMenu = document.getElementById("helpMenu");
  var ruleMenu = document.getElementById("rulesMenu");

  helpMenu.classList.toggle("active");
  profileMenu.classList.remove("active");
  ruleMenu.classList.remove("active");
}

function togglerules() {
  var profileMenu = document.getElementById("profileMenu");
  var helpMenu = document.getElementById("helpMenu");
  var ruleMenu = document.getElementById("rulesMenu");

  ruleMenu.classList.toggle("active");
  profileMenu.classList.remove("active");
  helpMenu.classList.remove("active");
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






  