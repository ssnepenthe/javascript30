const player = document.querySelector('.player');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const toggle = player.querySelector('.toggle');
const video = player.querySelector('.viewer');

function handleRangeUpdate(e) {
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	video.currentTime = video.duration * (e.offsetX / progress.offsetWidth);
}

function skip(e) {
	video.currentTime += parseFloat(this.dataset.skip);
}

function toggleButtonIcon() {
	toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function togglePlay() {
	video.paused ? video.play() : video.pause();
}


[video, toggle].forEach(el => el.addEventListener('click', togglePlay));
['play', 'pause'].forEach(event => video.addEventListener(event, toggleButtonIcon));

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);

let progressMouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => progressMouseDown && scrub(e));
progress.addEventListener('mousedown', () => progressMouseDown = true);
progress.addEventListener('mouseup', () => progressMouseDown = false);