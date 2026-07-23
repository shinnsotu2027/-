// YouTube IFrame Player API の読み込み
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let companyPlayer;
let departmentPlayer;

// API準備完了時に呼ばれる関数
function onYouTubeIframeAPIReady() {
  // 1. 会社説明動画プレイヤーの初期化
  companyPlayer = new YT.Player('company-video-player', {
    height: '360',
    width: '640',
    videoId: 'a5O5oZILdeM', // ※初期動画のIDを入れてください
    events: {
      'onStateChange': onCompanyVideoStateChange
    }
  });
}

// 会社説明動画の状態変化を監視
function onCompanyVideoStateChange(event) {
  // 動画が最後まで再生されたら（ENDED）
  if (event.data === YT.PlayerState.ENDED) {
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      nextSection.style.display = 'block';
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// 「事業部選択へ進む」ボタンをクリックした時
function showDepartments() {
  const deptSection = document.getElementById('department-section');
  if (deptSection) {
    deptSection.style.display = 'block';
    deptSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// カードをクリックした時に事業部動画を読み込んで再生する
function changeVideo(videoId) {
  const videoSection = document.getElementById('department-video-section');
  
  // セクションを表示
  if (videoSection) {
    videoSection.style.display = 'block';
    videoSection.scrollIntoView({ behavior: 'smooth' });
  }

  // プレイヤーが未作成の場合は作成、作成済みの場合は動画を変更
  if (!departmentPlayer) {
    departmentPlayer = new YT.Player('department-video-player', {
      height: '360',
      width: '640',
      videoId: videoId,
      playerVars: {
        'autoplay': 1 // カード選択時に自動再生
      },
      events: {
        'onStateChange': onDepartmentVideoStateChange
      }
    });
  } else {
    departmentPlayer.loadVideoById(videoId);
  }
}

// ★ ここがポイント：事業部動画が最後まで再生された時の処理
function onDepartmentVideoStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    const surveySection = document.getElementById('survey-section');
    if (surveySection) {
      surveySection.style.display = 'block'; // アンケートを表示
      surveySection.scrollIntoView({ behavior: 'smooth' }); // アンケートへ自動スクロール
    }
  }
}