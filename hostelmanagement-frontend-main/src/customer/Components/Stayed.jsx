import React, { useEffect, useState } from 'react'
import instance from '../../axios';
import { moneyFormat } from '../../Util/Money';
import PurchaseItem from './PurchaseItem';

export default function Stayed() {
    const [list, setList] = useState([]);

    useEffect(() => {
        let jwt = sessionStorage.getItem("jwt");

        instance.get("/booking/status/2", { headers: { 'Authorization': jwt } })
            .then((response) => {
                console.log('Stayed', response)
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
