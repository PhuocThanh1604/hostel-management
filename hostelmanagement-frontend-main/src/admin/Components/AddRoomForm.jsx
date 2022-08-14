import React, { useState } from 'react'
import { toast } from 'react-toastify';
import instance from '../../axios';

export default function AddRoomForm({ roomCategories, close, setOnAdd }) {
    const [name, setName] = useState(null);
    const [type, setType] = useState(1);
    const [working, setWorking] = useState(true);

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleType = (e) => {
        setType(JSON.parse(e.target.value).id);
    }

    const handleSwitch = (e) => {
        setWorking(e.target.checked)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const room = {
            name: name,
            status: working
        }

        instance.post(`/room/create/category/${type}/status/1`, room).then((response) => {
            if (response.status === 201) {
                toast.success(`Add a room successfully!`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                setOnAdd(true);
                close();
            }
        })
    }



    return (
        <>
            <div className='card border-0'>
                <div className="modal-header">
                    <h5 className="modal-title">Add Room</h5>
                    <button type="button" className="btn-close" onClick={close} />
                </div>

                <div className='p-4'>
                    <form>
                        <div className="mb-3 mt-2">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" required onChange={handleName} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Type of room</label>
                            <select className="form-select" required onChange={handleType}>
                                {
                                    roomCategories && (
                                        roomCategories.map((cate, index) =>
                                            <option value={JSON.stringify(cate)}>{cate.name}</option>
                                        )
                                    )
                                }
                            </select>
                        </div>
                        <div className='mb-3'>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" defaultChecked onChange={handleSwitch} />
                                <label className="form-check-label" >Working</label>
                            </div>

                        </div>
                        <div className='text-end'>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}><i className="fa-solid fa-plus"></i> Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
