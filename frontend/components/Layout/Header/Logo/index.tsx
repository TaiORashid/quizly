import { getImagePrefix } from "@/utils/util";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Image
      src= {`${getImagePrefix()}images/logo/logo.png`}
      alt="logo"
      width={200}
      height={62.5}
      quality={100}
    />
  );
};

export default Logo;
