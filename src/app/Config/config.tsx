// import logoAoThun247 from "/logoAoThun247.png";
// import logoBTP from "/logoBTP.jpg";
// import logoDPBTP from "/logoDPBTP.png";
// import logodongphucTT from "/logodongphucTT.png";
// import logoDefault from "/logoAoThun247.png"; // Sử dụng khi không tìm đc logo
// import logoVBC from "/VBClogo.png";
// import logoVP from "/VPlogo.jpg";
// import imgTTtks from "/TTtks.png";
// import imgBTPtks from "/BTPtks.png";
// import imgAothun247tks from "/Aothun247tks.png";

const dataRef: any = {
  aothun247: {
    url: "https://aothun247.vn/",
    imgTks: "/Aothun247tks.png",
    sologan: "Đơn giản là đẹp",
    favicon: "/logoAoThun247.png",
    logo: "/logoAoThun247.png",
    CSKH: "0853511234",
    imgOder: "imgOder247.jpg",
    API : "https://apidonhang.aothun247.vn/getOrderDetail?order_hash=",
    bank: {
      BANKID: "VPB",
      BANKNAME: "VPBank - Ngân hàng TMCP Việt Nam Thịnh Vượng",
      BANKLOGO: "/VPlogo.jpg",
      ACCOUNT_NO: 118833333,
      ACCOUNT_NAME: "PHAN THỊ HẠNH",
    },
  },
  dongphucbtp: {
    url: "https://dongphucbtp.vn/",
    imgTks: "/BTPtks.png",
    sologan: "Giải pháp đồng phục doanh nghiệp",
    favicon: "/logoDPBTP.png",
    logo: "/logoDPBTP.png",
    CSKH: "0961887777",
    imgOder: "imgOderBTP.jpg",
    API : "https://apidonhang.dongphucbtp.vn/getOrderDetail?order_hash=",
    bank: {
      BANKID: "VCB",
      BANKNAME: "Vietcombank - Ngân hàng TMCP Ngoại Thương Việt Nam",
      BANKLOGO: "/VBClogo.png",
      ACCOUNT_NO: 3383777777,
      ACCOUNT_NAME: "PHAN THỊ HẠNH",
    },
  },
  thientrang: {
    url: "https://thientrang.vn/",
    imgTks: "/TTtks.png",
    sologan: "Giải pháp đồng phục chuyên nghiệp",
    favicon: "/TTtks.png",
    logo: "/logodongphucTT.jpg",
    CSKH: "0889581234",
    imgOder: "imgOderBTP.jpg",
    API : "https://apidonhang.thientrang.vn/getOrderDetail?order_hash=",
    bank: {
      BANKID: "VCB",
      BANKNAME: "Vietcombank - Ngân hàng TMCP Ngoại Thương Việt Nam",
      BANKLOGO: "/VBClogo.png",
      ACCOUNT_NO: 8386777777,
      ACCOUNT_NAME: "PHAN THỊ HẠNH",
    },
  },
  default: {
    url: "https://thientrang.vn/",
    imgTks: "/TTtks.png",
    sologan: "Giải pháp đồng phục chuyên nghiệp",
    favicon: "/logodongphucTT.png",
    logo: "/logodongphucTT.jpg",
    CSKH: "0889581234",
    imgOder: "imgOderBTP.jpg",
    API : "https://apidonhang.thientrang.vn/getOrderDetail?order_hash=",
    bank: {
      BANKID: "VPB",
      BANKNAME: "VPBank - Ngân hàng TMCP Việt Nam Thịnh Vượng",
      BANKLOGO: "/VPlogo.jpg",
      ACCOUNT_NO: 118833333,
      ACCOUNT_NAME: "PHAN THỊ HẠNH",
    },
  },
};

export default dataRef;
