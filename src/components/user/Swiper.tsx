import { Swiper, SwiperSlide } from 'swiper/react';


import { Autoplay, Pagination } from 'swiper/modules';
import img1 from '../../assets/Banner2.png'
import img2 from '../../assets/Banner3.png'
import poster from '../../assets/TImag.png'

export default function Slider() {
    return (

        <div className="w-full  sm:flex justify-center  items-center sm:p-4 p-2  sm:h-screen sm:gap-1 ">
            <div className=" sm:w-3/4 w-full sm:h-full border-4">
                <div className="h-full">
                    <Swiper

                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper sm:w-full sm:h-full "

                    >
                        <SwiperSlide>
                            <img className="w-full sm:h-full h-[160px]"
                                loading="lazy" src={img1} alt="img1" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className="w-full sm:h-full h-[160px]"
                                loading="lazy" src={img2} alt="img2" />
                        </SwiperSlide>

                    </Swiper>
                </div>
            </div>
            <div className='h-full border-4'>
                <img src={poster} alt="band" className='sm:h-full ' />
            </div>
        </div>


    );
}
