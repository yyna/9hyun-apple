// dropdown checkbox
function dropdown_image() {
  var check = document.getElementById("check")
  if (check.checked === true) {
    document.getElementById("dropdown").src = "img/cancel.png";
  }
  else {
    document.getElementById("dropdown").src = "img/dropdown.png";
  }
}

// slideshow
var slideIndex = 0;
window.onload = function() {
  //showSlides(slideIndex);
  cycle();
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function cycle() {
  plusSlides(1);
  setTimeout(cycle, 5000);
}

// google map
function initMap() {
  var uluru = {lat: 36.317810, lng: 128.440826};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: uluru,
    mapTypeId: 'satellite'
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

// Menu bar onclick scroll
window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = -64;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 12);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

// dropdown
function clickDropdownList(target) {
  smoothScroll(target);
  document.getElementById("check").checked = false;
}

// Gallery
function removeImage(n) {
  var x = document.getElementsByClassName("container");
  x[n-1].style.display = "none";
  removeModalImage(n-1);
}

function resetAllImages() {
  var x = document.getElementsByClassName("container");
  var i;
  for (i=0; i<x.length; i++) {
    x[i].style.display = "inline-block";
  }
  resetAllModalImages()
}

// modal
function openModal() {
  document.getElementById('myModal').style.display = "block";
}

function closeModal() {
  document.getElementById('myModal').style.display = "none";
}

var modalIndex = 0;
showDivs(modalIndex);

function plusDivs(n) {
  var x = document.getElementsByClassName("modal-image");
  if (n > 0 && (x[(modalIndex+n)%x.length].classList.contains("modal-show") === false)) {
    plusDivs((n+1)%x.length);
  }
  else if (n < 0 && (x[(x.length+modalIndex+n)%x.length].classList.contains("modal-show") === false)) {
    plusDivs((n-1)%x.length);
  }
  else {
    showDivs(modalIndex += n);
  }
}

function currentDiv(n) {
  showDivs(modalIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("modal-image");
  if (n >= x.length) {modalIndex = 0}
  if (n < 0) {modalIndex = x.length-1}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[modalIndex].style.display = "block";
}

function removeModalImage(n) {
  var x = document.getElementsByClassName("modal-image");
  x[n].classList.remove("modal-show");
}

function resetAllModalImages() {
  var x = document.getElementsByClassName("modal-image");
  var i;
  for (i=0; i<x.length; i++) {
    if (x[i].classList.contains("modal-show") === false) {
      x[i].classList.add("modal-show");
    }
  }
}

// Guestbook
function append_guestbook() {
  var writer = document.getElementById("writer");
  var comment = document.getElementById("comment");

  if (writer.value.length === 0 || comment.value.length === 0) {
    alert("입력이 올바르지 않습니다.");
  }
  else {
    var my_tbody = document.getElementById("Guestbook-appended-table");
    var row1 = my_tbody.insertRow(my_tbody.rows.length);
    var cell1 = row1.insertCell(0);
    var cell2 = row1.insertCell(1);
    cell1.innerHTML = "<img src=https://cdn3.iconfinder.com/data/icons/black-easy/512/538303-user_512x512.png width=40px height=40px><br>" + writer.value;
    cell2.innerHTML = comment.value;
    cell1.style.width = "200px";
    cell1.style.borderTopLeftRadius = "1em";
    cell2.style.width = "600px";
    cell2.style.textAlign = "left";
    cell2.style.borderTopRightRadius = "1em";

    var row2 = my_tbody.insertRow(my_tbody.rows.length);
    cell1 = row2.insertCell(0);
    cell1.style.borderBottomRightRadius = "1em";
    cell1.style.borderBottomLeftRadius = "1em";
    cell1.colSpan = 2;
    cell1.innerHTML = "<button class=comment-button onclick=add_comment(" + my_tbody.rows.length + ")><img src=http://www.iconsdb.com/icons/download/orange/comments-512.jpg width=20px height=20px>  답글달기</button>";

    // clear text
    writer.value = "";
    comment.value = "";
    document.getElementById("no-value").style.display = "none";
    document.getElementById("Guestbook-appended-table").style.display = "inline-block";
  }
}

function add_comment(n) {
  var comment = prompt("답글을 입력하세요.");
  if (comment === null) {
    return;
  }
  else {
    var my_tbody = document.getElementById("Guestbook-appended-table");
    my_tbody.rows[n-1].cells[0].innerHTML = "답변 : " + comment;
  }
}
