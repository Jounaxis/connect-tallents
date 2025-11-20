import { useTheme } from "../../context/ThemeContext";

export default function TrocarTema() {
  const { tema, alternarTema } = useTheme();
  const dark = tema === "dark";

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={dark}
        onChange={alternarTema}
        className="sr-only peer"
      />

      <div
        className="
          w-20 h-10 rounded-full
          bg-gradient-to-r from-yellow-300 to-orange-400
          peer-checked:from-blue-500 peer-checked:to-indigo-600
          transition-all duration-500 relative

          after:content-['☀️']
          peer-checked:after:content-['🌙']
          after:absolute after:top-1 after:left-1
          after:bg-white after:rounded-full after:h-8 after:w-8
          after:flex after:items-center after:justify-center
          after:transition-all after:duration-500
          after:shadow-md after:text-lg after:font-semibold

          peer-checked:after:translate-x-10
        "
      ></div>
    </label>
  );
}
