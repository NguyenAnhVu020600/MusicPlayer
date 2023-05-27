const btnPlay = document.querySelector('.change-icon');
const iconPlay = document.querySelector('.icon-control-play');
const iconPause = document.querySelector('.icon-control-pause');
const clickThumbnail = document.querySelector('.thumbnail-music');
const clickPlayList = document.querySelector('.play-list');
const listSong = document.querySelector('.container-list');
const zoomThumbnail = document.querySelector('.wrapper');

const thumbnailMusic = document.querySelector('.thumbnail-music img');
const nameSong = document.querySelector('.name-song');
const nameAuthor = document.querySelector('.name-author');
const audio = document.querySelector('#audio');

const progress = document.querySelector('.progress-bar');
const progressArea = document.querySelector('.progress-area');

const currentTime = document.querySelector('.min-time');
const totalTime = document.querySelector('.max-time');

const btnControl = document.querySelectorAll('.icon-control');

const btnRepeat = document.querySelector('.icon-repeat');
const btnNext = document.querySelector('.icon-next');
const btnPrev = document.querySelector('.icon-prev');

const btnRandom = document.querySelector('.icon-random');

const btnShowLyric = document.querySelector('.show-lyrics');
const lyricSong = btnShowLyric.querySelector('.lyric-song');

const iconMute = document.querySelector('.icon-volume-mute');
const iconOff = document.querySelector('.icon-volume-off');
const iconLow = document.querySelector('.icon-volume-low');
const iconHigh = document.querySelector('.icon-volume-high');

const volumeArea = document.querySelector('.volume-area');
const volumeCurrent = document.querySelector('.volume-current');

