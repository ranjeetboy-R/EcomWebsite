import { useEffect, useState } from "react"
import firebaseAppConfig from "../../util/firebase-config"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Navigate, Outlet } from "react-router-dom"

const auth = getAuth(firebaseAppConfig)

const PreGuard = () => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)
            }
            else {
                setSession(false)
            }
        })
    }, [])

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

    if(session){
        return <Navigate to="/" />
    }

    return <Outlet />
}

export default PreGuard