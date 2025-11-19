import { useEffect, useState } from "react";

export default function TrocarTema() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  function ativarTema() {
    const newTheme = !dark;

    setDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={dark}
        onChange={ativarTema}
        className="sr-only peer"
      />

      <div
        className="
          w-20 h-10 rounded-full
          bg-gradient-to-r from-yellow-300 to-orange-400
          peer-checked:from-blue-500 peer-checked:to-indigo-600
          transition-all duration-500

          after:content-['☀️']
          peer-checked:after:content-['🌙']
          after:absolute after:top-1 after:left-1
          after:bg-white after:rounded-full after:h-8 after:w-8
          after:flex after:items-center after:justify-center
          after:transition-all after:duration-500
          after:shadow-md after:text-lg

          peer-checked:after:translate-x-10
        "
      ></div>
    </label>
  );
}
