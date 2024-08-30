"use client";
import Image from "next/image";
import classes from "./Navbar.module.css";
import React, { useState, useEffect } from "react";

import dataRef from "@/app/Config/config";
// import { headers } from 'next/headers';


export default function Navbar() {
  // const headersList = headers();
  // const url = headersList.get('URL');
  // const ref = (window.location?.host.match(/\w+\.(\w+)\.vn/) || [])[1];
  // const ref = url ? (new URL(url).host.match(/\w+\.(\w+)\.vn/) || [])[1] : 'default';
  const [logo, setLogo] = useState(dataRef["default"].logo);
  useEffect(() => {
    const ref = (document.location.host.match(/\w+\.(\w+)\.vn/) || [])[1] || 'default';
    setLogo(dataRef[ref].logo);
  }, [logo]);

  

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
        <div className={`${classes.box_btn}`}>
          <p className="">Trạng thái :</p>
          <p id="statusText" className="textTitle"></p>
        </div>
      </div>
    </div>
  );
}
