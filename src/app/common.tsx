import dataRef from '@/app/Config/config';
async function getOrder(order_hash: string) {


    // Lấy URL hiện tại
    const currentUrl = window.location.href;
    
    // Tách lấy domain từ URL
    const baseUrl = currentUrl.split('/')[2]; // Lấy phần domain của URL
  
    // Xác định thương hiệu dựa trên domain
    const brandKey = Object.keys(dataRef).find(key => dataRef[key].url.includes(baseUrl)) || 'default';
  
  
    
    const APIurl = dataRef[brandKey]?.API || "https://apidonhang.aothun247.vn/getOrderDetail?order_hash=";
  
  
  try {
      // const response = await fetch(`https://sapi.btpc.vn/v1/api/getOrderDetail?order_hash=${order_hash}`);
     //const response = await fetch(`https://apidonhang.thientrang.vn/getOrderDetail?order_hash=${order_hash}`);
    // console.log(APIurl+order_hash);
     const response = await fetch(`${APIurl}${order_hash}`);
      const res_json = await response.json();
      if (!response.ok) {
          throw new Error(JSON.stringify(res_json));
      }
      return res_json;
  } catch (error) {
      console.error("Error fetching order details:", error);
      throw error;
  }
}

declare global {
    interface Window {
      detailsInfo: any;
    }
  }

function toVND(number: number) {
    return number.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
}

export default getOrder;