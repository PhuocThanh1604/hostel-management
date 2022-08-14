import React from 'react'
import { useForm } from "react-hook-form";
import instance from '../../axios';

export default function Login({ adminLogin }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const admin = await instance.post("/auth/signin", data);
    console.log(admin)
    if (admin.status === 200) {
      adminLogin(admin)
    }
  };
  return (
    <>
      <div className="card" style={{ width: '30%', margin: "100px auto" }}>
        <div className="card-body">
          <h2>Admin Login</h2>
          <form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" {...register("email")} />

            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" {...register("password")} />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}