const PLAYER_STORAGE_KEY = 'PLAYER';
let animateCd;
const app = {
    currentIndex : 0,
    isRandom : false,
    isRepeat : false,
    isPlaying: false,
    currentVolume: 0.7,
    isDraggingVolume:false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: ' ĐỢI ANH ỔN HƠN',
            singer: 'Vũ ft MCK',
            path: './assets/music/Vũ ft MCK - ĐỢI ANH ỔN HƠN (128 kbps).mp3',
            image: './assets/img/anhvu.jpg',
            lyric: 'Bài hát này chưa có lyric bởi vì Vũ lười nhập'
        },
        {
            name: 'NEVADA',
            singer: 'Cozi Zuehlsdorff',
            path: './assets/music/NEVADA ft. LANTERNS - THEREON REMIX __ NHẠC HOT TIK TOK 2022 (128 kbps).mp3',
            image: './assets/img/nevada.jpg',
            lyric: 'Bài hát này chưa có lyric bởi vì Vũ lười nhập'
        },
        {
            name: 'Phong Dạ Hành',
            singer: 'DJ AM OFFICIAL',
            path: './assets/music/PHONG DẠ HÀNH - BT x LVT REMIX - (TREND TIKTOK 00_00) - NHẠC THỊNH HÀNH TIKTOK 2022 (128 kbps).mp3',
            image: './assets/img/phongdahanh.jpg',
            lyric: 'Bài hát này chưa có lyric'
        },
        {
            name: 'Making my way',
            singer: 'Sơn Tùng - MTP',
            path: './assets/music/Making My Way - Sơn Tùng M-TP Toàn Chupi (128 kbps).mp3',
            image: './assets/img/makingmyway.jpg',
            lyric: 'Bài hát này chưa có lyric bởi vì Vũ lười nhập'
        },
        {
            name: 'The Hills x Where Have You Been (Thereon Remix)',
            singer: '幻玥 - LQ Music',
            path: './assets/music/The Hills x Where Have You Been (Thereon Remix) _ Nhạc Hot Tiktok 2023 _ LQ Music (128 kbps).mp3',
            image: './assets/img/wherehaveyoubeen.jpg',
            lyric: 'Bài hát này chưa có lyric bởi vì Vũ lười nhập'
        },
        {
            name: 'Mật Ngọt',
            singer: 'Dung Hoang Pham',
            path: './assets/music/Mật Ngọt Nam Con Remix  Dunghoangpham  Exclusive Music  Hot TikTok 2023  Audio Lyrics Video.mp3',
            image: './assets/img/Mat-Ngot.jpg',
            lyric: `
            <h4>Lời bài hát: Mật ngọt</h4>
                    <br/>
                    <p>Tình yêu đâu ai bán mà mua?</p>
                    <p>Khôn 3 năm người dại mấy giây</p>
                    <p>Mật ngọt thơm giết chết ruồi thôi!</p>
                    <p>Sâu bên trong toàn lời dối gian.</p>
                    <br/>
                    <p>Tránh sao được, tránh sao được lưới yêu đã gài</p>
                    <p>Gieo con tim lạc vào hố sâu</p>
                    <p>Trách sao được, trách sao được, lỡ yêu mất rồi!</p>
                    <p>Như con thiêu thân bay lao trong ngọn lửa rồi bốc cháy</p>
                    <br/>
                    <p>Ngọt ngào người hứa với tôi câu thủy chung</p>
                    <p>Nhưng sao con tim đắng cay nỗi ê chề</p>
                    <p>Bao lâu nay tôi vẫn tin, vẫn thương vẫn yêu</p>
                    <p>Chờ người sẽ đổi thay.</p>
                    <br/>
                    <p>Giờ thì người nói với tôi chẳng cần tôi</p>
                    <p>Đau thương con tim xé tan nát bầu trời</p>
                    <p>Ai yêu thương ai quá nhiều thiệt thân tổn thương</p>
                    <p>Để rồi mang niềm đau</p>
                    <p>Một đời chết trong mật ngọt.</p>
            `
        },
        {
            name: 'Death Bed Remix',
            singer: 'Besomorph & Anthony Keyrouz ft. Lunis',
            path: './assets/music/Death Bed Remix - Besomorph & Anthony Keyrouz ft. Lunis - Tik Tok 0_30 - Deep House (128 kbps).mp3',
            image: './assets/img/deadbed.jpg',
            lyric: 'Bài hát này chưa có lyric bởi vì Vũ lười nhập'
        },
        {
            name: 'Mi Mi Mi ft. Bboom Bboom ',
            singer: 'KOY Music Group',
            path: './assets/music/Mi Mi Mi ft. Bboom Bboom (JAPAN Remix) _ Nhạc Cổ Remix Xu Hướng Tiktok 2023 (128 kbps).mp3',
            image: './assets/img/mimimi.png',
            lyric: 'Bài hát này chưa có lyric bởi vì Vũ lười nhập'
        },
        
        {
            name: 'SummerTimes K391',
            singer: 'DJ AM OFFICIAL',
            path: './assets/music/K-391 - Summertime [Sunshine] - K-391.mp3',
            image: './assets/img/summertime.jpg',
            lyric: 'Bài hát này chưa có lyric bởi vì Vũ lười nhập'
        },
        
    ],
    setConfig: function(key,value){
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    // Hàm chuyển đổi thời gian thành định dạng "00:00"
    formatTime: function (time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return formattedMinutes + ':' + formattedSeconds;
    },
    render: function() {
        const _this = this;
        const htmls = this.songs.map((song,index)=> {
            const audio = new Audio(song.path); // Tạo đối tượng audio
            audio.addEventListener('loadedmetadata', function() {
                // Lấy thời lượng của audio
                const duration = audio.duration;
                // Chuyển đổi thời lượng thành định dạng "00:00"
                const formattedDuration = _this.formatTime(duration);
                // Cập nhật thời lượng trong phần tử HTML
                const timeSongElement = document.querySelector(`.time-song[data-index="${index}"]`);
                if (timeSongElement) {
                    timeSongElement.textContent = formattedDuration;
                }
            });
            return `
            <div class="play-list ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}" >
                <div class="info-song" >
                    <div class="info-body">
                        <img class="cd ${index === this.currentIndex ? 'active' : ''}" src="${song.image}" alt="">
                        <div class="info-detail">
                            <div class="name-detail">${song.name}</div>
                            <div class="author-detail">${song.singer}</div>
                        </div>
                    </div>
                    <div class="time-song" data-index = "${index}">3:00</div>
                </div>
                <div class="show-lyrics ${index === this.currentIndex ? '' : 'hidden'}" id="${index === this.currentIndex ? 'showLyrics' : ''}">
                    <span class="btn-show">Show lyrics</span>
                        <div class="lyric-song hidden">
                        ${song.lyric}
                    </div>
                </div>
            </div>
            `;
        })
        document.querySelector('.container-list').innerHTML = htmls.join('');
        
    },
    // quay cd
    // animateCD: function(){
    //     const cd = document.querySelector('.cd.active');
    //     const cdThumbAnimate = cd.animate(
    //         {
    //             transform: 'rotate(360deg)'
    //         },
    //         {
    //             duration: 5000,
    //             iterations: Infinity,
    //         }
    //     );
    //     return cdThumbAnimate;
    // },

    handleEvent: function (){
        const _this = this;
        
        let animationPaused = false; 
        // play audio
        
        const playAudio = function () {
            const cd = document.querySelector('.cd.active');
            if (iconPlay.classList.contains('hidden')) {
                audio.play();
                if (animationPaused) {
                    cd.style.animationPlayState = 'running'; // Tiếp tục animation từ vị trí dừng
                } else {
                    cd.style.animationTimingFunction = 'linear'; // Bắt đầu animation từ đầu
                    cd.classList.add('rotate-animation');
                }
                animationPaused = false;
            } else {
                audio.pause();
                cd.style.animationPlayState = 'paused'; // Dừng animation
                animationPaused = true;

            }
            
        }
        // play song khi click vào thumbnail 
        clickThumbnail.onclick = function(){
            _this.togglePlaySong();
            playAudio();
        }
        // play song khi click vào nút play
        btnPlay.onclick = function(){
            btnPlay.querySelector('.icon-control-pause').classList.toggle('active');
            _this.togglePlaySong();
            playAudio();
        }
        // play song khi click vào danh sách bài hát
        clickPlayList.onclick = function(){
            _this.togglePlaySong();
            playAudio();
        }
        // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            const progressPercent = Math.floor(audio.currentTime / audio.duration *100);
            progress.style.width = progressPercent + '%';

            // giây hiện tại
            const currentSeconds = Math.floor(audio.currentTime);
            const minutesCrr = Math.floor(currentSeconds / 60);
            const secondsCrr = currentSeconds % 60;
            const formattedTime = ('0' + minutesCrr).slice(-2) + ':' + ('0' + secondsCrr).slice(-2);
            currentTime.textContent = formattedTime;

            // thời gian bài hát
            var resultTime = '00:00';
            if (!isNaN(audio.duration)) {
                const totalSeconds = Math.floor(audio.duration);
                const minutesTt = Math.floor(totalSeconds / 60);
                const secondsTt = totalSeconds % 60;
                resultTime = ('0' + minutesTt).slice(-2) + ':' + ('0' + secondsTt).slice(-2);
            }
            totalTime.textContent = resultTime;
        };

        //xử lý khi tua nhạc
        progressArea.addEventListener('click', function(event) {
            //  lấy thông tin về kích thước và vị trí của phần tử progressArea
            var rect = progressArea.getBoundingClientRect();

            var offsetX = event.clientX - rect.left;
            var progressAreaWidth = rect.width;
            var percentage = offsetX / progressAreaWidth;
          
            var duration = audio.duration;
            var currentTime = duration * percentage;
            audio.currentTime = currentTime;
          });
        // add event click cho btn next - prev
        btnNext.onclick = function(){
            if(_this.isRandom) {
                _this.randomSong();
            }
            else {
                _this.nextSong();
            }
            _this.playSong();
            _this.render();
            _this.scrollToActiveSong();
            playAudio();

        }
        btnPrev.onclick = function(){
            if(_this.isRandom) {
                _this.randomSong();
            }
            else {
                _this.prevSong();
            }
            _this.playSong();
            _this.render();
            _this.scrollToActiveSong();
            playAudio();
        }
        // random song
        btnRandom.onclick = function(){
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);  
            btnRandom.classList.toggle('active');
        }
        // xử lý next song khi audio ended
        audio.onended = function() {
            // xử lý nếu có repeat thì lặp lại bài hát
            if(_this.isRepeat){
                audio.play();
            }
            // xử lý nếu có random thì random, không thì next bài khác
            else {
                btnNext.click();
            }
        }
        // repeat song
        btnRepeat.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);  
            btnRepeat.classList.toggle('active');
        }
        
        // lắng nghe hành vi click vào playlist
        listSong.onclick = function (e){
            const songNodeNoActive = e.target.closest('.play-list:not(.active)');
            const songNodeActive = e.target.closest('.play-list.active');
            const btnShowLyric = e.target.closest('.show-lyrics');

            if(songNodeNoActive || songNodeActive || btnShowLyric ) {
                // xử lý khi click vào song
                if(songNodeNoActive){
                    
                    _this.currentIndex = Number(songNodeNoActive.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    _this.playSong();
                    playAudio();
                }
                // xử lý khi click vào show lyric 
                if( btnShowLyric ){
                    _this.togglePlaySong();
                    btnShowLyric.querySelector('.btn-show').classList.toggle('hidden');
                    btnShowLyric.querySelector('.lyric-song').classList.toggle('hidden');
                }
                if(songNodeActive){
                    _this.togglePlaySong();
                    playAudio();
                }
            }
        }
        // xử lý khi click vào volume
        iconHigh.onclick = function (){
            iconHigh.classList.toggle('hidden');
            iconMute.classList.toggle('hidden');
            audio.muted = true;
        }
        iconLow.onclick = function (){
            iconLow.classList.toggle('hidden');
            iconMute.classList.toggle('hidden');
            audio.muted = true;
        }
        iconOff.onclick = function (){
            iconOff.classList.toggle('hidden');
            iconMute.classList.toggle('hidden');
            audio.muted = true;
        }
        iconMute.onclick = function (){
            iconMute.classList.toggle('hidden');
            if(_this.currentVolume < 0.3){
                iconOff.classList.toggle('hidden');
            }
            else if(_this.currentVolume <0.7) {
                iconLow.classList.toggle('hidden');
            }
            else {
                iconHigh.classList.toggle('hidden');
            }
            
            audio.muted = false;
        }
        // Gán sự kiện click cho phần tử volume-area
        volumeArea.onclick = function(event) {
            var volumeAreaRect = volumeArea.getBoundingClientRect();
            var clickX = event.clientX - volumeAreaRect.left;
            var volumeWidth = volumeAreaRect.width;
    
            // Tính toán giá trị âm lượng mới dựa trên vị trí click
            _this.currentVolume = clickX / volumeWidth;
    
            // Giới hạn giá trị âm lượng trong khoảng từ 0 đến 1
            _this.currentVolume = Math.max(0, Math.min(_this.currentVolume, 1));
            _this.updateVolume();
        }
        
        
        // Bắt đầu kéo chuột khi nhấn giữ nút chuột
        volumeArea.addEventListener('mousedown', function(event) {
            _this.isDragging = true;
            _this.handleVolumeDrag(event);
        });
        
        // Kéo chuột qua lại khi di chuyển chuột
        document.addEventListener('mousemove', _this.handleVolumeDrag);
        
        // Dừng kéo chuột khi nhả nút chuột
        document.addEventListener('mouseup', function() {
            _this.isDragging = false;
        });
        
        // Cập nhật giá trị âm lượng khi click trực tiếp vào thanh volume-area
        volumeArea.addEventListener('click', function(event) {
            _this.updateVolume(event.clientX);
        });
        
  
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex];
            }
        });
        
    },
    loadCurrentSong: function(){
        thumbnailMusic.src = this.currentSong.image;
        nameSong.textContent = this.currentSong.name;
        nameAuthor.textContent = this.currentSong.singer;
        audio.src = this.currentSong.path;
    },
    playSong: function(){
        zoomThumbnail.classList.add('active');
        iconPlay.classList.add('hidden');
        iconPause.classList.remove('hidden');
        iconPause.classList.add('active');
        iconPlay.classList.add('hidden')
    },
    togglePlaySong: function(){
        zoomThumbnail.classList.toggle('active');
        iconPlay.classList.toggle('hidden');
        iconPause.classList.toggle('hidden');
    },
    updateVolume: function(positionX){
        var volumeAreaRect = volumeArea.getBoundingClientRect();
        var volumeWidth = volumeAreaRect.width;

        // Tính toán giá trị âm lượng mới dựa trên vị trí chuột
        var clickX = positionX - volumeAreaRect.left;
        var newVolume = clickX / volumeWidth;

        // Giới hạn giá trị âm lượng trong khoảng từ 0 đến 1
        newVolume = Math.max(0, Math.min(newVolume, 1));

        volumeCurrent.style.width = (this.currentVolume * 100) + '%';
        audio.volume = this.currentVolume;
        // Hiển thị biểu tượng âm lượng phù hợp
        if (this.currentVolume === 0) {
            iconOff.classList.add('hidden');
            iconLow.classList.add('hidden');
            iconHigh.classList.add('hidden');
            iconMute.classList.remove('hidden');
        } else if (this.currentVolume < 0.3) {
            iconOff.classList.remove('hidden');
            iconLow.classList.add('hidden');
            iconHigh.classList.add('hidden');
            iconMute.classList.add('hidden');
        } else if (this.currentVolume < 0.7) {
            iconOff.classList.add('hidden');
            iconLow.classList.remove('hidden');
            iconHigh.classList.add('hidden');
            iconMute.classList.add('hidden');
        } 
        else {
            iconOff.classList.add('hidden');
            iconLow.classList.add('hidden');
            iconHigh.classList.remove('hidden');
            iconMute.classList.add('hidden');
        }
    },
    handleVolumeDrag:function (event) {
        if (this.isDraggingVolume) {
            updateVolume(event.clientX);
        }
    },
    nextSong: function (){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function (){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    randomSong: function(){
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;

        this.loadCurrentSong();
    },
    scrollToActiveSong: function(){
        setTimeout(()=>{
            document.querySelector('.play-list.active').scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        },300)
    },
    loadConfig: function(){
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    
    start: function(){
        // gán cấu hình từ config vào ứng dụng
        this.loadConfig();
        // định nghĩa các thuộc tính cho object
        this.defineProperties();
        // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();
        this.updateVolume(volumeArea.getBoundingClientRect().left + volumeArea.getBoundingClientRect().width * this.currentVolume);
        this.handleEvent();

        

        this.render();
        if(this.isRandom){
            btnRandom.classList.toggle('active', this.isRandom);
        }
        if(this.isRepeat){
            btnRepeat.classList.toggle('active', this.isRepeat);
        }
        
    }
}

app.start()

