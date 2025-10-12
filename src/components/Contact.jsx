import Layout from "./Layout";

const Contact = () => {
    return (
        <Layout>
            <div className="flex flex-col md:gap-10 gap-5 mb-5">
                <img src="/images/c2.jpg" alt="c1" className="w-full md:h-[400px] h-[200px]" />
                <div className="flex flex-col gap-5 md:w-[45%] w-[95%] mx-auto shadow-lg border border-slate-50 rounded md:p-10 p-5">
                    <h1 className="font-semibold font-mono text-3xl text-center">Contact Our Team!</h1>
                    <div className="flex flex-col">
                        <label className="text-[500] text-md font-semibold">Your Name</label>
                        <input required type="text" name="fullname" placeholder="Enter your fullname"
                            className="bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[500] text-md font-semibold">Email Id</label>
                        <input required type="email" name="email" placeholder="Enter email id"
                            className="bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[500] text-md font-semibold">Massage</label>
                        <textarea required type="text" name="massage" placeholder="Enter your massage here"
                            className="bg-inherit border border-slate-100 mt-1 p-2 hover:px-3 rounded w-full outline-none text-[15px] shadow-md" />
                    </div>
                    <button type="submit" className="bg-rose-700 w-fit px-7 py-[10px] text-sm text-white rounded-md hover:bg-cyan-600 mt-5">Get Ouote</button>
                </div>
            </div>
        </Layout>
    )
}

export default Contact