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
  return (
    <div className="modalContainer" onClick={() => setChart(null)}>
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
        <div className={!chart.ath ? "null" : "hide"}>
          <BottonDetails>
            <div className="types">
              <button>Prices</button>
              <button>Market Caps</button>
              <button>Total Volume</button>
            </div>
            <div className="details">
              <div>
                <p>Prices : </p>
                <span>{chart.coin.current_price}</span>
              </div>
              <div>
                <p>ATH : </p>
                <span>{chart.coin.ath}</span>
              </div>
              <div>
                <p>Market Cap : </p>
                <span>{chart.coin.market_cap}</span>
              </div>
            </div>
          </BottonDetails>
        </div>
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
      <LineChart width={500} height={600} data={data}>
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
