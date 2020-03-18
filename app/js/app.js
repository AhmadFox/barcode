$(document).ready(function () {


  if (window.location.href.indexOf("gallery") > -1) {
    $("nav .nav-item").removeClass("active");
    $("#gallery").addClass("active");
  }

  if (window.location.href.indexOf("size") > -1) {
    $("nav .nav-item").removeClass("active");
    $("#size-chart").addClass("active");
  }

  if (window.location.href.indexOf("customizer") > -1) {
    $("nav .nav-item").removeClass("active");
    $("#size-chart").addClass("active");
  }

  // turen on lightgellary plugn

  $("#lightgallery, #SweatShirtGallery").lightGallery();
  $(
    "#singlejacketgallery, #kidsjacketgallery, #smallGroupGallery, #bigGroupGallery"
  ).lightGallery();
  $("#singleVedio, #sGroupleVedio, #bGroupleVedio, #kidsVedio").lightGallery({
    loadYoutubeThumbnail: false,
    youtubeThumbSize: "default"
  });

  // custom actions for select product step
  // mous hover on product card
  $(".product-card").hover(function () {
    $(this).toggleClass("show");
  });

  //
  $(".viewDetails").click(function () {
    $(this)
      .closest(".card-flip")
      .toggleClass("flip-action");
    $("#veristy-jacet-details").addClass("show");
  });

  // filp card to front "close card back"
  $(".close-flip").click(function () {
    $(this)
      .closest(".card-flip")
      .toggleClass("flip-action");
  });

  $(".close-overlay").click(function () {
    $(this)
      .closest(".card-overlay")
      .toggleClass("show");
    $(".card-flip").RemoveClass("flip-action");
  });

  // CTA to choose product
  $(".VJ").click(function () {
    chooseProduct();
  });

  function chooseProduct() {
    $("#chooseProduct")
      .addClass("fadeOutLeft")
      .hide(200);
    $("#JacketType")
      .removeClass("d-none")
      .addClass("fadeInRight");
    $(".wizard-step .stp:nth-child(2)").addClass("selected");
    $(".wizard-step .stp:nth-child(1)").addClass("compleate");
  }

  function chooseType() {
    window.location.replace("/design_product");
  }
  // remove this function after moveing the code to backend environment code
  $("#faveDesign").click(function () {
    $(".successfulySaved, .saveDesignForm, .dynamic-text").toggleClass(
      "d-none"
    );
    $(".wizard-step .stp:nth-child(4)").addClass("selected");
    $(".wizard-step .stp:nth-child(4)").addClass("compleate");
  });

  // function call for change and replace src image path
  // used for product gallery image
  $(".switchSide").click(function () {
    $(".main-image img").attr("src", "" + $(this).data("src") + "");
  });

  // Start Customizer

  var colorList = $(".color-controlers ul li").length;
  for (var i = 0; i <= colorList; i++) {
    var colorIndex = $(".color-controlers ul li:eq(" + i + ") a").data("color");
    $(".color-controlers ul li:eq(" + i + ") a").css("background", colorIndex);
  }

  $("#bodyColor a.color-item").click(function () {
    $("#bodyColor a.color-item").removeClass("selected");
    $(this).addClass("selected");
    hexColor = $(this).data("color");
    console.log(hexColor);
    $("#frontBodyBlend path").css("fill", hexColor);
  });

  // End Customizer

  $("#mat_1 a").click(function () {
    $("#frontBody").fadeOut();
    $("#frontBody2").fadeIn();
  });

  $("#mat_2 a").click(function () {
    $("#frontBody2").fadeOut();
    $("#frontBody").fadeIn();
  });

  $("#sleev_mat_1 a").click(function () {
    $("#frontSleeve2").fadeIn();
    $("#frontSleeve").fadeOut();
  });

  $("#sleev_mat_2 a").click(function () {
    $("#frontSleeve2").fadeOut();
    $("#frontSleeve").fadeIn();
  });

  $("#product-color").click(function () {
    $("#pannelColor").toggleClass("d-none");
  });
  $("#product-text").click(function () {
    $("#pannelText").toggleClass("d-none");
  });
  $("#product-art").click(function () {
    $("#pannelAddArt").toggleClass("d-none");
  });
  $("#product-name").click(function () {
    $("#pannelAddName").toggleClass("d-none");
  });
  $(".action-close-panel").click(function () {
    var Pannel = $(this).closest(".control-device");
    Pannel.toggleClass("d-none");
  });

  $('#men-size-check').click(function () {
    if (document.getElementById('men-size-check').checked) {
      $('#men-table td').each(function () {
        console.log("vale: ", $(this).text());
        var magUnit = $(this).text();
        magUnit = magUnit * 0.393701
        magUnit = magUnit.toFixed(0)
        $(this).text(magUnit);
      });
    } else {
      $('#men-table td').each(function () {
        console.log("vale: ", $(this).text());
        var magUnit = $(this).text();
        magUnit = magUnit / 0.393701
        magUnit = magUnit.toFixed(0)
        $(this).text(magUnit);
      });
    }
  });

  $('#women-size-check').click(function () {
    if (document.getElementById('women-size-check').checked) {
      $('#women-table td').each(function () {
        console.log("vale: ", $(this).text());
        var magUnit = $(this).text();
        magUnit = magUnit * 0.393701
        magUnit = magUnit.toFixed(0)
        $(this).text(magUnit);
      });
    } else {
      $('#women-table td').each(function () {
        console.log("vale: ", $(this).text());
        var magUnit = $(this).text();
        magUnit = magUnit / 0.393701
        magUnit = magUnit.toFixed(0)
        $(this).text(magUnit);
      });
    }
  });

  $('#kids-size-check').click(function () {
    if (document.getElementById('kids-size-check').checked) {
      $('#kids-table td').each(function () {
        console.log("vale: ", $(this).text());
        var magUnit = $(this).text();
        magUnit = magUnit * 0.393701
        magUnit = magUnit.toFixed(0)
        $(this).text(magUnit);
      });
    } else {
      $('#kids-table td').each(function () {
        console.log("vale: ", $(this).text());
        var magUnit = $(this).text();
        magUnit = magUnit / 0.393701
        magUnit = magUnit.toFixed(0)
        $(this).text(magUnit);
      });
    }
  });



  // save design in local storeig
  var itemsDesign = {
    "orderClass" : "",
    "withHoodie" : "",
    "bodyMatType" : "",
    "jabId" : "",
    "fLAText" : "",
    "fLAInColor" : "",
    "fLAOutColor" : "",
    "fLAFront" : "",
    "fLFText" : "",
    "fLFColor" : "",
    "fLFFront" : "",
    "fRText" : "",
    "fRColor" : "",
    "fRFront" : "",
    "fRImage" : "",
    "fRImageColor" : "",
    "jasId" : "",
    "sleeveMatType" : "",
    "slText" : "",
    "slInColor" : "",
    "slOutColor" : "",
    "slFront" : "",
    "srText" : "",
    "srColor" : "",
    "srFront" : "",
    "srImage" : "",
    "srImageColor" : "",
    "bckUpText" : "",
    "bckUpIsColag" : "",
    "bckUpInColor" : "",
    "bckUpOutColor" : "",
    "bckUpFront" : "",
    "bckUpImage" : "",
    "bckUpImageColor" : "",
    "bckDnText" : "",
    "bckDnColor" : "",
    "bckDnFront" : "",
    "bckDnImage" : "",
    "bckDnImageColor" : "",
    "jcpId" : "",
    "jsnId" : "",
    "jpoId" : "",
    "rabColor" : "",
    "rabInColor" : "",
    "rabOutColor" : "",
    "isZipper" : "",
    "bckMiddleText" : "",
    "bckMiddleInColor" : "",
    "bckMiddleOutColor" : "",
    "bckMiddleFont" : "",
    "bckMiddleImage" : "",
    "bckMiddleImageColor" : "",
    "isImgUploadFr" : "",
    "isImgUploadSr" : "",
    "isImgUploadBckUp" : "",
    "isImgUploadBckMid" : "",
    "isImgUploadBckDwn" : "",
    "bckMiddTxtPro" : "",
    "bckMiddImgPro" : "",
    "bckDwnTxtPro" : "",
    "bckDwnImgPro" : "",
    "bckUpTxtPro" : "",
    "bckUpImgPro" : "",
    "fcTxt" : "",
    "fcInColor" : "",
    "fcOutColor" : "",
    "fcFont" : "",
    "fcTxtPro" : "",
    "fcImg" : "",
    "fcImgColor" : "",
    "fcImgPro" : "",
    "isImgUploadFc" : "",
    "swcId" : ""
  }

  
  $("#saveDesignItem").click(function() {
    localStorage.setItem("jacketDesign", JSON.stringify(itemsDesign));
    var retrievedJacketDesign = localStorage.getItem("jacketDesign");
    var ItemReseaved = JSON.parse(retrievedJacketDesign);
    console.log(ItemReseaved);
    window.location.replace("/save_order.html")
  })


  $('.form-label-group select').on('change', function(ev) {
    $(this).next().addClass("seleced-label");
    $(this).addClass("choosed-value");
  });


});
