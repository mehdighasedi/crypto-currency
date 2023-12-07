import { useEffect, useState } from "react";
import axios from "axios";
import { getCoinList } from "../../services/CoinApi";
import TableCoin from "../modules/TableCoin";
import toast from "react-hot-toast";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");

  useEffect(() => {
    async function fetchCoins() {
      setIsLoading(true);
      try {
        const response = await axios.get(getCoinList(page, currency));
        setCoins(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCoins();
  }, [page, currency]);
  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin coins={coins} currency={currency} isLoading={isLoading} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default HomePage;
