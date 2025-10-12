import { useState, useEffect, use } from "react"
import { Link, useLocation } from "react-router-dom"
import firebaseAppConfig from "../util/firebase-config"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)

const Layout = ({ children, update }) => {
    const [session, setSession] = useState(null)
    const [open, setOpen] = useState(0)
    const Location = useLocation()
    const [profile, setProfile] = useState(false)
    const [cartCount, setCartCount] = useState(0)
    const [role, setRole] = useState(null)

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

    useEffect(() => {
        if (session) {
            const req = async () => {
                const col = collection(db, "carts")
                const q = query(col, where("userId", "==", session.uid))
                const snapshot = await getDocs(q)
                setCartCount(snapshot.size)
            }
            req()
        }
    }, [session, update])

    useEffect(() => {
        if (session) {
            const req = async () => {
                const col = collection(db, "customers")
                const q = query(col, where("userId", "==", session.uid))
                const snapshot = await getDocs(q)
                snapshot.forEach((doc) => {
                    const customer = doc.data()
                    setRole(customer.role)
                })
            }
            req()
        }
    }, [session])

    const aside = () => {
        setOpen(open === 0 ? 350 : 0)
    }

    const menus = [
        {
            title: 'Home',
            href: '/'
        },
        {
            title: 'Products',
            href: '/products'
        },
        {
            title: 'Category',
            href: '/category'
        },
        {
            title: 'Contact us',
            href: '/contact-us'
        }
    ]

    if (session === null)
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

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div>
                <nav className="sticky top-0 left-0 bg-white z-10 py-5 flex justify-between items-center shadow-lg md:px-10 px-5">
                    <div>
                        <Link to='/'>
                            <img src="/images/logo.png" alt="logo" className="w-[100px]" />
                        </Link>
                    </div>
                    <button onClick={aside} className="md:hidden w-10 h-10">
                        {
                            open === 0 ?
                                (<i className="ri-menu-fold-fill text-2xl"></i>) :
                                (<i className="ri-close-line text-2xl bg-rose-500 p-1 text-white rounded font-normal"></i>)
                        }
                    </button>

                    <div className="md:flex hidden items-center whitespace-nowrap">
                        <ul className="flex ">
                            <Link to='/' className="px-3 py-2 font-semibold hover:text-cyan-700 text-black/60">Home</Link>
                            <Link to='/products' className="px-3 py-2 font-semibold hover:text-cyan-700 text-black/60">Products</Link>
                            <Link to='/category' className="px-3 py-2 font-semibold hover:text-cyan-700 text-black/60">Category</Link>
                            <Link to='/contact-us' className="px-3 py-2 font-semibold hover:text-cyan-700 text-black/60">Contact us</Link>
                        </ul>
                        {
                            !session &&
                            <>
                                <Link to='/login' className="ml-4 px-6 py-[6px] font-semibold rounded-sm hover:text-white hover:bg-cyan-700 border border-zinc-300 text-black/60">Login</Link>
                                <Link to='/signup' className="ml-4 px-6 py-[6px] font-semibold bg-rose-700 hover:bg-cyan-600 rounded-sm hover:text-white border border-zinc-300 text-white">Signup</Link>
                            </>
                        }
                        {
                            (session && cartCount > 0) &&
                            <Link to='/cart' className="px-3 relative">
                                <i className="ri-shopping-cart-line"></i>
                                <div className="w-[13px] h-[13px] rounded-full flex justify-center items-center absolute -top-1 right-[1px] bg-rose-600 text-white">
                                    <h1 className=" text-[10px]">{cartCount}</h1>
                                </div>
                            </Link>
                        }
                        {
                            session &&
                            <div className="flex flex-col">
                                <div className="ml-5">
                                    <img onClick={() => { setProfile(!profile) }} src={session.photoURL || "/images/user.jpg"} alt="user" className="w-7 h-7 hover:scale-125 cursor-pointer rounded-full" />
                                </div>
                                {
                                    profile &&
                                    <div className="w-[300px] rounded-b-md shadow-lg absolute top-[92px] right-0 flex flex-col animate__animated animate__fadeIn animate__faster z-10 bg-white">
                                        <div className="flex gap-5 font-semibold items-center p-5 shadow-md">
                                            <div>
                                                <img src={session.photoURL || "/images/user.jpg"} alt="user" className="w-7 h-7 cursor-pointer rounded-full" />
                                            </div>
                                            <div className="flex flex-col text-sm">
                                                <h1 className="capitalize">{session.displayName}</h1>
                                                <Link className="text-[12px] hover:text-cyan-700">{session.email}</Link>
                                            </div>
                                        </div>
                                        <ul className="py-3">
                                            <Link to='/profile' className="px-5 hover:px-7 hover:text-cyan-600 flex gap-2 cursor-pointer hover:bg-cyan-50 py-[6px] text-sm mt-2">
                                                <i className="ri-profile-line"></i>
                                                My Profile
                                            </Link>
                                            {
                                                (role && role === "admin") &&
                                                <Link to='/admin/dashboard' className="px-5 hover:px-7 hover:text-cyan-600 flex gap-2 cursor-pointer hover:bg-cyan-50 py-[6px] text-sm mt-2">
                                                    <i className="ri-admin-line"></i>
                                                    Admin Pannel
                                                </Link>
                                            }
                                            <Link to='/cart' className="px-5 hover:px-7 hover:text-cyan-600 flex gap-2 cursor-pointer hover:bg-cyan-50 py-[6px] text-sm">
                                                <i className="ri-shopping-cart-line"></i>
                                                Cart
                                            </Link>
                                            <button type="button" onClick={() => signOut(auth)} className="flex gap-2 px-5 hover:px-7 hover:text-cyan-600 cursor-pointer font-semibold text-zinc-700 hover:bg-cyan-50 py-[6px] text-sm">
                                                <i className="ri-logout-circle-r-line"></i>
                                                Logout
                                            </button>
                                        </ul>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </nav>

                <section onClick={()=>{
                    setProfile(false)
                    if(open === 350){
                        setOpen(0)
                    }
                }}>
                    {children}
                </section>
            </div>

            <footer className="bg-cyan-900 md:px-10 text-white flex flex-col gap-5">
                <div className="grid md:grid-cols-3 gap-5 pt-20">
                    <div className="flex flex-col gap-3 px-5 md:px-0">
                        <Link to='/' className="w-[150px] rounded-md bg-slate-300">
                            <img src="/images/logo.png" alt="logo" className="w-[100px]" />
                        </Link>
                        <h1 className="font-semibold text-lg mb-1">Brand Details</h1>
                        <p className="text-sm w-[80%]">consectetur adipisicing elit. Fugit vitae dolor ipsum dicta aperiam facilis, repellat rem! Officiis dolor nisi nesciunt adipisci amet.</p>
                    </div>
                    <div className="flex md:justify-between justify-center md:gap-10 gap-40 mt-10 md:mt-0">
                        <div className="flex flex-col gap-2 lgw-1/2">
                            <h1 className="font-semibold text-lg mb-1">Website Links</h1>
                            <ul className="flex flex-col gap-2 text-sm">
                                <Link to='/' className="hover:text-cyan-400 border-b-2 border-cyan-900 hover:border-cyan-600 text-slate-300">
                                    <i className="ri-expand-left-right-line mr-1 text-slate-400"></i>Home</Link>
                                <Link to='/products' className="hover:text-cyan-400 border-b-2 border-cyan-900 hover:border-cyan-600 text-slate-300">
                                    <i className="ri-expand-left-right-line mr-1 text-slate-400"></i>Products</Link>
                                <Link to='/category' className="hover:text-cyan-400 border-b-2 border-cyan-900 hover:border-cyan-600 text-slate-300">
                                    <i className="ri-expand-left-right-line mr-1 text-slate-400"></i>Category</Link>
                                <Link to='/contact-us' className="hover:text-cyan-400 border-b-2 border-cyan-900 hover:border-cyan-600 text-slate-300">
                                    <i className="ri-expand-left-right-line mr-1 text-slate-400"></i>Contact us</Link>
                                <Link to='/feedback' className="hover:text-cyan-400 border-b-2 border-cyan-900 hover:border-cyan-600 text-slate-300">
                                    <i className="ri-expand-left-right-line mr-1 text-slate-400"></i>Feedback</Link>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2 md:w-1/2">
                            <h1 className="font-semibold text-lg mb-1">Follow us</h1>
                            <ul className="flex flex-col gap-2 text-sm">
                                <Link to='/' className="hover:text-cyan-400 border-b-2 border-cyan-900 hover:border-cyan-600 text-slate-300">
                                    <i className="ri-expand-left-right-line mr-1 text-slate-400"></i>Facebook</Link>
                                <Link to='/products' className="hover:text-cyan-400 border-b-2 border-cyan-900 hover:border-cyan-600 text-slate-300">
                                    <i className="ri-expand-left-right-line mr-1 text-slate-400"></i>Youtube</Link>
                                <Link to='/category' className="hover:text-cyan-400 border-b-2 border-cyan-900 hover:border-cyan-600 text-slate-300">
                                    <i className="ri-expand-left-right-line mr-1 text-slate-400"></i>Instagram</Link>
                                <Link to='/contact-us' className="hover:text-cyan-400 border-b-2 border-cyan-900 hover:border-cyan-600 text-slate-300">
                                    <i className="ri-expand-left-right-line mr-1 text-slate-400"></i>Twitter</Link>
                                <Link to='/feedback' className="hover:text-cyan-400 border-b-2 border-cyan-900 hover:border-cyan-600 text-slate-300">
                                    <i className="ri-expand-left-right-line mr-1 text-slate-400"></i>Linkedin</Link>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 px-5 mt-10 md:mt-0">
                        <div>
                            <h1 className="font-semibold text-lg mb-1">Our Comunity</h1>
                            <p className="text-sm text-slate-400">Enter your email to join our community and access exclusive updates, events, and valuable resources</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <input type="text" name="email" placeholder="Enter Email Id..."
                                    className="w-full py-2 px-2 hover:px-3 text-sm rounded-sm bg-transparent border text-white border-slate-400 hover:border-white outline-none" />
                                <button className="absolute top-0 right-0 w-10 h-full">
                                    <i className="ri-send-plane-2-line"></i>
                                </button>
                            </div>
                            <button className="w-fit px-5 bg-rose-700 text-sm py-2 rounded-sm hover:bg-rose-600">Subscribe Now</button>
                        </div>

                    </div>
                </div>
                <div className="flex justify-between px-5 md:px-0 pt-10 pb-5 items-center">
                    <p className="text-slate-400 text-sm">© Copyrite 2025 | E commerce Website Controller Ranjeet.</p>
                    <img src="/images/paymentLogo.png" alt="paymentLogo" className="md:w-[250px] w-[100px] cursor-pointer rounded-md md:mr-5" />
                </div>
            </footer>

            <aside style={{ width: `${open}px` }} className="md:hidden rounded overflow-hidden fixed top-0 left-0 z-20 flex flex-col bg-white shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                <div className="flex justify-between px-5 py-3 mb-5 shadow-md">
                    <Link to='/'>
                        <img src="/images/logo.png" alt="logo" className="w-[100px]" />
                    </Link>
                    {
                        session &&
                        <div className="flex flex-col">
                            <div className="p-3">
                                <img onClick={() => { setProfile(!profile) }} src={session.photoURL || "/images/user.jpg"} alt="user" className="w-7 h-7 hover:scale-125 cursor-pointer rounded-full" />
                            </div>
                            {
                                profile &&
                                <div id="profile" className="overflow-y-auto pb-[120px] w-full h-full absolute top-[92px] right-0 flex flex-col animate__animated animate__fadeIn animate__faster z-10 bg-white">
                                    <div className="flex gap-5 font-semibold items-center px-5 border-b-2 border-slate-100 pb-3">
                                        <div>
                                            <img src={session.photoURL || "/images/user.jpg"} alt="user" className="w-7 h-7 cursor-pointer rounded-full" />
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            <h1 className="capitalize">{session.displayName}</h1>
                                            <Link className="text-[12px] hover:text-cyan-700">{session.email}</Link>
                                        </div>
                                    </div>
                                    <ul>
                                        <Link to='/profile' className="px-5 hover:px-7 hover:text-cyan-600 flex gap-2 cursor-pointer hover:bg-cyan-50 py-2 text-sm mt-2">
                                            <i className="ri-profile-line"></i>
                                            My Profile
                                        </Link>
                                        {
                                            (role && role === "admin") &&
                                            <Link to='/admin/dashboard' className="px-5 hover:px-7 hover:text-cyan-600 flex gap-2 cursor-pointer hover:bg-cyan-50 py-[6px] text-sm mt-2">
                                                <i className="ri-admin-line"></i>
                                                Admin Pannel
                                            </Link>
                                        }
                                        <Link to='/cart' className="px-5 hover:px-7 hover:text-cyan-600 flex gap-2 cursor-pointer hover:bg-cyan-50 py-2 text-sm">
                                            <i className="ri-shopping-cart-line"></i>
                                            Cart
                                        </Link>
                                        <button type="button"
                                            onClick={() => {
                                                signOut(auth)
                                                { aside() }
                                            }}
                                            className="flex gap-2 px-5 hover:px-7 hover:text-cyan-600 w-full cursor-pointer font-semibold text-zinc-700 hover:bg-cyan-50 py-[6px] text-sm">
                                            <i className="ri-logout-circle-r-line"></i>
                                            Logout
                                        </button>
                                    </ul>
                                </div>
                            }
                        </div>
                    }
                </div>
                <ul className="flex flex-col gap-3 px-7 pb-7">
                    {
                        menus.map((items, index) => (
                            <Link key={index} to={items.href}
                                style={{
                                    background: (Location.pathname === items.href) ? 'oklch(51.4% 0.222 16.935)' : 'white',
                                    color: (Location.pathname === items.href) ? 'white' : 'rgba(0,0,0,0.6)'
                                }}
                                className="px-3 py-[6px] font-semibold rounded-sm shadow-md border border-slate-50">{items.title}</Link>
                        ))
                    }
                    {
                        !session &&
                        <div className="flex justify-between mt-3">
                            <Link to='/login' className="bg-cyan-700 hover:rounded-[15px] hover:bg-cyan-600 border-none outline-none rounded-l text-center py-[6px] w-full text-white text-sm">Login</Link>
                            <Link to='/signup' className="bg-rose-700 hover:rounded-[15px] hover:bg-rose-600 border-none outline-none rounded-r text-center py-[6px] w-full text-white text-sm">Signup</Link>
                        </div>
                    }
                </ul>
            </aside>
        </div>
    )
}

export default Layout