import { useState, useRef } from "react"

export default function AddTickerForm(props) {
    const [symbol, setSymbol] = useState("")
    const [error, setError] = useState("")
    const inputRef = useRef(null);

    function handleSubmit(event) {
        event.preventDefault();
        const clean = symbol.trim().toUpperCase();

        if (clean === ""){
            setError("Enter a ticker")
            return;
        }

        if (props.existingSymbols.includes(clean)) {
            setError("Already in watchlist");
            return;
        }

        props.onAdd(clean)
        setSymbol("");
        if (inputRef.current) {
            inputRef.current.focus();
        }

    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        value={symbol}
                        onChange={(e) => {
                            setSymbol(e.target.value)
                            if (error) setError ("")
                        }}
                        placeholder="Enter ticker (e.g., AAPL)"
                        disabled={props.disabled}
                    >
                    </input>
                     <button
                        disabled={props.disabled}
                        >
                    + Add
                     </button>
                </form>
                {error && <p style={{color: "red", fontSize: "0.9rem"}}>{error}</p>}
            </div>
        </>
    )
}