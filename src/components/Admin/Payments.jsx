import Layout from "./Layout";

const  Payments = () => {
    const payments = [
        {
            name: 'Ranjeet kumar',
            email: 'ranjeet@gmail.com',
            mobile: '8473859695',
            date: '01/10/2025 12:30 Am',
            amount: '50000'
        },
        {
            name: 'Ranjeet kumar',
            email: 'ranjeet@gmail.com',
            mobile: '8473859695',
            date: '01/10/2025 12:30 Am',
            amount: '50000'
        },
        {
            name: 'Ranjeet kumar',
            email: 'ranjeet@gmail.com',
            mobile: '8473859695',
            date: '01/10/2025 12:30 Am',
            amount: '50000'
        },
        {
            name: 'Ranjeet kumar',
            email: 'ranjeet@gmail.com',
            mobile: '8473859695',
            date: '01/10/2025 12:30 Am',
            amount: '50000'
        },
        {
            name: 'Ranjeet kumar',
            email: 'ranjeet@gmail.com',
            mobile: '8473859695',
            date: '01/10/2025 12:30 Am',
            amount: '50000'
        },
        {
            name: 'Ranjeet kumar',
            email: 'ranjeet@gmail.com',
            mobile: '8473859695',
            date: '01/10/2025 12:30 Am',
            amount: '50000'
        },
    ]

    return (
        <Layout>
            <div className="flex items-center flex-col py-5 md:w-[70%] md:mx-auto md:shadow-lg">
                <div className="flex gap-3 items-center">
                    <i className="ri-bank-card-line text-3xl text-cyan-600"></i>
                    <h1 className="text-2xl font-bold text-cyan-600">Payments</h1>
                </div>

                <div className="w-full mt-5 px-5 overflow-x-auto whitespace-nowrap">
                    <table className="w-full md:text-auto text-sm">
                        <thead>
                            <tr className="bg-cyan-600 text-white text-left">
                                <th className="font-semibold border px-2 py-3">Customer's Name</th>
                                <th className="font-semibold border px-2">Email Id</th>
                                <th className="font-semibold border px-2">Mobile No.</th>
                                <th className="font-semibold border px-2">Date & Time</th>
                                <th className="font-semibold border px-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((items, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-gray-100 rounded">
                                        <td className="flex gap-1 items-center px-3 py-1 border border-white">
                                            <img src="/images/user.jpg" alt="user" className="w-8 cursor-pointer rounded-full border" />
                                            <div className="flex flex-col">
                                                <label className="px-2 font-semibold">{items.name}</label>
                                                <label className="px-2 text-[12px] ">{items.date}</label>
                                            </div>
                                        </td>
                                        <td className="px-2 border border-white">{items.email}</td>
                                        <td className="px-2 border border-white">+91 {items.mobile}</td>
                                        <td className="px-2 border border-white">{items.date}</td>
                                        <td className="px-2 border border-white">₹{Number(items.amount).toLocaleString()}/-</td>
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

export default  Payments