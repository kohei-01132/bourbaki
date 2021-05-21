$(window).on("load", function () {
  //loading後一番上にいること
  var topPosition = $("#top").offset().left;
  $("html,body").animate({ scrollLeft: topPosition }, 10);
  //表示する媒体の高さを取得
  windowresize();

  //ハンバーガーメニューアクション
  $(".hamMenu").on("click", function () {
    $(".hamMenu-up,.hamMenu-center,.hamMenu-down").toggleClass("active-line");
    $(".hamMenu-main").toggleClass("active");
    $(".hamMenu-returnbtn,.hamMenu-main_list_text").toggleClass(
      "active-return"
    );
  });
  //ハンバーガーメニュー × アクション
  $(".hamMenu-returnbtn ,.hamMenu-main_list_text").on("click", function () {
    $(".hamMenu-returnbtn,.hamMenu-main_list_text").toggleClass(
      "active-return"
    );
    $(".hamMenu-main").toggleClass("active");
    $(".hamMenu-down,.hamMenu-center,.hamMenu-up").toggleClass("active-line");
  });

  //blog category btn
  $(".blog-article_menu_category").on("click", function () {
    $(".blog-article_menu_list").toggleClass("category_btn");
  });
  $(".blog-article_menu_list").on("click", function () {
    $(".blog-article_menu_list").removeClass("category_btn");
  });
  $(".news-article_menu_category").on("click", function () {
    $(".news-article_menu_list").toggleClass("category_btn");
  });
  $(".news-article_menu_list").on("click", function () {
    $(".news-article_menu_list").removeClass("category_btn");
  });
});

//windowresize
$(window).resize(windowresize);

function windowresize() {
  $(".body").css("height", height);
}

