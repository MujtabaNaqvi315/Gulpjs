// const { $ } = require("video.js/dist/types/utils/dom");

var isRTL = ($('html').attr('dir') == "rtl") ? true : false,
  winWidth = $(window).width(),
  winHeight = $(window).height();

$(function () {
  browserDetect();
});


$(window).on('resize orientationchange', function () {
  // Do on resize
  winWidth = $(window).width(),
    winHeight = $(window).height();
});

$(window).on('scroll', function () {
  //Do on Scroll
});

$(document).keyup(function (e) {
  if (e.keyCode == 27) {
    //Do on ESC press
  }
});

function browserDetect() {
  navigator.sayswho = (function () {
    var ua = navigator.userAgent,
      tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join('').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  })();
  $('body').addClass(navigator.sayswho);
}


$(document).ready(function () {
  // animateWords();
  
  openCloseHomeSidebar();

  showcaseIsotopes();

  serviceSlider ();

  dataTrim();
  ChangeToSvg();
  formValidation();

});

// open / close home sidebar

function openCloseHomeSidebar () {
  $('.home-header .hamburger i').click(function(){ 
    $('.home-sidebar').toggleClass('open');
  });
}


// showcase isotopes

function showcaseIsotopes() {

  // init Isotope
  var $grid = $('.portfolio-showcase .grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows'
  });

  $grid.isotope({ filter: '.landscape' });

  $('.portfolio-showcase .filter-button-group').on('click', 'button', function(){
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });
}

// services slider

function serviceSlider () {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'vertical',
    // loop: true,
  
    slidesPerView: 3,
  });
}

function dataTrim() {
  var ellipsis = "...";
  $("[data-trim]").each(function () {
    var text = $(this).html();
    var charLimit = parseInt($(this).attr("data-trim"));
    $(this).html(TrimLength(text, charLimit));
    $(this).addClass("is--trimmed");
  });

  function TrimLength(text, maxLength) {
    text = $.trim(text);
    if (text.length > maxLength) {
      text = text.substring(0, maxLength - ellipsis.length);
      return text.substring(0, text.lastIndexOf(" ")) + ellipsis;
    } else return text;
  }
}

function ChangeToSvg() {
  $("img.js-tosvg").each(function () {
    var $img = $(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    $.get(
      imgURL,
      function (data) {
        var $svg = $(data).find("svg");
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " insvg");
        }
        $svg = $svg.removeAttr("xmlns:a");
        if (
          !$svg.attr("viewBox") &&
          $svg.attr("height") &&
          $svg.attr("width")
        ) {
          $svg.attr(
            "viewBox",
            "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
          );
        }
        $img.replaceWith($svg);
      },
      "xml"
    );
  });
}


// Form Field Validation Start 

function formValidation() {
  const submitBtn = document.querySelectorAll(".Formsubmit");

  // Loop through each submit button
  submitBtn.forEach(function (button) {
    button.addEventListener('click', function (event) {
      var form = event.target.closest('form'); // Get the parent form of the clicked button
      var isValid = true;

      $(form).find(".form-row-dropdown, .form-fields-row").each(function () {
        var $select = $(this).find("select");
        var $errorMessage = $(this).find(".error");
        var $select2Container = $(this).find(".select2-container");

        if ($select.val() == null || $select.val() == "1") {
          isValid = false;
          $select2Container.addClass("error-border");
          $errorMessage.show();
        } else {
          $select2Container.removeClass("error-border");
          $errorMessage.hide();
        }
      });

      // Check input fields with the required class within the current form
      $(form).find(".required").each(function () {
        if ($(this).val().trim() === "") {
          isValid = false;
          $(this).addClass("error-border");
          $(this).siblings('.error').show();
        } else {
          $(this).removeClass("error-border");
          $(this).siblings('.error').hide();
        }
      });

      if (!isValid) {
        event.preventDefault(); // Prevent form submission if validation fails
      }
    });
  });

  // 
  var togglePasswordIcons = document.querySelectorAll('.eye-icon');
  var togglePasswordSlashIcons = document.querySelectorAll('.eye-slash-icon');

  togglePasswordIcons.forEach(function (icon) {
    icon.addEventListener('click', function () {
      togglePasswordVisibility(icon);
    });
  });

  togglePasswordSlashIcons.forEach(function (Slashicon) {
    Slashicon.addEventListener('click', function () {
      togglePasswordVisibility(Slashicon);
    });
  });

  function togglePasswordVisibility(clickedIcon) {
    var passwordField = clickedIcon.parentNode.querySelector('.password-field');
    var relatedIcon = clickedIcon.classList.contains('eye-icon') ?
      clickedIcon.nextElementSibling :
      clickedIcon.previousElementSibling;

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      clickedIcon.style.display = 'none';
      relatedIcon.style.display = 'block';
    } else {
      passwordField.type = 'password';
      clickedIcon.style.display = 'none';
      relatedIcon.style.display = 'block';
    }
  }
}


