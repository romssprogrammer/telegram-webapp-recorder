// import webApp from "@twa-dev/sdk";
// import { createWavesurfer } from "./wavesurferwarpper.js";
const startBtn = document.querySelector(".startBtn");
const stopBtn = document.querySelector(".stopBtn");
const add_chapter = document.getElementsByClassName("add_chapter");
const add_note = document.getElementsByClassName("add_chapter");
const audioPlayback = document.querySelector("#audioPlayback");
let mediaRecorder;
let audioChunks = [];

function webAppLauch() {
  try {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.setHeaderColor("#27A7E7");
    window.Telegram.WebApp.setBackgroundColor("#ffa500");
    window.Telegram.WebApp.BackButton.show();
    window.Telegram.WebApp.themeParams;
  } catch (error) {
    console.log(error);
  }
}

function initializingMiniApp() {}
webAppLauch();
startBtn.addEventListener("click", async () => {
  startBtn.classList.add("startBtn_Active-Style");
  stopBtn.classList.add("stoptBtn_Active-Style");

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  if (stream) console.log("please active your Mirophone");
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
    console.log(audioChunks);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    audioPlayback.src = audioUrl;
    audioChunks = [];
  };

  mediaRecorder.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
  stopBtn.classList.remove("stoptBtn_Active-Style");
  startBtn.classList.remove("startBtn_Active-Style");
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

// startRecording();
// stopRecording();
function WavesurferInstance() {}
// WavesurferInstance();
// createWavesurfer();
