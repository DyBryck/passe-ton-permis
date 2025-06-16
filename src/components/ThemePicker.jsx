import { useThemeColor } from "../hooks/useThemeColor";
import { hexToRgbString } from "../utils/utils";

export default function ThemePicker() {
  const [color, setColor] = useThemeColor();

  const colors = ["#00A6F5", "#FEA5D5", "#F7339A"];

  return (
    <div className="rounded-t-4xl bg-white p-4">
      <p className="mb-4">Choisis ton thème :</p>
      <div className="flex gap-4">
        {colors.map((c) => (
          <button
            key={c}
            style={{
              backgroundColor: c,
              outline: hexToRgbString(c) === color ? "2px solid white" : "none",
            }}
            className="p4 h-6 w-6 rounded-full"
            onClick={() => setColor(hexToRgbString(c))}
          ></button>
        ))}
      </div>
    </div>
  );
}
