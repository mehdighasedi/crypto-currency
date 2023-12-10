import { Children, useState } from "react";
import { convertData } from "../../helpers/convertData";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import { Rings } from "react-loader-spinner";

function ChartModal({ chart, setChart, type, setType }) {
  console.log(convertData(chart, type));
  console.log(chart);

  const HandlePrice = (e) => {
    if (e.target.tagName === "BUTTON") {
      setType(e.target.innerHTML.toLowerCase().replace(" ", "_"));
    }
  };
  return (
    <div className="modalContainer">
      <div className="chart">
        <div className="names">
          <img
            src={chart.coin.image || chart.coin.large}
            alt={chart.coin.name}
          />
          <p>{chart.coin.name}</p>
        </div>
        <div className="graph">
          {!chart ? (
            <Rings
              height="80"
              width="80"
              color="#4fa94d"
              radius="10"
              wrapperStyle={{}}
              visible={true}
              ariaLabel="rings-loading"
            />
          ) : (
            <ChartComponents type={type} data={convertData(chart, type)} />
          )}
        </div>
        {chart.coin.current_price ? (
          <BottonDetails>
            <div className="types" onClick={HandlePrice}>
              <button className={type === "prices" && "selected"}>
                Prices
              </button>
              <button className={type === "market_caps" && "selected"}>
                Market Caps
              </button>
              <button className={type === "total_volumes" && "selected"}>
                Total Volumes
              </button>
            </div>
            <div className="details">
              <div>
                <p>Prices : </p>
                <span>{chart.coin.current_price || "Unavailable"}</span>
              </div>
              <div>
                <p>ATH : </p>
                <span>{chart.coin.ath || "Unavailable"}</span>
              </div>
              <div>
                <p>Market Cap : </p>
                <span>{chart.coin.market_cap || "Unavailable"}</span>
              </div>
            </div>
          </BottonDetails>
        ) : (
          <BottonDetails></BottonDetails>
        )}
        <button className="btnClose" onClick={() => setChart(null)}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ChartModal;

export function ChartComponents({ data, type }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={600} height={800} data={data}>
        <CartesianGrid stroke="#404042" />
        <Line type="monotone" dataKey={type} stroke="#3874ff" />
        <Legend />
        <Tooltip />
        <YAxis dataKey={type} domain={["auto", "auto"]} width={90} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function BottonDetails({ chart, children }) {
  return <>{children}</>;
}
