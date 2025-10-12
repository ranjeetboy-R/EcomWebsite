import { useState, useEffect } from "react";
import Layout from "./Layout";
import firebaseAppConfig from '../../util/firebase-config'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import moment from "moment";

const db = getFirestore(firebaseAppConfig)

const  Customers = () => {
    const [customers, setCustomers] = useState([])

    useEffect(()=>{
        const req = async ()=>{
            const snapshot = await getDocs(collection(db, "customers"))
            const tem = []
            snapshot.forEach((doc)=>{
                const allCustomers = doc.data()
                tem.push(allCustomers)
            })
            setCustomers(tem)
        }
        req()
    }, [])

    return (
        <Layout>
            <div className="flex items-center flex-col py-5 md:w-[80%] md:mx-auto md:shadow-lg">
                <div className="flex gap-3 items-center">
                    <i className="ri-user-follow-line text-3xl text-cyan-600"></i>
                    <h1 className="text-2xl font-bold text-cyan-600">Customers</h1>
                </div>

                <div className="w-full mt-5 px-5 overflow-x-auto whitespace-nowrap">
                    <table className="w-full md:text-auto text-sm">
                        <thead>
                            <tr className="bg-cyan-600 text-white text-left">
                                <th className="font-semibold border px-2 py-3">Customer's Name</th>
                                <th className="font-semibold border px-2">Email Id</th>
                                <th className="font-semibold border px-2">Mobile No.</th>
                                <th className="font-semibold border px-2">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers.map((items, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-gray-200 rounded">
                                        <td className="flex gap-1 items-center px-3 py-1 border border-white">
                                            <img src="/images/user.jpg" alt="user" className="w-8 cursor-pointer rounded-full border" />
                                            <div className="flex flex-col">
                                                <label className="px-2 font-semibold">{items.customerName}</label>
                                                <label className="px-2 text-[12px] ">{moment(items.createdAt.toDate()).format('DD MMMM YYYY')}</label>
                                            </div>
                                        </td>
                                        <td className="px-2 border border-white">{items.email}</td>
                                        <td className="px-2 border border-white">+91 {items.mobile}</td>
                                        <td className="px-2 border border-white">{moment(items.createdAt.toDate()).format('DD MMM YYYY hh:mm:ss A')}</td>
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

export default  Customers