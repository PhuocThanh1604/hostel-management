import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import instance from '../../axios'
import { moneyFormat } from '../../Util/Money';

export default function TypeRow({ type, index }) {
    const [status, setStatus] = useState(type.status);


    const removeARoomType = (thisTypeId) => {
        instance.put(`/roomcategory/delete/${thisTypeId}`, null).then((response) => {
            if (response.status === 200) {
                toast.success("Delist Room Type Successfully !", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                setStatus(false);

            }
        })
    }


    const unRemoveARoomType = (thisTypeId) => {
        instance.put(`/roomcategory/undelete/${thisTypeId}`, null).then((response) => {
            if (response.status === 200) {
                toast.success("Relist Room Type Successfully !", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                setStatus(true);
            }

        })
    }

    return (
        <>
            <tr>
                <th scope="row">{index}</th>
                <td>{type.name}</td>
                <td>{moneyFormat(type.price || 0)}</td>
                <td>{type.people}</td>
                <td>{status ? "Published" : "Not Published"}</td>
                <td>
                    <Link to={`/admin/types/update/${type.id}`}>
                        <button type="button" className="btn btn-success"><i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </Link>
                    {" "}
                    <button type="button" className="btn btn-danger"
                        onClick={() => (status) ? removeARoomType(type.id) : unRemoveARoomType(type.id)}>
                        {
                            (status) ? (
                                <i className={`fa-solid fa-eye`}></i>
                            ) : (
                                <i className={`fa-solid fa-eye-slash`}></i>
                            )
                        }

                    </button>
                </td>
            </tr>
        </>
    )
}
