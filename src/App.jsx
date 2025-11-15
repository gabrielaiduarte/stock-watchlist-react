import "./App.css";
import { useState, useEffect } from "react";
import { fetchQuotes } from "./apiAdaptor";
import Header from "./assets/components/Header";
import AddTickerForm from "./assets/components/AddTickerForm";
import TickerRow from "./assets/components/TickerRow";

const LS_KEY = "sw_watchlist_v1";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Load symbols from localStorage on first render
  const [symbols, setSymbols] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState("");

  // Save symbols to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(symbols));
  }, [symbols]);

  // Add ticker to watchlist
  function handleAdd(symbol) {
    setSymbols((prevSymbols) => [...prevSymbols, symbol]);
  }

  // Remove ticker from watchlist (and from quotes)
  function handleRemove(symbol) {
    setSymbols((prev) => prev.filter((s) => s !== symbol));
    setQuotes((prev) => prev.filter((q) => q.symbol !== symbol));
  }

  // Refresh quotes from API
  async function handleRefresh() {
    try {
      setIsLoading(true);
      setError("");

      if (symbols.length > 0) {
        const data = await fetchQuotes(symbols);
        setQuotes(data);
      } else {
        setQuotes([]);
      }

      setLastUpdated(new Date());
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to refresh prices");
    } finally {
      setIsLoading(false);
    }
  }

  // On first load, if there are saved symbols, fetch their quotes
  useEffect(() => {
    if (symbols.length) {
      handleRefresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  return (
    <>
      <Header
        isLoading={isLoading}
        onRefresh={handleRefresh}
        lastUpdated={lastUpdated}
      />

      <div className="main-content">
        <AddTickerForm
          onAdd={handleAdd}
          existingSymbols={symbols}
          disabled={isLoading}
        />

        {error && <p className="error-msg">{error}</p>}

        {!quotes.length ? (
          <p className="empty-msg">
            <strong>No stocks in Watchlist.</strong>{" "}
            Add your first stock using the form above.
          </p>
        ) : (
          <div className="watchlist-grid">
            {quotes.map((q) => (
              <div key={q.symbol} className="row-remove-wrapper">
                <TickerRow q={q} />
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(q.symbol)}
                  disabled={isLoading}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
