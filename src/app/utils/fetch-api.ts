import qs from "qs";

const CoinURL = process.env.NEXT_PUBLIC_URL || "";

// export async function fetchAPI(
//   path: string,
//   urlParamsObject = {},
//   options = {}
// ) {
//   try {
//     // Merge default and user options
//     const mergedOptions = {
//       next: { revalidate: 50 },
//       headers: {
//         "Content-Type": "application/json",
//       },
//       ...options,
//     };

//     // Build request URL
//     const queryString = qs.stringify(urlParamsObject);
//     const requestUrl = `https://api.coingecko.com/api/v3/coins/${coinSymbol}/market_chart?vs_currency=usd&days=${timeframe}`;

//     // Trigger API call
//     // console.log('requestUrl: ', requestUrl)
//     const response = await fetch(requestUrl, mergedOptions);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw new Error(
//       `Please check if your server is running and you set all the required tokens.`
//     );
//   }
// }

// export const fetcherSwr = async (api: string) => {
//   const url = "https://whitebit.com";
//   try {
//     const response = await fetch(`${url}${api}`, {
//       method: "GET",
//       mode: "cors",
//       credentials: "include", // Include credentials in the request
//     });
//     console.log("🚀 ~ fetcherSwr ~ response:", response.json());
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   } catch (error) {
//     throw new Error("Failed to fetch data");
//   }
// };

export const fetcherSwr = async (api: string) => {
  const url = "https://api.coinranking.com";
  try {
    const response = await fetch(`${url}${api}`);
    console.log("🚀 ~ fetcherSwr ~ response:", response.json());
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
