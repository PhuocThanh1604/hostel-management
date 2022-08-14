import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import instance from '../../axios';
import ImageUploading from 'react-images-uploading';
import storage from '../../Util/FireBase';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";

export default function AddType() {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            bath: 0,
            bed: 0
        }
    });
    const [type, setType] = useState(null);
    const [publish, setPublish] = useState(false);
    const [images, setImages] = useState([]);
    const maxNumber = 69;
    let navigate = useNavigate();

    const onImage = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


    let { id } = useParams();

    useEffect(() => {
        if (id) {
            instance.get(`roomcategory/id/${parseInt(id)}`).then((response) => {

                console.log(response)
                if (response.status === 200) {
                    setType(response.data)
                    setImages([...images, response.data.image])
                    setPublish(response.data.status)
                }
            })

        }
    }, [setType])

    const onSubmit = (data) => {

        const storageRef = ref(storage, `/files/${images[0].file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, images[0].file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    data.image = url
                    data.status = publish;

                    instance.post("/roomcategory/create", data).then((response) => {
                        if (response.status === 201) {
                            toast.success("Add Room Type Successfully !", {
                                position: toast.POSITION.BOTTOM_RIGHT
                            });
                            navigate(`/admin/types`, { replace: true });
                        }
                    })
                });
            }
        );


    }

    const onUpdate = data => {
        console.log(data)

        data.status = publish;
        console.log(data);

        instance.put(`/roomcategory/update/${id}`, data).then((response) => {
            if (response.status === 200) {
                toast.success("Update Room Type Successfully !", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                navigate(`/admin/types`, { replace: true });
            }
        })
    }
    return (
        <>
            <div className="dashboard-app">
                <div className="dashboard-content">
                    <div className='row justify-content-between'>
                        <div className='col-4'>
                            {
                                id ? (<h1>Edit a Room Type</h1>) : (<h1>Add a Room Type</h1>)
                            }

                        </div>
                        <div className='col-4 text-end'>
                            {
                                publish ? (
                                    <button type="submit" className="btn btn-danger" onClick={() => setPublish(false)}><i className="fa-solid fa-xmark-large"></i> Not Publish</button>
                                ) : (
                                    id ? (
                                        <button type="submit" className="btn btn-primary" onClick={() => setPublish(true)}><i className="fa-solid fa-check"></i> Publish</button>
                                    ) : (
                                        <button type="submit" className="btn btn-primary" disabled><i className="fa-solid fa-check"></i> Publish</button>
                                    )
                                )
                            }
                            {" "}
                            <button type="submit" className="btn btn-primary" onClick={
                                id ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}>Save</button>
                        </div>


                    </div>

                    <form className="row g-3"
                    >
                        <div className='col-6'>
                            {
                                (images.length < 1) ? (
                                    <ImageUploading
                                        value={images}
                                        onChange={onImage}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            onImageUpload,
                                            isDragging,
                                            dragProps,
                                        }) => (
                                            // write your building UI
                                            <div>
                                                <div className="drag-area" {...dragProps}>
                                                    <div className="icon"><i className="fas fa-cloud-upload-alt" /></div>
                                                    <header>Drag &amp; Drop to Upload File</header>
                                                    <span>OR</span>
                                                    <button
                                                        style={isDragging ? { color: 'red' } : undefined}
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                        type="button"
                                                    >
                                                        Browser file
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </ImageUploading>
                                ) : (
                                    <div>
                                        <div className="card">
                                            <div className="card-body text-end">
                                                <button type="button" className="btn btn-close" onClick={() => setImages([])}></button>
                                            </div>
                                            <img src={images[0].data_url || images[0]} className="card-img-bottom" alt="..." />
                                        </div>
                                    </div>
                                )

                            }
                        </div>
                        <div className='col-6'></div>
                        <div className="col-md-4">
                            <label className="form-label">Name</label>
                            <input type="text" defaultValue={type && (type.name)} className="form-control" {...register("name")} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Price</label>
                            <input type="text" className="form-control" defaultValue={type && (type.price)} {...register("price")} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">People Maximum</label>
                            <input type="text" className="form-control" defaultValue={type && (type.people)} {...register("people")} />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Bed</label>
                            <select className="form-select" {...register("bed")} type="number">
                                <option selected={!type && true}>Choose a bed number</option>
                                <option value={1} selected={(type && (type.bed === 1)) && true}>1</option>
                                <option value={2} selected={(type && (type.bed === 2)) && true}>2</option>
                                <option value={3} selected={(type && (type.bed === 3)) && true}>3</option>
                                <option value={4} selected={(type && (type.bed === 4)) && true}>4</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Bath</label>
                            <select className="form-select" {...register("bath")}>
                                <option selected>Choose a bath number</option>
                                <option value={1} selected={(type && (type.bath === 1)) && true}>1</option>
                                <option value={2} selected={(type && (type.bath === 2)) && true}>2</option>
                                <option value={3} selected={(type && (type.bath === 3)) && true}>3</option>
                                <option value={4} selected={(type && (type.bath === 4)) && true}>4</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="10" defaultValue={type && type.description} {...register("description")}></textarea>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
