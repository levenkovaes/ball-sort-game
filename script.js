let form = document.forms.form;
let numberInput = form.elements.number;
let numberOfColors = 3;
let jarContainer = document.querySelector(".jar-container");

numberInput.addEventListener("input", checkNumber);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let congrats = document.querySelector(".congrats");

  if (congrats) {
    congrats.remove();
  }

  if (numberInput.value >= 3) {
    numberOfColors = Number(numberInput.value);
  }

  displayJars();

  colorBalls();

  function displayJars() {
    jarContainer.innerHTML = "";

    for (let i = 1; i <= numberOfColors + 1; ++i) {
      let jar = document.createElement("div");

      jar.classList.add("jar");

      jarContainer.append(jar);

      for (let j = 1; j <= 4; ++j) {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        if (i !== numberOfColors + 1) {
          jar.append(ball);
        }
      }
    }
  }

  function colorBalls() {
    const balls = document.querySelectorAll(".ball");
    const used = [];

    for (let i = 1; i <= numberOfColors; ++i) {
      let toSelect = 4;

      while (toSelect !== 0) {
        const index = Math.floor(Math.random() * balls.length);

        if (used.lenght === balls.length) break;
        if (used.includes(index)) continue;

        balls[index].classList.add("color" + i);
        used.push(index);
        toSelect--;
      }
    }
  }

  jarContainer.addEventListener("mouseup", checkWin);
  jarContainer.addEventListener("mousedown", transferBall);

  function checkWin() {
    if (document.querySelectorAll(".fullJar").length === numberOfColors) {
      const congrats = document.createElement("div");
      const congratsText = document.createElement("p");

      congrats.classList.add("congrats");
      congratsText.append("You've won!");
      congrats.append(congratsText);

      let jars = document.querySelectorAll(".jar");

      for (jar of jars) {
        jar.classList.add("fullJar");
      }

      document.querySelector("main").append(congrats);

      jarContainer.removeEventListener("mouseup", checkWin);
      jarContainer.removeEventListener("mousedown", transferBall);
    }
  }

  function transferBall(e) {
    let ball = e.target.closest(".ball");
    let jar = e.target.closest(".jar");

    if (
      !ball &&
      jar &&
      document.querySelector(".active") &&
      jar.children.length <= 3
    ) {
      let activeBall = document.querySelector(".active");

      jar.prepend(activeBall);
      activeBall.classList.remove("active");

      if (
        Array.from(jar.children)
          .map((i) => i.className)
          .filter((item, index, array) => {
            if (
              item === array[index + 1] ||
              (index === array.length - 1 && item === array[0])
            ) {
              return item;
            }
          }).length === 4
      ) {
        jar.classList.add("fullJar");
      }

      if (
        Array.from(jar.children)
          .map((i) => i.className)
          .filter((item, index, array) => {
            if (
              item === array[index + 1] ||
              (index === array.length - 1 && item === array[0])
            ) {
              return item;
            }
          }).length !== 4
      ) {
        jar.classList.remove("fullJar");
      }
    }

    if (
      !ball ||
      jar.getAttribute("class").includes("fullJar") ||
      ball !== jar.firstElementChild
    ) {
      return;
    }

    let activeElements = document.querySelectorAll(".active");
    for (let elem of activeElements) {
      elem.classList.remove("active");
    }
    ball.classList.add("active");
  }
});

function checkNumber() {
  numberInput.value = ("" + numberInput.value).replace(/\D/g, "");

  if (numberInput.value < 3 || numberInput.value > 9) {
    numberInput.classList.add("error");
  }

  if (numberInput.value >= 3 && numberInput.value <= 9) {
    numberInput.classList.remove("error");
  }
}
