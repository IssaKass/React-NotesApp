import React from "react";
import { PiMoonStarsFill, PiSunBold } from "react-icons/pi";

const THEME_KEY = `theme_ca4935c9-69a2-5ab4-81a9-246ec3a3d57c`;

const themeButtons = [
  { id: 0, theme: "light", icon: <PiSunBold /> },
  { id: 1, theme: "dark", icon: <PiMoonStarsFill /> },
];

function ThemeSwitcher() {
  const [selectedButton, setSelectedButton] = React.useState({});
  const [showButtons, setShowButtons] = React.useState(false);

  React.useEffect(() => {
    const currentTheme = localStorage.getItem(THEME_KEY);

    if (currentTheme === "dark") {
      setTheme(themeButtons[1]);
    } else {
      setTheme(themeButtons[0]);
    }
  }, []);

  function setTheme(themeButton) {
    localStorage.setItem(THEME_KEY, themeButton.theme);
    document.documentElement.classList.toggle(
      "dark",
      themeButton.theme === "dark"
    );
    setSelectedButton(themeButton);
    setShowButtons(false);
  }

  return (
    <div className="theme-switcher">
      <button
        className={`toolbar-button ${showButtons ? "active" : ""}`}
        onClick={() => setShowButtons((prev) => !prev)}
      >
        {selectedButton.icon}
      </button>
      <div className="buttons">
        {showButtons &&
          themeButtons.map((button) => (
            <button
              key={button.id}
              className={selectedButton.id === button.id ? "selected" : ""}
              onClick={() => setTheme(button)}
            >
              {button.icon} {button.theme}
            </button>
          ))}
      </div>
    </div>
  );
}

export default ThemeSwitcher;
