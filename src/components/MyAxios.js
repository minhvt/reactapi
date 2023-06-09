import axios from 'axios';
import React, { useEffect, useState } from 'react';

function MyAxios(props) {
    let apiurl = "http://localhost:3000/nhanvien";
    const [db, setDB] = useState([]);
    const [inputs, setInputs] = useState({});    
    const loadAPI = () => {
        axios.get(apiurl)
            .then(res => {
                setDB(res.data);
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LOAD DONE!");
            })
            .catch(err => console.log(err))
    }

    // Hàm cập nhật dữ liệu form
    const handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;

        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    // Hàm quản lý submit dữ liệu form tới API
    const submitForm = (event) => {
        event.preventDefault();
        // Đẩy dữ liệu tới API        
        axios.post(apiurl, inputs)
            .then(res => {
                console.log(res);
                loadAPI();
            })
            .catch(err => {
                console.log(err);
            });
    }
    useEffect(() => { loadAPI() }, []);
    return (
        <div>
            <center>
                <form action='http://localhost:3000/nhanvien' method='post' onSubmit={submitForm}>
                    <table border="1">
                        <tr>
                            <th>Fullname</th>
                            <td>
                                <input type='text' id='id' name='id' hidden value={inputs.id} />
                                <input type='text' id='fullname' name='fullname' value={inputs.fullname} onChange={handleChange} required />
                            </td>
                        </tr>
                        <tr>
                            <th>Year of birth</th>
                            <td>
                                <input type='number' id='yob' name='yob' value={inputs.yob} onChange={handleChange} min="1990" />
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td>
                                <input type='submit' value="Add new" />
                            </td>
                        </tr>
                    </table>
                </form>
            </center>
            <hr />
            <h2>Danh sách nhân viên ({db.length})</h2>
            <ul style={{ listStyle: "none" }}>
                {db?.map((item, index) => { return (<li key={index}>{item.id}. {item.fullname} ({item.yob})</li>) })}
            </ul>
        </div>
    );
}

export default MyAxios;