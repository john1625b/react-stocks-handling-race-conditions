import './App.css';
import {useEffect, useState} from "react";

const Stock = ({description, symbol}) => {
    return (
        <div className='item'>
            <div>symbol: {symbol && symbol}</div>
            <div>description: {description && description}</div>
        </div>
    )
}

function App() {
    const [stocks, setStocks] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [tooManyRequestsMessage, setTooManyRequestsMessage] = useState(false)

    useEffect(() => {
        const abortController = new AbortController()
        if (searchTerm) {
            const fetchData = async (symbol) => {
                const url = `https://us-central1-eng-interview.cloudfunctions.net/stock-api-proxy?q=${symbol}`
                console.log('url', url)
                let res = await fetch(url, abortController.signal)
                if (!res.ok) {
                    throw Error(res.statusText)
                }
                res = await res.json()
                if (abortController.signal.aborted) {
                    return
                }
                setStocks(res)
            }
            fetchData(searchTerm).catch(e => {
                console.log('error in stock fetch',)
                setTooManyRequestsMessage(true)
                setTimeout(() => {
                    setTooManyRequestsMessage(false)
                }, 1000)
            })
        }
        return () => {
            abortController.abort()
        }
    }, [searchTerm])
    return (
        <div className='App'>
            <h1>Hello World</h1>
            <input type='text' value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
            <div>{tooManyRequestsMessage && 'You querying too much'}</div>
            {
                searchTerm ?
                    stocks && stocks.result && stocks.result.map(({description, symbol}) => (
                        <Stock key={symbol} description={description} symbol={symbol}/>
                    ))
                    : <div>no results, search to find stocks</div>
            }
        </div>
    )
}

export default App;
