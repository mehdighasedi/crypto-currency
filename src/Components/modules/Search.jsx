import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { marketChart, searchList } from "../../services/CoinApi";
import toast from "react-hot-toast";
import { Rings } from "react-loader-spinner";

function Search({ currency, setCurrency, setChart, coins }) {
  const [searchedText, setSearchedText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchedCoins, setSearchedCoins] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    async function search() {
      setSearchLoading(true);
      setSearchedCoins([]);
      try {
        if (!searchedText) return;
        const response = await axios.get(searchList(searchedText), {
          signal: controller.signal,
        });
        if (response.data.coins) setSearchedCoins(response.data.coins);
        console.log(searchedCoins);
        setSearchLoading(false);
      } catch (error) {
        if (error.name !== "AbortError" && error.name === "canceled")
          toast.error(error.message);
        setSearchLoading(false);
        // console.log(error.message);
      } finally {
        setSearchLoading(false);
      }
    }
    search();

    return () => controller.abort();
  }, [searchedText]);

  console.log(searchedCoins);
  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder="Search ..."
        value={searchedText}
        onChange={(e) => setSearchedText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      <div className={`previewSearch ${!searchedText ? "hide" : ""}`}>
        {searchLoading && (
          <div className="loader">
            <Rings
              height="80"
              width="80"
              color="#4fa94d"
              radius="10"
              wrapperStyle={{}}
              visible={true}
              ariaLabel="rings-loading"
            />
          </div>
        )}
        <ul>
          {searchedCoins.map((coin) => (
            <SearchList
              key={coin.id}
              coin={coin}
              setChart={setChart}
              currency={currency}
              coins={coins}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;

function SearchList({ coin, setChart, coins, currency }) {
  const { thumb, name, id } = coin;
  const { market_cap, ath, current_price } = coins;

  async function handleSearchShow() {
    try {
      const { data } = await axios.get(marketChart(id, currency));
      setChart({ ...data, coin, market_cap, ath, current_price });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <li>
      <div className="item" onClick={handleSearchShow}>
        <img src={thumb} alt={name} />
        <p>{name}</p>
      </div>
    </li>
  );
}
