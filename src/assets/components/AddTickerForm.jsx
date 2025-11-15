import { useState, useRef } from "react"

export default function AddTickerForm(props) {

    const [symbol, setSymbol] = useState("");
    const [error, setError] = useState("")
    const inputRef = useRef(null)

    function handleSubmit(event){
        event.preventDefault();

        const clean = symbol.trim().toUpperCase();

        if (!clean){
            setError("Enter a ticker")
            return;
        }

        if (props.existingSymbols.includes(clean)){
            setError("Already in watchlist")
            return;
        } 
        
        props.onAdd(clean)
        setSymbol("")

        if(inputRef.current){
            inputRef.current.focus();
        }
        
    }

    return (
        <div className="add-form-container">
            <form
                onSubmit={handleSubmit}  
                className="add-form"  
            >
                <input
                    className="add-input"
                    value={symbol}
                    disabled={props.disabled}
                    onChange={(e) => {
                        setSymbol(e.target.value);
                        if (error) setError("")
                    }}
                    ref={inputRef}
                    placeholder="Enter ticker symbol (e.g., AAPL)"
                />
                <button
                    type="submit"
                    className="add-btn"
                    disabled={props.disabled}
                > + Add </button>
            </form>
            {error && <p className="add-error">{error}</p>}
        </div>
    )
}