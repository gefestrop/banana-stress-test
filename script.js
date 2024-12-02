// Инициализация PixiJS приложения
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

// Добавляем FPS-счётчик
const fpsCounter = document.getElementById("fps");

// Загрузка банана
const loader = new PIXI.Loader();
loader.add('banana', './assets/banana.png'); // Путь к локальному изображению
loader.load(setup);

let bananaTexture;
let bananas = [];

// Функция setup (выполняется после загрузки изображения)
function setup() {
    bananaTexture = loader.resources.banana.texture;  // Присваиваем текстуру

    // Добавляем обработчик клика по кнопке
    document.getElementById('addBunnies').addEventListener('click', () => {
        for (let i = 0; i < 100; i++) {
            createBanana();
        }
    });

    // Запускаем анимацию
    app.ticker.add(update);
}

// Функция создания банана
function createBanana() {
    const banana = new PIXI.Sprite(bananaTexture);

    // Центрируем точку якоря
    banana.anchor.set(0.5);

    // Устанавливаем случайное начальное положение
    banana.x = Math.random() * app.screen.width;
    banana.y = Math.random() * app.screen.height;

    // Устанавливаем случайные размеры
    banana.scale.set(0.1 + Math.random() * 0.2); // от 10% до 30%

    // Случайная скорость
    banana.vx = Math.random() * 10 - 5; // скорость по X
    banana.vy = Math.random() * 10 - 5; // скорость по Y

    // Добавляем банан в массив и сцену
    bananas.push(banana);
    app.stage.addChild(banana);
}

// Функция для обновления позиций бананов
function update(delta) {
    bananas.forEach(banana => {
        // Обновляем позиции
        banana.x += banana.vx;
        banana.y += banana.vy;

        // Применяем гравитацию
        banana.vy += 0.5;

        // Отскоки от границ экрана
        if (banana.x > app.screen.width) {
            banana.vx *= -1;
            banana.x = app.screen.width;
        } else if (banana.x < 0) {
            banana.vx *= -1;
            banana.x = 0;
        }

        if (banana.y > app.screen.height) {
            banana.vy *= -0.8;
            banana.y = app.screen.height;
        } else if (banana.y < 0) {
            banana.vy *= -1;
            banana.y = 0;
        }
    });

    // Обновляем счётчик FPS
    fpsCounter.textContent = `FPS: ${Math.round(app.ticker.FPS)}`;
}
