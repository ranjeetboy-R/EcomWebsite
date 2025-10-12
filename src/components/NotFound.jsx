const NotFound = () => {
    return (
        <div className=" h-screen flex flex-col justify-center items-center gap-20">
            <img src="./images/notFound.svg" alt="notFound" className=" w-[400px]" />
            <h1 className="text-[#3F3D56] font-bold text-2xl ">
                    <i class="ri-reset-right-fill mr-3"></i>
                    404 | Page Not Found</h1>
        </div>
    )
}
export default NotFound