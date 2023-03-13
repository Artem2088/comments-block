let form = document.querySelector(".form");
let formWrap = form.querySelector(".form__form-wrap");
let inputName = form.querySelector(".form__input-name");
let inputDate = form.querySelector(".form__input-date");
let inputText = form.querySelector(".form__input-text");
let formSubmitBtn = form.querySelector(".form__button-input");
let boxMessage = document.querySelector(".message");
let textArea = document.createElement("textarea");
let buttonArticle = document.querySelector(".article__button");
let sectionForm = document.querySelector(".form");
let checkBox = form.querySelector(".form__input-checkbox");
inputDate.disabled = true;
let inputs = form.querySelectorAll("input");
let spanError = form.querySelector(".form__error-name");
let id = 1;

function validationInput() {
  inputName.onblur = function (e) {
    let target = e.target.value;
    if (target === "") {
      spanError.classList.add("visible");
      spanError.textContent = "Поле не должно быть пустым!";
      formSubmitBtn.disabled = true;
    }
    if (target.length == 1) {
      spanError.classList.add("visible");
      spanError.textContent = "Поле не должно быть меньше 1!";
      formSubmitBtn.disabled = true;
    }
  };
  inputName.onfocus = function () {
    if (spanError.classList.contains("visible")) {
      spanError.classList.remove("visible");
      spanError.textContent = "";
      formSubmitBtn.disabled = false;
    }
  };
}
validationInput();

function createMessage(name, date, text) {
  let span = document.createElement("div");
  span.classList.add("message__span");
  let btnDelete = document.createElement("button");
  btnDelete.classList.add("message__btn-delete");
  let btnLike = document.createElement("button");
  btnLike.classList.add("message__btn-like");
  let currentDate = new Date().toLocaleDateString();
  let currentTime = new Date().toLocaleTimeString().slice(0, -3);
  let yesterDay = new Date();
  yesterDay.setDate(yesterDay.getDate() - 1);
  let toDay;

  let messageArr = {
    name: name.value,
    text: text.value,
    date: date.value,
  };
  messageArr.id = id;

  if (messageArr.date || currentDate > yesterDay) {
    toDay = "Вчера";
  } else {
    toDay = "Сегодня";
  }

  span.innerText = `
  Имя: ${messageArr.name}

  Коментарий:
  ${messageArr.text}

  Дата: 
 ${toDay}, ${currentTime}`;

  span.appendChild(btnDelete);
  span.appendChild(btnLike);
  boxMessage.appendChild(span);

  const removeMessage = () => {
    btnDelete.addEventListener(
      "click",
      function (e) {
        let target = e.target;
        let parent = target.parentElement;
        parent.remove();
      },
      { once: true }
    );
  };
  removeMessage();

  function like() {
    btnLike.addEventListener("click", function () {
      btnLike.classList.toggle("message__btn-like_activ");
    });
  }
  like();
}

inputText.addEventListener(
  "focus",
  function () {
    inputText.replaceWith(textArea);
  },
  { once: true }
);

checkBox.addEventListener("click", function () {
  Boolean(checkBox);
  if (checkBox) {
    inputDate.disabled = false;
  }
});

buttonArticle.addEventListener(
  "click",
  function () {
    sectionForm.classList.add("visible");
    buttonArticle.disabled = true;
  },
  { once: true }
);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!formSubmitBtn) return;
  createMessage(inputName, inputDate, textArea);
  formSubmitBtn.disabled = true;
  inputDate.disabled = true;
  id = id + 1;
  setTimeout(() => (formSubmitBtn.disabled = false), 3000);
  e.target.reset();
});
