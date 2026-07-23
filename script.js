// ==========================================
// 1. YouTube APIの準備
// ==========================================
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var companyPlayer;
var departmentPlayer;

// ==========================================
// 2. YouTubeプレーヤーの作成（API読み込み後に自動実行）
// ==========================================
function onYouTubeIframeAPIReady() {
  // ① 会社説明動画のプレーヤー
  companyPlayer = new YT.Player('company-video-player', {
    height: '315',
    width: '100%',
    // ★いただいたショート動画のIDをセットしました！★
    videoId: 'a5O5oZILdeM', 
    playerVars: {
      'rel': 0,
      'modestbranding': 1,
      'playsinline': 1
    },
    events: {
      // 再生状態が変わるたびにチェックする
      'onStateChange': onCompanyPlayerStateChange
    }
  });

  // ② 事業部動画のプレーヤー（最初は空っぽで待機）
  departmentPlayer = new YT.Player('department-video-player', {
    height: '315',
    width: '100%',
    videoId: '', 
    playerVars: {
      'rel': 0,
      'modestbranding': 1,
      'playsinline': 1
    }
  });
}

// ==========================================
// 3. 動画を見終わったときの処理
// ==========================================
function onCompanyPlayerStateChange(event) {
  // 動画が最後まで再生されたら（ENDED）
  if (event.data == YT.PlayerState.ENDED) {
    document.getElementById('next-section').style.display = 'block';
  }
}

// ==========================================
// 4. 「事業部選択へ進む」ボタンを押したときの処理
// ==========================================
function showDepartments() {
  document.getElementById('department-section').style.display = 'block';
  document.getElementById('department-section').scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// 5. 事業部カードを押したときの動画切り替え処理
// ==========================================
function changeVideo(videoId) {
  document.getElementById('department-video-section').style.display = 'block';
  document.getElementById('survey-section').style.display = 'block';
  
  // 指定されたIDのYouTube動画を読み込んで自動再生する
  if(departmentPlayer) {
    departmentPlayer.loadVideoById(videoId);
  }
  
  document.getElementById('department-video-section').scrollIntoView({ behavior: 'smooth' });
}