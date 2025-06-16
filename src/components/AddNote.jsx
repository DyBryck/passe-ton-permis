import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { supabase } from "../lib/supabase";
import { DatePicker } from "./base/DatePicker";

const AddNote = () => {
  const navigate = useNavigate();
  const user = useOutletContext();

  const [date, setDate] = useState();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNoteChange = (e) => {
    let raw = e.target.value;

    if (!/^\d{0,2}$/.test(raw)) return;

    if (raw === "") {
      setNote("");
      return;
    }

    let value = parseInt(raw, 10);
    if (value > 40) value = 40;

    setNote(value.toString());
  };

  const handleAddNote = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    if (!user) {
      navigate("/connexion");
      return;
    }
    if (!date) {
      setLoading(false);
      setError("Vous n'avez pas choisi de date");
      return;
    }
    if (!note) {
      setLoading(false);
      setError("Vous n'avez pas entré de note");
      return;
    }

    const dt = new Date(date);

    const now = new Date();
    dt.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds(),
    );

    const pad = (n) => String(n).padStart(2, "0");
    const formattedDate =
      `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}` +
      ` ${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`;

    const { error } = await supabase
      .from("notes")
      .insert({ uid: user.id, score: note, date: formattedDate });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
    setDate(null);
    setNote("");
  };

  return (
    <div className="flex flex-col gap-4 rounded-t-4xl bg-white p-6">
      <h2 className="text-xl font-bold">Ajouter une note</h2>
      <form onSubmit={handleAddNote} className="flex flex-col font-semibold">
        <label htmlFor="date" className="mb-1">
          Jour de ta séance
        </label>
        <DatePicker
          id={"date"}
          selected={date}
          setSelected={setDate}
          disabled={loading}
        />
        <label htmlFor="note" className="mt-4 mb-1">
          Note
        </label>
        <input
          id="note"
          type="text"
          inputMode="numeric"
          pattern="\d*"
          value={note}
          onChange={handleNoteChange}
          disabled={loading}
          placeholder="Entre la note que tu as obtenue"
          className="mb-4 rounded-lg border border-gray-400 p-3 font-normal focus:outline-[rgb(var(--primary))]"
        />
        <input
          type="submit"
          value="Ajouter"
          disabled={loading}
          className="rounded-lg bg-[rgb(var(--primary))] py-3 text-lg font-bold text-white"
        />
        {error && <p className="mt-4 text-center text-red-400">{error}</p>}
      </form>
    </div>
  );
};

export default AddNote;
