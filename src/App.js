import {useEffect, useState} from "react";

function App() {
    const [usd, setUsd] = useState(0);
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [coinValue, setCoinValue] = useState(0);

    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers").then((response) => response.json()).then((json) => {
            setCoins(json);
            setLoading(false);
        });
    }, []);
    const onChangeUSD = (event) => setUsd(event.target.value);
    const onChangeOption = (event) => {
        const selectedCoin = coins.find((coin) => coin.name === event.target.value.split(" ")[0]);
        console.log(selectedCoin);
        setCoinValue(selectedCoin.quotes.USD.price);
    }
    console.log(coinValue);

    return (
        <div>
            <h1>The Coins!</h1>
            {loading ? <strong>Loading...</strong> : <div>
                <div>
                    <input onChange={onChangeUSD} type="number" defaultValue={usd} min={0}/><span> USD</span>
                </div>
                <div>
                    <input type="number" disabled="disabled" value={usd / coinValue}/> <span> available</span>
                </div>
                <hr/>
                <select onChange={onChangeOption}>
                    {coins.map((coin) =>
                        <option key={coin.id}>{coin.name} ({coin.symbol}): {coin.quotes.USD.price}</option>
                    )}
                </select>
            </div>
            }
        </div>
    );
}

export default App;
