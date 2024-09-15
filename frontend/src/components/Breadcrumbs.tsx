"use client";
import React from "react";
import Separator from "./Separator";
import { usePathname } from "next/navigation";

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <>
      <nav
        className='flex items-center w-full px-8 my-4'
        aria-label='Breadcrumb'
      >
        <ol className='flex items-center gap-5'>
          <li>
            <a href='/' className='text-gray-800 hover:text-gray-800'>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.56566 1.83432C8.25324 1.5219 7.74671 1.5219 7.43429 1.83432L1.83429 7.43432C1.52187 7.74674 1.52187 8.25327 1.83429 8.56569C2.14671 8.87811 2.65324 8.87811 2.96566 8.56569L3.19998 8.33138V13.6C3.19998 14.0418 3.55815 14.4 3.99998 14.4H5.59998C6.0418 14.4 6.39998 14.0418 6.39998 13.6V12C6.39998 11.5582 6.75815 11.2 7.19998 11.2H8.79998C9.2418 11.2 9.59998 11.5582 9.59998 12V13.6C9.59998 14.0418 9.95815 14.4 10.4 14.4H12C12.4418 14.4 12.8 14.0418 12.8 13.6V8.33138L13.0343 8.56569C13.3467 8.87811 13.8532 8.87811 14.1657 8.56569C14.4781 8.25327 14.4781 7.74674 14.1657 7.43432L8.56566 1.83432Z'
                  fill='#292929'
                />
              </svg>

              <span className='sr-only'>Home</span>
            </a>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <React.Fragment key={name}>
                <li>
                  <svg
                    width='6'
                    height='8'
                    viewBox='0 0 6 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M0.834291 7.76569C0.521871 7.45327 0.521871 6.94673 0.834291 6.63432L3.46861 4L0.83429 1.36569C0.521871 1.05327 0.521871 0.546734 0.83429 0.234315C1.14671 -0.078105 1.65324 -0.078105 1.96566 0.234315L5.16566 3.43431C5.47808 3.74673 5.47808 4.25327 5.16566 4.56569L1.96566 7.76569C1.65324 8.0781 1.14671 8.0781 0.834291 7.76569Z'
                      fill='#5E5E5E'
                    />
                  </svg>
                </li>
                <li>
                  {isLast ? (
                    <span className='text-gray-700 font-medium'>{name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ')}</span>
                  ) : (
                    <a href={routeTo} className='text-gray-800 hover:text-gray-800'>
                      {name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ')}
                    </a>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
      <Separator />
    </>
  );
};

export default Breadcrumbs;