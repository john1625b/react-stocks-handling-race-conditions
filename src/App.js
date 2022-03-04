import './App.css';
import {useEffect, useState, useCallback, memo} from "react";

const Beer = ({price, name, image, id}) => {
    const [hide, setHide] = useState(true)
    return (<div className='beer'>
        <img alt='beer' src={image && image}/>
        <button onClick={() => setHide(prev => !prev)}>{hide ? '+' : '-'}</button>
        {hide &&
            <>
                <div>{price && price}</div>
                <div>{name && name}</div>
            </>
        }
    </div>)
}

function App() {
    const [beers, setBeers] = useState(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            let res = await fetch('https://api.sampleapis.com/beers/ale')
            res = await res.json()
            setBeers(res)
        }
        fetchData().catch(e => console.error(e))
    }, []);
    const filterBeers = (data, text) => {
        return data.filter(item => {
            return item?.name.toLowerCase().includes(text) &&
                item?.price.slice(1).replace('.', '').includes(price.replace('.', ''))
        })
    }

    console.table(price)
    return (<div className="App">
        <h1>Together Assessment</h1>
        <div>filter by name:</div>
        <input value={name} onChange={e => setName(e.target.value.toLowerCase())}/>
        <div>filter by price</div>
        <input type='number' value={price} onChange={e => setPrice(e.target.value)}/>
        {beers && filterBeers(beers, name).map(({price, name, image, id}) => (
            <Beer key={id} price={price} name={name} image={image}/>))}
    </div>);
}

export default App;
