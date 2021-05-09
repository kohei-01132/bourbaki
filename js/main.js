$(window).on("load", function () {
  var topPosition = $("#top").offset().top;
  $("html,body").animate({ scrollTop: topPosition }, 10);

  $(".hamMenu").on("click", function () {
    $(".hamMenu-up").toggleClass("active-line");
    $(".hamMenu-center").toggleClass("active-line");
    $(".hamMenu-down").toggleClass("active-line");
    $(".hamMenu-main").toggleClass("active");
    $(".hamMenu-returnbtn").toggleClass("active-return");
    $(".hamMenu-main_list_text").toggleClass("active-return");
  });

  $(".hamMenu-returnbtn ,.hamMenu-main_list_text").on("click", function () {
    $(".hamMenu-returnbtn").toggleClass("active-return");
    $(".hamMenu-main_list_text").toggleClass("active-return");
    $(".hamMenu-main").toggleClass("active");
    $(".hamMenu-down").toggleClass("active-line");
    $(".hamMenu-center").toggleClass("active-line");
    $(".hamMenu-up").toggleClass("active-line");
  });
});

//progressBar.line = 線上のプログレスバーを生成
var bar = new ProgressBar.Line(splash_text, {
  easing: "easeInOut",
  duration: 2000, //最低時間指定
  strokeWidth: 1.5, //進捗ゲージ太さ
  color: "#5e5e5e", //進捗ゲージカラー
  trailWidth: 1.5, //ゲージベースの線の太さ
  trailColor: "#ffffff", //ゲージベースの線のカラー
  text: {
    //テキストの形状を直接指定
    style: {
      //天地中央に配置
      position: "absolute",
      left: "50%",
      top: "50%",
      margin: "-25px 0 0 0",
      transform: "translate(-50%,-50%)",
      "font-size": "12px",
      color: "#fff",
    },
    autoStyleContiner: false, //自動付与のスタイルを切る
  },
  step: function (state, bar) {
    bar.setText(Math.round(bar.value() * 100) + "%");
  },
});

var deleytime = 3000;

bar.animate(1.0, function () {
  $(".loadinglogo").removeClass("active");
  $(".loadinglogo-line")
    .delay(300)
    .queue(function () {
      $(".loadinglogo-line").addClass("move");
    });
  // $(".openinganimation").delay(1000).fadeIn(300);
  $("#splash").delay(deleytime).fadeOut(800);
  $(".openinganimation-text")
    .delay(deleytime - 200)
    .fadeOut(500);
});

// $(".bg-cover").css("height", $(window).height());
// $("#splash").css("height", $(window).height());
// $("#openinganimation").css("height", $(window).height());
// $(".mv").css("height", $(window).height());
// $(".skate").css("height", $(window).height());
// $(".music").css("height", $(window).height());
// $(".photo").css("height", $(window).height());
// $(".member").css("height", $(window).height());
// $(".blog").css("height", $(window).height());
// $(".company").css("height", $(window).height());
// $(".contact").css("height", $(window).height());

var timeout = 500;

