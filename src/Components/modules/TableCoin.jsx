import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { Rings } from "react-loader-spinner";

function TableCoin({ coins, isLoading }) {
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
            <TableRow key={coin.id} {...coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableCoin;

function TableRow({
  image,
  name,
  symbol,
  current_price,
  price_change_percentage_24h,
  total_volume,
}) {
  return (
    <tr>
      <td>
        <div className="symbol">
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>${current_price.toLocaleString()}</td>
      <td className={price_change_percentage_24h > 0 ? "success" : "error"}>
        {price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>${total_volume.toLocaleString()}</td>
      <td>
        <img
          src={price_change_percentage_24h > 0 ? chartUp : chartDown}
          alt={name}
        />
      </td>
    </tr>
  );
}
