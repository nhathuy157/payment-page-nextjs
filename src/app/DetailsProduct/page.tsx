"use client";
import { useState, useEffect } from "react";
import classes from "./DetailsProduct.module.css";
import InfoITem from "@/components/InfoItem/InfoITem";
import Image from "next/image";
import Button from "@/components/Button/Button";
// import { Link, useLocation, useNavigate } from 'react-router-dom'
import getOrder from "../common";

function toVND(number: number) {
  return number.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

export default function DetailsProduct({searchParams}:any) {
  const [detailsInfo, setDetailsInfo] = useState({
    "success": true,
    "data": {
      "sample": false,
      "totalAccountAll": -579020,
      "totalMoney": 38480000,
      "discount": 0,
      "accept_produce_at": 1719224171,
      "deadline": 1720026000,
      "code": "EF24D9",
      "totalVAT": 3078400,
      "totalMoneyAfterVATorDiscount": 41558400,
      "totalProduct": 68,
      "totalPay": 42137420,
      "cancel_at": null,
      "delivered_at": 1721011179,
      "produced_at": 1720690534,
      "sent_at": 1720691298,
      "customer": {
        "name": "Quỳnh Mỹ",
        "phone": "0367863984",
        "address": "tòa Epic, ngõ 19 Duy Tân, Cầu Giấy, Hà Nội",
        "taxCode": null,
        "taxName": null,
        "taxAddress": null,
        "total_unpaid": 63870719,
        "orders_count": 4,
        "unsent_orders_count": 0,
        "assign": {
          "first_name": "Minh Giang",
          "last_name": null,
          "phone": "0961887777"
        }
      },
      "products": [
        {
          "name": "Bộ an ninh",
          "number": 20,
          "color": "57",
          "print": null,
          "embroider": "Thêu 3 vị trí",
          "mix": "phối như maket",
          "money": 680000,
          "sizeText": "10L, 10XL",
          "material": {
            "name": "Cotton lạnh"
          }
        },
        {
          "name": "Tạp dề ngắn pha chế",
          "number": 10,
          "color": "297",
          "print": null,
          "embroider": null,
          "mix": "viền túi màu 85 kaki thun",
          "money": 110000,
          "sizeText": "",
          "material": {
            "name": "Kaki Thun"
          }
        },
        {
          "name": "Áo sơ mi nữ tay dài NV kinh doanh",
          "number": 4,
          "color": "MR55-1A",
          "print": null,
          "embroider": null,
          "mix": null,
          "money": 410000,
          "sizeText": "4M",
          "material": {
            "name": "Kate Model"
          }
        },
        {
          "name": "Áo sơ mi cổ tròn quản lí FB",
          "number": 2,
          "color": "MRS 75-6",
          "print": null,
          "embroider": null,
          "mix": null,
          "money": 410000,
          "sizeText": "2M",
          "material": {
            "name": "Kate Model"
          }
        },
        {
          "name": "Áo sơ mi nam tay ngắn",
          "number": 10,
          "color": "MRS 75-6",
          "print": null,
          "embroider": null,
          "mix": null,
          "money": 400000,
          "sizeText": "2M, 6L, 2XL",
          "material": {
            "name": "Kate Model"
          }
        },
        {
          "name": "Áo vest nữ NV kinh doanh tay dài 2 lớp",
          "number": 4,
          "color": "TRS 105-6",
          "print": null,
          "embroider": null,
          "mix": null,
          "money": 1800000,
          "sizeText": "4M",
          "material": {
            "name": "Cashmere italy"
          }
        },
        {
          "name": "Chân váy bút chì form dài có lót NV kinh doanh",
          "number": 4,
          "color": "TRS 105-6",
          "print": null,
          "embroider": null,
          "mix": null,
          "money": 430000,
          "sizeText": "4M",
          "material": {
            "name": "Cashmere italy"
          }
        },
        {
          "name": "Áo vest nữ tay dài 2 lớp quản lí FB",
          "number": 2,
          "color": "TRS 105-6",
          "print": null,
          "embroider": null,
          "mix": "như maket màu 85 kaki thun",
          "money": 1500000,
          "sizeText": "2M",
          "material": {
            "name": "Cashmere italy"
          }
        },
        {
          "name": "Quần tây nữ quản lí FB",
          "number": 2,
          "color": "TRS 105-6",
          "print": null,
          "embroider": null,
          "mix": null,
          "money": 450000,
          "sizeText": "2M",
          "material": {
            "name": "Cashmere italy"
          }
        },
        {
          "name": "Quần tây nam",
          "number": 10,
          "color": "QT 808-1",
          "print": null,
          "embroider": null,
          "mix": null,
          "money": 450000,
          "sizeText": "2M, 6L, 2XL",
          "material": {
            "name": "Cashmere italy"
          }
        }
      ],
      "works": [],
      "ships": {
        "name": "Quỳnh Mỹ",
        "phone": "0367863984",
        "address": "tòa Epic, ngõ 19 Duy Tân, Cầu Giấy, Hà Nội",
        "freeShip": true,
        "track": "1755954288671",
        "description": {
          "status": 501,
          "cod": 0,
          "fee": 311962,
          "ShippingOrderCosts": [
            {
              "PaymentChannelID": 1,
              "Cost": 311962
            }
          ],
          "note": "",
          "noteCode": null,
          "CustomerName": "Quỳnh Mỹ",
          "CustomerPhone": "0367863984",
          "ShippingAddress": "tòa Epic ngõ 19"
        },
        "time_received": 1721011179,
        "delivery": {
          "code": "VTP",
          "text": "Viettel Post"
        }
      },
      "status": {
        "text": "Đã gửi"
      },
      "images": ""
    }
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(window.detailsInfo) {setDetailsInfo(window.detailsInfo); setLoading(false);}
    else getOrder(searchParams.order_hash).then(setDetailsInfo).then(() => {
      // document.title = detailsInfo.data?.code;
      setLoading(false);
    })
    return () => { }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  // debugger
  const item = detailsInfo.data.products[searchParams.index];
  if(!item){
    return <div>hash khong hợp lệ</div>;
  }
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
              src={ "/ArrowLeft.png"}
              alt="error"
              width={500}
              height={354}
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
              src={detailsInfo.data.images || "/no-pictures.png"}
              alt="error"
              width={372}
              height={288}
            />
          </div>
          <ul className={classes.listInfo}>
            <InfoITem title="Tên sản phẩm" content={item.name} />
            <InfoITem title="Chất liệu" content={item.material.name} />
            <InfoITem title="Màu sắc" content={item.color } />
            <InfoITem title="In" content={item.print || "Không"} />
            <InfoITem title="Thêu" content={item.embroider || "Không" } />
            <InfoITem title="Số lượng" content={item.number}/>
            <InfoITem title="Đơn giá" content={item.money}/>
            <InfoITem darkColor={true} title="Tổng tiền" content={toVND(item.money * item.number ) } />
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
          hệ số điện thoại/ zalo : {detailsInfo.data.customer.assign.phone} để được nhân viên hỗ trợ
        </p>
        
      </div>
    </div>
  );
}
