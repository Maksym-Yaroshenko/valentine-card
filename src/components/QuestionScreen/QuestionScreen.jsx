import { useState, useEffect } from "react";
import css from "./QuestionScreen.module.css";

export const QuestionScreen = ({ onAccept, onReject }) => {
  const [interactionCount, setInteractionCount] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Трохи більше фраз для довший гри (всього 12 кроків)
  const noPhrases = [
    "Нет 🙅‍♂️",
    "Ты уверена? 🤔",
    "Точно нет? 🤨",
    "Подумай еще! 🥺",
    "Последний шанс! 😱",
    "Не разбивай мне сердце 💔",
    "Ну пожааалуйста 😭",
    "Я буду плакать... 🌧️",
    "Не делай этого! 😿",
    "Серьёзно? 🙀",
    "Одумайся! 🤯",
    "У меня нет слов 🤐",
  ];

  // Массив четких координат для движения на десктопе (X, Y).
  // Рух відносно початкової позиції кнопки.
  const moves = [
    { x: 0, y: 0 },
    { x: 80, y: -50 },
    { x: -100, y: 40 },
    { x: 60, y: 100 },
    { x: -80, y: -80 },
    { x: 120, y: 20 },
    { x: -60, y: 80 },
    { x: 90, y: -90 },
    { x: -110, y: 50 },
    { x: 70, y: 120 },
    { x: -90, y: -60 },
    { x: 100, y: 30 },
    { x: 0, y: 0 }, // Останній крок - повернення в центр перед здачею
  ];

  const maxInteractions = noPhrases.length - 1; // 11

  // Логика наведения для десктопа (кнопка тікає)
  const handleHover = () => {
    if (!isMobile && interactionCount < maxInteractions) {
      setInteractionCount((prev) => prev + 1);
    }
  };

  // Логика клика (для мобілок та фінального кліку на ПК)
  const handleNoClick = () => {
    if (interactionCount < maxInteractions) {
      setInteractionCount((prev) => prev + 1);
    } else {
      // Якщо фрази скінчилися і кнопка повернулася в центр - переходимо на екран смутку
      onReject();
    }
  };

  const getNoButtonText = () => {
    return noPhrases[Math.min(interactionCount, maxInteractions)];
  };

  // === НОВА ЛОГІКА РОЗМІРІВ КНОПКИ "ДА" ===
  const baseFontSize = 18; // Початковий розмір шрифту
  const increaseStep = 8; // Крок збільшення шрифту (8 пікселів за клік)
  const maxFontSize = 110; // Максимальний розмір шрифту, щоб не розривати кнопку

  const calculatedFontSize = baseFontSize + interactionCount * increaseStep;
  // Використовуємо Math.min, щоб розмір не перевищив максимальний
  const yesButtonFontSize = Math.min(calculatedFontSize, maxFontSize);

  // Кнопка "Ні" зменшується
  const noButtonFontSize = Math.max(16 - interactionCount, 8);
  const noButtonPadding = `${Math.max(12 - interactionCount, 4)}px ${Math.max(24 - interactionCount * 2, 8)}px`;

  // Получаем текущий сдвиг из массива (только для ПК)
  const currentMove = !isMobile
    ? moves[Math.min(interactionCount, moves.length - 1)]
    : { x: 0, y: 0 };

  return (
    <div className={css.card}>
      <img
        className={css.gifImage}
        src="https://png.pngtree.com/png-clipart/20240316/original/pngtree-cute-doodle-bear-for-valentines-day-adorable-couple-of-valentine-bears-png-image_14602248.png"
        alt="Милые медведи"
      />
      <h1 className={css.questionText}>
        Кристинка, будешь моей Валентинкой? 🧸💌
      </h1>

      <div className={css.buttonsContainer}>
        {/* Додаємо клас-обгортку для кнопки "Да", щоб контролювати її розміри та позицію на десктопі */}
        <div className={css.yesButtonWrapper}>
          <button
            className={`${css.btn} ${css.yesBtn}`}
            style={{ fontSize: `${yesButtonFontSize}px` }}
            onClick={onAccept}
          >
            Да! ❤️
          </button>
        </div>

        <button
          className={`${css.btn} ${css.noBtn}`}
          onClick={handleNoClick}
          onMouseEnter={handleHover}
          style={{
            fontSize: `${noButtonFontSize}px`,
            padding: noButtonPadding,
            // Используем transform для плавного сдвига
            transform: `translate(${currentMove.x}px, ${currentMove.y}px)`,
            transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)", // Більш плавна анімація
          }}
        >
          {getNoButtonText()}
        </button>
      </div>
    </div>
  );
};
