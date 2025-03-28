// import Image from 'next/image';
import React from 'react';

export const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`flex ${className} items-center justify-center rounded-full bg-primary`}
    >
      {/* <Image src="/logo.png" width={40} height={40} alt="logo" /> */}
    </div>
  );
};