//プログレスバー作成
//progressBar.line = 線上のプログレスバーを生成
var bar = new ProgressBar.Line(splash_text, {
  easing: "easeInOut",
  duration: 3000, //最低時間指定
  strokeWidth: 1, //進捗ゲージ太さ
  color: "#ffffff", //進捗ゲージカラー
  trailWidth: 1, //ゲージベースの線の太さ
  trailColor: "#5e5e5e", //ゲージベースの線のカラー
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

//loading animation 消す時間
var deleytime = 8800;
//8800
//プログレスバー読み込み完了後アクション
bar.animate(1.0, function () {
  //水色のペンキを生成
  logobg();
  //棒が飛ぶ
  $(".loadinglogo").removeClass("active");
  $(".loadinglogo-line")
    .delay(300)
    .queue(function () {
      $(".loadinglogo-line").addClass("move");
    });
  //白壁が降りてくる
  $(".loading-anime-whitetop").addClass("white-move");
  $(".loading-anime-whitebottom").addClass("white-move");
  //棒が横から飛んでくる
  $(".loading-anime-ink_linetop").addClass("linetop-move");
  $(".loading-anime-ink_linebottom").addClass("linebottom-move");
  //白画面にロゴを配置
  $(".loading-anime_ink_logo").addClass("ink-opacity");
  //棒に合わせてインクが塗られる 色鮮やか編
  $(
    ".loading-anime_ink_r1,.loading-anime_ink_r2,.loading-anime_ink_r3,.loading-anime_ink_r4,.loading-anime_ink_l1,.loading-anime_ink_l2,.loading-anime_ink_l3,.loading-anime_ink_l4"
  ).addClass("ink-opacity");
  //インクが塗られる 水色編
  $(".loading-anime_ink_logobg_0")
    .delay(3000)
    .queue(function () {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)",
      });
    });
  $(".loading-anime_ink_logobg_1")
    .delay(3200)
    .queue(function () {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)",
      });
    });
  $(".loading-anime_ink_logobg_2")
    .delay(3400)
    .queue(function () {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)",
      });
    });
  $(".loading-anime_ink_logobg_3")
    .delay(3600)
    .queue(function () {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)",
      });
    });
  $(".loading-anime_ink_logobg_4")
    .delay(3800)
    .queue(function () {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)",
      });
    });
  $(".loading-anime_ink_logobg_5")
    .delay(3900)
    .queue(function () {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)",
      });
    });
  $(".loading-anime_ink_logobg_6")
    .delay(4000)
    .queue(function () {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)",
      });
    });
  $(".loading-anime_ink_logobg_7")
    .delay(4100)
    .queue(function () {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)",
      });
    });
  $(".loading-anime_ink_logobg_8")
    .delay(4200)
    .queue(function () {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)",
      });
    });
  $(".loading-anime_ink_logobg_9")
    .delay(4300)
    .queue(function () {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)",
      });
    });
  $(".loading-anime_ink_logobg_10")
    .delay(4400)
    .queue(function () {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)",
      });
    });
  $(".loading-anime_ink_logobg_11")
    .delay(4500)
    .queue(function () {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)",
      });
    });
  //前面水色
  $(".loading-anime_ink_logobg1").addClass("blue-scale");
  //黒壁登場
  $(".loading-anime_font").addClass("white-move");
  //font-line--move
  if (width >= 767) {
    $(".loading-anime_font_1").addClass("font_1_move");
    $(".loading-anime_font_2").addClass("font_2_move");
    $(".loading-anime_font_3").addClass("font_3_move");
    $(".loading-anime_font_4").addClass("font_4_move");
    $(".loading-anime_font_5").addClass("font_5_move");
    $(".loading-anime_font_6").addClass("font_6_move");
    $(".loading-anime_font_7").addClass("font_7_move");
    $(".loading-anime_font_8").addClass("font_8_move");
    $(".loading-anime_font_12").addClass("font_12_move");
    $(".loading-anime_font_13").addClass("font_13_move");
  } else {
    $(".loading-anime_font_1").addClass("font_1_move_phon");
    $(".loading-anime_font_2").addClass("font_2_move_phon");
    $(".loading-anime_font_3").addClass("font_3_move_phon");
    $(".loading-anime_font_4").addClass("font_4_move_phon");
    $(".loading-anime_font_5").addClass("font_5_move_phon");
    $(".loading-anime_font_6").addClass("font_6_move_phon");
    $(".loading-anime_font_7").addClass("font_7_move_phon");
    $(".loading-anime_font_8").addClass("font_8_move_phon");
    $(".loading-anime_font_12").addClass("font_12_move_phon");
    $(".loading-anime_font_13").addClass("font_13_move_phon");
  }
  //mv-text
  $(".mv-img_text_top").addClass("mv-img_text_top_move");
  $(".mv-img_text_bottom").addClass("mv-img_text_top_move");
  $(".mv-img_block_top").addClass("mv-img_block_top_move");
  $(".mv-img_block_bottom").addClass("mv-img_block_bottom_move");
  $(".mv-menu_list_box").addClass("mv-menu-move");
  $(".mv-menu_list").addClass("mv-move-menu");

  //ローディング画面フェードアウト
  $("#splash")
    .delay(deleytime - 200)
    .fadeOut(100);
  //animation フェードアウト
  $(".loading-anime").delay(deleytime).fadeOut(2000);
});

//水色インク生成
function logobg() {
  var posx = [134, -130, 94, 424, -106, 374, -154, 194, 384, 384, 60, 134];
  var posy = [580, 1090, 20, 920, 290, 370, 650, 1070, 120, 650, 786, 340];

  for (i = 0; i <= 11; i++) {
    var inkImg = $("<img>", {
      src: "./image/bluecube.png",
      alt: "水玉",
      class: "loading-anime_ink_logobg_" + [i],
    })
      .clone(true)
      .addClass("loading-anime_ink_logobg_set")
      .css("opacity", "0");
    $(inkImg).offset({ top: posx[i], left: posy[i] });
    $(inkImg).appendTo(".loading-anime_ink_logobg");
  }
}

//各リンククリック後フェードアウト時間
var timeout = 800;

//ボタンクリックアクション

//skateをクリックしたら
//top のボタンを透明にして
//skate の位置に移動
//skate　を表示
//music を透明に

