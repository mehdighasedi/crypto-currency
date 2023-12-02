import { useEffect, useState } from "react";
import axios from "axios";
import { getCoinList } from "../../services/CoinApi";
import TableCoin from "../modules/TableCoin";
import toast from "react-hot-toast";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCoins() {
      setIsLoading(true);
      try {
        const response = await axios.get(getCoinList());
        setCoins(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCoins();
  }, []);
  return (
    <div>
      <TableCoin coins={coins} isLoading={isLoading} />
    </div>
  );
}

export default HomePage;
