import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import instance from '../../axios';
import TypeRow from '../Components/TypeRow';

export default function TypeList() {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        instance.get("/roomcategory/all").then((response) => {
            setTypes(response.data);
            console.log(response.data)
        })
    }, [setTypes])

    return (
        <>
            <div className="dashboard-app">
                <div className="dashboard-content">
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <Link to="/admin/types/add"><button type="button" className="btn btn-primary"><i className="fa-solid fa-plus"></i> Add</button></Link>
                        </li>
                    </ul>

                    <table class="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <th scope="col">#</th>
                                </th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">People</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                types.map((type, index) => (
                                    <>
                                        <TypeRow type={type} index={index}/>
                                    </>

                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
