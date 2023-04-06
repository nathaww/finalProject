/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa'
import { AiOutlineWifi } from 'react-icons/ai'
import { BsWifiOff } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useStateContext } from '../contexts/ContexProvider';
import { Label, TextInput } from 'flowbite-react';
import { useSignIn } from 'react-auth-kit';
import { useIsAuthenticated } from 'react-auth-kit';
import { Offline, Online } from "react-detect-offline"
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const Login = () => {

    useEffect(() => {
        dispatch(
            {
                type: "LOADED",
            }
        )
    }, []);

    let dispatch = useDispatch();

    const { currentMode, setCurrentMode } = useStateContext();
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeMode) {
            setCurrentMode(currentThemeMode);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/Statistics");
            Toastify({
                text: "Welcome back!",
                duration: 3000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #3D9CCA, #5EBACB)",
                },
            }).showToast();
        }
        else {
            navigate("/login");
        }
    }, [])



    const [loader, setloader] = useState();

    const [user, setuser] = useState({
        username: "",
        password: "",
    });
    const [error, seterror] = useState();

    let { username, password } = user;
    let navigate = useNavigate();
    let signin = useSignIn();

    const handleChange = (e) => {
        let { name, value } = e.target;
        setuser({ ...user, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            seterror("Field(s) cannot be empty!");
        } else {
            try {
                setloader(<React.Fragment><Loading /></React.Fragment>);
                const resp = await axios.post('https://localhost:7105/api/Account/login', user);
                localStorage.setItem('Med-token', resp.data.token);
                localStorage.setItem("user", user.username);
                var decoded = jwt_decode(resp.data.token);
                localStorage.setItem('Med-Role', decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
                console.log(localStorage.getItem("Med-Role"));
                signin({
                    token: resp.data.token,
                    tokenType: "Bearer",
                    expiresIn: 9999,
                    authState: { email: user.username },
                });
                seterror("");
                if (localStorage.getItem('Med-Role')) {
                    setTimeout(() => {
                        if (localStorage.getItem("Med-Role") === "manager") {
                            navigate("/Statistics");
                            Toastify({
                                text: "Logged in",
                                duration: 5000,
                                gravity: "top", // `top` or `bottom`
                                position: "center",
                                style: {
                                    background: "linear-gradient(to right, #3D9CCA, #5EBACB)",
                                },
                            }).showToast();
                        } else if (localStorage.getItem("Med-Role") === "pharmacist") {
                            navigate("/Medicine")
                            Toastify({
                                text: "Logged in",
                                duration: 5000,
                                destination: "https://github.com/apvarun/toastify-js",
                                newWindow: true,
                                close: true,
                                gravity: "top", // `top` or `bottom`
                                position: "center", // `left`, `center` or `right`
                                stopOnFocus: true, // Prevents dismissing of toast on hover
                                style: {
                                    background: "linear-gradient(to right, #3D9CCA, #5EBACB)",
                                },
                            }).showToast();
                        }
                    }, 7000);
                }

            } catch (error) {
                seterror("Incorrect username or password!");
                setloader("");
            };

        };
    };

    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
            <div className='min-h-screen min-w-full flex justify-center fixed z-50 bg-white dark:bg-main-dark-bg'>
                <section>
                    <div className="flex min- overflow-hidden">
                        <div className="flex flex-col justify-center flex-1 px-4 py-24 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                            <div className="w-full max-w-xl mx-auto lg:w-96 rounded-xl shadow-xl py-6 px-7   dark:bg-secondary-dark-bg">
                                <div>
                                    <div className='flex justify-between'>
                                        <p className='items-center gap-3 ml-3 flex text-xl font-extrabold tracking-tight green-text'><FaLeaf /><span>Lemlem Pharmacy</span></p>
                                        <Offline>
                                            <BsWifiOff className='w-6 h-6 text-red-600' />
                                        </Offline>
                                        <Online>
                                            <AiOutlineWifi className='w-6 h-6 text-green-600' />
                                        </Online>
                                    </div>
                                    <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">Sign in.</h2>
                                </div>

                                <div className="mt-8">
                                    <div className="mt-6">
                                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label
                                                        htmlFor="email1"
                                                        value="Username"

                                                    />
                                                </div>
                                                <TextInput
                                                    id="email1"
                                                    type="email"
                                                    placeholder="name@etiocart.com"
                                                    name='username'
                                                    value={username}
                                                    onChange={handleChange}
                                                    required={true}
                                                    sizing="md"
                                                    icon={MdEmail}
                                                />
                                            </div>
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label
                                                        htmlFor="password1"
                                                        value="Password"
                                                    />
                                                </div>
                                                <TextInput
                                                    id="password1"
                                                    type="password"
                                                    required={true}
                                                    placeholder="*******"
                                                    name='password'
                                                    value={password}
                                                    onChange={handleChange}
                                                    sizing="md"
                                                    icon={RiLockPasswordFill}
                                                />
                                            </div>
                                            <button
                                                onClick={handleLogin}
                                                className='mb-4 btn border-0 bg-gradient-to-r from-sky-400 to-cyan-300 shadow-xl text-white text-lg'>
                                                Sign In
                                            </button>
                                            <p className='text-red-600 text-center'>{error}</p>
                                            <div className='flex justify-center'>{loader}</div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Login