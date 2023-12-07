
const BASE_URL = "https://api.coingecko.com/api/v3"
const key = "CG-gfCdEceMgJhicNE8hthhyRnf";
const getCoinList = (page, currency) => `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&locale=en&x_cg_demo_api_key=${key}`;

const searchList = query => `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${key}`;

export { getCoinList, searchList }