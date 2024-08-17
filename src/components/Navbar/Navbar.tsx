// "use client";
import Image from "next/image";
import classes from "./Navbar.module.css";


import dataRef from "@/app/Config/config";
import { headers } from 'next/headers';


export default function Navbar() {
  const headersList = headers();
  const url = new URL(headersList.get('URL') || "");
  const ref = (url.host.match(/\w+\.(\w+)\.vn/) || [])[1];
  const logo = (dataRef[ref] || dataRef.default).logo;

  return (
    <div className={classes.container}>
      <div className={`grid wide ${classes.nav}`}>
        <div>
          <Image
            src={logo}
            alt="error"
            width={372}
            priority
            height={288}
          />
        </div>
      </div>
    </div>
  );
}
