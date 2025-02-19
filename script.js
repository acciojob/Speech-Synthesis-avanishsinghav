// Your script here.
// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const synth = window.speechSynthesis;

const voicesDropdown = document.querySelector("#voices");
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
const textInput = document.querySelector('[name="text"]');

function populateVoices() {
  voices = synth.getVoices();
  voicesDropdown.innerHTML = voices
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
}

function setVoice() {
  msg.voice = voices.find((voice) => voice.name === voicesDropdown.value);
}

function setOption() {
  msg[this.name] = this.value;
}

function speak() {
  if (!textInput.value.trim()) return;
  msg.text = textInput.value;
  synth.cancel(); 
  synth.speak(msg);
}

function stop() {
  synth.cancel();
}

synth.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOption));
speakButton.addEventListener("click", speak);
stopButton.addEventListener("click", stop);

populateVoices();
