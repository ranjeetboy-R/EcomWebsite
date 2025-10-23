import Layout from "./Layout"
import MyProducts from "./MyProducts"

const Products = () => {
    return (
        <Layout>
            <div className="flex flex-col py-10">
                <div className="flex flex-col items-center mb-5">
                    <div className="flex gap-3 items-center mb-3">
                        <i className="ri-store-2-line text-3xl text-cyan-600"></i>
                        <h1 className="text-2xl font-bold text-cyan-600">All Products</h1>
                    </div>
                    <p className="text-slate-500 px-5 text-center">Fugiat culpa nesciunt consectetur quaerat distinctio, praesentium temporibus fugiat blanditiis tempore architecto</p>
                </div>
                <MyProducts />
            </div>
        </Layout>
    )
}
export default Products