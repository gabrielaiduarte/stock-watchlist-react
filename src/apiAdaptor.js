const AV_BASE = "https://www.alphavantage.co/query";
const KEY = (import.meta.env.VITE_ALPHA_KEY || "").trim();

// Build the API URL
function makeUrl(params = {}) {
  const url = new URL(AV_BASE);
  Object.entries({ ...params, apikey: KEY }).forEach(([k, v]) =>
    url.searchParams.set(k, v)
  );
  return url.toString();
}

// Fetch quotes for each symbol using Alpha Vantage "GLOBAL_QUOTE" endpoint
export async function fetchQuotes(symbols = []) {
  if (!symbols.length) return [];

  const results = [];

  for (const symbol of symbols) {
    try {
      const url = makeUrl({
        function: "GLOBAL_QUOTE",
        symbol: symbol,
      });

      const res = await fetch(url);
      const json = await res.json();

      const q = json["Global Quote"];

      // If the API doesn't return a proper response
      if (!q) {
        results.push({
          symbol,
          name: symbol,
          price: 0,
          prevClose: 0,
          open: 0,
          high: 0,
          low: 0,
          change: 0,
          changePct: 0,
          error: "No data",
        });
        continue;
      }

      results.push({
        symbol,
        name: symbol, // Free plan doesn't give real company name
        price: Number(q["05. price"]),
        prevClose: Number(q["08. previous close"]),
        open: Number(q["02. open"]),
        high: Number(q["03. high"]),
        low: Number(q["04. low"]),
        change: Number(q["09. change"]),
        changePct: Number(q["10. change percent"]?.replace("%", "")),
        error: null,
      });
    } catch (err) {
      results.push({
        symbol,
        name: symbol,
        price: 0,
        prevClose: 0,
        open: 0,
        high: 0,
        low: 0,
        change: 0,
        changePct: 0,
        error: "Fetch error",
      });
    }
  }

  return results;
}
