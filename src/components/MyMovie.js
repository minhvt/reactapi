import React, { useEffect, useState } from 'react';

function MyMovie(props) {
    const [data, setData] = useState([]);
    const [movies, setMovies] = useState("");

    const loadMovies = () => {
        let url = "https://reactnative.dev/movies.json";
        fetch(url)
            .then((res) => {
                setMovies(res.json());
                document.getElementById("title").innerHTML = movies.title;                
                console.log(movies);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log("End fetch");
            })
    }

    const loadData = async () => {
        try {
            let url = "https://reactnative.dev/movies.json";
            let respone = await fetch(url); // Chờ lấy dữ liệu
            let json = await respone.json(); // Dữ liệu trả về dạng JSON
            setData(json); // Set cho biến data
            console.log("DONE");
        } catch (error) {
            console.log("Lỗi:" + error);
        } finally {
            console.log("End fetch!");
            return;
        }
    }

    useEffect(() => { loadData() }, []);
    return (
        <div>
            <h1>Demo API - Fetch</h1>
            <hr />
            <b>Title:</b> {data.title} <br />
            <b>Desciption:</b> {data.description} <br />
            <hr />
            <ul style={{ listStyle: "none" }}>
                {data.movies?.map((item, index) => <li key={index}>[{item.id}] {item.title} ({item.releaseYear})<br /></li>)}
            </ul>
            <hr />
            Movie JSON: {movies.title} <span id='title'></span>
            <button onClick={loadMovies}>Load Movies</button>
        </div>
    );
}

export default MyMovie;