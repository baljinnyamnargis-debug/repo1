"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full h-auto min-h-[280px] flex justify-center items-start py-[40px] px-6 bg-[var(--Indigo-700,#4338CA)]">
      <div className="flex w-full max-w-[1280px] flex-col md:flex-row items-start justify-between gap-10 md:gap-[120px]">
        <div className="w-[247px] h-full flex flex-col items-start gap-[40px] self-stretch">
          <div className="flex flex-col items-start gap-[12px]">
            <div className="flex items-center gap-[8px] text-white">
              <Image src="/film (1).png" alt="Film(1)" width={20} height={20} />
              <p className="text-[#FAFAFA] font-inter font-bold text-base italic leading-[20px] tracking-[0.32px]">
                Movie Z
              </p>
            </div>
            <p className="text-[#FAFAFA] text-sm font-inter font-normal not-italic leading-[20px]">
              © 2024 Movie Z. All Rights Reserved
            </p>
          </div>
        </div>

        <div className="w-full max-w-[913px] h-full flex flex-col sm:flex-row justify-end items-start gap-10 sm:gap-[96px] flex-[1_0_0]">
          <div className="flex flex-col items-start gap-[12px]">
            <p className="text-[#FAFAFA] text-sm font-inter font-semibold not-italic leading-[20px]">
              Contact Information
            </p>

            <div className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-[12px]">
                <Image
                  src="/Wifi icon.png"
                  alt="Email_icon"
                  width={20}
                  height={20}
                />
                <div className="flex flex-col items-start">
                  <p className="text-[#FAFAFA] text-xs font-inter font-medium opacity-70">
                    Email:
                  </p>
                  <p className="text-[#FAFAFA] text-sm font-inter font-normal leading-[20px]">
                    support@movieZ.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-[12px]">
                <Image
                  src="/Wifi icon (1).png"
                  alt="Phone_icon"
                  width={20}
                  height={20}
                />
                <div className="flex flex-col items-start">
                  <p className="text-[#FAFAFA] text-xs font-inter font-medium opacity-70">
                    Phone:
                  </p>
                  <p className="text-[#FAFAFA] text-sm font-inter font-normal leading-[20px]">
                    +976 (11) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-[12px]">
            <p className="text-[#FAFAFA] text-sm font-inter font-semibold not-italic leading-[20px]">
              Follow us
            </p>

            <div className="flex gap-[12px]">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-[#FAFAFA] text-sm font-inter font-normal opacity-80 hover:opacity-100 hover:underline"
              >
                Facebook
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-[#FAFAFA] text-sm font-inter font-normal opacity-80 hover:opacity-100 hover:underline"
              >
                Instagram
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-[#FAFAFA] text-sm font-inter font-normal opacity-80 hover:opacity-100 hover:underline"
              >
                Twitter
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="text-[#FAFAFA] text-sm font-inter font-normal opacity-80 hover:opacity-100 hover:underline"
              >
                Youtube
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
