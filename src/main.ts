import "./style.css";

export {};

document.addEventListener("DOMContentLoaded", () => {
  if (!("speechSynthesis" in window))
    return alert("Speech Synthesis not supported");

  const speech = new SpeechSynthesisUtterance();
  speech.lang = "en-US";

  const text: HTMLInputElement = document.querySelector("#text")!;

  speech.onend = () => speechSynthesis.cancel();

  document.querySelector("#speak")!.addEventListener("click", () => {
    speech.text =
      text.value.trim() || "No text entered. Please enter text to speak.";
    speechSynthesis.speak(speech);
  });

  const pause = document.querySelector("#pause")!;
  pause.addEventListener("click", () => speechSynthesis.pause());

  const resume = document.querySelector("#resume")!;
  resume.addEventListener("click", () => speechSynthesis.resume());

  const cancel: HTMLButtonElement = document.querySelector("#cancel")!;
  cancel.addEventListener("click", () => speechSynthesis.cancel());

  const clear = document.querySelector("#clear")!;
  clear.addEventListener("click", () => {
    text.value = "";
    cancel.click();
  });
});
