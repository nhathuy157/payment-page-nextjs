"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import InfoITem from "@/components/InfoItem/InfoITem";
import ProductItem from "@/components/ProductItem/ProductItem";
import Swal from "sweetalert2";
import dataRef from "@/app/Config/config";
import ReactCardFlip from "react-card-flip";
import getOrder from "./common";
import { Result } from "postcss";
import { error } from "console";
// import { headers } from 'next/headers';

function toVND(number: number) {
  return number.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}
function copyText(text: string, btn: any) {
  // Tạo một textarea tạm thời để chứa văn bản cần sao chép
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);

  // Chọn nội dung trong textarea
  textarea.select();
  textarea.setSelectionRange(0, 99999); // Cho các thiết bị di động

  // Thực hiện sao chép
  try {
    document.execCommand('copy');
    // alert('Nội dung đã được sao chép!');
  } catch (err) {
    console.error('Không thể sao chép nội dung:', err);
  }

  // Xóa textarea sau khi sao chép
  document.body.removeChild(textarea);
  btn.innerText = "Đã sao chép";
}


export default function Home({searchParams}:any) {
  const [statePayment, setsStatePayment] = useState(true);
  const [stateTks, setsStateTks] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isStop, setIsStop] = useState(false);
  const [error, setError] = useState(null);
  var [detailsInfo, setDetailsInfo] = useState({
    "success": true,
    "data": {
      "sample": true,
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
      }
    }
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
        setsStateTks(!stateTks);
    }, 6000);

    // Dọn dẹp bộ đếm thời gian khi component bị hủy hoặc khi count thay đổi
    return () => clearTimeout(timer);
}, [stateTks]);

useEffect(() => {
  (async () => {
    const test = await getOrder(searchParams.order_hash);
    setDetailsInfo(test);
    setLoading(false);
  })();
}, [searchParams.order_hash]);

useEffect(() => {
  if (detailsInfo) {
    document.title = "Thông tin đơn hàng " + detailsInfo.data?.code;
    window.detailsInfo = detailsInfo;
  }
}, [detailsInfo]);


  useEffect(() => {
    // Hàm kiểm tra điều kiện
    const checkCondition = async () => {
        console.log('checkCondition');
        if (isChecking || isStop) return; // Nếu đang kiểm tra, bỏ qua lần gọi mới
        if (['đã gửi', 'hoàn thành'].includes(detailsInfo?.data.status.text.toLocaleLowerCase())) { setIsStop(true); return }; // Nếu đã gửi thì không update
        setIsChecking(true);
        try {
            while (document.hidden) await new Promise(r => setTimeout(r, 500)); // Chờ người dùng bật lại tab, nếu có thay đổi thì reload luôn.
            const data = await getOrder(searchParams.order_hash);
            // debugger;
            if (detailsInfo && data.success && JSON.stringify(data.data) !== JSON.stringify(detailsInfo)) { // Nếu data có thay đổi
                // Nếu thay đổi về số tiền
                if (data.data.totalPay !== detailsInfo.data.totalPay && data.data.totalPay == 0) {
                    setIsStop(true);
                    const paymentAmount = detailsInfo.data.totalPay - data.data.totalPay; // tiền trước trừ tiền sau
                    showAlert("Thanh toán thành công  " , (result: { isConfirmed: any; }) => {
                        if (result.isConfirmed) {
                            window.location.reload(); // reload lại trang
                        }
                    });
                }
                else {
                    window.location.reload(); // reload lại trang
                }
            }
        } catch (err) {
            console.error(err);
        }
        finally {
            setIsChecking(false); // Kết thúc kiểm tra
        }
    };

    // Thiết lập interval để kiểm tra điều kiện mỗi 60 giây
    const intervalId = setInterval(checkCondition, 60 * 1000);

    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(intervalId);
}, [isChecking]); //Chạy lại effect nếu isChecking thay đổi

