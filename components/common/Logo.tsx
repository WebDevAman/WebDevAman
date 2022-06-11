import React, { FunctionComponent } from "react";
import Image from "next/image";
import logo from "../../public/ww-star-272x90.png";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "xl";
}

const Logo: FunctionComponent<LogoProps> = ({ size = "sm" }) => {
  const sizePixel = {
    h: size === "sm" ? 48 : 90,
    w: size === "sm" ? 140 : 272,
  };

  return (
    <Link href='/'>
      <a>
        <Image width={sizePixel.w} height={sizePixel.h} src={logo} alt="site-logo" />
      </a>
    </Link>
  );
};

export default Logo;
