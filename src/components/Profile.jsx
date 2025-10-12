import { useEffect, useState } from "react";
import firebaseAppConfig from "../util/firebase-config";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)
import Layout from "./Layout";

const Profile = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(false)
    const [docId, setDocId] = useState(null)
    const [address, setAddress] = useState({
        city: '',
        state: '',
        country: '',
        postal: '',
        address: '',
        userId: '',
        mobile: ''
    })

    const [isAddress, setIsAddress] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)

    const [form, setForm] = useState({
        fullname: '',
        email: ''
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)
            }
            else {
                setSession(false)
                navigate('/login')
            }
        })
    }, [])
    useEffect(() => {
        const req = async () => {
            if (session) {
                setForm({
                    ...form,
                    fullname: session.displayName || ''
                })
                // save address in user id
                setAddress({
                    ...address,
                    userId: session.uid
                })
                // fetching address from firebase
                const col = collection(db, "addresses")
                const q = query(col, where("userId", "==", session.uid))
                const snapshot = await getDocs(q)
                setIsAddress(snapshot.empty)

                snapshot.forEach((doc) => {
                    setDocId(doc.id)
                    const addressData = doc.data()
                    setAddress({
                        ...address,
                        ...addressData
                    })
                })
            }
        }
        req()
    }, [session, isUpdated])

    useEffect(() => {
        const req = async () => {
            if (session) {
                const col = collection(db, "orders")
                const q = query(col, where("userId", "==", session.uid))
                const snapshot = await getDocs(q)
                const tem = []
                snapshot.forEach((doc) => {
                    const allProduct = doc.data()
                    tem.push(allProduct)
                })
                setOrders(tem)
            }
        }
        req()
    }, [session])

    if (session === null) {
        return (
            <div className="fixed top-0 left-0 animate__animated animate-fadeIn h-screen w-full flex px-8 justify-center items-center">
                <div className="text-center space-y-6">
                    <div
                        className="w-32 h-32 border-[15px] border-t-[#00cfe6] border-gray-700 rounded-full animate-spin mx-auto"
                    ></div>
                    <div className="text-[#008d9f] font-semibold text-4xl opacity-90 animate-fadeIn">
                        Almost There...
                    </div>
                    <div className="text-[#9f002a] font-semibold text-xl opacity-90 animate-fadeIn">
                        www.onlineshop.com
                    </div>
                    <div className="text-[#363636] text-sm opacity-80 animate-fadeIn">
                        <p>We're getting everything ready for you...</p>
                        <p>Sit tight for just a moment.</p>
                    </div>
                </div>
            </div>

        )
    }
    const formValue = (e) => {
        const input = e.target
        const name = input.name
        const value = input.value

        setForm({
            ...form,
            [name]: value
        })
    }

    // profile_image_upload
    const profileImage = async (e) => {
        const input = e.target
        const file = input.files[0]
        if (!file) return
        setLoading(true)
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "profile_image_upload")
        data.append("cloud_name", "de4timwla")

        const res = await fetch("https://api.cloudinary.com/v1_1/de4timwla/image/upload", {
            method: "POST",
            body: data
        })

        const uploadedImageURL = await res.json()
        const imageUrl = uploadedImageURL.url
        await updateProfile(auth.currentUser, { photoURL: imageUrl })
        setLoading(false)
    }

    const saveProfileInfo = async (e) => {
        e.preventDefault()
        await updateProfile(auth.currentUser, {
            displayName: form.fullname
        })
        Swal.fire({
            icon: 'success',
            title: 'Updated',
            text: 'Profile Updated Successfully !',
            allowOutsideClick: false,
            scrollbarPadding: false,
        })
    }

    const addressValue = (e) => {
        const input = e.target
        const name = input.name
        const value = input.value
        setAddress({
            ...address,
            [name]: value
        })
    }

    const saveAddress = async (e) => {
        try {
            e.preventDefault()
            await addDoc(collection(db, "addresses"), address)
            setIsAddress(false)
            setIsUpdated(!isUpdated)
            Swal.fire({
                icon: 'success',
                title: 'Success !',
                text: 'Address Added successfully',
                allowOutsideClick: false,
                scrollbarPadding: false,
            })
        }
        catch (error) {
            const massage = error.message.replace("Firebase: ", "").split("(")[0].trim();
            Swal.fire({
                icon: 'error',
                title: 'Failed !',
                text: massage,
                allowOutsideClick: false,
                scrollbarPadding: false,
            })
        }
    }

    const updateAddress = async (e) => {
        try {
            e.preventDefault()
            const ref = doc(db, "addresses", docId)
            await updateDoc(ref, address)
            Swal.fire({
                icon: 'success',
                title: 'Updated',
                text: 'Address updated successfully',
                allowOutsideClick: false,
                scrollbarPadding: false,
            })
        }
        catch (error) {
            const massage = error.message.replace("Firebase: ", "").split("(")[0].trim();
            Swal.fire({
                icon: 'error',
                title: 'Failed !',
                text: massage,
                allowOutsideClick: false,
                scrollbarPadding: false,
            })
        }
    }

    const getStatusColor = (status) =>{
        if(status === "pending") {
            return "bg-rose-600"
        }
        if(status === "processing") {
            return "bg-yellow-500"
        }
        if(status === "dispatched") {
            return "bg-cyan-600"
        }
        if(status === "returned") {
            return "bg-gray-500"
        }
    }
    return (
        <Layout>
            <div className="md:w-[90%] mx-auto md:p-5 p-7 flex flex-col md:my-10">
                <h1 className="md:text-xl font-semibold">
                    <i className="ri-shopping-cart-line mr-2"></i>
                    My Orders
                </h1>
                <hr className="mt-2 border border-slate-100" />
                <div className="grid md:grid-cols-2 w-full grid-cols-1 md:gap-10 md:p-5 gap-4">
                    {
                        orders.map((items, index) => (
                            <div key={index} className="flex gap-10 shadow-md p-5 border border-slate-100">
                                <img src={items.image} alt={index} className="w-[100px] h-[140px] rounded object-cover object-top " />
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-xl font-semibold">{items.title}</h1>
                                    <div className="flex gap-3">
                                        <p className="font-semibold">₹{(items.price - ((items.price * items.discount) / 100)).toFixed(0)}</p>
                                        <del>{items.price}</del>
                                        <p>{items.discount}% Discount</p>
                                    </div>
                                    <p className="capitalize">{items.description.slice(0,50)}</p>
                                    <button className={` capitalize ${getStatusColor(items.status)} px-3 mt-2 py-1 text-sm w-fit text-white rounded `}>{items.status}</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            
            <div className="md:w-[60%] mx-auto md:p-5 p-7 flex flex-col md:shadow-lg md:mb-10 md:border border-slate-100 rounded-lg ">
                <h1 className="md:text-xl font-semibold">
                    <i className="ri-user-follow-line mr-2"></i>
                    My Profile
                </h1>
                <hr className="mt-2 border border-slate-100" />
                <div className="flex flex-col md:p-5">
                    <div id="file" className="relative w-[150px] h-[150px] mx-auto rounded-full">
                        {
                            loading ? <img src="/images/loading.gif" alt="Loading..." className="w-full h-full" />
                                :
                                <img src={session.photoURL || "/images/user.jpg"} alt="" className="w-full h-full rounded-full" />
                        }
                        <div id="profile_img" className="flex justify-center items-center absolute top-0 w-full h-full rounded-full left-0 bg-black/70">
                            <i className="ri-camera-ai-line text-2xl text-zinc-300"></i>
                        </div>
                        <input
                            onChange={profileImage}
                            type="file"
                            accept="image/*"
                            className="absolute top-0 cursor-pointer left-0 w-full h-full rounded-full opacity-0" />
                    </div>
                    <form onSubmit={saveProfileInfo} className="grid grid-cols-2 gap-5 mt-5">
                        <div className="flex flex-col">
                            <label className="font-semibold">Fullname</label>
                            <input
                                onChange={formValue}
                                type="text"
                                name="fullname"
                                value={form.fullname}
                                className="capitalize bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Email Id</label>
                            <input
                                readOnly
                                onChange={formValue}
                                type="email"
                                name="email"
                                value={session.email}
                                className="bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                        </div>
                        <button className="col-span-2 hover:bg-cyan-600 w-fit px-7 py-2 text-white rounded-md bg-emerald-600 mt-3">
                            <i className="ri-file-edit-line mr-2"></i>
                            Update
                        </button>
                    </form>
                    <div className="flex flex-col mt-10">
                        <h1 className="text-2xl font-semibold">
                            <i className="ri-home-office-line mr-2"></i>
                            Delivery Address
                        </h1>

                        <form onSubmit={isAddress ? saveAddress : updateAddress} className="grid grid-cols-2 gap-3 mt-5">
                            <div className="flex flex-col">
                                <label className="font-semibold">Mobile No.</label>
                                <input
                                    required
                                    onChange={addressValue}
                                    type="number"
                                    name="mobile"
                                    value={address.mobile}
                                    placeholder="Enter your mobile no."
                                    className="capitalize bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold">City</label>
                                <input
                                    required
                                    onChange={addressValue}
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    placeholder="Enter your city"
                                    className="capitalize bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold">State</label>
                                <input
                                    required
                                    onChange={addressValue}
                                    type="text"
                                    name="state"
                                    value={address.state}
                                    placeholder="Enter your state"
                                    className="capitalize bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold">Country</label>
                                <input
                                    required
                                    onChange={addressValue}
                                    type="text"
                                    name="country"
                                    value={address.country}
                                    placeholder="Enter your country"
                                    className="capitalize bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                            </div>
                            <div  id="address" className="flex flex-col">
                                <label className="font-semibold">Postal Code</label>
                                <input
                                    required
                                    onChange={addressValue}
                                    type="number"
                                    name="postal"
                                    value={address.postal}
                                    placeholder="Enter your postal code"
                                    className="bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                            </div>
                            <div className="flex flex-col col-span-2">
                                <label className="font-semibold">Area/Street/Village</label>
                                <textarea
                                    required
                                    onChange={addressValue}
                                    type="address"
                                    name="address"
                                    value={address.address}
                                    placeholder="Enter your address"
                                    className="capitalize bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                            </div>
                            {
                                isAddress ?
                                    <button className="col-span-2 hover:bg-cyan-600 w-fit px-7 py-2 text-white rounded-md bg-emerald-600 mt-3">
                                        <i className="ri-save-line mr-2"></i>
                                        Save Address
                                    </button>
                                    :
                                    <button className="col-span-2 hover:bg-emerald-600 w-fit px-7 py-2 text-white rounded-md bg-rose-600 mt-3">
                                        <i className="ri-file-edit-line mr-2"></i>
                                        Update Address
                                    </button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Profile