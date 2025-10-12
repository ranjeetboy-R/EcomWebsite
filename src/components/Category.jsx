import { Link } from "react-router-dom";
import Layout from "./Layout";

const Category = () => {
    const category = [
        {
            icon: <i className="ri-menu-search-line md:text-4xl text-2xl"></i>,
            lable: 'Electronics'
        },
        {
            icon: <i className="ri-menu-search-line md:text-4xl text-2xl"></i>,
            lable: 'Fashion'
        },
        {
            icon: <i className="ri-menu-search-line md:text-4xl text-2xl"></i>,
            lable: 'Smartphones'
        },
        {
            icon: <i className="ri-menu-search-line md:text-4xl text-2xl"></i>,
            lable: 'Furnitures'
        },
        {
            icon: <i className="ri-menu-search-line md:text-4xl text-2xl"></i>,
            lable: "Women's"
        },
        {
            icon: <i className="ri-menu-search-line md:text-4xl text-2xl"></i>,
            lable: "Men's"
        },
        {
            icon: <i className="ri-menu-search-line md:text-4xl text-2xl"></i>,
            lable: "Girl's"
        },
        {
            icon: <i className="ri-menu-search-line md:text-4xl text-2xl"></i>,
            lable: "Kit's"
        },
        {
            icon: <i className="ri-menu-search-line md:text-4xl text-2xl"></i>,
            lable: "Summer"
        }
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

                <div className=" md:w-[70%] w-full grid md:grid-cols-4 grid-cols-3 md:gap-10 md:px-auto px-5 gap-3 mx-auto">
                    {
                        category.map((items, index) => (
                            <Link key={index} className="py-10 hover:scale-105 shadow-lg hover:bg-rose-800 cursor-pointer hover:text-white rounded-lg border border-black/10 flex flex-col items-center">
                                {items.icon}
                                <h1 className="md:text-lg text-md font-bold ">{items.lable}</h1>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}
export default Category