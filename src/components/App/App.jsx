import { useState } from "react";
import { QuestionScreen } from "../QuestionScreen/QuestionScreen";
import { SuccessScreen } from "../SuccessScreen/SuccessScreen";
import { SadScreen } from "../SadScreen/SadScreen"; // Наш новий компонент
import css from "./App.module.css";

const App = () => {
  // Тепер у нас 3 стани екрана
  const [currentScreen, setCurrentScreen] = useState("question");

  return (
    <div className={css.appContainer}>
      {currentScreen === "question" && (
        <QuestionScreen
          onAccept={() => setCurrentScreen("success")}
          onReject={() => setCurrentScreen("sad")} // Перехід на екран смутку
        />
      )}

      {currentScreen === "success" && <SuccessScreen />}

      {currentScreen === "sad" && (
        // Передаємо функцію для перезапуску сторінки
        <SadScreen onReset={() => setCurrentScreen("question")} />
      )}
    </div>
  );
};

export default App;
