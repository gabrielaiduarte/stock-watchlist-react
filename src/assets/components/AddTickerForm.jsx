// couple of things:
// 1. the components folder probably shouldn't be inside of assets; assets
// is typically reserved for static assets like images. better to have components
// be a sibling of assets, and a child of components.

// 2. your indentation in these files is inconsistent with your indentation in the top level js(x) files. semicolon usage in here is inconsistent too. this is another thing a formatting tool can help automate for you!

import { useState, useRef } from "react"

export default function AddTickerForm(props) {
    // in general, it's helpful to explicitly destucture the props
    // so that you can tell from the function definition what props are passed in
    // eg. function AddTickerForm({ existingSymbols, onAdd, disabled }) { /* ... */ }

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
                        // slight preference for defining this up above as a handleChange function, so that you're doing less mixing of logic and UI in the return here
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