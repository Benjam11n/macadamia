import Image from 'next/image';
import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo = ({
  className = '',
  width = 40,
  height = 40,
}: LogoProps) => {
  return (
    <div
      className={`flex ${className} items-center justify-center rounded-full`}
    >
      <Image src="/logo2.png" width={width} height={height} alt="logo" />
    </div>
  );
};
