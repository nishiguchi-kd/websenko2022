//ローディング
$(window).on('load',function(){
  $("#splash").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
  $("#splash_logo").delay(1200).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
});

// ハンバーガーメニュー
"use strict";
$(function () {
  const hamburger = $(".js-nav");
  const nav = $(".nav");

  hamburger.click(function () {
    $(this).find(".hamburger_bar").toggleClass("is_active");
    nav.toggleClass("is_active");
  });
});

$('.nav_anker').on('click', function () {
  $('.hamburger_bar').removeClass('is_active');
});

/* ポートフォリオspで隠す */
var moreNum = 3;
$('.portfolio_list li:nth-child(n + ' + (moreNum + 1) + ')').addClass('is-hidden');
$('.more').on('click', function () {
  $('.portfolio_list li.is-hidden').slice(0, moreNum).removeClass('is-hidden');
  if ($('.portfolio_list li.is-hidden').length == 0) {
    $('.more').fadeOut();
  }
});


// モーダル
$(function () {
  $('.modal-open').each(function () {
    $(this).on('click', function () {
      var target = $(this).data('target');
      var modal = document.getElementById(target);
      $(modal).fadeIn();
      return false;
    });
  });

  $( function(){
    // モーダル領域をクリックでフェードアウトさせる
    $( '.modal' ).click( function(){
      $( this ).fadeOut();
    } );
    // がしかし、画像をクリックでキャンセルさせる
    $( '.modal_wrap' ).on( 'click', function( e ){
      e.stopPropagation();
    } );
  } );

  $('.modal-close').on('click', function () {
    $('.modal').fadeOut();
    return false;
  });
  
});


//変数の設定
var $body = $('body');

//スクロール量を保存
var scrollTop;

//スクロールを固定
function bodyFixedOn() {
  scrollTop = $(window).scrollTop();
  
  $body.css({
    position: 'fixed',
    top: -scrollTop ,
    // top: '0' ,
    right: '0' ,
    left: '0' ,
    bottom: '0' 
  });
}

//スクロールの固定を解除
function bodyFixedOff() {
  $body.css({
    position: '',
    top: '' 
  });
  
  $(window).scrollTop(scrollTop);
}

//モーダルのトリガーをクリックしたとき
$('.modal-open').on('click', function() {
  bodyFixedOn();
});

//モーダルの閉じるボタンをクリックしたとき
$('.modal-close').on('click', function() {
  bodyFixedOff();
});

//モーダルの閉じるボタンをクリックしたとき
$('.modal').on('click', function() {
  bodyFixedOff();
});




$(function () {

  function scrollShow() {

    var position = 400; // 表示させたいスクロール位置(上から何pxかで)
    var $page_top_btn = $('.pagetop'); // 表示させたい要素

    // スクロールイベント
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > position) {
        $page_top_btn.fadeIn();
      } else {
        $page_top_btn.fadeOut();
      }
    });

  }

  scrollShow();


  function smoothScroll() {
    $('.js-scroll').on('click', function () {
      var speed = 800; // スクロールスピード
      var href = $(this).attr("href");
      var target = $(href === "#" || href === "" ? 'html' : href);

      var position = target.offset().top;

      $("html, body").animate({ scrollTop: position }, speed, "swing");

      return false;
    });
  }

  smoothScroll();


  function chengecolor() {
    $(".ctxt").children().addBack().contents().each(function () {
      if (this.nodeType == 3) {
        $(this).replaceWith($(this).text().replace(/(\S)/g, "<span>$&</span>"));
      }
    });
  }

  chengecolor()

  function fadeIn() {
    $(".js-fadeUp").on("inview", function () {
      $(this).addClass("is-inview");
    });
  }

  fadeIn()

  function fadeLeft() {
    $(".js-fadeLeft").on("inview", function () {
      $(this).addClass("is-inview");
    });
  }

  fadeLeft()


  function fadeRight() {
    $(".js-fadeRight").on("inview", function () {
      $(this).addClass("is-inview");
    });
  }

  fadeRight()


  $('.Toggle').click(function () {
    $(this).toggleClass('active');
    $('.menu').toggleClass('open');
  });

  $('.txt a').on('click', function () {
    $('.menu').removeClass('open');
    $('.Toggle').removeClass('active');
  });




  var cursor = document.getElementById('cursor');

  // カーソル用のdivタグをマウスに追従させる
  document.addEventListener('mousemove', function (e) {
    cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
  });

  // リンクにホバーした時にクラス追加、離れたらクラス削除
  var link = document.querySelectorAll('a');
  for (var i = 0; i < link.length; i++) {
    link[i].addEventListener('mouseover', function (e) {
      cursor.classList.add('cursor--hover');
    });
    link[i].addEventListener('mouseout', function (e) {
      cursor.classList.remove('cursor--hover');
    });
  }

  var link = document.querySelectorAll('.accordion_header');
  for (var i = 0; i < link.length; i++) {
    link[i].addEventListener('mouseover', function (e) {
      cursor.classList.add('cursor--hover');
    });
    link[i].addEventListener('mouseout', function (e) {
      cursor.classList.remove('cursor--hover');
    });
  }

});

