import { useState, useEffect } from "react";
import Layout from "./Layout";
import firebaseAppConfig from '../../util/firebase-config'
import { getFirestore, getDocs, collection, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const db = getFirestore(firebaseAppConfig)

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [toggel, setToggel] = useState(false)
    const [toggelIndex, setToggelIndex] = useState(null)

    useEffect(() => {
        const req = async () => {
            const snapshot = await getDocs(collection(db, "orders"))
            const tem = []
            snapshot.forEach((doc) => {
                const allOrders = doc.data()
                allOrders.orderId = doc.id
                tem.push(allOrders)
            })
            setOrders(tem)
        }
        req()
    }, [])

    const updateOrderStatus = async (e, orderId) => {
        try {
            const status = e.target.value
            const ref = doc(db, "orders", orderId)
            await updateDoc(ref, { status: status })
            Swal.fire({
                icon: 'success',
                title: 'Order Status Updated !'
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    
    return (
        <Layout>
            <div className="flex items-center flex-col py-5 md:w-[90%] w-full px-5 mx-auto shadow-lg">
                <div className="flex gap-3 items-center">
                    <i className="ri-shopping-cart-2-line text-3xl text-cyan-600"></i>
                    <h1 className="text-2xl font-bold text-cyan-600">My Order</h1>
                </div>

                <div className="w-full overflow-x-auto whitespace-nowrap">
                    <table className="w-full md:text-auto text-sm mt-5">
                        <thead>
                            <tr className="bg-cyan-600 text-white text-left">
                                <th className="font-semibold py-2 px-4 border border-slate-200">Order Id</th>
                                <th className="font-semibold px-4 border border-slate-200">Customer's Name</th>
                                <th className="font-semibold px-4 border border-slate-200">Email Id</th>
                                <th className="font-semibold px-4 border border-slate-200">Mobile No.</th>
                                <th className="font-semibold px-4 border border-slate-200">Products</th>
                                <th className="font-semibold px-4 border border-slate-200">Amount</th>
                                <th className="font-semibold px-4 border border-slate-200">Date & Time</th>
                                <th className="font-semibold px-4 border border-slate-200">Address</th>
                                <th className="font-semibold px-4 border border-slate-200">City</th>
                                <th className="font-semibold px-4 border border-slate-200">Country</th>
                                <th className="font-semibold px-4 border border-slate-200">Postal</th>
                                <th className="font-semibold px-4 border border-slate-200">State</th>
                                <th className="font-semibold px-4 border border-slate-200">Order/Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((items, index) => (
                                    <tr key={index} className="text-sm even:bg-gray-50 hover:bg-gray-500 hover:text-white">
                                        <td className="px-4 border border-slate-200 py-[10px]">{items.orderId}</td>
                                        <td className="px-4 border border-slate-200 capitalize">{items.customerName}</td>
                                        <td className="px-4 border border-slate-200">{items.email}</td>
                                        <td className="px-4 border border-slate-200">{items.address ? items.address.mobile : <h1 className="font-semibold text-rose-600">Update Required</h1>}</td>
                                        <td className="px-4 border border-slate-200">{items.title}</td>
                                        <td className="px-4 border border-slate-200">₹{items.price}/-</td>
                                        <td className="px-4 border border-slate-200">{items.createdAt?.toDate().toLocaleString()}</td>
                                        <td onClick={()=>{
                                                setToggelIndex(index)
                                                setToggel(!toggel)
                                            }}  className="px-4 cursor-pointer border border-slate-200 md:whitespace-nowrap whitespace-normal hover:bg-white ">
                                            <button className="text-blue-500 font-semibold ">{(toggel && toggelIndex === index) ? "Hide" : "Show"}</button>
                                            {
                                                (toggel && toggelIndex === index) &&
                                                <td className="text-black">{items.address ? items.address.address : <h1 className="font-semibold text-rose-600">Update Required</h1>}</td>
                                            }
                                        </td>
                                        <td className="px-4 border border-slate-200  ">{items.address ? items.address.city: <h1 className="font-semibold text-rose-600">Update Required</h1>}</td>
                                        <td className="px-4 border border-slate-200 ">{items.address ? items.address.country: <h1 className="font-semibold text-rose-600">Update Required</h1>}</td>
                                        <td className="px-4 border border-slate-200 ">{items.address ? items.address.postal: <h1 className="font-semibold text-rose-600">Update Required</h1>}</td>
                                        <td className="px-4 border border-slate-200 ">{items.address ? items.address.state: <h1 className="font-semibold text-rose-600">Update Required</h1>}</td>
                                        <td className="px-4 border border-slate-200">
                                            <select onChange={(e) => updateOrderStatus(e, items.orderId)} className="bg-inherit outline-none md:w-full">
                                                <option value="pending" className="text-black">Pending</option>
                                                <option value="processing" className="text-black">Processing</option>
                                                <option value="dispatched" className="text-black">Dispatched</option>
                                                <option value="returned" className="text-black">Returned</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default Orders