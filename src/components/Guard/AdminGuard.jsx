import { useState, useEffect } from "react"
import { useNavigate, useLocation, Navigate,  Outlet } from "react-router-dom"
import firebaseAppConfig from "../../util/firebase-config"
import { onAuthStateChanged, getAuth } from "firebase/auth"
import {getFirestore, getDocs, collection, query, where } from "firebase/firestore"

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)

const AdminGuart = () => {
    const navigate = useNavigate()
    const [session, setSession] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const location = useLocation()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)
            }
            else {
                navigate('/')
                return false;
            }
        })
    }, [])

    useEffect(() => {
        const req = async () => {
            if (session) {
                const col = collection(db, "customers")
                const q = query(col, where("userId", "==", session.uid))
                const snapshot = await getDocs(q)
                let role = null
                snapshot.forEach((doc) => {
                    const customer = doc.data()
                    role = customer.role
                })
                if (role === "user") {
                    navigate('/profile')
                    return false;
                }
                else {
                    setIsAdmin(true)
                }
            }
        }
        req()
    }, [session])

    if(location.pathname === "/admin")
        return <Navigate to="/admin/dashboard" />

    if(isAdmin) return <Outlet />

    return (
        // Loading 
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
export default AdminGuart