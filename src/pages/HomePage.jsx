import { useEffect, useState } from "react";
import AverageScore from "../components/AverageScore";
import NoteHistory from "../components/NoteHistory";
import { supabase } from "../lib/supabase";

const HomePage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("id,score,date");
      if (error) {
        console.error(error.message);
      } else {
        setNotes(data);
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      <div className="mb-4 px-4 pt-4">
        <AverageScore scores={notes.map((n) => n.score)} />
      </div>
      <NoteHistory notes={notes} />
    </>
  );
};

export default HomePage;
