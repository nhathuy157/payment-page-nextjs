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
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import Popup from "@/components/Popup/Popup";

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
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);

  // Chọn nội dung trong textarea
  textarea.select();
  textarea.setSelectionRange(0, 99999); // Cho các thiết bị di động

  // Thực hiện sao chép
  try {
    document.execCommand("copy");
    // alert('Nội dung đã được sao chép!');
  } catch (err) {
    console.error("Không thể sao chép nội dung:", err);
  }

  // Xóa textarea sau khi sao chép
  document.body.removeChild(textarea);
  btn.innerText = "Đã sao chép";
}


const showAlert = (text: any, callback: any, type: any) => {
  Swal.fire({
    title: "Thông báo",
    text: text,
    icon: type,
    timer: 5000, // Automatically close after 2 seconds
    showConfirmButton: true, // Remove confirmation button
    allowOutsideClick: false, // Prevent closing by clicking outside
    allowEscapeKey: false, // Prevent closing by pressing the Esc key
  }).then(callback);
};


export default function Home({ searchParams }: any) {
  const [statePayment, setsStatePayment] = useState(true);
  const [stateTks, setsStateTks] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isStop, setIsStop] = useState(false);
  const [error, setError] = useState(null as any);
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  var [detailsInfo, setDetailsInfo] = useState({
    success: true,
    data: {
      sample: true,
      totalAccountAll: -579020,
      totalMoney: 38480000,
      discount: 0,
      accept_produce_at: 1719224171,
      deadline: 1720026000,
      code: "EF24D9",
      totalVAT: 3078400,
      totalMoneyAfterVATorDiscount: 41558400,
      totalProduct: 68,
      totalPay: 42137420,
      cancel_at: null,
      delivered_at: 1721011179,
      produced_at: 1720690534,
      sent_at: 1720691298,
      customer: {
        name: "Quỳnh Mỹ",
        phone: "0367863984",
        address: "tòa Epic, ngõ 19 Duy Tân, Cầu Giấy, Hà Nội",
        taxCode: null,
        taxName: null,
        taxAddress: null,
        total_unpaid: 63870719,
        orders_count: 4,
        unsent_orders_count: 0,
        assign: {
          first_name: "Minh Giang",
          last_name: null,
          phone: "0961887777",
        },
      },
      products: [
        {
          name: "Áo sơ mi nữ tay dài",
          number: 3,
          color: "T107 LÔ 17-2",
          print: null,
          embroider: null,
          mix: null,
          money: 340000,
          image:
            "https://cdn.discordapp.com/attachments/1122918247751241838/1247109223167426560/20240603.665d82de33cf5.png?ex=66d22fb8&is=66d0de38&hm=f93d399ffdf5c52b9ef188ba2f20b2651d15b288aca9642df0c46d97db267fcd&",
          sizeText: "3KXĐ",
          material: {
            name: "Kate Mỹ",
          },
        },
        {
          name: "Áo sơ mi nam tay dài",
          number: 1,
          color: "T107 LÔ 17-2",
          print: null,
          embroider: null,
          mix: null,
          money: 360000,
          image:
            "https://cdn.discordapp.com/attachments/1122918247751241838/1247109340108820543/20240603.665d82de61f5a.png?ex=66d22fd4&is=66d0de54&hm=ffa45e6af9a2b81e276490b86ac655dbcef9d689c776d75ddf53fad16fca6ab7&",
          sizeText: "1KXĐ",
          material: {
            name: "Kate Mỹ",
          },
        },
        {
          name: "Quần tây nữ ống suông",
          number: 3,
          color: "SỐ 8",
          print: null,
          embroider: null,
          mix: null,
          money: 330000,
          image:
            "https://cdn.discordapp.com/attachments/1122918247751241838/1247109170218537040/20240603.665d82de1c4f3.png?ex=66d22fac&is=66d0de2c&hm=00a1eb9eed418680a9b7af0d2ed77e21bc1a92dd3621f4b1a30cc1bd46abf910&",
          sizeText: "3KXĐ",
          material: {
            name: "Kaki Thun",
          },
        },
        {
          name: "Áo vest Nữ form BLAZER tay dài 1 lớp",
          number: 3,
          color: "SỐ 8",
          print: null,
          embroider: null,
          mix: null,
          money: 700000,
          image:
            "https://cdn.discordapp.com/attachments/1122918247751241838/1247109286392500276/20240603.665d82de4888f.png?ex=66d22fc8&is=66d0de48&hm=31637bbcd85eb981f0f942396ea4029fab060a60ae6e01fe90f3f57b24e9667f&",
          sizeText: "3KXĐ",
          material: {
            name: "Kaki Thun",
          },
        },
        {
          name: "Áo vest nam tay dài 1 lớp",
          number: 2,
          color: "SỐ 8",
          print: null,
          embroider: null,
          mix: null,
          money: 1100000,
          image:
            "https://cdn.discordapp.com/attachments/1122918247751241838/1247109404331868180/20240603.665d82de79297.png?ex=66d22fe4&is=66d0de64&hm=0dae7237fb1d8168b6aee3b47e5d1ba066eb768c6b1aea670fa7d7d78211c3f4&",
          sizeText: "2KXĐ",
          material: {
            name: "Kaki Thun",
          },
        },
        {
          name: "Quần tây nam",
          number: 2,
          color: "SỐ 8",
          print: null,
          embroider: null,
          mix: null,
          money: 350000,
          image:
            "https://cdn.discordapp.com/attachments/1122918247751241838/1247109472992759858/20240603.665d82de929c6.png?ex=66d22ff4&is=66d0de74&hm=5d59b6429415ab521fc061d007de4cc55c757cc9d22f1181b3c81a48d9e299f1&",
          sizeText: "2KXĐ",
          material: {
            name: "Kaki Thun",
          },
        },
      ],
      works: [],
      ships: {
        name: "Quỳnh Mỹ",
        phone: "0367863984",
        address: "tòa Epic, ngõ 19 Duy Tân, Cầu Giấy, Hà Nội",
        freeShip: true,
        track: "1755954288671",
        description: {
          status: 501,
          cod: 0,
          fee: 311962,
          ShippingOrderCosts: [
            {
              PaymentChannelID: 1,
              Cost: 311962,
            },
          ],
          note: "",
          noteCode: null,
          CustomerName: "Quỳnh Mỹ",
          CustomerPhone: "0367863984",
          ShippingAddress: "tòa Epic ngõ 19",
        },
        time_received: 1721011179,
        delivery: {
          code: "VTP",
          text: "Viettel Post",
        },
      },
      status: {
        text: "Đã gửi",
      },
    },
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
        if (!searchParams.order_hash){
          window.location.href = urlMain;
        }
        const brand = (document.location.host.match(/\.(\w+)\./) || [])[1]; // regex lấy brand tuong ung
        const test = await getOrder(searchParams.order_hash, brand);
        setDetailsInfo(test);
      } catch (error) {
        
              gotoMainBrand();
        
        setError(error as Error);
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
      console.log("checkCondition");
      if (isChecking || isStop) return; // Nếu đang kiểm tra, bỏ qua lần gọi mới
      if (
        ["đã gửi", "hoàn thành"].includes(
          detailsInfo?.data.status.text.toLocaleLowerCase()
        )
      ) {
        setIsStop(true);
        return;
      } // Nếu đã gửi thì không update
      setIsChecking(true);
      try {
        while (document.hidden) await new Promise((r) => setTimeout(r, 500)); // Chờ người dùng bật lại tab, nếu có thay đổi thì reload luôn.
        const brand = (document.location.host.match(/\.(\w+)\./) || [])[1]; // regex lấy brand tuong ung
        const data = await getOrder(searchParams.order_hash, brand);
        // debugger;
        if (
          detailsInfo &&
          data.success &&
          JSON.stringify(data.data) !== JSON.stringify(detailsInfo)
        ) {
          // Nếu data có thay đổi
          // Nếu thay đổi về số tiền
          if (
            data.data.totalPay !== detailsInfo.data.totalPay &&
            data.data.totalPay == 0
          ) {
            setIsStop(true);
            const paymentAmount =
              detailsInfo.data.totalPay - data.data.totalPay; // tiền trước trừ tiền sau
            showAlert(
              "Thanh toán thành công  ",
              (result: { isConfirmed: any }) => {
                if (result.isConfirmed) {
                  window.location.reload(); // reload lại trang
                }
              },
              "success"
            );
          } else {
            window.location.reload(); // reload lại trang
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsChecking(false); // Kết thúc kiểm tra
      }
    };

    // Thiết lập interval để kiểm tra điều kiện mỗi 60 giây
    const intervalId = setInterval(checkCondition, 60 * 1000);

    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(intervalId);
  }, [isChecking]); //Chạy lại effect nếu isChecking thay đổi

  if (loading || typeof window === "undefined" || error) {
    return <LoadingSpinner />;
  }
  // Kiểm tra domain xem user truy cập từ brand nào 
  const ref = (window.location.host.match(/\w+\.(\w+)\.vn/) || [])[1];
  const urlMain = (dataRef[ref] || dataRef.default).url;
  const BankInfo = (dataRef[ref] || dataRef.default).bank;
  const imgTks = (dataRef[ref] || dataRef.default).imgTks;
  const CSKH = (dataRef[ref] || dataRef.default).CSKH;

  function gotoMainBrand() {
    const ref = (window.location.host.match(/\w+\.(\w+)\.vn/) || [])[1];
    const urlMain = (dataRef[ref] || dataRef.default).url;
    window.location.href = urlMain;
  }

  function SetPayments() {
    setsStatePayment(!statePayment);
  }



  const statusElement = document.getElementById("statusText");
  if (
    statusElement &&
    detailsInfo &&
    detailsInfo.data &&
    detailsInfo.data.status
  ) {
    statusElement.innerHTML = `${detailsInfo.data.status.text}`;
  }

  return (
    <div className={`grid wide ${styles.Payment}`}>
      <div className={`l-8 c-12 ${styles.right}`}>
        <div className={styles.info}>
          <ul className={`${styles.listInfo} ${styles.container}`}>
            <h1 className="textTitle">Thông tin khách hàng</h1>
            <InfoITem
              title="Khách hàng"
              content={detailsInfo.data.customer.name}
            />
            <InfoITem
              title="Số điện thoại"
              content={detailsInfo.data.customer.phone}
            />
            <InfoITem
              title="Địa chỉ"
              content={detailsInfo.data.customer.address}
            />
          </ul>
          <ul className={`${styles.listInfo} ${styles.container}`}>
            <h1 className="textTitle">Nhân viên tư vấn</h1>
            <InfoITem
              title="Nhân viên"
              content={
                (detailsInfo.data.customer.assign.last_name || "") +
                " " +
                detailsInfo.data.customer.assign.first_name
              }
            />
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
                Thời gian sản xuất dự kiến từ 8-10 ngày. Không tính chủ nhật và
                nghỉ lễ.
              </p>
              <p>
                Quý khách nếu có thắc mắc: tình trạng đơn, thông tin đơn hàng,
                góp ý và khiếu nại, ...
              </p>
              <p>
                Vui lòng liên hệ chăm sóc khách hàng :{CSKH}
                <Image
                  onClick={() => {
                    openZalo(CSKH);
                  }}
                  src={"/zalo_icon.png"}
                  alt="error"
                  width={372}
                  height={288}
                  className={styles.imgIcon}
                />
              </p>
            </div>

            <div className={`${styles.stt_right} c-12 l-5`}>
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
              {detailsInfo.data.discount > 0 ? (
                <InfoITem
                  darkColor={true}
                  title="Giảm giá"
                  content={`${toVND(detailsInfo.data.discount)}`}
                />
              ) : (
                <> </>
              )}

              {/* <InfoITem
                darkColor={true}
                title="Giảm giá"
                content={`${toVND(detailsInfo.data.discount)} (${Math.round(detailsInfo.data.totalPay / detailsInfo.data.totalMoneyAfterVATorDiscount * 100)}%)`}
              /> */}

              {detailsInfo.data.discount > 0 ? (
                <InfoITem
                  darkColor={true}
                  title="Sau giảm giá"
                  content={`${toVND(
                    detailsInfo.data.totalMoneyAfterVATorDiscount
                  )} `}
                />
              ) : (
                <> </>
              )}

              <InfoITem
                darkColor={true}
                title="Đã thanh toán"
                content={`${toVND(detailsInfo.data.totalAccountAll)} `}
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
              <Button className={styles.stt_btn} onClick={togglePopup}>
                Thanh toán
              </Button>
              <Popup show={showPopup} onClose={togglePopup}>
                <div className={styles.popup_container}>
                  <div
                    className={`${styles.container} ${styles.popup_left} l-5 c-12`}
                  >
                    <div>
                      <div className={styles.popupleft_head}>
                        <Image
                          src={"/no-edit.png"}
                          alt="error"
                          width={24}
                          height={24}
                        />
                        <h1>
                          <span
                            className={`${styles.popup_redcolor} darkColor`}
                          >
                            KHÔNG
                          </span>{" "}
                          chỉnh sửa thông tin
                        </h1>
                      </div>
                      <p>
                        Mã QR đã đi kèm
                        <span className="darkColor">{" SỐ TÀI KHOẢN, SỐ TIỀN "}</span>
                        và
                        <span className="darkColor">{" MÃ ĐƠN HÀNG"}</span>, bạn vui
                        lòng
                        <span className={styles.popup_redcolor}>
                          {" không chỉnh sửa thông tin "}
                        </span>
                         sau khi quét mã.
                      </p>
                    </div>

                    <div>
                      <div className={styles.popupleft_head}>
                        <Image
                          src={"/iconserror.png"}
                          alt="error"
                          width={24}
                          height={24}
                        />
                        <h1>Không thể quét mã QR</h1>
                      </div>

                      <p>
                        Trường hợp không quét được mã QR, bạn hãy nhập chính xác
                        số tài khoản và số tiền cần thanh toán trên màn hình.
                      </p>
                    </div>

                    {/* <div>
                      <div className={styles.popupleft_head}>
                        <Image
                          src={"/iconscall.png"}
                          alt="error"
                          width={24}
                          height={24}
                        />
                        <h1>Liên hệ với chúng tôi</h1>
                      </div>

                      <p>
                        Trường hợp không quét được mã QR, bạn hãy nhập chính xác
                        số tài khoản và số tiền cần thanh toán trên màn hình.
                      </p>
                    </div> */}
                    <div>
                      <div className={styles.popupleft_head}>
                        <Image
                          src={"/iconswait.png"}
                          alt="error"
                          width={24}
                          height={24}
                        />
                        <h1>Liên hệ với chúng tôi</h1>
                      </div>

                      <p>
                        Hệ thống sẽ tự cập nhật trạng thái thanh toán trong vòng 5
                        phút. Nếu quá thời gian trên mà hệ thống chưa cập nhật, hãy
                        liên hệ nhân viên tư vấn hoặc CSKH để được hỗ trợ.
                      </p>
                    </div>
                    <div className={styles.popupleft_head}>
                      <Image
                        onClick={() => {
                          openZalo(CSKH);
                        }}
                        src={"/zalo_icon.png"}
                        alt="error"
                        width={24}
                        height={24}
                      />
                      <h1>CSKH : {CSKH}</h1>
                    </div>
                  </div>
                  <div className={` ${styles.popup_right} c-12`}>
                    <div className={` ${styles.popup_right_top}`}>
                      <h1>Thông tin thanh toán</h1>
                      <p>
                        Vui lòng kiểm tra thông tin dưới đây và quét mã QR để
                        thanh toán
                      </p>
                      {/* styles.QR_popup */}
                      <Image
                        src={`https://img.vietqr.io/image/${BankInfo.BANKID}-${BankInfo.ACCOUNT_NO
                          }-compact.png?amount=${detailsInfo.data.totalMoneyAfterVATorDiscount -
                          detailsInfo.data.totalAccountAll
                          }&addInfo=${detailsInfo.data.code
                          }&accountName=${BankInfo.ACCOUNT_NAME}`}
                        alt="error"
                        id="image_qr"
                        className={styles.QR_popup}
                        width={250}
                        height={250}
                        onLoad={(e) => {
                          const image_qr = e.currentTarget;
                          var canvas = document.createElement("canvas");
                          debugger
                          canvas.width = image_qr.width; canvas.height = image_qr.height;
                          var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
                          ctx.drawImage(image_qr, 0, 0);
                          ctx.fillStyle = "white";
                          ctx.fillRect(0, 0, canvas.width, Math.round(canvas.height*0.16));
                          image_qr.srcset = canvas.toDataURL();
                        }}
                      />
                    </div>
                    <div className={`${styles.popup_right_bottom}`}>
                      <div className={styles.rb_line}>
                        <div className={styles.box_popup}>
                          <p>Ngân hàng</p>
                          <p className="darkColor">
                          <p className={`darkColor ${styles.long_text}`}>{BankInfo.BANKNAME}</p>
                          </p>
                        </div>
                        <div className={styles.box_popup}>
                          <p>Tên tài khoản</p>
                          <p className="darkColor">{BankInfo.ACCOUNT_NAME}</p>
                        </div>
                        <div className={styles.box_popup}>
                          <p>Số tài khoản</p>
                          <p className={`darkColor ${styles.popup_bluecolor}`}>
                            {BankInfo.ACCOUNT_NO}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className={styles.box_popup}>
                          <p>Số tiền </p>
                          <p className={`darkColor ${styles.popup_bluecolor}`}>
                            {toVND(detailsInfo.data.totalMoneyAfterVATorDiscount -
                          detailsInfo.data.totalAccountAll)}
                          </p>
                        </div>
                        <div className={styles.box_popup}>
                          <p>Nội dung chuyển khoản</p>
                          <p className={`darkColor ${styles.popup_bluecolor}`}>
                            {detailsInfo.data.code}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.qrpay}`}>
       
          
          <div id="QR"className={`${styles.container} ${styles.height_left} ${styles.tks}`}>
            <div className={styles.Payhead}>
              <Image
                src={imgTks}
                className={styles.imgTks}
                alt="error"
                width={523}
                height={600}
              />
            </div>
          </div>
        

        <div className={`${styles.container} ${styles.transport}`}>
          <p className="darkColor">Vận chuyển và nhận hàng</p>

          {detailsInfo.data.ships.track ? (
            <p>Mã vận chuyển : {detailsInfo.data.ships.track}</p>
          ) : (
            <p></p>
          )}

          <p>
            Đơn vị vận chuyển :{" "}
            {detailsInfo.data.ships.delivery?.text || "Chưa có thông tin"}
          </p>
          <p>
            Dự kiến nhận hàng :{" "}
            {/* thời gian dự kiến hoặc sau 7 ngày đơn hàng đc tạo */}
            {new Date(
              detailsInfo.data.ships.time_received * 1000 ||
              detailsInfo.data.delivered_at * 1000 + 7 * 24 * 60 * 60 * 1000
            ).toLocaleDateString("en-DE")}
          </p>
          <p>
            Phí vận chuyển :{" "}
            {detailsInfo.data.ships.freeShip
              ? "Miễn phí"
              : "Khách hàng thanh toán phí ship"}
          </p>
        </div>
      </div>
    </div>
  );
}