$('a[href*="#"]').click(function () {
  //top
  var elmHash = $(this).attr("href"); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
  var pos = $(elmHash).offset().left; //idの上部の距離を取得
  if ($(".page-button_opacity0").hasClass("opacity0")) {
  } else {
    $(".page-button_opacity0").addClass("opacity0");
  }
  if ($(".mv-section").hasClass("opacity0")) {
  } else {
    $(".mv-section").addClass("opacity0");
  }
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
  if ($(".blognews").hasClass("opacity")) {
    $(".blognews").removeClass("opacity");
  }
  if ($(".company").hasClass("opacity")) {
    $(".company").removeClass("opacity");
  }

  setTimeout(() => {
    $("html,body").animate({ scrollLeft: pos }, 300); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
    if ($(".page-button_opacity0").hasClass("opacity0")) {
      $(".page-button_opacity0").removeClass("opacity0");
    }
    if ($(".mv-section").hasClass("opacity0")) {
      $(".mv-section").removeClass("opacity0");
    }
    if ($(".skate").hasClass("opacity")) {
    } else {
      $(".skate").addClass("opacity");
    }
    if ($(".music").hasClass("opacity")) {
    } else {
      $(".music").addClass("opacity");
    }
    if ($(".photo").hasClass("opacity")) {
    } else {
      $(".photo").addClass("opacity");
    }
    if ($(".member").hasClass("opacity")) {
    } else {
      $(".member").addClass("opacity");
    }
    if ($(".blognews").hasClass("opacity")) {
    } else {
      $(".blognews").addClass("opacity");
    }
    if ($(".company").hasClass("opacity")) {
    } else {
      $(".company").addClass("opacity");
    }
  }, timeout);

  return false;
});

//横スクロール
$(function () {
  //コンテンツの横サイズ
  var cont = $(".slider");
  var contW = $(".mv").outerWidth(true) * $("div", cont).length;
  cont.css("width", contW);
  //スクロールスピード
  var speed = 1;
  //マウスホイールで横移動
  $("html").mousewheel(function (event, mov) {
    //ie firefox
    $(this).scrollLeft($(this).scrollLeft() - mov * speed);
    //webkit
    $("body").scrollLeft($("body").scrollLeft() - mov * speed);
    return false; //縦スクロール不可
  });
});

