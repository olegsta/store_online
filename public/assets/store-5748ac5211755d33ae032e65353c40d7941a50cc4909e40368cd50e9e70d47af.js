$(function () {
    $("#prod_nav ul").tabs("#panes > div", {
        effect: 'fade',
        fadeOutSpeed: 400
    });
});


$(document).ready(function () {
    $(".pane-list li").click(function () {
        window.location = $(this).find("a").attr("href");
        return false;
    });
});



// JavaScript source code
function init() {
    var mapOptions = {
        center: new google.maps.LatLng(50.443145, 30.48968697, 126),
        mapTypeId: google.maps.MapTypeId.MAP,
        zoom: 18
    };

    var myMap;
    myMap = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function loadScript() {
    var script = document.createElement('script');
    script.src = 'http://maps.googleapis.com/maps/api/js?sensor=false&callback=init';
    document.body.appendChild(script);                 
}

window.onload = loadScript;






// (C) 2002 www.CodeLifter.com
// http://www.codelifter.com
// Free for all users, but leave in this header.

// ==============================
// Set the following variables...
// ==============================

// Set the slideshow speed (in milliseconds)
var SlideShowSpeed = 3000;

// Set the duration of crossfade (in seconds)
var CrossFadeDuration = 3;

var Picture = new Array(); // don't change this
var Caption = new Array(); // don't change this

// Specify the image files...
// To add more images, just continue
// the pattern, adding to the array below.
// To use fewer images, remove lines
// starting at the end of the Picture array.
// Caution: The number of Pictures *must*
// equal the number of Captions!

Picture[1]  = '/assets/1.jpg';
Picture[2]  = '/assets/11.gif';
Picture[3]  = '/assets/11.jpg';
Picture[4]  = 'Image004.jpg';
Picture[5]  = 'Image005.jpg';
Picture[6]  = 'Image006.jpg';
Picture[7]  = 'Image007.jpg';
Picture[8]  = 'Image008.jpg';
Picture[9]  = 'Image009.jpg';
Picture[10] = 'Image010.jpg';

// Specify the Captions...
// To add more captions, just continue
// the pattern, adding to the array below.
// To use fewer captions, remove lines
// starting at the end of the Caption array.
// Caution: The number of Captions *must*
// equal the number of Pictures!

Caption[1]  = "This is the first caption.";
Caption[2]  = "This is the second caption.";
Caption[3]  = "This is the third caption.";
Caption[4]  = "This is the fourth caption.";
Caption[5]  = "This is the fifth caption.";
Caption[6]  = "This is the sixth caption.";
Caption[7]  = "This is the seventh caption.";
Caption[8]  = "This is the eighth caption.";
Caption[9]  = "This is the ninth caption.";
Caption[10] = "This is the tenth caption.";

// =====================================
// Do not edit anything below this line!
// =====================================

var tss;
var iss;
var jss = 1;
var pss = Picture.length-1;

var preLoad = new Array();
for (iss = 1; iss < pss+1; iss++){
preLoad[iss] = new Image();
preLoad[iss].src = Picture[iss];}

function runSlideShow(){
if (document.all){
document.images.PictureBox.style.filter="blendTrans(duration=2)";
document.images.PictureBox.style.filter="blendTrans(duration=CrossFadeDuration)";
document.images.PictureBox.filters.blendTrans.Apply();}
document.images.PictureBox.src = preLoad[jss].src;
if (document.getElementById) document.getElementById("CaptionBox").innerHTML= Caption[jss];
if (document.all) document.images.PictureBox.filters.blendTrans.Play();
jss = jss + 1;
if (jss > (pss)) jss=1;
tss = setTimeout('runSlideShow()', SlideShowSpeed);
}




function loadSc() {
    document.getElementById("demo").innerHTML=Date()
    };
