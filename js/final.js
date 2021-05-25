var camera;
var scene;
var renderer;
var width = window.innerWidth;
var height = window.innerHeight;
//textureloader
var textureLoader = new THREE.TextureLoader();

function init() {
  //scene作成
  scene = new THREE.Scene();

  //camera作成
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  //camera ポジション
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = height * 1.2;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  //renderer作成
  renderer = new THREE.WebGLRenderer({ alpha: true });
  //背景色
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.domElement.style.zIndex = 0;
  renderer.setPixelRatio(1);
  //サイズ
  renderer.setSize(width, height + 20);

  // スポットライト光源を作成
  // new THREE.SpotLight(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率)
  // const light = new THREE.SpotLight(0xff0000, 4, 1000, Math.PI, 1, 0.5);
  // scene.add(light);

  //htmlに追加
  document.getElementById("WebGL-output").appendChild(renderer.domElement);

  const block_width = 8; //■ サイズ
  const circle_radius = 5; //● 半径
  const circle_segment = 25; //● かくかく
  const circle_num = circle_nums(); //● 個数
  const block_num = block_nums(); //■ 個数
  const min_speed = -0.2; //動くスピード min
  const max_speed = 0.2; //動くスピード max
  //丸,四角の倍率　/100した値が倍率
  const min_scale = 80;
  const max_scale = 150;
  //text 個数
  let text_num = [0, 1, 2, 3, 4, 5, 6, 7];
  //textspeed
  // const max_text_speed = 100;
  // const min_text_speed = -100;
  //■ 回転スピード
  const rotateZ_max_speed = 0.05;
  const rotateZ_min_speed = -0.05;
  //sub● 個数
  const circlesub_num = 10;

  function circle_nums() {
    if (window.innerWidth >= 767) {
      return 100;
    } else {
      return 10;
    }
  }
  function block_nums() {
    if (window.innerWidth >= 767) {
      return 100;
    } else {
      return 10;
    }
  }
  // // textの初期配置X(pc,phone)
  // function textpoositionmaxw() {
  //   if (window.innerWidth >= 767) {
  //     return 300;
  //   } else {
  //     return 3;
  //   }
  // }
  // function textpoositionminw() {
  //   if (window.innerWidth >= 767) {
  //     return 2.8;
  //   } else {
  //     return 3;
  //   }
  // }
  // // textの初期配置Y(pc,phone)
  // function textpoositionmaxh() {
  //   if (window.innerWidth >= 767) {
  //     return 3;
  //   } else {
  //     return 300;
  //   }
  // }
  // function textpoositionminh() {
  //   if (window.innerWidth >= 767) {
  //     return 3;
  //   } else {
  //     return 2.4;
  //   }
  // }

  // ● 作成
  // new THREE.CircleGeometry(radius(半径), segments(thetaLengthで設定した角度をこの数で分割します。数を大きくするほど、円に近づいていきます。), thetaStart(開始角度で、単位はラジアンです。), thetaLength(中心角で、単位はラジアンです。))
  const circleGeometry = new THREE.SphereGeometry(
    circle_radius,
    circle_segment,
    circle_segment
  );
  var colorcircle = 0xbbbbbb;
  const circleMaterial = new THREE.MeshBasicMaterial({ color: colorcircle });

  let circ = [];

  for (var r = 0; r < circle_num; r++) {
    circ.push(new THREE.Mesh(circleGeometry, circleMaterial));
  }

  // 平面の長方形を作成
  const planegeometry = new THREE.PlaneGeometry(block_width, block_width);
  var colorplane = 0x888888;
  var planematerial = new THREE.MeshBasicMaterial({ color: colorplane });

  let rect = [];

  for (var i = 0; i < block_num; i++) {
    rect.push(new THREE.Mesh(planegeometry, planematerial));
  }

  //sub円を作成
  var colorsubcircle = 0x33dfd6;
  const circlesubMaterial = new THREE.MeshBasicMaterial({
    color: colorsubcircle
  });

  let subcircle = [];

  for (var s = 0; s < circlesub_num; s++) {
    subcircle.push(new THREE.Mesh(circleGeometry, circlesubMaterial));
  }

  var backmap = textureLoader.load("./image/guraduation.jpg");
  var blackGeometry = new THREE.PlaneGeometry(height * 2.5, height * 2.5);
  var blackMaterial = new THREE.MeshBasicMaterial({
    map: backmap
    // color: 0x111111
  });
  var blackPlane = new THREE.Mesh(blackGeometry, blackMaterial);

  blackPlane.position.x = 0;
  blackPlane.position.y = 0;
  blackPlane.position.z = -100;
  scene.add(blackPlane);

  // //sprite
  // var spritemap = textureLoader.load("./image/Particle01.png");
  // var spriteMaterial = new THREE.SpriteMaterial({
  //   map: spritemap,
  //   color: 0x00f00f,
  //   blending: THREE.AdditiveBlending,
  //   opacity: 1,
  //   transparent: true
  // });
  // var sprite = new THREE.Sprite(spriteMaterial);
  // sprite.scale.multiplyScalar(400);
  // sprite.position.z = 110;

  // scene.add(sprite);

  //乱数を定義
  let a = []; //●x
  let b = []; //●y
  let c = []; //●z
  let ax = []; //●x speed
  let by = []; //●y speed
  let x = []; //■x
  let y = []; //■y
  let dx = []; //■x speed
  let dy = []; //■y speed
  let rotateZ = []; //■ rotate
  // //text pc x 初期位置
  // let textxpc = [
  //   (width / 2) * -0.7,
  //   (width / 2) * -0.3,
  //   (width / 2) * -0.5,
  //   (width / 2) * -0.7,
  //   (width / 2) * -0.5,
  //   (width / 2) * -0.3,
  //   (width / 2) * -0.3,
  //   (width / 2) * -0.7
  // ];
  // //text pc y 初期位置
  // let textypc = [
  //   (height / 2) * 0.6,
  //   (height / 2) * 0,
  //   (height / 2) * -0.2,
  //   (height / 2) * 0.1,
  //   (height / 2) * 0.3,
  //   (height / 2) * -0.5,
  //   (height / 2) * 0.5,
  //   (height / 2) * -0.6
  // ];
  // //text phone x 初期位置
  // let textxpho = [
  //   (width / 2) * 0.01,
  //   (width / 2) * 0.01,
  //   (width / 2) * 0.01,
  //   (width / 2) * 0.01,
  //   (width / 2) * 0.01,
  //   (width / 2) * 0.01,
  //   (width / 2) * 0.01,
  //   (width / 2) * 0.01
  // ];
  // //text pho y 初期位置
  // let textypho = [
  //   (height / 2) * 0.8,
  //   (height / 2) * 0.7,
  //   (height / 2) * 0.6,
  //   (height / 2) * 0.5,
  //   (height / 2) * 0.4,
  //   (height / 2) * 0.3,
  //   (height / 2) * 0.2,
  //   (height / 2) * 0.1
  // ];
  // let textdx = []; //text x speed
  // let textdy = []; //text y speed
  let subcircle_x = []; //sub ● x初期位置
  let subcircle_y = []; //sub ● y初期位置

  //● ■ 初期位置
  let min_pos_x = -(Number(width) / 2);
  let max_pos_x = Number(width) / 2;
  let min_pos_y = -(Number(height) / 2);
  let max_pos_y = Number(height) / 2;
  //● ■ 倍率
  let min_sca = Number(min_scale);
  let max_sca = Number(max_scale);

  //円の乱数作成
  for (var r = 0; r < circle_num; r++) {
    a.push(Math.floor(Math.random() * (max_pos_x - min_pos_x + 1)) + min_pos_x);
    b.push(Math.floor(Math.random() * (max_pos_y - min_pos_y + 1)) + min_pos_y);
    c.push((Math.floor(Math.random() * (max_sca - min_sca)) + min_sca) / 100);
    ax.push(
      Math.floor(Math.random() * (max_speed - min_speed + 1)) + min_speed
    );
    by.push(
      Math.floor(Math.random() * (max_speed - min_speed + 1)) + min_speed
    );
  }

  //   長方形の乱数作成
  for (var i = 0; i < block_num; i++) {
    x.push(Math.floor(Math.random() * (max_pos_x - min_pos_x + 1)) + min_pos_x);
    y.push(Math.floor(Math.random() * (max_pos_y - min_pos_y + 1)) + min_pos_y);
    dx.push(
      Math.floor(Math.random() * (max_speed - min_speed + 1)) + min_speed
    );
    dy.push(
      Math.floor(Math.random() * (max_speed - min_speed + 1)) + min_speed
    );
    rotateZ.push(
      Math.random() * (rotateZ_max_speed - rotateZ_min_speed) +
        rotateZ_min_speed
    );
  }
  // //text スピード 乱数作成
  // for (var t = 0; t <= 7; t++) {
  //   textdx.push(
  //     (Math.floor(Math.random() * (max_text_speed - min_text_speed)) +
  //       min_text_speed) /
  //       400
  //   );
  //   textdy.push(
  //     (Math.floor(Math.random() * (max_text_speed - min_text_speed)) +
  //       min_text_speed) /
  //       400
  //   );
  // }
  //sub ● 乱数作成
  for (var s = 0; s < circlesub_num; s++) {
    subcircle_x.push(
      Math.floor(Math.random() * (max_pos_x - min_pos_x + 1)) + min_pos_x
    );
    subcircle_y.push(
      Math.floor(Math.random() * (max_pos_y - min_pos_y + 1)) + min_pos_y
    );
  }

  // //textsize
  // function fontsize() {
  //   if (width >= 767) {
  //     return 3;
  //   } else {
  //     return 4;
  //   }
  // }

  // //top text作成
  // var texture0 = textureLoader.load("./image/top@2x.png");

  // let text0materiallist = {
  //   map: texture0,
  //   opacity: 1,
  //   transparent: true,
  //   blending: THREE.MultiplyBlending
  // };
  // let text0Geometry = new THREE.PlaneGeometry(
  //   181 / fontsize(),
  //   110 / fontsize()
  // );
  // let text0Material = new THREE.MeshBasicMaterial(text0materiallist);
  // let text0Plane = new THREE.Mesh(text0Geometry, text0Material);
  // text0Plane.name = "text0Plane";

  // //skate text作成
  // var texture1 = textureLoader.load("./image/skate@2x.png");

  // let text1materiallist = {
  //   map: texture1,
  //   opacity: 1,
  //   transparent: true,
  //   blending: THREE.MultiplyBlending
  // };

  // let text1Geometry = new THREE.PlaneGeometry(
  //   310 / fontsize(),
  //   110 / fontsize()
  // );
  // let text1Material = new THREE.MeshBasicMaterial(text1materiallist);
  // let text1Plane = new THREE.Mesh(text1Geometry, text1Material);
  // text1Plane.name = "text1Plane";

  // //music text作成

  // var texture2 = textureLoader.load("./image/music@2x.png");

  // let text2Geometry = new THREE.PlaneGeometry(
  //   301 / fontsize(),
  //   110 / fontsize()
  // );
  // let text2Material = new THREE.MeshBasicMaterial({
  //   map: texture2,
  //   opacity: 1,
  //   transparent: true,
  //   blending: THREE.MultiplyBlending
  // });
  // let text2Plane = new THREE.Mesh(text2Geometry, text2Material);
  // text2Plane.name = "text2Plane";

  // //photo text作成

  // var texture3 = textureLoader.load("./image/photo@2x.png");

  // let text3Geometry = new THREE.PlaneGeometry(
  //   301 / fontsize(),
  //   110 / fontsize()
  // );
  // let text3Material = new THREE.MeshBasicMaterial({
  //   map: texture3,
  //   opacity: 1,
  //   transparent: true,
  //   blending: THREE.MultiplyBlending
  // });
  // let text3Plane = new THREE.Mesh(text3Geometry, text3Material);
  // text3Plane.name = "text3Plane";

  // //member text作成

  // var texture4 = textureLoader.load("./image/member@2x.png");

  // let text4Geometry = new THREE.PlaneGeometry(
  //   361 / fontsize(),
  //   110 / fontsize()
  // );
  // let text4Material = new THREE.MeshBasicMaterial({
  //   map: texture4,
  //   opacity: 1,
  //   transparent: true,
  //   blending: THREE.MultiplyBlending
  // });
  // let text4Plane = new THREE.Mesh(text4Geometry, text4Material);
  // text4Plane.name = "text4Plane";

  // //blog text作成

  // var texture5 = textureLoader.load("./image/blog@2x.png");

  // let text5Geometry = new THREE.PlaneGeometry(
  //   241 / fontsize(),
  //   110 / fontsize()
  // );
  // let text5Material = new THREE.MeshBasicMaterial({
  //   map: texture5,
  //   opacity: 1,
  //   transparent: true,
  //   blending: THREE.MultiplyBlending
  // });
  // let text5Plane = new THREE.Mesh(text5Geometry, text5Material);
  // text5Plane.name = "text5Plane";

  // //company text作成

  // var texture6 = textureLoader.load("./image/company@2x.png");

  // let text6Geometry = new THREE.PlaneGeometry(
  //   421 / fontsize(),
  //   110 / fontsize()
  // );
  // let text6Material = new THREE.MeshBasicMaterial({
  //   map: texture6,
  //   opacity: 1,
  //   transparent: true,
  //   blending: THREE.MultiplyBlending
  // });
  // let text6Plane = new THREE.Mesh(text6Geometry, text6Material);
  // text6Plane.name = "text6Plane";

  // //contact text作成

  // var texture7 = textureLoader.load("./image/contact@2x.png");

  // let text7Geometry = new THREE.PlaneGeometry(
  //   421 / fontsize(),
  //   110 / fontsize()
  // );
  // let text7Material = new THREE.MeshBasicMaterial({
  //   map: texture7,
  //   opacity: 1,
  //   transparent: true,
  //   blending: THREE.MultiplyBlending
  // });
  // let text7Plane = new THREE.Mesh(text7Geometry, text7Material);
  // text7Plane.name = "text7Plane";

  //● scneに追加
  for (var r in circ) {
    circ[r].scale.x = c[r];
    circ[r].scale.y = c[r];
    circ[r].position.z = -10;
    scene.add(circ[r]);
  }
  //■ sceneに追加
  for (var i in rect) {
    rect[i].scale.x = c[i];
    rect[i].scale.y = c[i];
    scene.add(rect[i]);
  }
  //sub● sceneに追加
  for (var s in subcircle) {
    scene.add(subcircle[s]);
  }
  //teet sceneに追加
  // scene.add(text0Plane);
  // scene.add(text1Plane);
  // scene.add(text2Plane);
  // scene.add(text3Plane);
  // scene.add(text4Plane);
  // scene.add(text5Plane);
  // scene.add(text6Plane);
  // scene.add(text7Plane);

  // //text クリックアクション
  // //クリックする対象を追加
  // var rayReceiveObjects0 = [text0Plane];
  // var rayReceiveObjects1 = [text1Plane];
  // var rayReceiveObjects2 = [text2Plane];
  // var rayReceiveObjects3 = [text3Plane];
  // var rayReceiveObjects4 = [text4Plane];
  // var rayReceiveObjects5 = [text5Plane];
  // var rayReceiveObjects6 = [text6Plane];
  // var rayReceiveObjects7 = [text7Plane];
  // //Raycaster追加
  // var raycaster = new THREE.Raycaster();
  // //マウス位置を取得
  // var mouse = new THREE.Vector2();
  // //クリックした時に何かに当たったか判定
  // window.addEventListener("mousedown", onDocumentMouseDown, false);
  // function onDocumentMouseDown(event) {
  //   event.preventDefault();
  //   mouse.x = (event.clientX / width) * 2 - 1;
  //   mouse.y = -(event.clientY / height) * 2 + 1;
  //   //マウス位置からまっすぐに伸びる光線ベクトルを生成
  //   raycaster.setFromCamera(mouse, camera);

  //   //光線とぶつかったオブジェクトを取得
  //   var intersects0 = raycaster.intersectObjects(rayReceiveObjects0);
  //   var intersects1 = raycaster.intersectObjects(rayReceiveObjects1);
  //   var intersects2 = raycaster.intersectObjects(rayReceiveObjects2);
  //   var intersects3 = raycaster.intersectObjects(rayReceiveObjects3);
  //   var intersects4 = raycaster.intersectObjects(rayReceiveObjects4);
  //   var intersects5 = raycaster.intersectObjects(rayReceiveObjects5);
  //   var intersects6 = raycaster.intersectObjects(rayReceiveObjects6);
  //   var intersects7 = raycaster.intersectObjects(rayReceiveObjects7);

  //   //各id名取得
  //   var elembotton = document.getElementById("botton");
  //   var elemmvimg = document.getElementById("mv-section");
  //   var elemskate = document.getElementById("skate");
  //   var elemmusic = document.getElementById("music");
  //   var elemphoto = document.getElementById("photo");
  //   var elemmember = document.getElementById("member");
  //   var elemblog = document.getElementById("blog");
  //   var elemcompany = document.getElementById("company");
  //   var elemcontact = document.getElementById("contact");
  //   var elemname = document.getElementById("logo-nav");

  //   //現在表示しているものを消してスクロール始める時間
  //   var timeout = 500;

  //   // 交わるオブジェクトが１個以上の場合　//ぶつかったオブジェクトになんかする
  //   if (intersects0.length > 0) {
  //     var elem = document.getElementById("top");
  //     //getBoundingClientRect().top = ターゲット要素の位置をブラウザの表示領域の左上からの相対位置を取得
  //     var pos = elem.getBoundingClientRect().top;
  //     //pageYOffset = ブラウザの上端を基準とした縦方向のページのスクロール量を取得する。
  //     var offsetY = window.pageYOffset;
  //     //getBoundingClientRectで取得した値にこの値を足した値がターゲット要素の絶対位置になる。
  //     var target = pos + offsetY;
  //     elemskate.classList.remove("opacity");
  //     elemmusic.classList.remove("opacity");
  //     elemphoto.classList.remove("opacity");
  //     elemmember.classList.remove("opacity");
  //     elemblog.classList.remove("opacity");
  //     elemcompany.classList.remove("opacity");
  //     elemcontact.classList.remove("opacity");
  //     setTimeout(() => {
  //       window.scrollTo({ left: target });
  //       elembotton.classList.remove("opacity0");
  //       elemmvimg.classList.remove("opacity0");
  //     }, timeout);
  //   }
  //   //topボタンクリック
  //   //現在位置取得
  //   //全てのコンテンツを透明に
  //   //timeout 秒後 スクロールして
  //   //top を表示
  //   if (intersects1.length > 0) {
  //     var pos = elemskate.getBoundingClientRect().left;
  //     var offsetY = window.pageXOffset;
  //     var target = pos + offsetY;
  //     elembotton.classList.add("opacity0");
  //     elemmvimg.classList.add("opacity0");
  //     elemmusic.classList.remove("opacity");
  //     setTimeout(() => {
  //       window.scrollTo({ left: target });
  //       elemskate.classList.add("opacity");
  //     }, timeout);
  //   }
  //   if (intersects2.length > 0) {
  //     var pos = elemmusic.getBoundingClientRect().left;
  //     var offsetY = window.pageXOffset;
  //     var target = pos + offsetY;
  //     elembotton.classList.add("opacity0");
  //     elemmvimg.classList.add("opacity0");
  //     elemskate.classList.remove("opacity");
  //     elemphoto.classList.remove("opacity");
  //     setTimeout(() => {
  //       window.scrollTo({ left: target });
  //       elemmusic.classList.add("opacity");
  //     }, timeout);
  //   }
  //   if (intersects3.length > 0) {
  //     var pos = elemphoto.getBoundingClientRect().left;
  //     var offsetY = window.pageXOffset;
  //     var target = pos + offsetY;
  //     elembotton.classList.add("opacity0");
  //     elemmvimg.classList.add("opacity0");
  //     elemmusic.classList.remove("opacity");
  //     elemmember.classList.remove("opacity");
  //     setTimeout(() => {
  //       window.scrollTo({ left: target });
  //       elemphoto.classList.add("opacity");
  //     }, timeout);
  //   }
  //   if (intersects4.length > 0) {
  //     var pos = elemmember.getBoundingClientRect().left;
  //     var offsetY = window.pageXOffset;
  //     var target = pos + offsetY;
  //     elembotton.classList.add("opacity0");
  //     elemmvimg.classList.add("opacity0");
  //     elemphoto.classList.remove("opacity");
  //     elemblog.classList.remove("opacity");
  //     setTimeout(() => {
  //       window.scrollTo({ left: target });
  //       elemmember.classList.add("opacity");
  //     }, timeout);
  //   }
  //   if (intersects5.length > 0) {
  //     var pos = elemblog.getBoundingClientRect().left;
  //     var offsetY = window.pageXOffset;
  //     var target = pos + offsetY;
  //     elembotton.classList.add("opacity0");
  //     elemmvimg.classList.add("opacity0");
  //     elemmember.classList.remove("opacity");
  //     elemcompany.classList.remove("opacity");
  //     setTimeout(() => {
  //       window.scrollTo({ left: target });
  //       elemblog.classList.add("opacity");
  //     }, timeout);
  //   }
  //   if (intersects6.length > 0) {
  //     var pos = elemcompany.getBoundingClientRect().left;
  //     var offsetY = window.pageXOffset;
  //     var target = pos + offsetY;
  //     elembotton.classList.add("opacity0");
  //     elemmvimg.classList.add("opacity0");
  //     elemblog.classList.remove("opacity");
  //     elemcontact.classList.remove("opacity");
  //     setTimeout(() => {
  //       window.scrollTo({ left: target });
  //       elemcompany.classList.add("opacity");
  //     }, timeout);
  //   }
  //   if (intersects7.length > 0) {
  //     var pos = elemcontact.getBoundingClientRect().left;
  //     var offsetY = window.pageXOffset;
  //     var target = pos + offsetY;
  //     elemcompany.classList.remove("opacity");
  //     elembotton.classList.add("opacity0");
  //     elemmvimg.classList.add("opacity0");
  //     setTimeout(() => {
  //       window.scrollTo({ left: target });
  //       elemcontact.classList.add("opacity");
  //     }, timeout);
  //   }
  // }

  //render
  render();

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    //● render
    for (var r in circ) {
      a[r] += ax[r];
      b[r] += by[r];

      if (
        a[r] > width / 2 - circle_radius ||
        a[r] < -width / 2 + circle_radius
      ) {
        ax[r] = -ax[r];
        a[r] += ax[r];
      }
      if (
        b[r] > height / 2 - circle_radius ||
        b[r] < -height / 2 + circle_radius
      ) {
        by[r] = -by[r];
        b[r] += by[r];
      }
      circ[r].position.x = a[r];
      circ[r].position.y = b[r];
      //円をどんどん大きくする
      //   circ[r].scale.x += 0.01;
      //   circ[r].scale.y += 0.01;
    }
    //■ render
    for (var i in rect) {
      x[i] += dx[i];
      y[i] += dy[i];

      if (
        x[i] > width / 2 - block_width / 2 ||
        x[i] < -width / 2 + block_width / 2
      ) {
        dx[i] = -dx[i];
        x[i] += dx[i];
      }
      if (
        y[i] > height / 2 - block_width / 2 ||
        y[i] < -height / 2 + block_width / 2
      ) {
        dy[i] = -dy[i];
        y[i] += dy[i];
      }
      rect[i].position.x = x[i];
      rect[i].position.y = y[i];

      // rect[i].rotation.x += 0.01;
      rect[i].rotation.z += rotateZ[i];
      // rect[i].rotation.y += 0.02;
    }

    // //text render
    // if (width >= 767) {
    //   for (var t in text_num) {
    //     textxpc[t] += textdx[t];
    //     textypc[t] += textdy[t];

    //     if (
    //       textxpc[t] > width / textpoositionmaxw() ||
    //       textxpc[t] < -width / textpoositionminw()
    //     ) {
    //       textdx[t] = -textdx[t];
    //       textxpc[t] += textdx[t];
    //     }
    //     if (
    //       textypc[t] > height / textpoositionminh() ||
    //       textypc[t] < -height / textpoositionmaxh()
    //     ) {
    //       textdy[t] = -textdy[t];
    //       textypc[t] += textdy[t];
    //     }
    //     text0Plane.position.x = textxpc[0];
    //     text0Plane.position.y = textypc[0];

    //     text1Plane.position.x = textxpc[1];
    //     text1Plane.position.y = textypc[1];

    //     text2Plane.position.x = textxpc[2];
    //     text2Plane.position.y = textypc[2];

    //     text3Plane.position.x = textxpc[3];
    //     text3Plane.position.y = textypc[3];

    //     text4Plane.position.x = textxpc[4];
    //     text4Plane.position.y = textypc[4];

    //     text5Plane.position.x = textxpc[5];
    //     text5Plane.position.y = textypc[5];

    //     text6Plane.position.x = textxpc[6];
    //     text6Plane.position.y = textypc[6];

    //     text7Plane.position.x = textxpc[7];
    //     text7Plane.position.y = textypc[7];
    //   }
    // } else {
    //   for (var t in text_num) {
    //     textxpho[t] += textdx[t];
    //     textypho[t] += textdy[t];

    //     if (
    //       textxpho[t] > width / textpoositionmaxw() ||
    //       textxpho[t] < -width / textpoositionminw()
    //     ) {
    //       textdx[t] = -textdx[t];
    //       textxpho[t] += textdx[t];
    //     }
    //     if (
    //       textypho[t] > height / textpoositionminh() ||
    //       textypho[t] < -height / textpoositionmaxh()
    //     ) {
    //       textdy[t] = -textdy[t];
    //       textypho[t] += textdy[t];
    //     }
    //     text0Plane.position.x = textxpho[0];
    //     text0Plane.position.y = textypho[0];

    //     text1Plane.position.x = textxpho[1];
    //     text1Plane.position.y = textypho[1];

    //     text2Plane.position.x = textxpho[2];
    //     text2Plane.position.y = textypho[2];

    //     text3Plane.position.x = textxpho[3];
    //     text3Plane.position.y = textypho[3];

    //     text4Plane.position.x = textxpho[4];
    //     text4Plane.position.y = textypho[4];

    //     text5Plane.position.x = textxpho[5];
    //     text5Plane.position.y = textypho[5];

    //     text6Plane.position.x = textxpho[6];
    //     text6Plane.position.y = textypho[6];

    //     text7Plane.position.x = textxpho[7];
    //     text7Plane.position.y = textypho[7];
    //   }
    // }
    //sub● render
    for (var s in subcircle) {
      subcircle_x[s] += ax[s];
      subcircle_y[s] += by[s];

      if (
        subcircle_x[s] > width / 2 - circle_radius ||
        subcircle_x[s] < -width / 2 + circle_radius
      ) {
        ax[s] = -ax[s];
        subcircle_x[s] += ax[s];
      }
      if (
        subcircle_y[s] > height / 2 - circle_radius ||
        subcircle_y[s] < -height / 2 + circle_radius
      ) {
        by[s] = -by[s];
        subcircle_y[s] += by[s];
      }
      subcircle[s].position.x = subcircle_x[s];
      subcircle[s].position.y = subcircle_y[s];
    }
    blackPlane.rotation.z += 0.001;
  }
}
//resize アクション
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

//resize
window.addEventListener("resize", onResize, false);
