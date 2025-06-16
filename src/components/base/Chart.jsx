import { useMemo } from "react";
import { Chart } from "react-charts";

export const ScoreHistoryChart = ({ data }) => {
  const getPrimaryColor = () => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(
      "--primary",
    );
    return `rgb(${raw.trim()})`;
  };

  const primaryColor = useMemo(() => getPrimaryColor(), []);

  const formattedData = useMemo(() => {
    return [
      {
        label: "Notes",
        data: data.map((entry) => ({
          date: new Date(entry.date),
          score: entry.score,
        })),
      },
      {
        label: "Seuil",
        data: data.map((entry) => ({
          date: new Date(entry.date),
          score: 35,
        })),
      },
    ];
  }, [data]);

  const primaryAxis = useMemo(
    () => ({
      getValue: (d) => d.date,
      scaleType: "time",
    }),
    [],
  );

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (d) => d.score,
        min: 0,
        max: 40,
      },
    ],
    [],
  );

  const getDatumStyle = (datum) => {
    const score = datum.originalDatum.score;

    if (datum.seriesLabel === "Seuil") {
      return {
        fill: "#0cce6b",
        stroke: "#0cce6b",
        circle: { r: 4 },
      };
    }

    let pointColor = "#ff8427";

    if (score <= 30) pointColor = "#ed254e";
    else if (score >= 35) pointColor = "#0cce6b";

    return {
      fill: pointColor,
      stroke: pointColor,
      circle: { r: 5 },
    };
  };

  const getSeriesStyle = (series) => {
    if (series.label === "Seuil") {
      return {
        stroke: "#0cce6b",
        strokeWidth: 2,
      };
    }

    return {
      stroke: primaryColor,
      strokeWidth: 3,
    };
  };

  return (
    <div className="h-64 w-full">
      <Chart
        options={{
          data: formattedData,
          primaryAxis,
          secondaryAxes,
          getDatumStyle,
          getSeriesStyle,
          tooltip: true,
        }}
      />
    </div>
  );
};
