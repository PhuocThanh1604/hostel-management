import React, { useEffect, useState } from 'react'
import instance from '../../axios';
import { isPastTime } from '../../Util/DateTime';
import { moneyFormat } from '../../Util/Money';
import PurchaseItem from './PurchaseItem';

export default function Stayting() {
    const [list, setList] = useState([]);

    useEffect(() => {
        let jwt = sessionStorage.getItem("jwt");

        instance.get("/booking/status/4", { headers: { 'Authorization': jwt } })
            .then((response) => {
                console.log('Staying', response)
                setList(response.data);
            }).catch((error) => console.log(error))
    }, [])

    return (
        <>
            {
                list.map((item, index) =>
                    <PurchaseItem
                        roomCategory={item.name}
                        checkInTime={item.check_in_time}
                        checkOutTime={item.check_out_time}
                        total={item.total_room}
                        image={item.image}
                        bookingId={item.id}
                        key={index}
                    />)
            }
        </>
    )
}
