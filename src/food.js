import axios from 'axios';
import React, {useState} from 'react';
import './food.css';
import cake from './img/cake.png';
import kitchen from './img/kitchen.jpg';

const Food = () => {

    const [query,setQuery] = useState('');
    const [rcp,setRcp] = useState([]);
    const [list,setList] = useState('alcohol-free');


    const YOUR_APP_ID = '605ef2f9';
    const YOUR_APP_KEY = '31a98230d84edb1d67b1364ec7a98a06';
    const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${list}`;

    async function getRecipe(){
        const result = await axios.get(url)
        setRcp(result.data.hits)
        console.log(result.data)
    }

    const submitForm = e => {
        e.preventDefault();
        getRecipe();
    }

    return (
        <div className='App'>
            <div className="header">
                <nav className='nav'>

                    <div className="logo">
                        <a href="#"><img src={cake} className='cake' alt=""/></a>
                    </div>

                    <ul className='menu-links'>
                        <li><a href="#">Sponsors</a></li>
                        <li><a href="#">Customers</a></li>
                        <li><a href="#">Meals</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>

                    <form className='form1' onSubmit={submitForm}>
                        <input type="text" placeholder='enter name of product' value={query} onChange={e => setQuery(e.target.value)}/>
                        <button type='submit' className='submit-button'>Enter</button>
                    </form>

                </nav>
            </div>
            <div>

                <div className='text'>
                    <h1><span className='span-h1'>Fastest Delivery</span> On Earth</h1>
                    <p>Feel The <span>Taste</span></p>
                </div>

                <div className='print'>
                    {rcp.map((item,index) => {
                        return (
                            <div key={index} className='products'>
                                <img className='product-img' src={item['recipe']['image']} alt=""/>
                                <p><span>name: </span>{item['recipe']['label']}</p>
                                <p><span>Calories: </span>{item['recipe']['calories'].toFixed(2)}</p>
                                <div className='buttons'>
                                    <p>{<a className='recipe-link' href={item['recipe']['url']}>Open</a>}</p>
                                    <button className='order-button'>Order</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Food;