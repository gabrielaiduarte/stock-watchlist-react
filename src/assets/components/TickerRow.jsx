
export default function TickerRow(props) {
    const isUp = props.q.change > 0
    const sign = isUp ? "+" : ""

    return (
        <div className="ticker-card">
            <div className={`ticker-card ${isUp ? "border-up" : "border-down"}`}>
                {/* header */}
                <div className="ticker-header">
                    <h2 className="tickerSymbol">{props.q.symbol}</h2>
                    <span className={`ticker-change-icon ${isUp ? "up" : "down"}`}>
                    {isUp ? "↗" : "↘"}
                    </span>
                </div>

                {/* Name */}
                <p className="ticker-name">{props.q.name}</p>

                {/* Main Price + change */}
                <div className="ticker-main">
                    <div>
                        <span className="label">Current price</span>
                        <p className="price">${props.q.price.toFixed(2)}</p>
                    </div>

                    <div className="daily-change">
                        <span className="label">Daily change</span>
                        <p className={`change ${isUp ? "green" : "red"}`}>
                            {sign}${props.q.change.toFixed(2)}
                        </p>
                        <span className={`pct-badge ${isUp ? "green-bg" : "red-bg"}`}>
                            {sign}{props.q.changePct.toFixed(2)}%
                        </span>
                    </div>
                </div>

                <hr />

                {/* Open, High, Low, Prev Close */}
                <div className="details-grid">
                    <div>
                        <span className="label">
                            Open:
                        </span>
                        {" "}${props.q.open.toFixed(2)}
                    </div>
                    <div>
                        <span className="label">
                            High:
                        </span>
                        {" "}${props.q.high.toFixed(2)}
                    </div>
                    <div>
                        <span className="label">
                            Low:
                        </span>
                        {" "}${props.q.low.toFixed(2)}
                    </div>
                    <div>
                        <span className="label">
                            Prev Close:
                        </span>
                        {" "}${props.q.prevClose.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}
