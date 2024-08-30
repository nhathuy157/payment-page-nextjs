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
import Navbar from "@/components/Navbar/Navbar";
import getOrder from "./common";
import LoadingSpinner from '@/components/Loading/LoadingSpinner';

import { Result } from "postcss";
import { debug, error } from "console";
// import { headers } from 'next/headers';

function toVND(number: number) {
  return number.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

function openZalo(phone: string) {
  //var zaloLink = "https://zalo.me/" + phone;

  var zaloLink = "zalo://conversation?phone=" + phone;
  var zaloWindow = window.open(zaloLink, "_blank");
  if (zaloWindow) {
    zaloWindow.focus();
    console.log("success");
  } else {
    // error
    console.log("ngốc");
  }
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
function redirectToBrandPage() {
  // Extract the base URL from the current URL
  const currentUrl = window.location.href;
  const baseUrl = currentUrl.split('/')[2]; // Get the domain part of the URL

  // Find the corresponding brand
  const brandKey = Object.keys(dataRef).find(key => dataRef[key].url.includes(baseUrl)) || 'default';

  // Get the URL to redirect to
  const redirectUrl = dataRef[brandKey].url;

  // Redirect to the brand's URL
  window.location.href = redirectUrl;
}


export default function Home({ searchParams }: any) {
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

  let fetting = false;
  // useEffect(() => {
  //   (async () => {
  //     if(fetting) return;
  //     fetting = true;
  //     const search = new URLSearchParams(window.location.search);
  //     searchParams = Object.fromEntries(search.entries());
  //     const test = await getOrder(searchParams.order_hash);
  //     setDetailsInfo(test);
  //     setLoading(false);
  //     fetting = false;
  //   })();
  // }, [searchParams.order_hash]);

  useEffect(() => {
    (async () => {
      if (fetting) return;
      fetting = true;

      try {
        const search = new URLSearchParams(window.location.search);
        const searchParams = Object.fromEntries(search.entries());
        const test = await getOrder(searchParams.order_hash);
        setDetailsInfo(test);
      } catch (error) {
       // console.log("error");
        showAlert("Không tìm thấy sản phẩm!", (result: { isConfirmed: any }) => {
          if (result.isConfirmed) {
            redirectToBrandPage(); // reload lại trang
          }
        },"error");
      } finally {
        setLoading(false);
        fetting = false;
      }
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
            showAlert("Thanh toán thành công  ", (result: { isConfirmed: any; }) => {
              if (result.isConfirmed) {
                window.location.reload(); // reload lại trang
              }
            }, "success");
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

  if (loading || typeof window === 'undefined') {

    return <LoadingSpinner />;

  }

  const ref = (window.location.host.match(/\w+\.(\w+)\.vn/) || [])[1];
  const urlMain = (dataRef[ref] || dataRef.default).url;
  const BankInfo = (dataRef[ref] || dataRef.default).bank;
  const imgTks = (dataRef[ref] || dataRef.default).imgTks;
  const CSKH = (dataRef[ref] || dataRef.default).CSKH;

  // Kiểm tra domain xem user truy cập từ brand nào

  const search = new URLSearchParams(window.location.search);
  searchParams = Object.fromEntries(search.entries());
  if (!searchParams.order_hash) window.location.href = `${urlMain}`;

  if (error) {
    window.location.href = `${urlMain}`;
  }


  const showAlert = (text: any, callback: any, type :any) => {
    Swal.fire({
      title: "Thông báo",
      text: text,
      icon: type,
      confirmButtonText: "OK",
      showConfirmButton: true,
      allowOutsideClick: false, // Ngăn không cho đóng bằng cách nhấp ra ngoài
      allowEscapeKey: false,    // Ngăn không cho đóng bằng phím Esc
      showCancelButton: false
    }).then(callback);
  };
  function SetPayments() {
    setsStatePayment(!statePayment);
  }





  const statusElement = document.getElementById("statusText");
  if (statusElement && detailsInfo && detailsInfo.data && detailsInfo.data.status) {
    statusElement.innerHTML = `${detailsInfo.data.status.text}`;
  }





  return (

    <div className={`grid wide ${styles.Payment}`}>


      <div className={`l-8 c-12 ${styles.right}`}>

        <div className={styles.info}>
          <ul className={`${styles.listInfo} ${styles.container}`}>
            <h1 className="textTitle">Thông tin khách hàng</h1>
            <InfoITem title="Khách hàng" content={detailsInfo.data.customer.name} />
            <InfoITem title="Số điện thoại" content={detailsInfo.data.customer.phone} />
            <InfoITem title="Địa chỉ" content={detailsInfo.data.customer.address} />
          </ul>
          <ul className={`${styles.listInfo} ${styles.container}`}>
            <h1 className="textTitle">Nhân viên tư vấn</h1>
            <InfoITem title="Nhân viên" content={(detailsInfo.data.customer.assign.last_name || '') + ' ' + detailsInfo.data.customer.assign.first_name} />
            <InfoITem
              title="Số điện thoại"
              content={detailsInfo.data.customer.assign.phone}
            />

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
            <div className={styles.stt_left}>
              <p>
                Thời gian sản xuất dự kiến từ 8-10 ngày. Không tính chủ nhật và nghỉ lễ.
              </p>
              <p>
                Quý khách nếu có thắc mắc: tình trạng đơn, thông tin đơn hàng, góp ý và khiếu nại, ...
              </p>
              <p>
                Vui lòng liên hệ chăm sóc khách hàng :{CSKH}

                <Image
                  onClick={() => {
                    openZalo(CSKH);
                  }}
                  src={'/zalo_icon.png'}
                  alt="error"
                  width={372}
                  height={288}
                  className={styles.imgIcon}
                />
              </p>
            </div>

            <div className="c-12 l-5">
              <InfoITem
                darkColor={true}
                title="Tổng tiền"
                content={
                  <>
                    {toVND(detailsInfo.data.totalMoney)}
                    {/* <br />
                    (VAT: {detailsInfo.data.totalVAT}) */}
                  </>
                }
              />
              {
                detailsInfo.data.discount > 0 ? (
                  <InfoITem
                    darkColor={true}
                    title="Giảm giá"
                    content={`${toVND(detailsInfo.data.discount)}`}
                  />
                ) :
                  <>   </>
              }

              {/* <InfoITem
                darkColor={true}
                title="Giảm giá"
                content={`${toVND(detailsInfo.data.discount)} (${Math.round(detailsInfo.data.totalPay / detailsInfo.data.totalMoneyAfterVATorDiscount * 100)}%)`}
              /> */}

              {
                detailsInfo.data.discount > 0 ? (<InfoITem
                  darkColor={true}
                  title="Sau giảm giá"
                  content={`${toVND(detailsInfo.data.totalMoneyAfterVATorDiscount)} `}
                />) : <>   </>
              }

              <InfoITem
                darkColor={true}
                title="Đã thanh toán"
                content={`${toVND(detailsInfo.data.totalPay)} `}
              />
              {/* <InfoITem
                darkColor={true}
                title="Cần thanh toán"
                content={
                  <>
                    {toVND(detailsInfo.data.totalMoneyAfterVATorDiscount - detailsInfo.data.totalPay)} <br /> (Chưa bao gồm phí ship){" "}
                  </>
                }
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.qrpay}`}>
        {detailsInfo.data.totalAccountAll > 0 ? (
          //  <ReactCardFlip flipDirection="horizontal" isFlipped={statePayment}>
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
                <em>
                  Hệ thống sẽ tự cập nhật trạng thái thanh toán trong vòng 5 phút. Nếu quá thời gian trên mà hệ thống chưa cập nhật, hãy liên hệ nhân viên tư vấn hoặc CSKH để được hỗ trợ.
                </em>
                {/* <Button
                      onClick={SetPayments}
                      className={` ${styles.btn_QR}`}
                    >
                      Hủy
                    </Button> */}
              </div>
            </div>
          </div>

          // <div
          //   className={`${styles.container} ${styles.paymentMT} ${styles.height_left}`}
          // >
          //   <div className={styles.box_flex}>
          //     <Image
          //       src={"/iconscheck.png"}
          //       alt="error"
          //       width={372}
          //       height={288}
          //     />
          //     <p>Quý khách vui lòng kiểm tra lại thông tin cá nhân.</p>
          //   </div>
          //   <div className={styles.box_flex}>
          //     <p>
          //       Nếu có bất kỳ vấn đề gì với đơn hàng, xin vui lòng liên hệ
          //       ngay qua số điện thoại/Zalo: {detailsInfo.data.customer.assign.phone} để được
          //       hỗ trợ nhanh chóng.
          //     </p>
          //     <Image
          //       src={'/iconsSupport.png'}
          //       alt="error"
          //       width={372}
          //       height={288}
          //     />
          //   </div>
          //   <div className={styles.box_flex}>
          //     <Image
          //       src={"/iconsPayment.png"}
          //       alt="error"
          //       width={372}
          //       height={288}
          //     />
          //     <p>
          //       Vui lòng thanh toán số tiền trong đơn hàng để chúng tôi có thể
          //       xử lý đơn hàng của Quý khách ngay lập tức.
          //     </p>
          //   </div>
          //   <Button onClick={SetPayments} className={styles.btn_MT}>
          //     Thanh toán
          //   </Button>
          // </div>
          //     </ReactCardFlip>
        ) : (
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
        )}

        <div className={`${styles.container} ${styles.transport}`}>
          <p className="darkColor">Vận chuyển và nhận hàng</p>

          {
            detailsInfo.data.ships.track ? (
              <p>Mã vận chuyển : {detailsInfo.data.ships.track}</p>
            ) : (
              <p></p>
            )

          }



          <p>Đơn vị vận chuyển : {detailsInfo.data.ships.delivery?.text || "Chưa có thông tin"}</p>
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