//1セクションごとにとまるやつ追加
$(function () {
  var toppos = $("#top").offset().left;
  var skatepos = $("#skate").offset().left;
  var musicpos = $("#music").offset().left;
  var photopos = $("#photo").offset().left;
  var memberpos = $("#member").offset().left;
  var blogpos = $("#blog").offset().left;
  var companypos = $("#company").offset().left;
  var contactpos = $("#contact").offset().left;
  var nextpagestart = width / 6;
  var nowpos;
  $(window).scroll(function () {
    nowpos = $("html,body").scrollLeft();
    console.log(nowpos);
    posmove();
    menucolor();
  });
  //ピタッとつく
  function posmove() {
    if (nextpagestart * 4 <= nowpos && nowpos <= nextpagestart * 5) {
      $("html,body").not(":animated").animate({ scrollLeft: toppos }, 500);
    } else if (nextpagestart <= nowpos && nowpos <= nextpagestart * 2) {
      $("html,body").not(":animated").animate({ scrollLeft: skatepos }, 500);
    } else if (nextpagestart * 7 <= nowpos && nowpos <= nextpagestart * 8) {
      $("html,body").not(":animated").animate({ scrollLeft: musicpos }, 500);
    } else if (nextpagestart * 10 <= nowpos && nowpos <= nextpagestart * 11) {
      $("html,body").not(":animated").animate({ scrollLeft: skatepos }, 500);
    } else if (nextpagestart * 13 <= nowpos && nowpos <= nextpagestart * 14) {
      $("html,body").not(":animated").animate({ scrollLeft: photopos }, 500);
    } else if (nextpagestart * 16 <= nowpos && nowpos <= nextpagestart * 17) {
      $("html,body").not(":animated").animate({ scrollLeft: musicpos }, 500);
    } else if (nextpagestart * 19 <= nowpos && nowpos <= nextpagestart * 20) {
      $("html,body").not(":animated").animate({ scrollLeft: memberpos }, 500);
    } else if (nextpagestart * 22 <= nowpos && nowpos <= nextpagestart * 23) {
      $("html,body").not(":animated").animate({ scrollLeft: photopos }, 500);
    } else if (nextpagestart * 25 <= nowpos && nowpos <= nextpagestart * 26) {
      $("html,body").not(":animated").animate({ scrollLeft: blogpos }, 500);
    } else if (nextpagestart * 28 <= nowpos && nowpos <= nextpagestart * 29) {
      $("html,body").not(":animated").animate({ scrollLeft: memberpos }, 500);
    } else if (nextpagestart * 31 <= nowpos && nowpos <= nextpagestart * 32) {
      $("html,body").not(":animated").animate({ scrollLeft: companypos }, 500);
    } else if (nextpagestart * 34 <= nowpos && nowpos <= nextpagestart * 35) {
      $("html,body").not(":animated").animate({ scrollLeft: blogpos }, 500);
    } else if (nextpagestart * 37 <= nowpos && nowpos <= nextpagestart * 38) {
      $("html,body").not(":animated").animate({ scrollLeft: contactpos }, 500);
    } else if (nextpagestart * 40 <= nowpos && nowpos <= nextpagestart * 41) {
      $("html,body").not(":animated").animate({ scrollLeft: companypos }, 1000);
    } else if (nextpagestart * 43 <= nowpos && nowpos <= nextpagestart * 44) {
      $("html,body").not(":animated").animate({ scrollLeft: toppos }, 1000);
    }
  }

  function menucolor() {
    if (nowpos < width) {
      if ($(".mv-menu_list_text.mv-menu-top").hasClass("colortop")) {
      } else {
        $(".mv-menu_list_text.mv-menu-top").addClass("colortop");
      }
      if (
        $(".page-position_circle_top").hasClass("page-position_circle_top_move")
      ) {
      } else {
        $(".page-position_circle_top").addClass(
          "page-position_circle_top_move"
        );
      }
    } else {
      $(".mv-menu_list_text.mv-menu-top").removeClass("colortop");
      $(".page-position_circle_top").removeClass(
        "page-position_circle_top_move"
      );
    }

    if (width <= nowpos && nowpos < width * 2) {
      if ($(".mv-menu_list_text.mv-menu-skate").hasClass("colorskate")) {
      } else {
        $(".mv-menu_list_text.mv-menu-skate").addClass("colorskate");
      }
      if (
        $(".page-position_circle_skate").hasClass(
          "page-position_circle_skate_move"
        )
      ) {
      } else {
        $(".page-position_circle_skate").addClass(
          "page-position_circle_skate_move"
        );
      }
    } else {
      $(".mv-menu_list_text.mv-menu-skate").removeClass("colorskate");
      $(".page-position_circle_skate").removeClass(
        "page-position_circle_skate_move"
      );
    }

    if (width * 2 <= nowpos && nowpos < width * 3) {
      if ($(".mv-menu_list_text.mv-menu-music").hasClass("colormusic")) {
      } else {
        $(".mv-menu_list_text.mv-menu-music").addClass("colormusic");
      }
      if (
        $(".page-position_circle_music").hasClass(
          "page-position_circle_music_move"
        )
      ) {
      } else {
        $(".page-position_circle_music").addClass(
          "page-position_circle_music_move"
        );
      }
    } else {
      $(".mv-menu_list_text.mv-menu-music").removeClass("colormusic");
      $(".page-position_circle_music").removeClass(
        "page-position_circle_music_move"
      );
    }

    if (width * 3 <= nowpos && nowpos < width * 4) {
      if ($(".mv-menu_list_text.mv-menu-photo").hasClass("colorphoto")) {
      } else {
        $(".mv-menu_list_text.mv-menu-photo").addClass("colorphoto");
      }
      if (
        $(".page-position_circle_photo").hasClass(
          "page-position_circle_photo_move"
        )
      ) {
      } else {
        $(".page-position_circle_photo").addClass(
          "page-position_circle_photo_move"
        );
      }
    } else {
      $(".mv-menu_list_text.mv-menu-photo").removeClass("colorphoto");
      $(".page-position_circle_photo").removeClass(
        "page-position_circle_photo_move"
      );
    }

    if (width * 4 <= nowpos && nowpos < width * 5) {
      if ($(".mv-menu_list_text.mv-menu-member").hasClass("colormember")) {
      } else {
        $(".mv-menu_list_text.mv-menu-member").addClass("colormember");
      }
      if (
        $(".page-position_circle_member").hasClass(
          "page-position_circle_member_move"
        )
      ) {
      } else {
        $(".page-position_circle_member").addClass(
          "page-position_circle_member_move"
        );
      }
    } else {
      $(".mv-menu_list_text.mv-menu-member").removeClass("colormember");
      $(".page-position_circle_member").removeClass(
        "page-position_circle_member_move"
      );
    }

    if (width * 5 <= nowpos && nowpos < width * 6) {
      if ($(".mv-menu_list_text.mv-menu-blog").hasClass("colorblog")) {
      } else {
        $(".mv-menu_list_text.mv-menu-blog").addClass("colorblog");
      }
      if (
        $(".page-position_circle_blognews").hasClass(
          "page-position_circle_blognews_move"
        )
      ) {
      } else {
        $(".page-position_circle_blognews").addClass(
          "page-position_circle_blognews_move"
        );
      }
    } else {
      $(".mv-menu_list_text.mv-menu-blog").removeClass("colorblog");
      $(".page-position_circle_blognews").removeClass(
        "page-position_circle_blognews_move"
      );
    }

    if (width * 6 <= nowpos && nowpos < width * 7) {
      if ($(".mv-menu_list_text.mv-menu-company").hasClass("colorcompany")) {
      } else {
        $(".mv-menu_list_text.mv-menu-company").addClass("colorcompany");
      }
      if (
        $(".page-position_circle_company").hasClass(
          "page-position_circle_company_move"
        )
      ) {
      } else {
        $(".page-position_circle_company").addClass(
          "page-position_circle_company_move"
        );
      }
    } else {
      $(".mv-menu_list_text.mv-menu-company").removeClass("colorcompany");
      $(".page-position_circle_company").removeClass(
        "page-position_circle_company_move"
      );
    }
  }
});

