import { fr } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./datePicker.css";

export function DatePicker({ selected, setSelected, disabled }) {
  return (
    <>
      <input
        type="text"
        id="date"
        className="sr-only"
        value={selected?.toLocaleDateString("fr-FR") || ""}
        readOnly
        tabIndex={-1}
      />
      <DayPicker
        animate
        mode="single"
        locale={fr}
        selected={selected}
        onSelect={setSelected}
        className="rounded-xl border border-gray-400 p-4 font-normal"
        disabled={disabled}
      />
    </>
  );
}
