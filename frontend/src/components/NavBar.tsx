"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TbRefresh } from "react-icons/tb";
import { HiOutlineOfficeBuilding, HiOutlineUser } from "react-icons/hi";
import { BsMoon } from "react-icons/bs";
import useAuthInfo from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const pageTitle = pathname ? pathname.split("/").pop() || "Home" : "Home";
  const logout = useAuthInfo().logout;
  const router = useRouter();

  return (
    <nav className='bg-primary text-white'>
      <div className='mx-auto px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <a href='/'>
              <Image
                src='/logo.png'
                alt='Logo'
                width={90}
                height={30}
                className='mr-4'
              />
            </a>
          </div>
          <h1 className='text-sm font-normal'>
            {pageTitle.charAt(0).toUpperCase() +
              pageTitle.slice(1).toLowerCase().replace(/-/g, " ")}
          </h1>
          <div className='flex items-center space-x-4'>
            <button className='p-2 rounded-full hover:bg-primary'>
              <TbRefresh size={25} />
            </button>
            <svg
              width='1'
              height='32'
              viewBox='0 0 1 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='1' height='32' fill='#D9D9D9' />
            </svg>

            <button className='p-2 rounded-full hover:bg-primary'>
              <HiOutlineOfficeBuilding size={25} />
            </button>
            <button className='p-2 rounded-full hover:bg-primary'>
              <BsMoon size={23} />
            </button>
            <button
              className='p-2 rounded-full hover:bg-blue-500'
              title='Logout'
            >
              <HiOutlineUser
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                size={25}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
