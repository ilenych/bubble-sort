const firstRowOfCards = document.querySelector(".sortCards");
const secondRowOfCards = document.querySelector(".sourseCards");

const prepare = document.querySelector(".buttons__prepare");
prepare.addEventListener("click", regenerateCards);
const run = document.querySelector(".buttons__run");
run.addEventListener("click", sort);

// Массив чисел
let numbers = [];

generateCards();

/**
 * Создание элементов
 */
function generateCards() {
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("div");
    row.classList.add("cards-row");
    // Создание рандом числа от 0 до 100
    const random = Math.trunc(Math.random() * 100);
    row.textContent = random;
    numbers.push(row);
    firstRowOfCards.appendChild(row);
  }
  // Приравниваем, для отображения исходного массива
  secondRowOfCards.innerHTML = firstRowOfCards.innerHTML;
}

/**
 * Пересоздание исходного массива
 */
function regenerateCards() {
    // Чистим содержиимое
  firstRowOfCards.innerHTML = "";
  secondRowOfCards.innerHTML = "";
  // Обнуляем массив
  numbers = [];
  // Включаем взаимодейстиве кнокпи
  document.querySelector(".buttons__run").disabled = false;
  // Запускаем новое создание 
  generateCards();
}

/**
 * Анимация
 * @param {Element} target  - элемаент document
 * @param {Number} position - transformX
 */
function animation(target, position) {
  return anime({
    targets: target,
    keyframes: [
      { translateY: -220 },
      { translateX: position },
      { translateY: 0 },
    ],
    duration: 3000,
    easing: "easeOutElastic(1, .8)",
  });
}

/**
 *  Запуск передвиижение карточек
 */
async function move(firstTarget, secondTarget) {
  moveAnimation(firstTarget, 158);
  await moveAnimation(secondTarget, -158);
}

/**
 * Запуск самой анимации
 * @param {element} target  элемаент document
 * @param {Number} transformX - на сколько нужно сдвинуть
 */
async function moveAnimation(target, transformX) {
  // Находим сдивг, если он уже есть(example, return 'X(34')
  let shift = target.style.transform.match(/X[(].\d{1,}/g);
  if (shift != null) {
    // Убираем два символа
    shift = shift.map((item) => +item.slice(2));
    const move = animation(target, shift[0] + transformX);
    await move.finished;
  } else {
    const move = animation(target, transformX);
    await move.finished;
  }
}

/**
 * Сортировка массива
 */
async function sort() {
  //Отключие взааимодействие с кнопками
  document.querySelector(".buttons__prepare").disabled = true;
  document.querySelector(".buttons__run").disabled = true;

  const length = numbers.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (+numbers[j].innerText > +numbers[j + 1].innerText) {
        //Запукс движение карточек
        await move(numbers[j], numbers[j + 1]);
        let tmp = numbers[j + 1];
        numbers[j + 1] = numbers[j];
        numbers[j] = tmp;
      }
    }
  }
  // Включаем взаимодейсвтие кнопки
  document.querySelector(".buttons__prepare").disabled = false;
}
