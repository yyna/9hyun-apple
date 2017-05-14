// Array var for Local Storage
var galleryArray = ["show", "show", "show", "show", "show", "show"];

// onload funtion
window.onload = function() {
  cycle();
  checkLocalStorage();
}

// --------------------------------------------------------------- Bar
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

// --------------------------------------------------------------- ImageSlide
var slideIndex = 0;

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

// --------------------------------------------------------------- Gallery
function removeImage(n) {
  var x = document.getElementsByClassName("container");
  x[n].style.display = "none";
  removeModalImage(n);

  // for LocalStorage
  galleryArray[n] = "hide";
  window.localStorage.setItem("GalleryArray", JSON.stringify(galleryArray));
}

function resetAllImages() {
  var x = document.getElementsByClassName("container");
  var i;
  for (i=0; i<x.length; i++) {
    x[i].style.display = "inline-block";
  }
  resetAllModalImages()

  for (i=0; i<galleryArray.length; i++) {
    galleryArray[i] = "show";
  }
  window.localStorage.setItem("GalleryArray", JSON.stringify(galleryArray));
}

// modal
function openModal() {
  document.getElementById('myModal').style.display = "block";
}

function closeModal() {
  document.getElementById('myModal').style.display = "none";
}

var modalIndex = 0;
// showDivs(modalIndex);

function plusDivs(n) {
  var x = document.getElementsByClassName("modal-image");
  // console.log(x);
  if (x[(modalIndex+n)%x.length].classList.contains("modal-show") === false) {
    plusDivs((n+1)%x.length);
  }
  else {
    showDivs(modalIndex += n);
  }
}

function minusDivs(n) {
  var x = document.getElementsByClassName("modal-image");
  if (x[(modalIndex+n)%x.length].classList.contains("modal-show") === false) {
    minusDivs((n-1)%x.length);
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
  if (n >= x.length) {modalIndex %= x.length}
  if (n < 0) {
    modalIndex += x.length;
    modalIndex %= x.length;
  }
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
  for (var i=0; i<x.length; i++) {
    if (x[i].classList.contains("modal-show") === false) {
      x[i].classList.add("modal-show");
    }
  }
}

function checkLocalStorage() {
  var x = JSON.parse(window.localStorage.getItem("GalleryArray"));
  for (var i=0; i<x.length; i++) {
    if (x[i] === "hide") {
      removeModalImage(i);
      removeImage(i);
      galleryArray[i] = "hide";
    }
  }
}

// --------------------------------------------------------------- Guestbook
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

    // comment tr
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
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var found_url = regex.exec(comment);

    // ogp일때
    if (found_url !== null) {
      url = found_url[0];
      if (url.charAt(0) !== 'h') {
        url = "https://" + url;
      }
      var ogp = readOGP(url);

      // open graph tags를 못찾을 경우
      if (ogp.error === 'No OpenGraph Tags Found') {
        my_tbody.rows[n-1].cells[0].innerHTML = "답변 : " + comment;
      }
      else {
        my_tbody.rows[n-1].cells[0].innerHTML = "<a href=" + ogp.url + " target=_blank style=text-decoration:none;><table style=border-collapse:collapse;margin:auto;><tr><td><img src=" + ogp.image + " width=150px height=150px></td> <td style=text-align:left;color:gray;width:500px;> <h3 style=color:black;>" + ogp.title + "</h3><br>" + ogp.description + "<br><br>" + ogp.url +
        "</td></a></tr></table>";
      }
    }
    else {
      my_tbody.rows[n-1].cells[0].innerHTML = "답변 : " + comment;
    }
  }
}

function readOGP(url) {
  var encoded_url = encodeURIComponent(url);
  var ogp = httpGet("http://opengraph.io/api/1.0/site/" + encoded_url + "?app_id=59182c8e478394eb24a68aa6");
  var ogp = JSON.parse(ogp).openGraph;

  return ogp;
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

//  --------------------------------------------------------------- Location
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