$('a[href*="#"]').click(function () {
  var elmHash = $(this).attr("href"); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
  var pos = $(elmHash).offset().top; //idの上部の距離を取得
  if (elmHash === "#top") {
    if ($(".skate").hasClass("opacity")) {
      $(".skate").removeClass("opacity");
    }
    if ($(".music").hasClass("opacity")) {
      $(".music").removeClass("opacity");
    }
    if ($(".photo").hasClass("opacity")) {
      $(".photo").removeClass("opacity");
    }
    if ($(".member").hasClass("opacity")) {
      $(".member").removeClass("opacity");
    }
    if ($(".blog").hasClass("opacity")) {
      $(".blog").removeClass("opacity");
    }
    if ($(".company").hasClass("opacity")) {
      $(".company").removeClass("opacity");
    }

    if ($(".contact").hasClass("opacity")) {
      $(".contact").removeClass("opacity");
    }
    setTimeout(() => {
      $("body,html").animate({ scrollTop: pos }, 0); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
      if ($(".page-button_opacity0").hasClass("opacity0")) {
        $(".page-button_opacity0").removeClass("opacity0");
      }
      if ($(".mv-img").hasClass("opacity0")) {
        $(".mv-img").removeClass("opacity0");
      }
    }, timeout);
  } else if (elmHash === "#skate") {
    if ($(".page-button_opacity0").hasClass("opacity0")) {
    } else {
      $(".page-button_opacity0").addClass("opacity0");
    }
    if ($(".mv-img").hasClass("opacity0")) {
    } else {
      $(".mv-img").addClass("opacity0");
    }
    if ($(".music").hasClass("opacity")) {
      $(".music").removeClass("opacity");
    }
    setTimeout(() => {
      $("body,html").animate({ scrollTop: pos }, 0); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
      if ($(".skate").hasClass("opacity")) {
      } else {
        $(".skate").addClass("opacity");
      }
    }, timeout);
    //skateをクリックしたら
    //top のボタンを透明にして
    //skate の位置に移動
    //skate　を表示
    //music を透明に
  } else if (elmHash === "#music") {
    if ($(".skate").hasClass("opacity")) {
      $(".skate").removeClass("opacity");
    }
    if ($(".photo").hasClass("opacity")) {
      $(".photo").removeClass("opacity");
    }
    setTimeout(() => {
      $("body,html").animate({ scrollTop: pos }, 0); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
      if ($(".music").hasClass("opacity")) {
      } else {
        $(".music").addClass("opacity");
      }
    }, timeout);
  } else if (elmHash === "#photo") {
    if ($(".music").hasClass("opacity")) {
      $(".music").removeClass("opacity");
    }
    if ($(".member").hasClass("opacity")) {
      $(".member").removeClass("opacity");
    }
    setTimeout(() => {
      $("body,html").animate({ scrollTop: pos }, 0); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
      if ($(".photo").hasClass("opacity")) {
      } else {
        $(".photo").addClass("opacity");
      }
    }, timeout);
  } else if (elmHash === "#member") {
    if ($(".photo").hasClass("opacity")) {
      $(".photo").removeClass("opacity");
    }
    if ($(".blog").hasClass("opacity")) {
      $(".blog").removeClass("opacity");
    }
    setTimeout(() => {
      $("body,html").animate({ scrollTop: pos }, 0); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
      if ($(".member").hasClass("opacity")) {
      } else {
        $(".member").addClass("opacity");
      }
    }, timeout);
  } else if (elmHash === "#blog") {
    if ($(".member").hasClass("opacity")) {
      $(".member").removeClass("opacity");
    }
    if ($(".company").hasClass("opacity")) {
      $(".company").removeClass("opacity");
    }
    setTimeout(() => {
      $("body,html").animate({ scrollTop: pos }, 0); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
      if ($(".blog").hasClass("opacity")) {
      } else {
        $(".blog").addClass("opacity");
      }
    }, timeout);
  } else if (elmHash === "#company") {
    if ($(".blog").hasClass("opacity")) {
      $(".blog").removeClass("opacity");
    }
    if ($(".contact").hasClass("opacity")) {
      $(".contact").removeClass("opacity");
    }
    setTimeout(() => {
      $("body,html").animate({ scrollTop: pos }, 0); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
      if ($(".company").hasClass("opacity")) {
      } else {
        $(".company").addClass("opacity");
      }
    }, timeout);
  } else if (elmHash === "#contact") {
    if ($(".company").hasClass("opacity")) {
      $(".company").removeClass("opacity");
    }
    if ($(".page-button_opacity0").hasClass("opacity0")) {
    } else {
      $(".page-button_opacity0").addClass("opacity0");
    }
    if ($(".mv-img").hasClass("opacity0")) {
    } else {
      $(".mv-img").addClass("opacity0");
    }
    setTimeout(() => {
      $("body,html").animate({ scrollTop: pos }, 0); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
      if ($(".contact").hasClass("opacity")) {
      } else {
        $(".contact").addClass("opacity");
      }
    }, timeout);
  }
  return false;
});
