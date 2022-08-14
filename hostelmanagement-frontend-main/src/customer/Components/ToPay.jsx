import React, { useEffect } from 'react'
import { useState } from 'react'
import instance from '../../axios';
import { isPastTime } from '../../Util/DateTime';
import { moneyFormat } from '../../Util/Money';
import PurchaseItem from './PurchaseItem';

export default function ToPay({onTab}) {

    const [list, setList] = useState([]);

    useEffect(() => {
        let jwt = sessionStorage.getItem("jwt");

        instance.get("/booking/status/1", { headers: { 'Authorization': jwt } })
            .then((response) => {
                console.log('To Pay', response)
                setList(response.data);
            }).catch((error) => console.log(error))
    }, [])

    return (
        <>
            {
                list.slice(0).reverse().filter(item => !isPastTime(item.check_in_time)).map((item, index) =>
                    <PurchaseItem
                        roomCategory={item.name}
                        checkInTime={item.check_in_time}
                        checkOutTime={item.check_out_time}
                        image={item.image}
                        total={item.total_room}
                        bookingId={item.id}
                        tab={'topay'}
                        onTab={onTab}
                        key={index}
                    />)
            }
        </>

    )
}