if (loading || typeof window == 'undefined') {
  return <div>Loading...</div>;
}
  // Kiểm tra domain xem user truy cập từ brand nào
  const ref = (window.location?.host.match(/\w+\.(\w+)\.vn/) || [])[1];
  const BankInfo = (dataRef[ref] || dataRef.default).bank;
  const imgTks = (dataRef[ref] || dataRef.default).imgTks;
  const urlMain = (dataRef[ref] || dataRef.default).url;
if (!searchParams.order_hash) window.location.href = `${urlMain}`;

if (error) {
    window.location.href = `${urlMain}`;
}

  
  const showAlert = (text : any, callback : any) => {
    Swal.fire({
      title: "Thông báo",
      text: text,
      icon: "success",
      confirmButtonText: "OK",
    }).then(callback);
  };
  function SetPayments() {
    setsStatePayment(!statePayment);
  }

  
  return (
    <div className={`grid wide ${styles.Payment}`}>
      <div className={`l-8 c-12 ${styles.right}`}>

        <div className={styles.info}>
          <ul className={`${styles.listInfo} ${styles.container}`}>
            <h1 className="textTitle">Khách hàng</h1>
            <InfoITem title="Khách hàng" content={detailsInfo.data.customer.name} />
            <InfoITem title="Số điện thoại" content={detailsInfo.data.customer.phone} />
            <InfoITem title="Địa chỉ" content={detailsInfo.data.customer.address} />
          </ul>
          <ul className={`${styles.listInfo} ${styles.container}`}>
            <h1 className="textTitle">Nhân viên</h1>
            <InfoITem title="Nhân viên" content={(detailsInfo.data.customer.assign.last_name || '') + ' ' + detailsInfo.data.customer.assign.first_name} />
            <InfoITem
              title="Số điện thoại"
              content={detailsInfo.data.customer.assign.phone}
            />
            <div className={styles.contact_img}>
              <Image
                // onClick={() => openZalo(customer.assign.phone)}
                src={"/zalo_icon.png"}
                alt="error"
                width={372}
                height={288}
              />
              <Image
                src={"/Phone.png"}
                alt="error"
                width={372}
                height={288}
              />
              <Image
                src={"/Facebook.png"}
                alt="error"
                width={372}
                height={288}
              />
            </div>
          </ul>

          {/* <div className={styles.box_img}>
                            <Image className={styles.img} src={ThienTrang} />
                        </div> */}
          {/* {totalPay > 0 && (
                        <p className='darkColor' style={{ textAlign: 'center', padding: '30px 0 10px 0' }}>
                            Lưu ý : Khánh hàng vui lòng thanh toán số tiền cọc theo đã ghi trong đơn hàng để hệ thống tiến hành duyệt đơn.
                        </p>
                    )} */}
        </div>

        <div className={`${styles.products} ${styles.container}`}>
          <h1 className="textTitle">Danh sách sản phẩm</h1>
          <div className={styles.product_list}>
            {detailsInfo.data.products.map((e: any, i: any) => (
              <div key={i}>
                <ProductItem index={i} content={e} />
              </div>
            ))}
          </div>

          <div className={styles.stt}>
            <div className={styles.box_btn}>
              <p className="">Trạng thái :</p>
              <p className="textTitle">{detailsInfo.data.status.text}</p>
              {/* <Button className={['đã gửi', 'hoàn thành'].includes(status.text.toLocaleLowerCase()) ? styles.btn_stt_success : styles.btn_stt_warning}>
                                {status.text}
                            </Button> */}
              {/* <a href='#QR' onClick={SetDetails}>
                                <Button className={`l-0 c-12 ${styles.btn}`}>
                                    Thanh Toán
                                </Button>
                            </a> */}
            </div>
            <div className="c-12 l-6">
              <InfoITem
                darkColor={true}
                title="Tổng tiền"
                content={
                  <>
                    {toVND(detailsInfo.data.totalMoneyAfterVATorDiscount)}
                    <br />
                    (VAT: {detailsInfo.data.totalVAT})
                  </>
                }
              />
              <InfoITem
                darkColor={true}
                title="Đã thanh toán"
                content={`${toVND(detailsInfo.data.totalPay)} (${Math.round(detailsInfo.data.totalPay / detailsInfo.data.totalMoneyAfterVATorDiscount * 100)}%)`}
              />
              <InfoITem
                darkColor={true}
                title="Cần thanh toán"
                content={
                  <>
                    {toVND(detailsInfo.data.totalMoneyAfterVATorDiscount - detailsInfo.data.totalPay)} <br /> (Chưa bao gồm phí ship){" "}
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.qrpay}`}>
        {detailsInfo.data.totalAccountAll > 0 ? (
          <ReactCardFlip flipDirection="horizontal" isFlipped={statePayment}>
            <div
              id="QR"
              className={`${styles.container} ${styles.height_left}`}
            >
              <div className={styles.Payhead}>
                <p className="textTitle">Mã QR thanh toán</p>
              </div>
              <div className={`${styles.pay_container}`}>
                <div className={` ${styles.box_QR}`}>
                  <img
                    className={styles.QR_img}
                    src={`https://img.vietqr.io/image/${BankInfo.BANKID}-${BankInfo.ACCOUNT_NO}-compact.png?amount=${detailsInfo.data.totalMoneyAfterVATorDiscount - detailsInfo.data.totalPay}&addInfo=${detailsInfo.data.code + " Thanh toan don hang"}&accountName=${BankInfo.ACCOUNT_NAME}`}
                    alt="error"
                    width={372}
                    height={288}
                  />
                </div>
                <div className="">
                  <div className={styles.pay_container_right}>
                    <div className={styles.bank}>
                      <Image
                        src={BankInfo.BANKLOGO}
                        alt="error"
                        width={372}
                        height={288}
                      />
                      <div>
                        <p className="darkColor">{BankInfo.BANKNAME}</p>
                      </div>
                    </div>
                    <div className={styles.box_flex}>
                      <p>Chủ tài khoản:</p>
                      <p className="darkColor">{BankInfo.ACCOUNT_NAME}</p>
                    </div>
                    <div className={`row`}>
                      <div className={`col l-7 c-7 ${styles.box_flex}`}>
                        <p>Số tài khoản:</p>
                        <p className="darkColor">{BankInfo.ACCOUNT_NO}</p>
                      </div>
                      <div className={`col l-5 c-5 ${styles.box_btn_pay}`}>
                        <Button
                          onClick={
                            (event: any) => {
                              copyText(
                                BankInfo.ACCOUNT_NO,
                                event.currentTarget
                              );
                            }
                          }
                          className={styles.btn_pay}
                        >
                          Sao chép
                        </Button>
                      </div>
                    </div>
                    <div className={`row`}>
                      <div className={`col l-7 c-7 ${styles.box_flex}`}>
                        <p>Số tiền:</p>
                        <p className="darkColor">{toVND(detailsInfo.data.totalAccountAll)}</p>
                      </div>
                      <div className={`col l-5 c-5 ${styles.box_btn_pay}`}>
                        <Button
                          onClick={
                            (event: any) => {
                              copyText(
                                '' + detailsInfo.data.totalAccountAll,
                                event.currentTarget
                              );
                            }
                          }
                          className={styles.btn_pay}
                        >
                          Sao chép
                        </Button>
                      </div>
                    </div>
                    <div className={`row`}>
                      <div className={`col l-7 c-7 ${styles.box_flex}`}>
                        <p>Nội dung:</p>
                        <p className="darkColor">{detailsInfo.data.code}</p>
                      </div>
                      <div className={`col l-5 c-5 ${styles.box_btn_pay}`}>
                        <Button
                          onClick={
                            (event: any) => {
                              copyText(
                                detailsInfo.data.code,
                                event.currentTarget
                              );
                            }
                          }
                          className={styles.btn_pay}
                        >
                          Sao chép
                        </Button>
                      </div>
                    </div>
                    <Button
                      onClick={SetPayments}
                      className={` ${styles.btn_QR}`}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${styles.container} ${styles.paymentMT} ${styles.height_left}`}
            >
              <div className={styles.box_flex}>
                <Image
                  src={"/iconscheck.png"}
                  alt="error"
                  width={372}
                  height={288}
                />
                <p>Quý khách vui lòng kiểm tra lại thông tin cá nhân.</p>
              </div>
              <div className={styles.box_flex}>
                <p>
                  Nếu có bất kỳ vấn đề gì với đơn hàng, xin vui lòng liên hệ
                  ngay qua số điện thoại/Zalo: {detailsInfo.data.customer.assign.phone} để được
                  hỗ trợ nhanh chóng.
                </p>
                <Image
                  src={'/iconsSupport.png'}
                  alt="error"
                  width={372}
                  height={288}
                />
              </div>
              <div className={styles.box_flex}>
                <Image
                  src={"/iconsPayment.png"}
                  alt="error"
                  width={372}
                  height={288}
                />
                <p>
                  Vui lòng thanh toán số tiền trong đơn hàng để chúng tôi có thể
                  xử lý đơn hàng của Quý khách ngay lập tức.
                </p>
              </div>
              <Button onClick={SetPayments} className={styles.btn_MT}>
                Thanh toán
              </Button>
            </div>
          </ReactCardFlip>
        ) : (
          <ReactCardFlip flipDirection="horizontal" isFlipped={stateTks}>
            <div
              id="QR"
              className={`${styles.container} ${styles.height_left} ${styles.tks}`}
            >
              <div className={styles.Payhead}>
                <Image
                  src={imgTks}
                  className={styles.imgTks}
                  alt="error"
                  width={523}
                  height={599}
                />
              </div>
            </div>

            <div
              className={`${styles.container} ${styles.paymentMT} ${styles.height_left} `}
            >
              <div className={styles.box_flex}>
                <Image
                  src={"/iconsProduct.png"}
                  alt="error"
                  width={372}
                  height={288}
                />
                <p>
                  Thời gian sản xuất dự kiến từ 8-10 ngày. Không tính chủ nhật
                  và nghỉ lễ.
                </p>
              </div>

              <div className={styles.box_flex}>
                <p>
                  Nhận hàng được mở hàng kiểm tra. Đúng hàng, đủ số lượng sản
                  phẩm.
                </p>
                <Image
                  src={"/iconscheck.png"}
                  alt="error"
                  width={372}
                  height={288}
                />
              </div>
              <div className={styles.box_flex}>
                <Image
                  src={"/iconsSupport.png"}
                  alt="error"
                  width={372}
                  height={288}
                />
                <p>
                  Nếu gặp sự cố trong quá trình kiểm hàng và giao nhận hàng.
                  Mình liên hệ lại qua số điện thoại/ Zalo:{" "}
                  {detailsInfo.data.customer.assign.phone} để có thể xử lý kịp thời .
                </p>
              </div>
            </div>
          </ReactCardFlip>
        )}

        <div className={`${styles.container} ${styles.transport}`}>
          <p className="darkColor">Vận chuyển và nhận hàng</p>
          <p>Mã vận chuyển : {detailsInfo.data.ships.track || "Chưa có thông tin"}</p>
          <p>Đơn vị vận chuyển : {detailsInfo.data.ships.delivery.text || "Chưa có thông tin"}</p>
          <p>
            Dự kiến nhận hàng :{" "}
            {/* thời gian dự kiến hoặc sau 7 ngày đơn hàng đc tạo */}
            {new Date(detailsInfo.data.ships.time_received * 1000 || ((detailsInfo.data.delivered_at * 1000) + 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-DE')}
          </p>
          <p>Phí vận chuyển : {detailsInfo.data.ships.freeShip ? "Miễn phí" : "Khách hàng thanh toán phí ship"}</p>
        </div>
      </div>
    </div>
  );
}