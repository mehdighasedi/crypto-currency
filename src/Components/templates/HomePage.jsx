import { useEffect } from "react";
import axios from "axios";

function HomePage() {
  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins");
  }, []);
  return <div></div>;
}

export default HomePage;
