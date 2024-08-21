let track_list = [
    {
        name: "Broke for free",
        artist: "stalin",
        image: "https://picsum.photos/640/360",
        path: './../Music/sample1.mp3'
    },
    {
        name: "Every Moring",
        artist: "Anton Vlasov",
        image: "https://picsum.photos/320/180",
        path: './../Music/every-morning-18304.mp3'
    },
    {
        name: "Relax and Sleep",
        artist: "Anton Vlasov",
        image: "https://picsum.photos/480/270",
        path: "./../Music/relax-and-sleep-18565.mp3",
    },
    {
        name: "Uplifting Day",
        artist: "Lesfm",
        image: "https://picsum.photos/240/180",
        path: "./../Music/uplifting-day-15583.mp3",
    }
]

const now_playing = document.querySelector("#now_playing");
const track_img = document.querySelector("#track_img");
const track_name = document.querySelector("#track_name");
const track_artist = document.querySelector("#track_artist");

const prev_btn = document.querySelector("#prev_track");
const play_pause_btn = document.querySelector("#playpause_track i");
const next_btn = document.querySelector("#next_track");

const curr_time = document.querySelector("#current_time");
const seek_slider = document.querySelector("#seek_slider");
const total_time = document.querySelector("#total_duration");
const volume_slider = document.querySelector("#volume_slider");

let isPlaying = false;
let trackIndex = 0;
let timerId;

const audio = document.createElement('audio');

function loadTrack() {
    if(timerId){
        clearInterval(timerId);
    }
    const { name, artist, path, image } = track_list[trackIndex];

    now_playing.innerText = `Playing ${trackIndex + 1} of ${track_list.length}`;
    track_name.innerText = name;
    track_artist.innerText = artist;
    track_img.style.backgroundImage = `url(${image})`;

    audio.src = path;
    audio.load();

    randomBgColor();
    timerId = setInterval(seekUpdate, 1000);
}

function randomBgColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue}, 0.7)`
}

function playPauseTrack() {
    setTotalDuration();
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function playTrack() {
    isPlaying = true;
    audio.play();
    play_pause_btn.classList.remove('fa-play-circle');
    play_pause_btn.classList.add('fa-pause-circle');
}

function pauseTrack() {
    isPlaying = false;
    audio.pause();
    play_pause_btn.classList.remove('fa-pause-circle');
    play_pause_btn.classList.add('fa-play-circle');
}

function nextTrack(){
    ++trackIndex

    if(track_list.length === trackIndex){
        trackIndex = 0
    }

    loadTrack();
    playTrack();
}

function prevTrack(){
    --trackIndex

    if(trackIndex < 0){
        trackIndex = track_list.length - 1;
    }

    loadTrack();
    playTrack();
}

function seekTo(){
    audio.currentTime = (seek_slider.value / 100) * audio.duration; 
}

function setVolume(){
    audio.volume = volume_slider.value / 100;
}

function seekUpdate(){
    seek_slider.value = Math.floor((audio.currentTime / audio.duration ) * 100);

    const currMinutes = "" + Math.floor(audio.currentTime / 60);
    const currSeconds = "" + Math.floor(audio.currentTime - (60 * currMinutes));

    curr_time.innerText = `${currMinutes.padStart(2, "0")}:${currSeconds.padStart(2, "0")}`;
}

function setTotalDuration(){
    const totalMinutes = "" + Math.floor(audio.duration / 60);
    const totalSeconds = "" + Math.floor(audio.duration - (60 * totalMinutes));

    total_time.innerText = `${totalMinutes.padStart(2, "0")}:${totalSeconds.padStart(2, "0")}`;
}

loadTrack();
play_pause_btn.addEventListener("click", playPauseTrack);
next_btn.addEventListener("click", nextTrack);
prev_btn.addEventListener("click", prevTrack);
volume_slider.addEventListener("input", setVolume);
seek_slider.addEventListener("input", seekTo);
audio.addEventListener("ended", nextTrack);

