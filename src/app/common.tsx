import dataRef from '@/app/Config/config';
async function getOrder(order_hash: string, brand: string) {
  try {
    const _brand = brand && Object.keys(dataRef).includes(brand) ? brand : 'thientrang';

      // const response = await fetch(`https://sapi.btpc.vn/v1/api/getOrderDetail?order_hash=${order_hash}`); // api gốc
      
      const response = await fetch(`https://apidonhang.${_brand}.vn/getOrderDetail?order_hash=${order_hash}`);
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