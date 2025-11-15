import Arrow from "../images/arrow-img.png"

export default function Header(props) {

    const time =
        props.lastUpdated
        ? new Date(props.lastUpdated).toLocaleTimeString(
            [], {hour: "2-digit", minute:"2-digit"}) : "--:--";

    return (
        <header>
            <div className="left">
                <img src={Arrow} alt="arrow image"/>
                <div className="TitleName">
                    <h1>Stock Watchlist</h1>
                    <p>Track your favorite stocks and monitor their performance</p>
                </div>
            </div>

            <div className="right">
                <button
                    className="refresh-btn"
                    onClick={props.onRefresh}
                    disabled={props.isLoading}
                >
                    {props.isLoading ? "Refreshing..." : "Refresh"}
                </button>
                <p className="last-updated">Last updated: {time}</p>
            </div>
        </header>
    )
}