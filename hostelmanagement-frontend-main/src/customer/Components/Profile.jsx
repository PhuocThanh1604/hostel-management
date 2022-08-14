import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import instance from '../../axios';

export default function Profile({ user }) {
    const [onEdit, setOnEdit] = useState(false)
    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        let userModification = {
            phone: (data.phone !== "") ? data.phone : user.phone,
            profile: {
                fullName: (data.full_name !== "") ? data.full_name : user.profile.fullName,
                cardNumber: (data.card_number !== "") ? data.card_number : user.profile.cardNumber,
            },
        };
        const token = sessionStorage.getItem("jwt");
        const updateStatus = await instance.put('/account/update', userModification, { headers: { 'Authorization': token } });
        window.location.reload();
    };

    return (
        <div className="card cus-profile-book-card">
            <div className="card-body bg-white ">
                {
                    onEdit ? (
                        <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="text-center">
                                    <img src={user.profile.picture} alt="" />
                                </div>
                                <div className="mb-3 mt-4">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" placeholder="Nguyen Van A..." {...register("full_name")} defaultValue={user.profile.fullName || ""}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Card Number (10 numbers)</label>
                                    <input type="NUMBER" className="form-control" defaultValue={user.profile.cardNumber || ""} {...register("card_number")} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone Number (10 numbers)</label>
                                    <input type="number" className="form-control" defaultValue={user.phone || ""} {...register("phone")} />
                                </div>
                                <div className='text-center mt-4'>
                                    <button type="button" onClick={() => setOnEdit(false)} className='btn btn-dark w-30'>CLOSE</button>
                                    {" "}
                                    <button type="submit" className='btn btn-primary w-30'>UPDATE</button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="text-center">
                                <img src={user.profile.picture} alt="" />
                            </div>
                            <div className="text-center">
                                <label htmlFor="text" className="text-uppercase mt-4 mb-2 "> {user.profile.fullName}</label>
                            </div>
                            <label htmlFor="text" className="text-muted mt-4"><i className="fbi bi-envelope"></i> {user.email}</label>
                            <label htmlFor="text" className="d-block text-muted mt-4"><i className="bi bi-credit-card-2-front"></i> {user.phone || " Update!"}</label>
                            <label htmlFor="text" className="d-block text-muted mt-4"><i className="bi bi-credit-card-2-front"></i> {user.profile.cardNumber || " Update!"}</label>
                            <div className='text-center mt-4'>
                                <button className='btn btn-primary w-50' onClick={() => setOnEdit(true)}>Edit</button>
                            </div>
                        </>
                    )
                }
            </div >


        </div >
    )
}
