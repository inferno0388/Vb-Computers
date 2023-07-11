$(document).ready(function(){
 // Toggle the side navigation
 $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
  $("body").toggleClass("sidebar-toggled");
  $(".sidebar").toggleClass("toggled");
  if ($(".sidebar").hasClass("toggled")) {
    $('.sidebar .collapse').collapse('hide');
  };
});

// Close any open menu accordions when window is resized below 768px
$(window).resize(function() {
  if ($(window).width() < 768) {
    $('.sidebar .collapse').collapse('hide');
  };
  
  // Toggle the side navigation when window is resized below 480px
  if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
    $("body").addClass("sidebar-toggled");
    $(".sidebar").addClass("toggled");
    $('.sidebar .collapse').collapse('hide');
  };
});

// Prevent the content wrapper from scrolling when the fixed side navigation hovered over
$('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
  if ($(window).width() > 768) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  }
});

// Scroll to top button appear
$(document).on('scroll', function() {
  var scrollDistance = $(this).scrollTop();
  if (scrollDistance > 100) {
    $('.scroll-to-top').fadeIn();
  } else {
    $('.scroll-to-top').fadeOut();
  }
});

// Smooth scrolling using jQuery easing
$(document).on('click', 'a.scroll-to-top', function(e) {
  var $anchor = $(this);
  $('html, body').stop().animate({
    scrollTop: ($($anchor.attr('href')).offset().top)
  }, 1000, 'easeInOutExpo');
  e.preventDefault();
});


// var xValues = ["Jan-22", "Feb-22", "Mar-22", "April-22", "May-22","jun-22","July-22", "Aug-22", "Sep-22", "Oct-22", "Nov-22", "Dec-22"];
// var pValues = [50, 49, 44, 24, 40, 44, 24, 40, 44, 24, 30, 28];
// var uValues = [30, 25, 42, 24, 20, 14, 14, 15, 14, 18, 16, 18];

// new Chart("myChart", {
//   type: "bar",
//   data: {
//     labels: xValues,
//     datasets: [{
//       backgroundColor: "green",
//       data: pValues,
//       label: 'Paid',
//     },
//   {
//     label: 'Unpaid',
//     data: uValues,
//     backgroundColor: "red",

//   }
//   ]
//   },
//   options: {
//     legend: {display: true},
//     title: {
//       display: false,
//       text: ""
//     }
//   }
// });

// var xValues2 = ["Total Paid", "Total Unpaid"];
// var yValues2 = [5678,2872];
// var barColors = ["green","red"]

// new Chart("myChart2", {
//   type: "doughnut",
//   data: {
//     labels: xValues2,
//     datasets: [{
//       backgroundColor: barColors,
//       data: yValues2,
//     }]
//   },
//   options: {
//     title: {
//       display: false,
//       text: "Doughnut Graph"
//     }
//   }
// });
baguetteBox.run('.grid-gallery', {
  animation: 'slideIn'
});
});

 

