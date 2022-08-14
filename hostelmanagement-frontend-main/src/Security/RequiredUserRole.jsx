import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import instance from '../axios';
import Loading from '../customer/Components/Loading';


export default function RequiredUserRole({ children }) {
    const [loading, setLoading] = useState(true);
    const [premission, setPremisstion] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        let jwt = sessionStorage.getItem("jwt");
        instance
            .get("/account/user", { headers: { Authorization: jwt } })
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.roles[0].name !== "user") {
                        navigate("/", { replace: true })
                    } else {
                        setLoading(false);
                        setPremisstion(true);
                    }
                } else {
                    navigate("/", { replace: true })
                }
            });
    }, [setPremisstion])

    return (
        <>
            {loading && <Loading />}
            {premission && children}
        </>
    )
}
