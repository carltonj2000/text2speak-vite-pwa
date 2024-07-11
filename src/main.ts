import "./style.css";

export {};

const defaultText =
  "Hello Gentlemen, Per Rob's suggestion I have updated the renewal email. I believe we should send out a membership email then a reminder (or two). With that in mind I split Rob's suggestion over two emails so that the second reminder can have new and interesting content. Take a look at the links below and please provide feedback.";
const history = [];

document.addEventListener("DOMContentLoaded", () => {
  if (!("speechSynthesis" in window))
    return alert("Speech Synthesis not supported");

  const speech = new SpeechSynthesisUtterance();
  speech.lang = "en-US";

  const text: HTMLInputElement = document.querySelector("#text")!;
  text.value = defaultText;
  let sentencesToRead: string[] = [];
  let sentencesIdx = 0;
  let sentencesEnd = 0;
  const t2s = () => {
    if (sentencesToRead.length && sentencesIdx < sentencesEnd) {
      speech.text = sentencesToRead[sentencesIdx].trim();
      sentencesIdx += 1;
      speechSynthesis.speak(speech);
    }
  };
  speech.onend = () => {
    speechSynthesis.cancel();
    t2s();
  };

  const getParaNSentences = () => {
    let start = text.selectionStart;
    const paragraph = text.value.trim();
    text.value = paragraph;
    text.selectionStart = start;
    const sentences = paragraph.split(/[\.\!\?]/).filter((s) => s.length);
    return { paragraph, sentences, cursor: start };
  };

  document.querySelector("#speak")!.addEventListener("click", () => {
    const { sentences } = getParaNSentences();
    sentencesToRead = sentences;
    sentencesIdx = 0;
    sentencesEnd = sentencesToRead.length;
    t2s();
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

  const copy: HTMLInputElement = document.querySelector("#copy")!;
  copy.addEventListener("click", async () => {
    text.value = (await navigator.clipboard.readText()).trim();
  });

  const paste: HTMLInputElement = document.querySelector("#paste")!;
  paste.addEventListener("click", async () => {
    history.push(navigator.clipboard.readText());
    await navigator.clipboard.writeText(text.value);
    text.focus();
    text.selectionStart = 0;
    text.selectionEnd = 0;
  });

  const next: HTMLInputElement = document.querySelector("#next")!;
  next.addEventListener("click", () => {
    const { paragraph, sentences } = getParaNSentences();
    let start = text.selectionStart === null ? 0 : text.selectionStart;
    let end = sentences[0].length + 1;
    text.focus();
    if (start >= paragraph.length - 1) start = 0;
    else {
      for (let i = 1; i < sentences.length; i++) {
        if (start < end) {
          break;
        } else {
          end += sentences[i].length + 1;
        }
      }
      start = end;
    }
    text.selectionStart = start;
    text.selectionEnd = start;
  });

  const prev: HTMLInputElement = document.querySelector("#prev")!;
  prev.addEventListener("click", () => {
    const { paragraph, sentences } = getParaNSentences();
    let start =
      text.selectionStart === null
        ? sentences[sentences.length - 1].length
        : text.selectionStart;
    let end = sentences[sentences.length - 1].length + 1;
    text.focus();
    if (start <= 0) start = paragraph.length - 2;
    else {
      for (let i = sentences.length - 2; i < sentences.length; i--) {
        if (start > paragraph.length - end) {
          break;
        } else {
          end += sentences[i].length + 1;
        }
      }
      start = paragraph.length - end - 1;
    }
    text.selectionStart = start;
    text.selectionEnd = start;
  });

  const sentence: HTMLInputElement = document.querySelector("#sentence")!;
  sentence.addEventListener("click", () => {
    const { sentences, cursor } = getParaNSentences();
    let start = 0;
    let end = text.selectionStart === null ? 0 : text.selectionStart;
    let idx = -1;
    for (let i = 0; i < sentences.length; i++) {
      if (start > end) {
        idx = i - 1;
        break;
      } else start += sentences[i].length;
    }
    if (idx === -1) idx = sentences.length - 1;
    text.focus();
    text.selectionStart = cursor;
    text.selectionEnd = cursor;
    sentencesToRead = [sentences[idx].trim()];
    sentencesIdx = 0;
    sentencesEnd = 1;
    t2s();
  });

  const show: HTMLInputElement = document.querySelector("#show")!;
  show.addEventListener("click", () => {
    startUp();
  });

  const startUp = () => {
    window.focus();
    // @ts-ignore
    if (document.activeElement) document.activeElement.blur();
    paste.click();
  };
  //startUp();
});
