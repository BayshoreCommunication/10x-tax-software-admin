import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiPhoneFill } from "react-icons/ri";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { ImFacebook2 } from "react-icons/im";
import { BsLinkedin } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import { IoMdHome } from "react-icons/io";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { siteConfig } from "@/config/site";

const MainFooter = () => {
  return (
    <>
      <footer className="bg-secondary">
        <div className="container py-16">
          <div className="md:flex md:justify-center">
            <div className="grid justify-center grid-cols-2 gap-8 sm:gap-6 md:grid-cols-5 ">
              <div className="col-span-2 mx-auto mb-6 md:mb-0 md:mx-0">
                <Link
                  href="https://trip-law.com"
                  className="flex items-center justify-center cursor-pointer md:justify-start"
                >
                  <Image
                    width={320}
                    height={200}
                    src={"/assets/site-logo/tampla-motion-logo-white.png"}
                    alt="Trip Low"
                    className="object-cover"
                  />
                </Link>
                <p className="py-5 text-[18px] font-normal text-center text-white md:text-left max-w-[450px] leading-8">
                  The firm offers a free consultation and will gladly discuss
                  your case with you at your convenience. Contact Melamed Law,
                  PLLC today to schedule an appointment.
                </p>

                <div className="text-white  flex justify-center md:justify-start gap-3 mt-4 md:mt-6 ">
                  <Link
                    href="https://www.facebook.com/MelamedLawPLLC"
                    target="_blank"
                    className="inline-block p-2 rounded  duration-300"
                  >
                    <FaFacebookF className="size-5 hover:text-black" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/melamedlawpllc"
                    target="_blank"
                    className="inline-block p-2 rounded duration-300"
                  >
                    <FaLinkedinIn className="size-5 hover:text-black" />
                  </Link>
                  <Link
                    href="https://x.com/Melamedlawpllc"
                    target="_blank"
                    className="inline-block p-2 rounded  duration-300"
                  >
                    <FaTwitter className="size-5 hover:text-black" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/melamedlaw_pllc"
                    target="_blank"
                    className="inline-block p-2 rounded  duration-300"
                  >
                    <FaInstagram className="size-5 hover:text-black" />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@melamedlawpllc"
                    target="_blank"
                    className="inline-block p-2 rounded duration-300"
                  >
                    <FaYoutube className="size-5 hover:text-black" />
                  </Link>
                </div>
              </div>
              <div className="">
                <h2 className="text-[22px] font-semibold text-white">
                  Quick Links
                </h2>
                <hr className="mt-2 mb-6 w-28 border-white" />
                <ul className="ml-0 text-white list-none text-[18px] font-medium">
                  {siteConfig?.footer?.quick_links?.map((el, index) => (
                    <li className="mb-4" key={index}>
                      <Link href={el.slug} className="hover:underline">
                        {el.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="">
                <h2 className="text-[22px] font-semibold text-white">
                  Legal Areas
                </h2>
                <hr className="w-32 mt-2 mb-6 border-white" />
                <ul className="ml-0 text-[18px] font-medium text-white list-none">
                  {siteConfig?.footer?.company?.map((el, index) => (
                    <li className="mb-4" key={index}>
                      <Link href={el.slug} className="hover:underline">
                        {el.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h2 className="font-semibold text-white text-[22px]">
                  Contact us
                </h2>
                <hr className="w-24 mt-2 mb-6 border-white" />
                <ul className="ml-0 text-[18px] font-medium text-white list-none">
                  <li className="mb-4">
                    <div className="flex items-center gap-x-1">
                      <IoLocationSharp className="size-6 text-white" />

                      <h3 className="font-semibold text-white text-[20px]">
                        Location
                      </h3>
                    </div>
                    <Link
                      href="https://maps.app.goo.gl/BxuNRwy3CHg2ykCd7"
                      className=" hover:underline duration-300"
                      target="_blank"
                    >
                      {`20200 West Dixie Highway, Suite 902Aventura, FL 33180`}
                    </Link>
                  </li>
                  <li className="mb-4">
                    <div className="flex items-center gap-x-1">
                      <RiPhoneFill className="size-6 text-white" />

                      <h3 className="font-semibold text-white text-[20px]">
                        Contact
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      <Link
                        href="tel:954-529-0695"
                        className="hover:underline duration-300"
                      >
                        {`954-529-0695`}
                      </Link>
                      {/* <Link
                        href="tel:+18635996735"
                        className="hover:underline duration-300"
                      >
                        (863) 599-6735
                      </Link> */}
                    </div>
                  </li>

                  <li className="mb-4">
                    <div className="flex items-center gap-x-1">
                      <MdMarkEmailUnread className="size-6 text-white" />

                      <h3 className="font-semibold text-white text-[20px]">
                        Email
                      </h3>
                    </div>
                    <Link
                      href="mailto:aaron@melamedlawpllc.com"
                      className="hover:underline duration-300"
                    >
                      aaron@melamedlawpllc.com
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-white sm:mx-auto lg:my-8" />
          <div className="md:flex :items-center sm:justify-between">
            <div className="text-[18px] font-medium text-center text-white">
              © 2024{" "}
              <a
                href="https://trip-law.com/"
                className="hover:underline text-white"
              >
                Tampla Motion
              </a>
              . All Rights Reserved.
            </div>

            <div className="text-[18px] font-medium text-center text-white">
              Design & Developed by{" "}
              <a
                href="https://www.bayshorecommunication.com//"
                target="_blank"
                className="font-medium hover:underline text-white"
              >
                BayShore Communication
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
