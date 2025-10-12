import { useState, useEffect } from "react"
import Layout from "./Layout"
import firebaseAppConfig from '../../util/firebase-config'
import { getFirestore, addDoc, collection, query, getDocs, where, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { onAuthStateChanged, getAuth } from "firebase/auth"
import Swal from "sweetalert2"

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)

const Product = () => {
    const [product, setProduct] = useState([])
    const model = {
        title: '',
        price: '',
        discount: '',
        description: ''
    }
    const [loading, setLoading] = useState(false)
    const [uiUpdate, setUiUpdate] = useState(false)
    const [session, setSession] = useState(null)
    const [productModel, setProductModel] = useState(false)
    const [productForm, setProductForm] = useState(model)
    const [edit, setEdit] = useState(null)
    const [ind, setInd] = useState(null)

    const productModelClose = () => {
        setEdit(null)
        setProductForm(model)
        setProductModel(false)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)

            }
            else {
                setSession(null)
            }
        })
    }, [])

    useEffect(() => {
        const req = async () => {
            if (session) {
                const col = collection(db, "products")
                const q = query(col, where("userId", "==", session.uid))
                const snapshot = await getDocs(q)
                const tem = []
                snapshot.forEach((doc) => {
                    const productData = doc.data()
                    productData.id = doc.id
                    tem.push(productData)
                })
                setProduct(tem)
            }
        }
        req()
    }, [session, product, uiUpdate])
    const inputValue = (e) => {
        const input = e.target
        const name = input.name
        const value = input.value
        setProductForm({
            ...productForm,
            [name]: value
        })
    }

    const createProduct = async (e) => {
        try {
            e.preventDefault()
            productForm.userId = session.uid
            await addDoc(collection(db, "products"), productForm)
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product added successfully'
            })
            setProductForm(model)
            setProductModel(false)
        }
        catch (error) {
            const errorMsg = error.message.replace("Firebase: ").split("(")[0].trim();
            Swal.fire({
                icon: 'error',
                title: 'Feild',
                text: errorMsg
            })
        }
    }

    const productInput = async (e, id) => {
        const file = e.target.files[0]
        if (!file) return
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "product_image_upload")
        data.append("cloud_name", "de4timwla")
        setLoading(true)
        const request = await fetch("https://api.cloudinary.com/v1_1/de4timwla/image/upload", {
            method: 'POST',
            body: data
        })

        const uploadImage = await request.json()
        const imageUrl = uploadImage.url
        const ref = doc(db, "products", id)
        await updateDoc(ref, { image: imageUrl })
        setLoading(false)
    }

    const deleteProduct = async (id) => {
        try {
            const ref = doc(db, "products", id)
            await deleteDoc(ref)
            setUiUpdate(!uiUpdate)
        }
        catch (error) {
            console.log(error)
        }
    }

    const updateProduct = (items) => {
        setEdit(items)
        setProductForm(items)
        setProductModel(true)
    }

    const editProduct = async (e) => {
        try {
            e.preventDefault()
            const ref = doc(db, "products", edit.id)
            await updateDoc(ref, productForm)
            setProductForm(model)
            setProductModel(false)
            setEdit(null)
            setUiUpdate(!updateUi)
        }
        catch (error) {
            console.log(error)
        }
    }

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
        <Layout>
            <div className="flex flex-col justify-center m-5 p-5 md:w-[95%] w-full mx-auto">
                <div className="sticky top-0 left-0 z-40 bg-white w-full flex items-center justify-between text-zinc-700 shadow-lg p-5 border border-slate-100">
                    <h1 className="md:text-xl font-bold">
                        <i className="ri-shopping-cart-line md:text-xl mr-2"></i>
                        Add New Products
                    </h1>
                    <button
                        onClick={() => { setProductModel(true) }}
                        className="bg-cyan-600 rounded text-white py-2 text-sm px-3">
                        <i className="ri-add-line mr-2"></i>
                        Create Now
                    </button>
                </div>
                <div className="grid md:grid-cols-3 w-full grid-cols-2 md:gap-8 gap-5 py-10">
                    {
                        product.map((items, index) => (
                            <div key={index} className="flex flex-col gap-1 shadow-lg md:hover:scale-105">

                                <div id="file" className="relative rounded border">
                                    <div className="md:h-[250px] h-[120px] w-full">
                                        {
                                            (loading && ind === index) ?
                                                <img src="/images/loading2.gif" alt="Loading..." className="object-cover object-top w-full h-full" />
                                                :
                                                <img src={items.image ? items.image : "/images/selectImage.svg"} alt={index.image} className="object-cover object-top w-full h-full" />
                                        }
                                    </div>
                                    <div id="profile_img" className="flex flex-col justify-center items-center absolute top-0 w-full h-full left-0 rounded bg-black/80">
                                        <i className="ri-camera-ai-line text-3xl text-zinc-300"></i>
                                        <h1 className="text-md text-gray-300 mt-3 font-semibold">Choose and Upload</h1>
                                    </div>
                                    <input
                                        onChange={(e) => {
                                            productInput(e, items.id)
                                            setInd(index)
                                        }}
                                        type="file"
                                        accept="image/*"
                                        className="absolute top-0 cursor-pointer left-0 w-full h-full rounded-full opacity-0"
                                    />
                                </div>

                                <div className="flex flex-col p-3">
                                    <div className="flex md:flex-row flex-col justify-between">
                                        <h1 className="font-semibold md:text-lg text-[12px] text-cyan-700 capitalize">{items.title}</h1>
                                        <div className="flex md:gap-3 gap-2">
                                            <button onClick={() => updateProduct(items)} className="px-1 py-1 text-gray-700">
                                                <i className="ri-file-edit-line"></i>
                                            </button>
                                            <button onClick={() => deleteProduct(items.id)} className="px-1 py-1 text-rose-700">
                                                <i className="ri-delete-bin-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex md:gap-3 gap-2 md:text-md text-sm mt-1 whitespace-nowrap">
                                        <label className="font-semibold text-cyan-700">₹{items.price - ((items.price * items.discount) / 100)}</label>
                                        <del className="font-semibold  text-black/80">₹{items.price}</del>
                                        <label className="font-semibold text-black/80">{items.discount}% off</label>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    productModel &&
                    <div className="fixed px-5 z-50 top-0 left-0 bg-black/80 w-full flex justify-center items-center h-full animate__animated animate__fadeIn animate__faster">
                        <div className="flex md:w-[45%] w-full p-10 bg-white rounded-lg animate__animated animate__zoomIn animate__faster">
                            <form onSubmit={edit ? editProduct : createProduct} className="flex flex-col gap-7 w-full">
                                <div className="flex items-center justify-between text-zinc-700">
                                    <h1 className="text-xl font-bold">
                                        <i className="ri-shopping-cart-line text-xl mr-2"></i>
                                        Add New Products
                                    </h1>
                                    <button
                                        onClick={productModelClose}
                                        type="button"
                                        className="w-8 h-8">
                                        <i className="ri-close-line text-xl"></i>
                                    </button>
                                </div>
                                <input
                                    value={productForm.title}
                                    required
                                    onChange={inputValue}
                                    type="text"
                                    name="title"
                                    placeholder="Enter Product Title Here"
                                    className="capitalize p-2 hover:px-3 text-sm border border-slate-100 w-full shadow outline-none"
                                />
                                <div className="flex gap-5">
                                    <input
                                        value={productForm.price}
                                        required
                                        onChange={inputValue}
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                        className="p-2 hover:px-3 text-sm border border-slate-100 w-full shadow outline-none"
                                    />
                                    <input
                                        value={productForm.discount}
                                        required
                                        onChange={inputValue}
                                        type="number"
                                        name="discount"
                                        placeholder="Discount"
                                        className="p-2 hover:px-3 text-sm border border-slate-100 w-full shadow outline-none"
                                    />
                                </div>
                                <textarea
                                    value={productForm.description}
                                    required
                                    onChange={inputValue}
                                    name="description"
                                    placeholder="Description Here"
                                    className="capitalize outline-none p-2 h-[100px] hover:px-3 text-sm border border-slate-100 w-full shadow"
                                />
                                {
                                    edit ?
                                        <button className="bg-cyan-600 hover:bg-rose-800 text-sm text-white px-5 py-2 w-fit outline-none rounded">
                                            <i className="ri-function-add-line mr-2"></i>
                                            Update Now
                                        </button>
                                        :
                                        <button className="bg-cyan-600 hover:bg-rose-800 text-sm text-white px-5 py-2 w-fit outline-none rounded">
                                            <i className="ri-function-add-line mr-2"></i>
                                            Add Now
                                        </button>
                                }

                            </form>
                        </div>
                    </div>
                }
            </div>
        </Layout>
    )
}
export default Product