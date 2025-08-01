import { ScoreHistoryChart } from "../components/base/Chart";
import { formatDate } from "../utils/utils";

const NoteHistory = ({ notes }) => {
  if (notes.length < 6) return;
  const sortedNotes = notes
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="rounded-t-4xl bg-white p-6">
      <ScoreHistoryChart data={sortedNotes.slice(0, 10)} />
      <ul className="mt-6">
        {sortedNotes.map((n) => {
          return (
            <li
              key={n.id}
              className="flex justify-between border-b border-b-gray-300 p-1"
            >
              <span>{formatDate(n.date)}</span>
              <span>
                <span className="font-bold">{n.score}</span> / 40
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NoteHistory;
