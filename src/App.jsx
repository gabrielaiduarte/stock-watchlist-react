import Header from "./assets/components/Header";
import "./App.css";
import { useState, useEffect } from "react";
import AddTickerForm from "./assets/components/AddTickerForm";
import { nanoid } from "nanoid"

const LS_KEY = "sw_watchlist_v1"

export default function App() {
  const [lastUpdated, setLastUpdated] = useState(null);
  const [symbols, setSymbols] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(symbols))
  }, [symbols])

  function handleAdd(symbol){
    setSymbols((prev) => {
      if (prev.includes(symbol)) return prev;
      const updated = [...prev, symbol]
      return updated
    })
  }

  function handleRemove(symbol){
    setSymbols(prev => prev.filter(s => s !== symbol))
  }

  async function handleRefresh() {
    try {
      setLoading(true);
      setError("");
      await new Promise((r) => setTimeout(r, 600));
      setLastUpdated(new Date());
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to refresh");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <>
      <Header
        onRefresh={handleRefresh}
        lastUpdated={lastUpdated}
        loading={loading}
      />

      <div style={{padding: "0 40px", marginTop: 16}}>
        <AddTickerForm
          onAdd={handleAdd}
          existingSymbols={symbols}
          disabled={loading}
        />

        {!symbols.length ? (
          <p style={{ opacity: 0.75, marginTop: 16}}>
            <strong>No stocks in Watchlist.</strong>
            Add your first stock using the form above
          </p>
        ) : (
          <div style={{ marginTop: 16 }}>
            <h3 style={{margin: "8px 0"}}>Watchlist</h3>
            <ul>
              {symbols.map((s) => (
                  <li 
                    key={s}
                    style={{ display: "flex", alignItems: "center, gap: 8"}}
                  >
                    <span>{s}</span>
                    <button
                      type="button"
                      title={`Remove ${s}`}
                      disabled={loading}
                      onClick={() => handleRemove(s)}
                      style={{ cursor: loading ? "not-allowed" : "pointer"}}
                    >
                       x 
                    </button>
                  </li>
              ))}

            </ul>
          </div>
        )}

      </div>

      {error && (
        <p style={{ color: "orange", padding: "0 40px" }}>
          Live data unavailable: {error}
        </p>
      )}

    </>
  );
}
