import Layout from "./Layout";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebaseAppConfig from "../util/firebase-config";
import { useState, useEffect, use } from "react";
import { getFirestore, getDocs, collection, query, where, doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)

const Cart = () => {
    const [session, setSession] = useState(null)
    const [isDeleted, setIsDeleted] = useState(false)
    const [cart, setCart] = useState([])
    const [ui, setUi] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)
            }
            else {
                setSession(null)
            }
        })
    }, [])

    useEffect(() => {
        const req = async () => {
            if (session) {
                const col = collection(db, "carts")
                const q = query(col, where("userId", "==", session.uid))
                const snapshot = await getDocs(q)
                const tmp = []
                snapshot.forEach((doc) => {
                    const document = doc.data()
                    document.uid = doc.id
                    tmp.push(document)
                })
                setCart(tmp)
            }
        }
        req()
    }, [session, isDeleted])

    // remove items
    const removeItems = async (items) => {
        const ref = doc(db, "carts", items.uid)
        await deleteDoc(ref)
        setIsDeleted(!isDeleted)
        setUi(!ui)
    }

    const sellingPrice = (cart) => {
        let sum = 0
        for (let items of cart) {
            let price = Math.round(items.price - ((items.price * items.discount) / 100))
            sum = sum + price
        }
        return sum
    }

    const totalprice = (cart) => {
        let sum = 0
        for (let items of cart) {
            let price = Math.round(items.price)
            sum = sum + price
        }
        return sum
    }
    const totalDiscount = (cart) => {
        let sum = 0
        for (let items of cart) {
            let price = Math.round((items.price * items.discount) / 100)
            sum = sum + price
        }
        return sum
    }

    const buyNow = () => {
        Swal.fire({
            icon: 'success',
            title: 'Buying Successfully !',
            text: 'Delevered your address today.',
            allowOutsideClick: false,
            scrollbarPadding: false,
        })
    }

    return (
        <Layout update={ui}>
            <div className="rounded-lg border border-slate-100 shadow-lg md:my-10 flex flex-col gap-5 md:w-[90%] mx-auto md:px-20 md:py-10 px-5 py-5">
                <h1 className="font-semibold md:text-xl text-cyan-700">
                    <i className="ri-shopping-cart-line mr-2"></i>
                    Cart
                </h1>
                <div className="grid md:grid-cols-2 gap-5
                ">
                    {
                        cart.map((items, index) => (
                            <div key={index} className="flex gap-10 shadow-md p-5 border border-slate-100">
                                <img src={items.image} alt={index} className="w-[100px] h-[140px] rounded object-cover object-top " />
                                <div className="flex flex-col gap-1">
                                    <h1 className="md:text-xl leading-tight text-md font-semibold">{items.title}</h1>
                                    <div className="flex gap-3 md:text-md text-xs">
                                        <p className="font-semibold">₹{(items.price - ((items.price * items.discount) / 100)).toFixed(0)}</p>
                                        <del className="font-semibold">{items.price}</del>
                                        <p className="font-semibold">{items.discount}% Discount</p>
                                    </div>
                                    <p className="capitalize font-mono md:text-md text-xs">{items.description}</p>
                                    <button onClick={() => removeItems(items)} className="px-3 mt-2 py-2 text-sm bg-rose-500 w-fit text-white rounded hover:bg-rose-700">
                                        <i className="ri-delete-back-line mr-2"></i>
                                        Remove Now
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="w-full flex justify-between items-center mx-auto p-5 ">
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold">Total Selling Price : ₹{totalprice(cart)} /-</p>
                        <p className="font-semibold">Total Discount : ₹{totalDiscount(cart)} /-</p>
                        <p className="font-semibold text-cyan-600">Total Price : ₹{sellingPrice(cart).toLocaleString()} /-</p>
                    </div>
                    <button onClick={buyNow} className="px-3 mt-2 py-2 text-sm bg-cyan-500 w-fit text-white rounded hover:bg-cyan-700">
                        <i className="ri-shopping-cart-line mr-2"></i>
                        Buy Now
                    </button>
                </div>
            </div>
        </Layout>
    )
}
export default Cart