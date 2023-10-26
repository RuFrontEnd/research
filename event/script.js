let $form = document.getElementById("form"),
  $div = document.getElementById("div"),
  $p = document.getElementById("p");

let isCapturing = true;

$form.addEventListener(
  "click",
  (e) => {
    console.log("form target", e.target);
    console.log("form current target", e.currentTarget);
    console.log("form");
  },
  isCapturing
);

$div.addEventListener(
  "click",
  (e) => {
    console.log("div target", e.target);
    console.log("div current target", e.currentTarget);
    console.log("div");
  },
  isCapturing
);

$p.addEventListener(
  "click",
  (e) => {
    e.stopPropagation();
    console.log("p target", e.target);
    console.log("p current target", e.currentTarget);
    console.log("p");
  },
  isCapturing
);

// when isCapturing is set to true (which means event is bubbling now).
// click p => p > div > form

// when isCapturing is set to false (which means event is capturing now).
// click p => form > div > p

// when isCapturing is set to false, e.stopPropagation() will stop bubbling.
// when isCapturing is set to true, e.stopPropagation() will stop capturing.

const $buttons = document.getElementById("buttons");

$buttons.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    console.log(event.target.innerText);
  }
});

// by assign event to the ancestor, there are benefits bellow:
// reduce memory storage.
// when count of buttons get less or more, no need to add event listener repeatedly.
