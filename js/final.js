var camera;
var scene;
var renderer;

window.onload = init;

window.addEventListener("resize", onResize, false);

// function OnLinkClick() {
//   init();
// }

function init() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor(new THREE.Color(0xe3e3e3));
  renderer.domElement.style.zIndex = 0;
  renderer.setSize(width, height);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = height * 1.2;

  var trackballControls = new THREE.TrackballControls(
    camera,
    renderer.domElement
  );

  trackballControls.rotateSpeed = 1.0;
  trackballControls.zoomSpeed = 1.0;
  trackballControls.panSpeed = 1.0;
  trackballControls.staticMoving = true;

  // スポットライト光源を作成
  // new THREE.SpotLight(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率)
  // const light = new THREE.SpotLight(0xff0000, 4, 1000, Math.PI, 1, 0.5);
  // scene.add(light);

  document.getElementById("WebGL-output").appendChild(renderer.domElement);

  const block_width = 8;
  const circle_radius = 8;
  const circle_segment = 100;
  const circle_num = circle_nums();
  const block_num = block_nums();
  const min_speed = -0.4;
  const max_speed = 0.4;
  //丸,四角の倍率
  const min_scale = 80;
  const max_scale = 150;
  //textspeed
  const max_text_speed = 100;
  const min_text_speed = -100;
  const rotateZ_max_speed = 0.05;
  const rotateZ_min_speed = -0.05;
  const circlesub_num = 2;

  function circle_nums() {
    if (window.innerWidth >= 767) {
      return 50;
    } else {
      return 10;
    }
  }
  function block_nums() {
    if (window.innerWidth >= 767) {
      return 50;
    } else {
      return 10;
    }
  }
  function textpoositionmaxw() {
    if (window.innerWidth >= 767) {
      return 300;
    } else {
      return 3;
    }
  }
  function textpoositionminw() {
    if (window.innerWidth >= 767) {
      return 2.8;
    } else {
      return 3;
    }
  }
  function textpoositionmaxh() {
    if (window.innerWidth >= 767) {
      return 3;
    } else {
      return 300;
    }
  }
  function textpoositionminh() {
    if (window.innerWidth >= 767) {
      return 3;
    } else {
      return 2.4;
    }
  }

  // 円を作成
  // new THREE.CircleGeometry(radius(半径), segments(thetaLengthで設定した角度をこの数で分割します。数を大きくするほど、円に近づいていきます。), thetaStart(開始角度で、単位はラジアンです。), thetaLength(中心角で、単位はラジアンです。))
  const circleGeometry = new THREE.SphereGeometry(
    circle_radius,
    circle_segment,
    circle_segment
  );
  var colorcircle = 0x1f1e63;
  const circleMaterial = new THREE.MeshBasicMaterial({ color: colorcircle });

  let circ = [];

  for (var r = 0; r < circle_num; r++) {
    circ.push(new THREE.Mesh(circleGeometry, circleMaterial));
  }

  //   平面の長方形を作成
  const planegeometry = new THREE.PlaneGeometry(block_width, block_width);
  var colorplane = 0xa2a2ad;
  var planematerial = new THREE.MeshBasicMaterial({ color: colorplane });

  let rect = [];

  for (var i = 0; i < block_num; i++) {
    rect.push(new THREE.Mesh(planegeometry, planematerial));
  }
  //sub円を作成
  var colorsubcircle = 0xdb5a5a;
  const circlesubMaterial = new THREE.MeshBasicMaterial({
    color: colorsubcircle,
  });
  let subcircle = [];
  for (var r = 0; r < circlesub_num; r++) {
    subcircle.push(new THREE.Mesh(circleGeometry, circlesubMaterial));
  }

  //乱数を定義
  let a = []; //円x
  let b = []; //円y
  let c = []; //円z
  let ax = []; //円x speed
  let by = []; //円y speed
  let x = []; //長方形x
  let y = []; //長方形y
  let dx = []; //長方形x speed
  let dy = []; //長方形y speed
  let rotateZ = [];
  let textxpc = [
    (width / 2) * -0.5,
    (width / 2) * -0.5,
    (width / 2) * -0.5,
    (width / 2) * -0.5,
    (width / 2) * -0.5,
    (width / 2) * -0.5,
    (width / 2) * -0.5,
    (width / 2) * -0.5,
  ]; //文字x
  let textypc = [
    (height / 2) * 0.3,
    (height / 2) * 0.25,
    (height / 2) * 0.2,
    (height / 2) * 0.1,
    (height / 2) * 0,
    (height / 2) * -0.1,
    (height / 2) * -0.2,
    (height / 2) * -0.3,
  ]; //文字y
  let textxpho = [
    (width / 2) * 0.01,
    (width / 2) * 0.01,
    (width / 2) * 0.01,
    (width / 2) * 0.01,
    (width / 2) * 0.01,
    (width / 2) * 0.01,
    (width / 2) * 0.01,
    (width / 2) * 0.01,
  ]; //文.1
  let textypho = [
    (height / 2) * 0.8,
    (height / 2) * 0.7,
    (height / 2) * 0.6,
    (height / 2) * 0.5,
    (height / 2) * 0.4,
    (height / 2) * 0.3,
    (height / 2) * 0.2,
    (height / 2) * 0.1,
  ]; //文字y
  let textdx = []; //文字x speed
  let textdy = []; //文字y speed
  let subcircle_x = [];
  let subcircle_y = [];

  let min_pos_x = -(Number(width) / 2);
  let max_pos_x = Number(width) / 2;
  let min_pos_y = -(Number(height) / 2);
  let max_pos_y = Number(height) / 2;
  let min_sca = Number(min_scale);
  let max_sca = Number(max_scale);
  let max_pos_text_x = Number(width) / 3;
  let min_pos_text_x = -(Number(width) / 3);
  let max_pos_text_y = Number(height) / 3;
  let min_pos_text_y = -(Number(height) / 3);

  for (var r = 0; r < circle_num; r++) {
    //   円の乱数作成
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

  for (var i = 0; i < block_num; i++) {
    //   長方形の乱数作成
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
  for (var t = 0; t <= 7; t++) {
    textdx.push(
      (Math.floor(Math.random() * (max_text_speed - min_text_speed)) +
        min_text_speed) /
        400
    );
    textdy.push(
      (Math.floor(Math.random() * (max_text_speed - min_text_speed)) +
        min_text_speed) /
        400
    );
  }
  for (var s = 0; s < circlesub_num; s++) {
    subcircle_x.push(
      Math.floor(Math.random() * (max_pos_x - min_pos_x + 1)) + min_pos_x
    );
    subcircle_y.push(
      Math.floor(Math.random() * (max_pos_y - min_pos_y + 1)) + min_pos_y
    );
  }

  let text_num = [0, 1, 2, 3, 4, 5, 6, 7];
  //textureloader
  var textureLoader = new THREE.TextureLoader();
  // //pon//////////////////////////////////////
  //top////////////////////////////////////////////////////////
  var texture0 = textureLoader.load("./image/top@2x.png");

  let text0materiallist = {
    map: texture0,
    opacity: 1,
    transparent: true,
    blending: THREE.MultiplyBlending,
  };
  let text0Geometry = new THREE.PlaneGeometry(
    (height * (181 / 1080)) / 2,
    (height * (110 / 1080)) / 2
  );
  let text0Material = new THREE.MeshBasicMaterial(text0materiallist);
  let text0Plane = new THREE.Mesh(text0Geometry, text0Material);
  text0Plane.name = "text0Plane";

  //skate////////////////////////////////////////////////////////
  var texture1 = textureLoader.load("./image/skate@2x.png");

  let text1materiallist = {
    map: texture1,
    opacity: 1,
    transparent: true,
    blending: THREE.MultiplyBlending,
  };

  let text1Geometry = new THREE.PlaneGeometry(
    (height * (310 / 1080)) / 2,
    (height * (110 / 1080)) / 2
  );
  let text1Material = new THREE.MeshBasicMaterial(text1materiallist);
  let text1Plane = new THREE.Mesh(text1Geometry, text1Material);
  text1Plane.name = "text1Plane";

  //music////////////////////////////////////////////////////////

  var texture2 = textureLoader.load("./image/music@2x.png");

  let text2Geometry = new THREE.PlaneGeometry(
    (height * (301 / 1080)) / 2,
    (height * (110 / 1080)) / 2
  );
  let text2Material = new THREE.MeshBasicMaterial({
    map: texture2,
    opacity: 1,
    transparent: true,
    blending: THREE.MultiplyBlending,
  });
  let text2Plane = new THREE.Mesh(text2Geometry, text2Material);
  text2Plane.name = "text2Plane";

  //photo////////////////////////////////////////////////////////

  var texture3 = textureLoader.load("./image/photo@2x.png");

  let text3Geometry = new THREE.PlaneGeometry(
    (height * (301 / 1080)) / 2,
    (height * (110 / 1080)) / 2
  );
  let text3Material = new THREE.MeshBasicMaterial({
    map: texture3,
    opacity: 1,
    transparent: true,
    blending: THREE.MultiplyBlending,
  });
  let text3Plane = new THREE.Mesh(text3Geometry, text3Material);
  text3Plane.name = "text3Plane";

  //member////////////////////////////////////////////////////////

  var texture4 = textureLoader.load("./image/member@2x.png");

  let text4Geometry = new THREE.PlaneGeometry(
    (height * (361 / 1080)) / 2,
    (height * (110 / 1080)) / 2
  );
  let text4Material = new THREE.MeshBasicMaterial({
    map: texture4,
    opacity: 1,
    transparent: true,
    blending: THREE.MultiplyBlending,
  });
  let text4Plane = new THREE.Mesh(text4Geometry, text4Material);
  text4Plane.name = "text4Plane";

  //blog////////////////////////////////////////////////////////

  var texture5 = textureLoader.load("./image/blog@2x.png");

  let text5Geometry = new THREE.PlaneGeometry(
    (height * (241 / 1080)) / 2,
    (height * (110 / 1080)) / 2
  );
  let text5Material = new THREE.MeshBasicMaterial({
    map: texture5,
    opacity: 1,
    transparent: true,
    blending: THREE.MultiplyBlending,
  });
  let text5Plane = new THREE.Mesh(text5Geometry, text5Material);
  text5Plane.name = "text5Plane";

  //company////////////////////////////////////////////////////////

  var texture6 = textureLoader.load("./image/company@2x.png");

  let text6Geometry = new THREE.PlaneGeometry(
    (height * (421 / 1080)) / 2,
    (height * (110 / 1080)) / 2
  );
  let text6Material = new THREE.MeshBasicMaterial({
    map: texture6,
    opacity: 1,
    transparent: true,
    blending: THREE.MultiplyBlending,
  });
  let text6Plane = new THREE.Mesh(text6Geometry, text6Material);
  text6Plane.name = "text6Plane";

  //contact////////////////////////////////////////////////////////

  var texture7 = textureLoader.load("./image/contact@2x.png");

  let text7Geometry = new THREE.PlaneGeometry(
    (height * (421 / 1080)) / 2,
    (height * (110 / 1080)) / 2
  );
  let text7Material = new THREE.MeshBasicMaterial({
    map: texture7,
    opacity: 1,
    transparent: true,
    blending: THREE.MultiplyBlending,
  });
  let text7Plane = new THREE.Mesh(text7Geometry, text7Material);
  text7Plane.name = "text7Plane";

  for (var r in circ) {
    circ[r].scale.x = c[r];
    circ[r].scale.y = c[r];
    circ[r].position.z = -10;
    scene.add(circ[r]);
  }

  for (var i in rect) {
    rect[i].scale.x = c[i];
    rect[i].scale.y = c[i];
    scene.add(rect[i]);
  }

  scene.add(text0Plane);
  scene.add(text1Plane);
  scene.add(text2Plane);
  scene.add(text3Plane);
  scene.add(text4Plane);
  scene.add(text5Plane);
  scene.add(text6Plane);
  scene.add(text7Plane);

  for (var i in subcircle) {
    scene.add(subcircle[i]);
  }

  var rayReceiveObjects0 = [text0Plane];
  var rayReceiveObjects1 = [text1Plane];
  var rayReceiveObjects2 = [text2Plane];
  var rayReceiveObjects3 = [text3Plane];
  var rayReceiveObjects4 = [text4Plane];
  var rayReceiveObjects5 = [text5Plane];
  var rayReceiveObjects6 = [text6Plane];
  var rayReceiveObjects7 = [text7Plane];

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  window.addEventListener("mousedown", onDocumentMouseDown, false);
  function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.x = (event.clientX / width) * 2 - 1;
    mouse.y = -(event.clientY / height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects0 = raycaster.intersectObjects(rayReceiveObjects0);
    var intersects1 = raycaster.intersectObjects(rayReceiveObjects1);
    var intersects2 = raycaster.intersectObjects(rayReceiveObjects2);
    var intersects3 = raycaster.intersectObjects(rayReceiveObjects3);
    var intersects4 = raycaster.intersectObjects(rayReceiveObjects4);
    var intersects5 = raycaster.intersectObjects(rayReceiveObjects5);
    var intersects6 = raycaster.intersectObjects(rayReceiveObjects6);
    var intersects7 = raycaster.intersectObjects(rayReceiveObjects7);

    var elembotton = document.getElementById("botton");
    var elemmvimg = document.getElementById("mv-img");
    var elemskate = document.getElementById("skate");
    var elemmusic = document.getElementById("music");
    var elemphoto = document.getElementById("photo");
    var elemmember = document.getElementById("member");
    var elemblog = document.getElementById("blog");
    var elemcompany = document.getElementById("company");
    var elemcontact = document.getElementById("contact");

    var timeout = 500;
    // 交わるオブジェクトが１個以上の場合
    if (intersects0.length > 0) {
      var elem = document.getElementById("top");
      var pos = elem.getBoundingClientRect().top;
      var offsetY = window.pageYOffset;
      var target = pos + offsetY;
      elemskate.classList.remove("opacity");
      elemmusic.classList.remove("opacity");
      elemphoto.classList.remove("opacity");
      elemmember.classList.remove("opacity");
      elemblog.classList.remove("opacity");
      elemcompany.classList.remove("opacity");
      elemcontact.classList.remove("opacity");
      setTimeout(() => {
        window.scrollTo({ top: target });
        elembotton.classList.remove("opacity0");
        elemmvimg.classList.remove("opacity0");
      }, timeout);
    }
    //top をクリックしたら
    //下ボタンを透明にして
    //所定の位置に移動
    //contact を透明に
    //skate を透明に
    //textを全て非表示に
    if (intersects1.length > 0) {
      var pos = elemskate.getBoundingClientRect().top;
      var offsetY = window.pageYOffset;
      var target = pos + offsetY;
      elembotton.classList.add("opacity0");
      elemmvimg.classList.add("opacity0");
      elemmusic.classList.remove("opacity");
      setTimeout(() => {
        window.scrollTo({ top: target });
        elemskate.classList.add("opacity");
      }, timeout);
    }
    //skateをクリックしたら
    //top のボタンを透明にして
    //skate の位置に移動
    //skate　を表示
    //music を透明に
    //tectを全て非表示に
    if (intersects2.length > 0) {
      var pos = elemmusic.getBoundingClientRect().top;
      var offsetY = window.pageYOffset;
      var target = pos + offsetY;
      elembotton.classList.add("opacity0");
      elemmvimg.classList.add("opacity0");
      elemskate.classList.remove("opacity");
      elemphoto.classList.remove("opacity");
      setTimeout(() => {
        window.scrollTo({ top: target });
        elemmusic.classList.add("opacity");
      }, timeout);
    }
    if (intersects3.length > 0) {
      var pos = elemphoto.getBoundingClientRect().top;
      var offsetY = window.pageYOffset;
      var target = pos + offsetY;
      elembotton.classList.add("opacity0");
      elemmvimg.classList.add("opacity0");
      elemmusic.classList.remove("opacity");
      elemmember.classList.remove("opacity");
      setTimeout(() => {
        window.scrollTo({ top: target });
        elemphoto.classList.add("opacity");
      }, timeout);
    }
    if (intersects4.length > 0) {
      var pos = elemmember.getBoundingClientRect().top;
      var offsetY = window.pageYOffset;
      var target = pos + offsetY;
      elembotton.classList.add("opacity0");
      elemmvimg.classList.add("opacity0");
      elemphoto.classList.remove("opacity");
      elemblog.classList.remove("opacity");
      setTimeout(() => {
        window.scrollTo({ top: target });
        elemmember.classList.add("opacity");
      }, timeout);
    }
    if (intersects5.length > 0) {
      var pos = elemblog.getBoundingClientRect().top;
      var offsetY = window.pageYOffset;
      var target = pos + offsetY;
      elembotton.classList.add("opacity0");
      elemmvimg.classList.add("opacity0");
      elemmember.classList.remove("opacity");
      elemcompany.classList.remove("opacity");
      setTimeout(() => {
        window.scrollTo({ top: target });
        elemblog.classList.add("opacity");
      }, timeout);
    }
    if (intersects6.length > 0) {
      var pos = elemcompany.getBoundingClientRect().top;
      var offsetY = window.pageYOffset;
      var target = pos + offsetY;
      elembotton.classList.add("opacity0");
      elemmvimg.classList.add("opacity0");
      elemblog.classList.remove("opacity");
      elemcontact.classList.remove("opacity");
      setTimeout(() => {
        window.scrollTo({ top: target });
        elemcompany.classList.add("opacity");
      }, timeout);
    }
    if (intersects7.length > 0) {
      var pos = elemcontact.getBoundingClientRect().top;
      var offsetY = window.pageYOffset;
      var target = pos + offsetY;
      elemcompany.classList.remove("opacity");
      elembotton.classList.add("opacity0");
      elemmvimg.classList.add("opacity0");
      setTimeout(() => {
        window.scrollTo({ top: target });
        elemcontact.classList.add("opacity");
      }, timeout);
    }
  }

  render();

  var clock = new THREE.Clock();
  var delta = clock.getDelta();

  function render() {
    trackballControls.update(delta);
    //円render
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
    //長方形render
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
    //文字render
    if (window.innerWidth >= 767) {
      for (var i in text_num) {
        textxpc[i] += textdx[i];
        textypc[i] += textdy[i];

        if (
          textxpc[i] > width / textpoositionmaxw() ||
          textxpc[i] < -width / textpoositionminw()
        ) {
          textdx[i] = -textdx[i];
          textxpc[i] += textdx[i];
        }
        if (
          textypc[i] > height / textpoositionminh() ||
          textypc[i] < -height / textpoositionmaxh()
        ) {
          textdy[i] = -textdy[i];
          textypc[i] += textdy[i];
        }
        text0Plane.position.x = textxpc[0];
        text0Plane.position.y = textypc[0];

        text1Plane.position.x = textxpc[1];
        text1Plane.position.y = textypc[1];

        text2Plane.position.x = textxpc[2];
        text2Plane.position.y = textypc[2];

        text3Plane.position.x = textxpc[3];
        text3Plane.position.y = textypc[3];

        text4Plane.position.x = textxpc[4];
        text4Plane.position.y = textypc[4];

        text5Plane.position.x = textxpc[5];
        text5Plane.position.y = textypc[5];

        text6Plane.position.x = textxpc[6];
        text6Plane.position.y = textypc[6];

        text7Plane.position.x = textxpc[7];
        text7Plane.position.y = textypc[7];
      }
    } else {
      for (var i in text_num) {
        textxpho[i] += textdx[i];
        textypho[i] += textdy[i];

        if (
          textxpho[i] > width / textpoositionmaxw() ||
          textxpho[i] < -width / textpoositionminw()
        ) {
          textdx[i] = -textdx[i];
          textxpho[i] += textdx[i];
        }
        if (
          textypho[i] > height / textpoositionminh() ||
          textypho[i] < -height / textpoositionmaxh()
        ) {
          textdy[i] = -textdy[i];
          textypho[i] += textdy[i];
        }
        text0Plane.position.x = textxpho[0];
        text0Plane.position.y = textypho[0];

        text1Plane.position.x = textxpho[1];
        text1Plane.position.y = textypho[1];

        text2Plane.position.x = textxpho[2];
        text2Plane.position.y = textypho[2];

        text3Plane.position.x = textxpho[3];
        text3Plane.position.y = textypho[3];

        text4Plane.position.x = textxpho[4];
        text4Plane.position.y = textypho[4];

        text5Plane.position.x = textxpho[5];
        text5Plane.position.y = textypho[5];

        text6Plane.position.x = textxpho[6];
        text6Plane.position.y = textypho[6];

        text7Plane.position.x = textxpho[7];
        text7Plane.position.y = textypho[7];
      }
    }

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

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
