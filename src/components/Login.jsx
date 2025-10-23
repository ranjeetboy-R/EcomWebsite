import { useState } from "react";
import firebaseAppConfig from "../util/firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Layout from "./Layout";
import { Link, useNavigate } from "react-router-dom";

const auth = getAuth(firebaseAppConfig)

const Login = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)
    const [show, setShow] = useState("password")
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const login = async (e) => {
        try {
            e.preventDefault()
            setLoader(true)
            await signInWithEmailAndPassword(auth, form.email, form.password)
            navigate('/')
        }
        catch (error) {
            setError(error)
        }
        finally{
            setLoader(false)
        }
    }

    const inputValue = (e) => {
        const input = e.target
        const name = input.name
        const value = input.value
        setForm({
            ...form,
            [name]: value
        })
        setError(null)
    }

    return (
        <Layout>
            <div className="grid md:grid-cols-2 gap-10 w-full mx-auto md:px-20 md:py-20 py-10">
                <div className="flex justify-center items-center">
                    <img src="/images/accounticon.svg" alt="accounticon" className="w-[90%]" />
                </div>
                <form onSubmit={login} className="flex flex-col md:px-10 px-6 gap-5">
                    <div className="flex flex-col gap-1 mb-5">
                        <h1 className="font-bold text-3xl text-zinc-700">Welcome Back Ranjeet !</h1>
                        <p className="text-zinc-500 border-b-2 py-1">Log in and start enjoying shopping on our website now!</p>
                    </div>
                    {
                        error &&
                        <div className="flex items-center justify-between p-3 w-full bg-red-200 rounded shadow-lg animate__animated animate__pulse">
                            <div className="flex">
                                <i className="ri-error-warning-line mr-2"></i>
                                <p>invalid credentials provided !</p>
                            </div>
                            <button onClick={() => { setError(null) }} type="button" className="px-2 py-1 bg-red-300 hover:bg-red-400 rounded-md hover:shadow-md">
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                    }
                    <div className="flex flex-col">
                        <label className="text-[500] text-md font-semibold">User Name</label>
                        <input onChange={inputValue} required type="email" name="email" placeholder="Enter username"
                            className="bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[500] text-md font-semibold">Password</label>
                        <div className="relative">
                            <input onChange={inputValue} required type={show} name="password" placeholder="Enter password"
                                className="bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                            <button onClick={() => { setShow(show === "password" ? "text" : "password") }} type="button" className="h-8 absolute top-0 right-0 w-9 mt-2">
                                {
                                    show === "password" ?
                                        <i className="ri-eye-line outline-none"></i> :
                                        <i className="ri-eye-off-line outline-none"></i>
                                }
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 items-center">
                        <button type="submit" className="bg-rose-700 w-fit px-5 py-[6px] text-white rounded-sm hover:bg-cyan-600">
                            {loader && <i className="ri-loader-2-line ri-spin text-md mr-2"></i>}
                            Login {loader && '...'}
                        </button>
                        <label className="text-[500] text-center text-zinc-600">
                            You don't have an account?
                            <Link to='/signup' className="ml-2 hover:text-rose-700">Signup</Link>
                        </label>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
export default Login