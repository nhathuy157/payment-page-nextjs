"use client";
import { useState, useEffect } from "react";
import classes from "./DetailsProduct.module.css";
import InfoITem from "@/components/InfoItem/InfoITem";
import Image from "next/image";
import Button from "@/components/Button/Button";
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import getOrder from "../PaymentPage/GetOrder";

export default function DetailsProduct(prop:any) {
  // const [detailsInfo, setDetailsInfo] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  return (
    <div className={classes.box_padding}>
      <div className={`grid wide ${classes.container}`}>
        <div className={classes.head}>
          <button
            onClick={() => {
              window.history.back();
            }}
            className={classes.backBtn}
          >
            <Image
              className={classes.backImg}
              src={"/BackBtn.png"}
              alt="error"
              width={72}
              height={288}
            />
          </button>
          <h1 className="textTitle">Chi tiết sản phẩm</h1>
          {/* {
                stateDetais ? (<p onClick={SetDetails}>Ẩn</p>) : (<p onClick={SetDetails}>Xem</p>)
            } */}
        </div>
        <div className={`${classes.listInfoOn} ${classes.box_flex}`}>
          <div className={classes.box_img}>
            <Image
              className={classes.img}
              src={"/Product.png"}
              alt="error"
              width={372}
              height={288}
            />
          </div>
          <ul className={classes.listInfo}>
            <InfoITem title="Tên sản phẩm" content="ao thun" />
            <InfoITem title="Chất liệu" content={"không"} />
            <InfoITem title="Màu sắc" content={"không"} />
            <InfoITem title="In" content={"không"} />
            {/* <InfoITem title="Thêu" content={product.Rent} /> */}
            <InfoITem title="Số lượng" content="1" />
            <InfoITem darkColor={true} title="Tổng tiền" content="2*100" />
            {/* <InfoITem darkColor={true} title="Cọc ( %50)" content={detailsInfo.total.deposit} /> */}
          </ul>
          {/* <div className={classes.box_btn}>
                        <Link to={'/'}>

                            <Button className={classes.btn}>
                                Trở về
                            </Button>
                        </Link>
                    </div> */}
        </div>
        <p
          className="textTitle"
          style={{ textAlign: "center", padding: "30px 0 10px 0" }}
        >
          Lưu ý : Nếu đơn hàng có vấn đề, hoặc không đúng yêu cầu của mình liên
          hệ số điện thoại/ zalo : 0123456789 để được nhân viên hỗ trợ
        </p>
        
      </div>
    </div>
  );
}