/*
スクロール出現
*/
// スクロール出現用関数（.offs ⇄ .ons）
function scr_ani(scr,offs_max){
  var
  window_h = $(window).height(),
      offs_length = $('.offs').length,
      ons_length = $('.ons').length,
      wh_pos = 30;// 対象コンテンツの上端が画面下からどれくらい入ったら反応するか。画面高さに対する割合（%）
  if(offs_length){
  var first_item = offs_max - offs_length;
  for (var i=0; i<offs_length; i++) {
      var data_scr = first_item + i;
      var offs = $('.offs[data-scr="' + data_scr + '"]');
      var target = offs.offset().top;
      var trigger = target - (window_h + scr - window_h * wh_pos / 100);
      if(trigger < 0){
      offs.removeClass('offs').addClass('ons');
      }else{
      break;
      }
  }
  }
  if(ons_length){
  var last_item = ons_length - 1;
  for (var i=0; i<ons_length; i++) {
      var data_scr = last_item - i;
      var ons = $('.ons[data-scr="' + data_scr + '"]');
      var target = ons.offset().top;
      var trigger = target - (window_h + scr);
      if(trigger > 0){
      ons.removeClass('ons').addClass('offs');
      }else{
      break;
      }
  }
  }
};

$(function(){

  // スクロール出現アイテムにナンバリング
  var offs_max = $('.offs').length;
  for (var i=0; i<offs_max; i++) {
  $('.offs').eq(i).attr('data-scr',i);
  }
  // ディレイを設定
  var fadeIn_item = $('.fadeIn_item');
  for (var i = 0; i < fadeIn_item.length; i++) {
  let delay = fadeIn_item.eq(i).data('delay');
  if(delay){
      fadeIn_item.eq(i).css('transition-delay', delay + 's');
  }
  }

  // （リロード時など）ロード時にすでにスクロールされている場合に対応
  var scr = $(window).scrollTop();
  scr_ani(scr,offs_max);  

  /************
  スクロール時
  ************/
  $(window).on('scroll', function(){
  var scr = $(window).scrollTop();
  scr_ani(scr,offs_max);
  });// end scroll

});

let targets = document.querySelectorAll('.ber'); //アニメーションさせたい要素
//スクロールイベント
window.addEventListener('scroll', function () {
var scroll = window.scrollY; //スクロール量を取得
var windowHeight = window.innerHeight; //画面の高さを取得
for (let target of targets) { //ターゲット要素がある分、アニメーション用のクラスをつける処理を繰り返す
  var targetPos = target.getBoundingClientRect().top + scroll; //ターゲット要素の位置を取得
  if (scroll > targetPos - windowHeight) { //スクロール量 > ターゲット要素の位置
    target.classList.add('is-animated'); //is-animatedクラスを加える
  }
}
});

// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime(){

$('.ber').each(function(){ //berというクラス名が
  var elemPos = $(this).offset().top-2;//要素より、50px上の
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).height();
  if (scroll >= elemPos - windowHeight){
  $(this).addClass('start_animation_scroll');// 画面内に入ったらstart_animation_scrollというクラス名を追記
  }else{
  $(this).removeClass('start_animation_scroll');// 画面外に出たらstart_animation_scrollというクラス名を外す
  }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function (){
  fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function(){
  fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述





//コメントが流れる
$(function () {
  $('.comment_list').each(function () {
    var sliderWidth = $(this).width();

    $(this).clone(true).insertBefore(this);
    $(this).clone(true).insertAfter(this);

    $('.line').css('width', sliderWidth * 3); // 親要素の横幅を子要素の３倍にする
  });
});

// .s_04 .accordion_one
$(function () {
  //.accordion_oneの中の.accordion_headerがクリックされたら
  $('.s_04 .accordion_one .accordion_header').click(function () {
    //クリックされた.accordion_oneの中の.accordion_headerに隣接する.accordion_innerが開いたり閉じたりする。
    $(this).next('.accordion_inner').slideToggle();
    $(this).toggleClass("open");
    //クリックされた.accordion_oneの中の.accordion_header以外の.accordion_oneの中の.accordion_headerに隣接する.accordion_oneの中の.accordion_innerを閉じる
    $('.s_04 .accordion_one .accordion_header').not($(this)).next('.accordion_one .accordion_inner').slideUp();
    $('.s_04 .accordion_one .accordion_header').not($(this)).removeClass("open");
    $('.s_04 .accordion_one .accordion_header.stay').not($(this)).toggleClass("open");
  });
});



// pagetop
$(function () {
  const pageTop = $("#page-top");
  pageTop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  });
  pageTop.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });
  
});


// カーソル用のdivタグを取得してcursorに格納
var cursor = document.getElementById('cursor'); 

// カーソル用のdivタグをマウスに追従させる
document.addEventListener('mousemove', function (e) {
    cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});

// リンクにホバーした時にクラス追加、離れたらクラス削除
var link = document.querySelectorAll('a');
for (var i = 0; i < link.length; i++) {
    link[i].addEventListener('mouseover', function (e) {
        cursor.classList.add('cursor--hover');
    });
    link[i].addEventListener('mouseout', function (e) {
        cursor.classList.remove('cursor--hover');   
    });
  }

    // リンクにホバーした時にクラス追加、離れたらクラス削除
var link = document.querySelectorAll('.hamburger');
for (var i = 0; i < link.length; i++) {
    link[i].addEventListener('mouseover', function (e) {
        cursor.classList.add('cursor--hover');
    });
    link[i].addEventListener('mouseout', function (e) {
        cursor.classList.remove('cursor--hover');   
    });
}