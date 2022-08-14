import { useEffect, useReducer, useRef, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Admin from "./admin/Pages/Admin";
import Dashboard from "./admin/Pages/Dashboard";
import Login from "./admin/Pages/Login";
import { UserContext } from "./Context/UserContext";
import Customer from "./customer/Pages/Customer";
import Home from "./customer/Pages/Home";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import instance from "./axios";
import { ToastContainer, toast } from "react-toastify";
import Private from "./customer/Pages/Private";
import {
  BookingContext,
  initialBookingState,
  reducer,
} from "./Context/BookingContext";
import Search from "./customer/Pages/Search";
import Checkout from "./customer/Pages/Checkout";
import Purchase from "./customer/Pages/Purchase";
import Booking from "./admin/Pages/Booking";
import AddType from "./admin/Pages/AddType";
import TypeList from "./admin/Pages/TypeList";
import TypesOutLet from "./admin/Pages/TypesOutLet";
import RoomsOutLet from "./admin/Pages/RoomsOutLet";
import Rooms from "./admin/Pages/Rooms";
import Detail from "./customer/Pages/Detail";
import RequireAdminRole from "./Security/RequireAdminRole";
import RequiredUserRole from "./Security/RequiredUserRole";
import PopupLogin from "./customer/Components/PopupLogin";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import About from "./customer/Pages/About";
import { useForm } from "react-hook-form";
import { async } from "@firebase/util";

function App() {
  const [loginRequest, setLoginRequest] = useState(false);
  const openRequireAcc = useRef(null);
  const openRequireInfo = useRef(null);
  const closeRA = useRef(null);
  const [signUpPayload, setSignUpPayLoad] = useState(null);
  const closeModalLoginRequest = () => setLoginRequest(false);
  const [user, setUser] = useState({});
  const [booking, dispatch] = useReducer(reducer, initialBookingState);
  let navigate = useNavigate();

  const setJWTToSession = (response) => {
    let authorization = response.headers.authorization;
    if (authorization !== null) {
      sessionStorage.setItem("jwt", authorization);
    }
  };

  const getProfileUser = (jwt) => {
    instance
      .get("/account/user", { headers: { Authorization: jwt } })
      .then((res) => {
        console.log(res);
        setUser(res.data);
      });
  };

  useEffect(() => {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt !== null) {
      getProfileUser(jwt);
    }
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfoEmail = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      const email = userInfoEmail.data.email;

      const signInRequest = {
        email: email,
        password: "test",
      };

      let userInfoDatabase = await instance.post("/auth/signin", signInRequest);

      if (userInfoDatabase.status === 200) {
        setUser(userInfoDatabase.data);
        setJWTToSession(userInfoDatabase);
      } else if (userInfoDatabase.status === 203) {
        openRequireAcc.current.click();
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const googleRegister = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfoEmail = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      const email = userInfoEmail.data.email;

      const signUpRequest = {
        email: email,
        phone: null,
        password: "test",
        cardNumber: null,
        fullName: userInfoEmail.data.name,
        picture: userInfoEmail.data.picture,
        roles: ["user"],
      };
      setSignUpPayLoad(signUpRequest);
      openRequireInfo.current.click();
      closeRA.current.click();
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const adminLogin = (admin) => {
    setUser(admin.data);
    setJWTToSession(admin);
  };

  return (
    <>
      <UserContext.Provider value={{ user }}>
        <PayPalScriptProvider
          options={{ "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}` }}
        >
          <BookingContext.Provider value={{ booking, dispatch }}>
            <Routes>
              <Route path="/" element={<Customer googleLogin={googleLogin} />}>
                <Route index element={<Home googleLogin={googleLogin} />} />
                <Route path="about" element={<About />} />
                <Route path="private" element={<Private />} />
                <Route path="search" element={<Search />} />
                <Route
                  path="detail/:id"
                  element={<Detail setLoginRequest={setLoginRequest} />}
                />
                <Route
                  path="checkout/:id"
                  element={<Checkout googleLogin={googleLogin} />}
                />
                <Route
                  path="purchase"
                  element={
                    <RequiredUserRole>
                      <Purchase />
                    </RequiredUserRole>
                  }
                />
              </Route>

              <Route
                path="/admin"
                element={
                  sessionStorage.getItem("jwt") ? (
                    <RequireAdminRole>
                      <Admin />
                    </RequireAdminRole>
                  ) : (
                    <Login adminLogin={adminLogin} />
                  )
                }
              >
                <Route index element={<Dashboard />} />
                <Route element={<Login />} />
                <Route path="booking" element={<Booking />} />

                <Route path="rooms" element={<RoomsOutLet />}>
                  <Route index element={<Rooms />} />
                </Route>

                <Route path="types" element={<TypesOutLet />}>
                  <Route index element={<TypeList />} />
                  <Route path="update/:id" element={<AddType />} />
                  <Route path="add" element={<AddType />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to={"/"} replace={true} />} />
            </Routes>
            <PopupLogin
              closeModalLoginRequest={closeModalLoginRequest}
              loginRequest={loginRequest}
              googleLogin={googleLogin}
            />
            <ToastContainer />
            <button
              ref={openRequireAcc}
              style={{ display: "none" }}
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#examplelRequireModal"
              s
            ></button>

            <button
              ref={openRequireInfo}
              style={{ display: "none" }}
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#requireInformation"
              s
            ></button>
            <RequireAccount googleRegister={googleRegister} close={closeRA} />

            <RequireInformation signUpPayload={signUpPayload} />
          </BookingContext.Provider>
        </PayPalScriptProvider>
      </UserContext.Provider>
    </>
  );
}

const RequireAccount = ({ googleRegister, close }) => {
  return (
    <>
      <div
        className={"modal fade"}
        id="examplelRequireModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content re-modal-content-next-gg ">
            <div className="modal-body mt-4">
              <div className="row">
                <div className="col">
                  <div className="card rounded-3 border-0 ">
                    <div className="card-body text-center">
                      <div className="row">
                        <div className="col-lg-4">
                          <img
                            src="https://thumbs.dreamstime.com/b/line-art-monogram-luxury-design-graceful-template-calligraphic-elegant-beautiful-logo-royal-style-letter-emblem-sign-h-roy-91435306.jpg"
                            alt
                          />
                        </div>
                        <div className="col-lg-4">
                          <div>
                            <i className="fa-regular fa-arrow-right-arrow-left" />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <img
                            src="https://drreedward.com/wp-content/themes/ez-nettools-02/images/icon-google.svg"
                            alt
                          />
                        </div>
                      </div>
                      <label
                        className="pricing-card-title text-uppercase re-pricing-card-title-txt"
                        htmlFor="text"
                      >
                        CONNECT WITH US
                      </label>
                      <div className="hr">
                        <hr />
                      </div>
                      <div className="star-login-gg text-primary">
                        <small className="fa fa-star " />
                        <small className="fa fa-star ms-2" />
                        <small className="fa fa-star ms-2" />
                        <small className="fa fa-star ms-2" />
                        <small className="fa fa-star ms-2" />
                      </div>
                      <label htmlFor="text" className="text-muted mt-1 des">
                        Register for the new and discover the latest arrivals to
                        find the truth.
                      </label>{" "}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={googleRegister}
                      >
                        Sign up with google
                      </button>
                      <div className="my-2">
                        <a
                          href
                          className=" re-modal-last-out"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          ref={close}
                        >
                          Maybe latter
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const RequireInformation = ({ signUpPayload }) => {
  const { register, handleSubmit } = useForm();
  const close = useRef(null);
  const onSubmit = async (data) => {
    signUpPayload.phone = data.phone;
    signUpPayload.fullName = data.fullName;
    signUpPayload.cardNumber = data.cardNumber;

    let userInfoDatabase = await instance.post("/auth/signup", signUpPayload);

    if (userInfoDatabase.status === 201) {
      toast.success("Register successfully !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      close.current.click();
    }
  };
  return (
    <>
      <div
        className="modal fade "
        id="requireInformation"
        tabIndex={-1}
        aria-labelledby="requireInformation"
        aria-hidden="true"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              {signUpPayload && (
                <>
                  <div className="modal-header">
                    <div className="modal-title" id="exampleModalLabel">
                      <h5>Hello, {signUpPayload.fullName}</h5>
                      <p>Please complete these information.</p>
                    </div>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-6">
                        <label className="col-form-label">
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={signUpPayload.fullName}
                          {...register("fullName")}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label className="col-form-label">
                          Phone Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          {...register("phone")}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label className="col-form-label">
                          ID Card <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          {...register("cardNumber")}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={close}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
