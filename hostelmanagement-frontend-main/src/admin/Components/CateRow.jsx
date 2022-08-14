import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import instance from '../../axios';
import { moneyFormat } from '../../Util/Money';

export default function CateRow({ room, roomCategories }) {

    const [price, setPrice] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        setPrice(room.roomCategory.price)
    }, [setPrice])

    useEffect(() => {
        setStatus(room.status)
    }, [setStatus])

    const displayStatus = (status) => {
        if (status) {
            return {
                text: "Working",
                icon: "fa-solid fa-bolt"
            }
        }
        else {
            return {
                text: "Not Working",
                icon: "fa-solid fa-bolt-slash"
            }
        }
    }

    const updateCategoryForRoom = (e) => {
        const category = JSON.parse(e.target.value)
        setPrice(category.price)
        instance.put(`/room/update_category/id/${room.id}/category/${category.id}`, null).then((response) => {
            if (response.status === 201) {
                toast.success(`Update category for ${room.name} successfully!`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        })
    }

    const updateNameForRoom = (e) => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
            instance.put(`/room/update_name/id/${room.id}`, e.target.value).then((response) => {
                if (response.status === 201) {
                    toast.success(`Update new name successfully!`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });


                }
            })
        }
    }

    const updateStatusForRoom = (status) => {
        setStatus(status)
        instance.put(`/room/update_status/id/${room.id}`, status).then((response) => {
            if (response.status === 201) {
                toast.success(`Update status for ${room.name} successfully!`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        })
    }


    return (
        <>
            <tr>
                <th scope="row">{room.id}</th>
                <td >{room.name}
                    <input type={"text"} defaultValue={room.name} onKeyDown={updateNameForRoom} />
                </td>
                <td>
                    <select className="form-select" onChange={updateCategoryForRoom}>
                        {
                            roomCategories && (
                                roomCategories.map((cate, index) =>
                                    <option value={JSON.stringify(cate)} disabled={(room.roomCategory.name === cate.name) ? true : false} selected={(room.roomCategory.name === cate.name) ? true : false}>{cate.name}</option>
                                )
                            )
                        }
                    </select>
                </td>
                <td><input value={moneyFormat(price || 0)} disabled type={"text"} /></td>
                <td>{displayStatus(status).text}{" "}
                    <button type="button" className="btn btn-warning"
                        onClick={() => (status) ? updateStatusForRoom(false) : updateStatusForRoom(true)}>
                        <i className={displayStatus(status).icon}></i>
                    </button>
                </td>
            </tr>
        </>
    )
}
