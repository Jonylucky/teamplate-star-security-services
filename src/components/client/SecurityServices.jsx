import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";

import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

import {
  police_mini,
  police_mini_2,
  armor_mini,
  safety_mini,
  security_mini,
  firetruck_mini,
  firestation_mini,
  computer_mini,
} from "../../assets/index";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SecurityServices = () => {
  const data = [
    {
      id: 1,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/service-10-770x500.jpg",
      icon: police_mini,
      title: "commercial services",
      desc: "Commercial services provide our companies security professional & best guard.",
    },
    {
      id: 2,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/service-02-770x500.jpg",
      icon: armor_mini,
      title: "home & office service",
      desc: "Home and Office Services for we provide a our best experienced security guard.",
    },
    {
      id: 3,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/service-11-770x500.jpg",
      icon: safety_mini,
      title: "Crowd Management",
      desc: "Our mobile patrolling staff are managed a Crowd Management service to easily.",
    },
    {
      id: 4,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/service-04-770x500.jpg",
      icon: firetruck_mini,
      title: "Transport Security",
      desc: "Transport Security give for a clients are travelling high-risky rush in safe.",
    },
    {
      id: 5,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/service-05-770x500.jpg",
      icon: security_mini,
      title: "Security Consulting",
      desc: "Our Expert guards always Consulting for a clients to provide a best security.",
    },
    {
      id: 6,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2019/05/service-06-770x500.jpg",
      icon: police_mini_2,
      title: "Special Event Security",
      desc: "Special Event Security for provides event managed expert professional guards.",
    },
    {
      id: 7,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2019/04/service-07-770x500.jpg",
      icon: firestation_mini,
      title: "Construction Security",
      desc: "Construction Security provide a companies experts security best staff member.",
    },
    {
      id: 8,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2019/04/service-08-770x500.jpg",
      icon: computer_mini,
      title: "Corporate Security",
      desc: "Corporate Security provides our companies security professionals protections.",
    },
  ];

  return (
    <Wrapper className="py-20 bg-[#1a191d] text-white">
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="flex-1 md:p-10"
      >
        <div className="flex flex-row md:flex-col items-center text-center">
          <div className="font-semibold">
            <h6 className="relative inline-block pb-4 text-sm">
              <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
                WHAT WE DO
              </span>
            </h6>
            <div className="flex flex-col md:flex-row gap-5 my-1">
              <h2 className="text-3xl leading-tight">
                TOP LEVEL OF SECURITY SERVICE INSTALLATION
              </h2>
            </div>
          </div>
        </div>

        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          modules={[Pagination]}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="w-full flex items-center gap-5 py-10"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index} className="flex flex-col gap-2">
              <LazyLoadImage
                src={item.image}
                alt=""
                className="w-full h-full object-cover"
                 effect="blur"
              />

              <div className="relative border border-gray-100 p-4 flex flex-col items-center text-center gap-2">
                <div className="bg-red-700 absolute -top-8 p-3">
                  <LazyLoadImage
                    src={item.icon}
                    alt=""
                    className="w-10 h-w-10 object-cover"
                    effect="blur"
                  />
                </div>
                <Link
                  to=""
                  className="text-lg font-bold uppercase text-nowrap text-white pt-10 hover:text-red-700"
                >
                  {item.title}
                </Link>
                <p className="font-light text-gray-400 h-auto md:h-[50px] text-sm">
                  {item.desc}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </Wrapper>
  );
};

export default SecurityServices;