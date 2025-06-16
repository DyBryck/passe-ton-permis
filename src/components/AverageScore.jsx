import circleCrossWhite from "../assets/images/circle-cross-white.png";
import greenLight from "../assets/images/green-light2.png";
import redLight from "../assets/images/red-light2.png";
import yellowLight from "../assets/images/yellow-light2.png";

const AverageScore = ({ scores }) => {
  const scoreState = {
    green: {
      color: "#0cce6b",
      message: "Tu es prêt(e) à passer l'examen !",
      image: greenLight,
    },
    yellow: {
      color: "#ff8427",
      message: "Tu es à ça d'être prêt(e) à passer l'examen !",
      image: yellowLight,
    },
    red: {
      color: "#ed254e",
      message: "Continue de t'entraîner",
      image: redLight,
    },
    gray: {
      color: "#59656F",
      message: "Nous n'avons pas assez de données",
    },
  };

  const calculateAverageScore = (scores) => {
    if (scores.length < 6) return;

    const recentScores = scores.slice(-6);
    const average =
      recentScores.reduce((a, b) => a + b, 0) / recentScores.length;

    return Math.round(average);
  };
  const averageScore = calculateAverageScore(scores);

  const getColor = (score) => {
    if (typeof score !== "number") return "gray";
    if (score >= 35) return "green";
    if (score >= 30) return "yellow";
    else return "red";
  };
  const color = getColor(averageScore);

  return (
    <div
      style={{ backgroundColor: scoreState[color].color }}
      className="relative flex min-h-[140px] justify-center gap-4 overflow-hidden rounded-2xl p-4 text-white shadow-xl"
    >
      <div className="relative z-10 flex flex-col justify-center gap-y-2">
        {averageScore ? (
          <p>
            Tu as <span className="font-bold">{averageScore}</span> de moyenne
            sur tes 6 dernières séances.
          </p>
        ) : (
          <img
            src={circleCrossWhite}
            alt=""
            className="w-16 self-center object-cover text-white opacity-35"
          />
        )}
        <p className="font-bold">{scoreState[color].message}</p>
      </div>
      {scoreState[color].image && (
        <img
          src={scoreState[color].image}
          alt=""
          className="absolute top-0 right-[-34px] z-0 w-48 rotate-[16deg] object-cover opacity-50"
        />
      )}
    </div>
  );
};

export default AverageScore;

// voir pour mettre un feu tricolore en fonction de la moyenne
// personnaliser des messages
