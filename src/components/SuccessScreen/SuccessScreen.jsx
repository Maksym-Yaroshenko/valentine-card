import css from "./SuccessScreen.module.css";

export const SuccessScreen = () => {
  return (
    <div className={css.card}>
      <img
        className={css.gifImage}
        src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
        alt="Счастливые медведи"
      />
      <h1 className={css.successText}>Урааа! Я так и знал! 🥰🎉</h1>
      <p className={css.messageText}>
        Ты самая лучшая! Я тебя очень сильно люблю ❤️
        <br />
        <br />✨ С Днем Святого Валентина! ✨
      </p>
    </div>
  );
};