$(function () {
  // 1回目のアクセス
  if ($.cookie("access") == undefined) {
    //最初にアクセスしたときにはここに書いたアニメーションのJSが動く
    $.cookie("access", { expires: 7 });
    $("#splash").css("display", "block");
    $(".loading-anime").css("display", "block");
    // 2回目以降は動かないようにするけど最初は動かす
  } else {
    $("#splash").css("display", "none");
    $(".loading-anime").css("display", "none");
    $(".loading-anime").css("display", "none");
    $(".mv-menu_list").css("transition", "all 0.1s linear 0.3s");
    $(".mv-menu_list_box").css("transition", "all 0.9s linear 0s");
    $(".mv-img_text_top").css("transition", "all 0.1s linear 0.2s");
    $(".mv-img_text_bottom").css("transition", "all 0.1s linear 0.2s");
    $(".mv-img_block_top").css("transition", "all 1s linear 0s");
    $(".mv-img_block_bottom").css("transition", "all 1s linear 0s");
    $.removeCookie("access");
    // 2回目以降は動かないようにする
  }
});

//トップへ戻るjs
// $(function() {
//   var pagetop = $("#page_top");
//   // ボタン非表示
//   pagetop.hide();
//   // 1000px スクロールしたらボタン表示
//   $(window).scroll(function() {
//     if ($(this).scrollTop() > 500) {
//       pagetop.fadeIn();
//     } else {
//       pagetop.fadeOut();
//     }
//   });
//   pagetop.click(function() {
//     $("body, html").animate({ scrollTop: 0 }, 1000);
//     return false;
//   });
// });

// function showElementAnimation() {
//   var element = document.getElementsByClassName("js-fadein");
//   if (!element) return; // 要素がなかったら処理をキャンセル
//   var showTiming = window.innerHeight > 768 ? 200 : 80; // 要素が出てくるタイミングはここで調整
//   var scrollY = window.pageYOffset; //スクロール量を取得
//   var windowH = window.innerHeight; //ブラウザウィンドウのビューポート(viewport)の高さを取得
//   for (var i = 0; i < element.length; i++) {
//     var elemClientRect = element[i].getBoundingClientRect();
//     var elemY = scrollY + elemClientRect.top;
//     if (scrollY + windowH - showTiming > elemY) {
//       element[i].classList.add("is-show");
//     } else if (scrollY + windowH < elemY) {
//       // 上にスクロールして再度非表示にする場合はこちらを記述
//       element[i].classList.remove("is-show");
//     }
//   }
// }
// showElementAnimation();
// window.addEventListener("scroll", showElementAnimation);

$(function () {
  $(".header-contact").click(function () {
    $(".contact").fadeIn(500).css("display", "flex");
    $(".contact-bg").fadeIn(500);
  });
  $(".contact-bg").click(function () {
    $(".contact,.contact-bg").fadeOut(500);
  });
});

$(function () {});
