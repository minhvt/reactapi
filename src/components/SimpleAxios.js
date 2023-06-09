import axios from 'axios';
import React, { useEffect, useState } from 'react';


function SimpleAxios(props) {
    const [data, setData] = useState([]);


    const loadAPI = () => {
        let urlAPI = "https://reactnative.dev/movies.json";
        axios.get(urlAPI)
            .then(res => {
                setData(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }


    useEffect(() => { loadAPI() }, []);
    return (
        <div>
            <h1>AXIOS:</h1>
            {data.title} / {data.description} <br />
            <ul style={{ listStyle: "none" }}>
                {data.movies?.map((item, index) => <li key={index}>[{item.id}] {item.title} ({item.releaseYear})<br /></li>)}
            </ul>
        </div>
    );
}


export default SimpleAxios;
