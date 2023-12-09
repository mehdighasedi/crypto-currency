import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { Rings } from "react-loader-spinner";
import axios from "axios";
import { marketChart } from "../../services/CoinApi";
import toast from "react-hot-toast";

function TableCoin({ coins, isLoading, currency, setChart }) {
  if (isLoading)
    return (
      <Rings
        height="80"
        width="80"
        color="#4fa94d"
        radius="10"
        wrapperStyle={{}}
        visible={true}
        ariaLabel="rings-loading"
      />
    );
  console.log(coins);
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Coins</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h</th>
            <th>Total Volume</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <TableRow
              key={coin.id}
              coin={coin}
              currency={currency}
              setChart={setChart}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableCoin;

function TableRow({ coin, setChart, currency }) {
  const {
    image,
    name,
    symbol,
    current_price,
    price_change_percentage_24h,
    total_volume,
    id,
  } = coin;

  async function handleShow() {
    try {
      const { data } = await axios.get(marketChart(id, currency));
      setChart({ ...data, coin });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <tr>
      <td>
        <div className="symbol" onClick={handleShow}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currency === "eur" ? "€" : currency === "jpy" ? "¥" : "$"}
        &nbsp;
        {current_price.toLocaleString()}
      </td>

      <td className={price_change_percentage_24h > 0 ? "success" : "error"}>
        {price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>
        {currency === "eur" ? "€" : currency === "jpy" ? "¥" : "$"}
        &nbsp;
        {total_volume.toLocaleString()}
      </td>
      <td>
        <img
          src={price_change_percentage_24h > 0 ? chartUp : chartDown}
          alt={name}
        />
      </td>
    </tr>
  );
}
