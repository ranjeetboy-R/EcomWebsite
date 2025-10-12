import { Link } from "react-router-dom";
import Layout from "./Layout";

const Category = () => {
    const category = [
        {
            icon: <i className="ri-menu-search-line text-4xl"></i>,
            lable: 'Electronics'
        },
        {
            icon: <i className="ri-menu-search-line text-4xl"></i>,
            lable: 'Fashion'
        },
        {
            icon: <i className="ri-menu-search-line text-4xl"></i>,
            lable: 'Smartphones'
        },
        {
            icon: <i className="ri-menu-search-line text-4xl"></i>,
            lable: 'Furnitures'
        },
        {
            icon: <i className="ri-menu-search-line text-4xl"></i>,
            lable: "Women's"
        },
        {
            icon: <i className="ri-menu-search-line text-4xl"></i>,
            lable: "Men's"
        },
        {
            icon: <i className="ri-menu-search-line text-4xl"></i>,
            lable: "Girl's"
        },
        {
            icon: <i className="ri-menu-search-line text-4xl"></i>,
            lable: "Kit's"
        },
    ]
    return (
        <Layout>
            <div className="flex flex-col items-center gap-5 py-10">
                <div className="flex flex-col items-center mb-5">
                    <div className="flex gap-3 items-center mb-3">
                        <i className="ri-luggage-cart-line text-3xl text-cyan-600"></i>
                        <h1 className="text-2xl font-bold text-cyan-600">Our Categories</h1>
                    </div>
                </div>

                <div className=" md:w-[70%] w-full grid md:grid-cols-4 grid-cols-2 md:gap-10 md:px-auto px-5 gap-5 mx-auto">
                    {
                        category.map((items, index) => (
                            <Link key={index} className="py-10 hover:scale-105 shadow-lg hover:bg-rose-800 cursor-pointer hover:text-white rounded-lg border border-black/10 flex flex-col items-center">
                                {items.icon}
                                <h1 className="text-lg font-semibold ">{items.lable}</h1>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}
export default Category