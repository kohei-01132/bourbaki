$(window).on("load", function() {
  //loading後一番上にいること
  var topPosition = $("#top").offset().top;
  $("html,body").animate({ scrollTop: topPosition }, 10);

  //表示する媒体の高さを取得
  windowresize();

  //ハンバーガーメニューアクション
  $(".hamMenu").on("click", function() {
    $(".hamMenu-up,.hamMenu-center,.hamMenu-down").toggleClass("active-line");
    $(".hamMenu-main").toggleClass("active");
    $(".hamMenu-returnbtn,.hamMenu-main_list_text").toggleClass(
      "active-return"
    );
  });
  //ハンバーガーメニュー × アクション
  $(".hamMenu-returnbtn ,.hamMenu-main_list_text").on("click", function() {
    $(".hamMenu-returnbtn,.hamMenu-main_list_text").toggleClass(
      "active-return"
    );
    $(".hamMenu-main").toggleClass("active");
    $(".hamMenu-down,.hamMenu-center,.hamMenu-up").toggleClass("active-line");
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
      color: "#fff"
    },
    autoStyleContiner: false //自動付与のスタイルを切る
  },
  step: function(state, bar) {
    bar.setText(Math.round(bar.value() * 100) + "%");
  }
});

//loading animation 消す時間
var deleytime = 20000;

//プログレスバー読み込み完了後アクション
bar.animate(1.0, function() {
  //水色のペンキを生成
  logobg();
  //棒が飛ぶ
  $(".loadinglogo").removeClass("active");
  $(".loadinglogo-line")
    .delay(300)
    .queue(function() {
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
    .queue(function() {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)"
      });
    });
  $(".loading-anime_ink_logobg_1")
    .delay(3200)
    .queue(function() {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)"
      });
    });
  $(".loading-anime_ink_logobg_2")
    .delay(3400)
    .queue(function() {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)"
      });
    });
  $(".loading-anime_ink_logobg_3")
    .delay(3600)
    .queue(function() {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)"
      });
    });
  $(".loading-anime_ink_logobg_4")
    .delay(3800)
    .queue(function() {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)"
      });
    });
  $(".loading-anime_ink_logobg_5")
    .delay(3900)
    .queue(function() {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)"
      });
    });
  $(".loading-anime_ink_logobg_6")
    .delay(4000)
    .queue(function() {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)"
      });
    });
  $(".loading-anime_ink_logobg_7")
    .delay(4100)
    .queue(function() {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)"
      });
    });
  $(".loading-anime_ink_logobg_8")
    .delay(4200)
    .queue(function() {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)"
      });
    });
  $(".loading-anime_ink_logobg_9")
    .delay(4300)
    .queue(function() {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)"
      });
    });
  $(".loading-anime_ink_logobg_10")
    .delay(4400)
    .queue(function() {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)"
      });
    });
  $(".loading-anime_ink_logobg_11")
    .delay(4500)
    .queue(function() {
      $(this).css({
        opacity: "1",
        transform: "scale(1,1)"
      });
    });
  //前面水色
  $(".loading-anime_ink_logobg1").addClass("blue-scale");
  //黒壁登場
  $(".loading-anime_font").addClass("white-move");
  //ローディング画面フェードアウト
  $("#splash")
    .delay(deleytime - 200)
    .fadeOut(100);
  //animation フェードアウト
  $(".loading-anime")
    .delay(deleytime)
    .fadeOut(3000);
});

//水色インク生成
function logobg() {
  var posx = [134, -130, 94, 424, -106, 374, -154, 194, 384, 384, 60, 134];
  var posy = [580, 1090, 20, 920, 290, 370, 650, 1070, 120, 650, 786, 340];

  for (i = 0; i <= 11; i++) {
    var inkImg = $("<img>", {
      src: "./image/水玉.png",
      alt: "水玉",
      class: "loading-anime_ink_logobg_" + [i]
    })
      .clone(true)
      .addClass("loading-anime_ink_logobg_set")
      .css("opacity", "0");
    $(inkImg).offset({ top: posx[i], left: posy[i] });
    $(inkImg).appendTo(".loading-anime_ink_logobg");
  }
}

//各リンククリック後フェードアウト時間
var timeout = 500;

//ボタンクリックアクション

//skateをクリックしたら
//top のボタンを透明にして
//skate の位置に移動
//skate　を表示
//music を透明に

$('a[href*="#"]').click(function() {
  //top
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
      if ($(".mv-section").hasClass("opacity0")) {
        $(".mv-section").removeClass("opacity0");
      }
    }, timeout);
    //skate
  } else if (elmHash === "#skate") {
    if ($(".page-button_opacity0").hasClass("opacity0")) {
    } else {
      $(".page-button_opacity0").addClass("opacity0");
    }
    if ($(".mv-section").hasClass("opacity0")) {
    } else {
      $(".mv-section").addClass("opacity0");
    }
    if ($(".music").hasClass("opacity")) {
      $(".music").removeClass("opacity");
    }
    setTimeout(() => {
      $("body,html").animate({ scrollTop: pos }, 1000); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
      if ($(".skate").hasClass("opacity")) {
      } else {
        $(".skate").addClass("opacity");
      }
    }, timeout);
    //music
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
    //photo
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
    //member
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
    //blog
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
    //company
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
    //contact
  } else if (elmHash === "#contact") {
    if ($(".company").hasClass("opacity")) {
      $(".company").removeClass("opacity");
    }
    if ($(".page-button_opacity0").hasClass("opacity0")) {
    } else {
      $(".page-button_opacity0").addClass("opacity0");
    }
    if ($(".mv-section").hasClass("opacity0")) {
    } else {
      $(".mv-section").addClass("opacity0");
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
