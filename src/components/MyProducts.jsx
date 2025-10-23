import { useState, useEffect, use } from "react"
import firebaseAppConfig from "../util/firebase-config"
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { getFirestore, addDoc, collection, getDocs, serverTimestamp, query, where } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const db = getFirestore(firebaseAppConfig)
const auth = getAuth(firebaseAppConfig)

const MyProducts = () => {
    const navigate = useNavigate()
    const [session, setSession] = useState(null)

    const [product, setProduct] = useState([]);
    const [address, setAddress] = useState(null)
    const [loading, setLoading] = useState(false)

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
            setLoading(true)
            const snapshot = await getDocs(collection(db, "products"))
            const tem = []
            snapshot.forEach((doc) => {
                const allProducts = doc.data()
                allProducts.id = doc.id
                tem.push(allProducts)
            })
            setProduct(tem)
            setLoading(false)
        }
        req()
    }, [])

    useEffect(() => {
        const req = async () => {
            if (session) {
                const col = collection(db, "addresses")
                const q = query(col, where("userId", "==", session.uid))
                const snapshot = await getDocs(q)
                snapshot.forEach((doc) => {
                    const allAddress = doc.data()
                    setAddress(allAddress)
                })
            }
        }
        req()
    }, [product])

    const addToCart = async (items) => {
        try {
            items.userId = session.uid
            await addDoc(collection(db, "carts"), items)
            Swal.fire({
                icon: 'success',
                title: 'Add to Cart',
                text: 'Add to cart successfully',
                allowOutsideClick: false,
                scrollbarPadding: false,
            })
        }
        catch (error) {
            const errorMsg = error.message.replace("Firebase: ", "").split("(")[0].trim();
            Swal.fire({
                icon: 'error',
                title: 'Field',
                text: errorMsg,
                allowOutsideClick: false,
                scrollbarPadding: false
            })
        }
    }

    const buyNow = async (product) => {
        try {
            const col = collection(db, "addresses")
            const q = query(col, where("userId", "==", session.uid))
            const snapshot = await getDocs(q)
            if (snapshot.empty) {
                Swal.fire({
                    icon: 'info',
                    title: 'Please update your address'
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            navigate('/profile#address')
                        }
                    })
                return false;
            }
            product.userId = session.uid
            product.email = session.email
            product.customerName = session.displayName
            product.createdAt = serverTimestamp()
            product.address = address
            product.status = "pending"
            await addDoc(collection(db, "orders"), product)
            navigate('/profile')
        }
        catch (err) {
            console.log(err)
        }
    }

    if (loading) {
        return (
            <div className="fixed top-0 left-0 z-50 bg-white h-screen flex-col gap-4 w-full flex items-center justify-center">
                <div
                    className="w-24 h-24 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-cyan-400 border-b-amber-400 border-l-green-400 border-r-blue-400 rounded-full"
                >
                    <div
                        className="w-16 h-16 border-8 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-b-rose-400 border-t-fuchsia-400 rounded-full"
                    ></div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* product section */}
            <div className="flex flex-col items-center w-full px-5 md:mx-auto">
                <div className="grid md:grid-cols-4 w-full grid-cols-2 md:gap-10 md:p-5 gap-4">
                    {
                        product.map((items, index) => (
                            <div key={index} className="flex flex-col gap-1 shadow-lg border">
                                <img src={items.image} alt="images{index}" className="rounded md:h-[250px] h-[120px] object-cover object-top md:hover:scale-105" />
                                <div className="flex flex-col p-3">
                                    <h1 className="md:text-lg text-sm font-semibold leading-tight text-zinc-500 capitalize">{items.title}</h1>
                                    <div className="flex md:gap-3 gap-2 md:text-md text-[12px] mt-1 whitespace-nowrap">
                                        <label className="font-semibold text-cyan-700">₹{items.price - ((items.price * items.discount) / 100)}</label>
                                        <del className="font-semibold  text-black/80">₹{items.price}</del>
                                        <label className="font-semibold text-black/80">{items.discount}% off</label>
                                    </div>
                                </div>

                                <div className="flex md:px-3 md:pb-3 whitespace-nowrap">
                                    <button
                                        onClick={() => buyNow(items)}
                                        type="button"
                                        className="w-full text-white md:text-[12px] text-[10px] hover:bg-rose-700 bg-cyan-700 py-2">
                                        <i className="ri-shopping-bag-line mr-1"></i> Buy Now</button>
                                    <button
                                        onClick={() => addToCart(items)}
                                        className="w-full text-slate-700 md:text-[12px] text-[10px] hover:text-white hover:bg-rose-700 hover:border-rose-700 border py-2">
                                        <i className="ri-shopping-cart-line mr-1"></i> Add to Cart</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default MyProducts