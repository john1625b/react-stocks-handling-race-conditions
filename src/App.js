import './App.css';
import {useEffect, useState, useCallback, memo} from "react";

const Wine = memo(({winery, wine, average, reviews, image}) => {
    console.log('rendered')
    const numStars = parseInt(average[0])
    return (
        <div className='wine'>
            <img src={image} alt='wine' height='100px' />
            <div>wine name: {wine && wine}</div>
            <div>winery: {winery && winery}</div>
            <div>
                <p>reviews:</p>
                <div>{numStars !== null && '★'.repeat(numStars) }</div>
                <div>{reviews && reviews}</div>
            </div>
        </div>
    )
})

function App() {
    const [wines, setWines] = useState(null)
    const [wineType, setWineType] = useState('reds')
    const [nameSearch, setNameSearch] = useState('')
    const fetchData = async (wineType) => {
        let res = await fetch(`https://api.sampleapis.com/wines/${wineType}`)
        res = await res.json()
        setWines(res.slice(0,10))
    }
    useEffect(() => {
        fetchData(wineType)
    }, [])
    useEffect(() => {
        fetchData(wineType)
    },[wineType])
    const filterWines = (data, nameSearch) => {
        return data.filter(wine => {
            return wine?.wine?.toLowerCase().includes(nameSearch)
        })
    }
    // console.log(wines && wines[0])
    const wineTypesList = ['reds', 'whites', 'sparkling', 'rose', 'dessert', 'port']
    return (
        <div className='App'>
            <h1>wines with choices</h1>
            <form>
                <label>
                    Search by Name:
                    <input type="text" value={nameSearch} onChange={e => setNameSearch(e.target.value.toLowerCase())} />
                </label>
            </form>
            <h2>selected wine: {wineType}</h2>
            {
                wineTypesList.map(type => (
                    <button key={type} onClick={() => setWineType(type)}>{type}</button>
                ))
            }
            {
                wines ? filterWines(wines, nameSearch).map(({winery, wine, rating, location, image, id}) => (
                    <Wine key={id} winery={winery} wine={wine} average={rating.average} reviews={rating.reviews}
                          location={location} image={image}/>
                ))
                : <div>Loading...</div>
            }
        </div>
    )
}

export default App;
