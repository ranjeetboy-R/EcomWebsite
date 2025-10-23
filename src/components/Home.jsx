import Layout from "./Layout"
import MyProducts from "./MyProducts"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {

    return (
        <Layout>
            <div>
                <Swiper
                    loop={true}
                    pagination={true}
                    navigation={true}
                    modules={[Autoplay, Navigation, Pagination]}
                    slidesPerView={1}
                    autoplay={{ delay: 3000 }}
                    speed={2000}
                >
                    <SwiperSlide>
                        <img src="/images/h1.jpg" alt="h1" className="md:h-[400px] h-[170px] w-full" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/h2.jpg" alt="h2" className="md:h-[400px] h-[170px] w-full" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/h3.webp" alt="h3" className="md:h-[400px] h-[170px] w-full" />
                    </SwiperSlide>
                </Swiper>

                {/* product section */}
                <div className="flex flex-col py-10">
                    <div className="flex flex-col items-center mb-5">
                        <div className="flex gap-3 items-center mb-3">
                            <i className="ri-store-2-line text-3xl text-cyan-600"></i>
                            <h1 className="text-2xl font-bold text-cyan-600">Products</h1>
                        </div>
                        <p className="text-slate-500 px-5 text-center">Fugiat culpa nesciunt consectetur quaerat distinctio, praesentium temporibus fugiat blanditiis tempore architecto</p>
                    </div>
                    <MyProducts />
                </div>             
            </div>
        </Layout>
    )
}

export default Home