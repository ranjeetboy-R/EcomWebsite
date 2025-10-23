import { useState, useEffect} from "react"
import { Link, useLocation } from "react-router-dom"
import firebaseAppConfig from '../../util/firebase-config'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"

const auth = getAuth(firebaseAppConfig)

const Layout = ({ children }) => {
    const [open, setOpen] = useState(0)
    const [profile, setProfile] = useState(false)
    const [asideItem, setAsideItem] = useState(true)
    const [session, setSession] = useState(null)
    const Location = useLocation()

    const aside = () => {
        setOpen(open === 250 ? 0 : 250)
        setAsideItem(!false)
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) =>{
            if(user){
                setSession(user)
            }
            else{
                setSession(null)
            }
        })
    }, [])
    
    const menus = [
        {
            label: 'Dashboard',
            icon: <i className="ri-dashboard-line mr-3 text-[16px] font-normal"></i>,
            link: '/admin/dashboard'
        },
        {
            label: 'Customers',
            icon: <i className="ri-user-3-line mr-3 text-[16px] font-normal"></i>,
            link: '/admin/customers'
        },
        {
            label: 'Product',
            icon: <i className="ri-store-2-line mr-3 text-[16px] font-normal"></i>,
            link: '/admin/products'
        },
        {
            label: 'Orders',
            icon: <i className="ri-shopping-cart-2-line mr-3 text-[16px] font-normal"></i>,
            link: '/admin/orders'
        },
        {
            label: 'Payments',
            icon: <i className="ri-money-rupee-circle-line mr-3 text-[16px] font-normal"></i>,
            link: '/admin/payments'
        },
        {
            label: 'Go to Home',
            icon: <i className="ri-home-4-line mr-3 text-[16px] font-normal"></i>,
            link: '/'
        },
        {
            label: 'Setting',
            icon: <i className="ri-settings-2-line mr-3 text-[16px] font-normal"></i>,
            link: '/admin/setting'
        }
    ]
    
    return (
        <div className="flex w-full h-screen overflow-hidden">

            {/* left aside box */}
            <aside style={{ width: `${open}px` }} className="fixed z-50 h-screen bg-cyan-900 overflow-hidden">
                {
                    asideItem &&
                    <div className="flex flex-col gap-5 h-screen">
                        <div className="p-5 border-b-2 border-slate-500 w-full h-[17%] flex flex-col justify-center">
                            <div className="w-full flex justify-between text-cyan-100 text-sm mb-5 items-center">
                                <div className="flex gap-3">
                                    <i className="ri-seo-line"></i>
                                    <Link className="font-bold">E Com Online</Link>
                                </div>
                                <button onClick={aside} className=" md:w-8 md:h-8 w-6 h-6 border rounded bg-cyan-700 hover:bg-cyan-500 text-white">
                                    <i className="ri-close-fill"></i>
                                </button>
                            </div>
                            <div className="flex gap-4 items-center">
                                <img src={(session && session.photoURL) || "/images/user.jpg"} alt="user" className="w-10 h-10 cursor-pointer rounded-full border-2" />
                                <div className="flex flex-col">
                                    <h1 className="text-white font-semibold text-sm">{(session && session.displayName) ? session.displayName : "Mr Admin"}</h1>
                                    <div className="text-cyan-100 flex gap-2 text-[10px]">
                                        <i className="ri-mail-ai-line"></i>
                                        <Link>{session && session.email}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="leftScroll" className="text-sm flex flex-col gap-2 whitespace-nowrap h-[83%] overflow-y-auto">
                            {
                                menus.map((items, index) => (
                                    <div key={index} className="flex flex-col px-2">
                                        <Link
                                            style={{
                                                background: (Location.pathname === items.link) ? 'oklch(52% 0.105 223.128)' : 'transparent',
                                                color: (Location.pathname === items.link) ? 'white' : 'oklch(86.9% 0.022 252.894)'
                                            }}
                                            to={items.link} className="py-[6px] px-2 font-semibold rounded pr-[68%] hover:pl-3">
                                            {items.icon}{items.label}
                                        </Link>
                                    </div>
                                ))
                            }
                            <div className="flex flex-col px-2">
                                <Link onClick={()=>signOut(auth)} className="py-[6px] px-2 font-semibold text-white/70 rounded pr-[68%] hover:pl-3">
                                    <i className="ri-logout-circle-r-line mr-3 text-[16px] font-normal"></i>Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </aside>

            {/* right box */}
            <div className="w-full h-screen flex flex-col">
                <div className="w-full h-[13%] px-5 bg-cyan-900 flex justify-between items-center shadow-lg ">
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={aside}
                            className="w-8 h-8 border rounded bg-cyan-700 hover:bg-cyan-500 text-white">
                            <i className="ri-menu-unfold-line"></i>
                        </button>
                        <Link className="hidden md:block font-bold text-cyan-100 text-lg">E Com Online</Link>
                    </div>
                    <div className="flex gap-4 items-center">
                        <h1 className="hidden md:block border-b-2 mt-1 border-cyan-900 text-white hover:border-cyan-200 cursor-pointer hover:text-cyan-200 font-semibold text-sm">{(session && session.displayName) ? session.displayName : 'Mr Admin'}</h1>
                        <img onClick={() => { setProfile(!profile) }} src={(session && session.photoURL) || "/images/user.jpg"} alt="user" className="w-8 h-8 cursor-pointer rounded-full" />
                    </div>
                </div>
                <div onClick={()=>setOpen(open === 250 && 0)} className="relative w-full h-[87%] overflow-y-auto bg-white">
                    {
                        profile &&
                        <div className="w-[300px] rounded-b-md shadow-[-3px_3px_10px_rgba(0,0,0,0.3)] fixed top-[90px] right-0 float-right flex flex-col animate__animated animate__fadeIn animate__faster z-40 bg-zinc-50">
                            <div className="flex gap-5 font-semibold items-center p-5 shadow-md">
                                <div>
                                    <img src={(session && session.photoURL) || "/images/user.jpg"} alt="user" className="w-7 h-7 cursor-pointer rounded-full" />
                                </div>
                                <div className="flex flex-col text-sm">
                                    <h1>{(session && session.displayName) ? session.displayName : 'Mr Admin'}</h1>
                                    <Link to='/admin/setting' className="text-[12px] hover:text-cyan-700">View Profile</Link>
                                </div>
                            </div>
                            <ul>
                                <li className="px-5 hover:px-7 hover:text-cyan-600 flex gap-2 cursor-pointer hover:bg-cyan-50 py-2 text-sm mt-2">
                                    <i className="ri-mail-ai-line"></i>
                                    <Link>{session && session.email}</Link>
                                </li>
                                <li className="flex gap-2 px-5 hover:px-7 hover:text-cyan-600 cursor-pointer mb-5 font-semibold text-zinc-700 hover:bg-cyan-50 py-2 text-sm">
                                    <i className="ri-logout-circle-r-line"></i>
                                    <button onClick={()=>signOut(auth)}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    }

                    <div onClick={() => { setProfile(false) }}>
                        {children}
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Layout