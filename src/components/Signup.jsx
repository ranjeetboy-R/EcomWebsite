import { useState } from "react";
import Layout from "./Layout";
import { Link, useNavigate } from "react-router-dom";
import firebaseAppConfig from "../util/firebase-config";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, getFirestore, getDoc, serverTimestamp, addDoc } from "firebase/firestore";

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)

const Signup = () => {
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const [show, setShow] = useState("password")
    const [error, setError] = useState(null)
    const [formValue, setFormValue] = useState({
        fullname: '',
        email: '',
        mobile: '',
        password: ''
    })

    const signup = async (e) => {
        try {
            e.preventDefault()
            setLoader(true)
            const userCre = await createUserWithEmailAndPassword(auth, formValue.email, formValue.password)
            await updateProfile(auth.currentUser, {displayName: formValue.fullname})
            addDoc(collection(db, "customers"), {
                email: formValue.email,
                customerName: formValue.fullname,
                userId: userCre.user.uid,
                role: 'user',
                mobile: formValue.mobile,
                createdAt: serverTimestamp()
            })
            navigate('/')
        }
        catch (error) {
            const errorMessage = error.message.replace("Firebase: ", "").split("(")[0].trim();
            console.log(error)
            setError(errorMessage)
        }
        finally {
            setLoader(false)
        }

    }

    const onInput = (e) => {
        const input = e.target
        const value = input.value
        const name = input.name
        setFormValue({
            ...formValue,
            [name]: value
        })
        setError(null)
    }

    return (
        <Layout>
            <div className="grid md:grid-cols-2 gap-10 w-full mx-auto md:px-20 py-10">
                <div className="flex justify-center items-center">
                    <img src="/images/welcome.svg" alt="welcome" className="w-[90%]" />
                </div>
                <form onSubmit={signup} className="flex flex-col md:px-10 px-6 gap-3">
                    {
                        error &&
                        <div className="flex items-center justify-between p-3 w-full bg-red-200 rounded shadow-lg animate__animated animate__pulse">
                            <div className="flex">
                                <i className="ri-error-warning-line mr-2"></i>
                                <p>{error} !</p>
                            </div>
                            <button onClick={() => { setError(null) }} type="button" className="px-2 py-1 bg-red-300 hover:bg-red-400 rounded-md hover:shadow-md">
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                    }
                    <div className="flex flex-col gap-1 mb-5">
                        <h1 className="font-bold text-3xl text-zinc-700">New User !</h1>
                        <p className="text-zinc-500 border-b-2 py-1">Create an account and start enjoying shopping on our website now!</p>
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-[500] text-md font-semibold">Fullname</label>
                        <input onChange={onInput} required type="text" name="fullname" placeholder="Enter your firstname"
                            className="bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[500] text-md font-semibold">Email id</label>
                        <input onChange={onInput} required type="email" name="email" placeholder="Enter email id"
                            className="bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[500] text-md font-semibold">Mobile</label>
                        <input onChange={onInput} required type="number" name="mobile" placeholder="Enter mobile no."
                            className="bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[500] text-md font-semibold">Create Password</label>
                        <div className="relative">
                            <input onChange={onInput} required type={show} name="password" placeholder="Enter 6 characters strong password"
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
                            Signup {loader && '...'}
                        </button>
                        <label className="text-[500] text-center text-zinc-600">
                            You already have an account?
                            <Link to='/login' className="ml-2 hover:text-rose-700">Login</Link>
                        </label>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
export default Signup