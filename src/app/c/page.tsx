import { headers } from 'next/headers';
import getOrder from '../common';
import Script from 'next/script'

export async function generateMetadata(){
  const headersList = headers();
  const url = new URL(headersList.get('URL') || "");
  const order_hash = url.searchParams.get('order_hash');
  var meta = {
    title: "URL không hợp lệ",
    description: "Generated by create next app",
  }
  if(!order_hash) return meta;
  var data;
  try{
    data = await getOrder(order_hash);
  }
  catch(err: any){
    return meta;
  }


  // Tạo meta ở đây
  return {
    title: "Thông tin đơn hàng " + data.data.code,
    description: "Kiểm tra đơn hàng của bạn đảm bảo mọi thứ đều chính xác trước khi tiến hành thanh toán.",
    openGraph: {
      title: "Thông tin đơn hàng " + data.data.code,
      description: "Kiểm tra đơn hàng của bạn đảm bảo mọi thứ đều chính xác trước khi tiến hành thanh toán.",
      images: [
        {
          // url: data.data.image ? data.data.image : "/no-pictures.png",
          url : "/no-pictures.png",
          alt: data.data.code,
        }
      ]
    }
  };
}

// Hàm async để lấy dữ liệu từ máy chủ
export default function Page() {
  return (
    <Script id='my-script'>
      {`window.location.pathname = '/'`}
    </Script>
  );
}

// interface Props {
//   host: string;
//   url: string;
// }

// // Component để hiển thị thông tin máy chủ
// const HomePage: React.FC<Props> = ({ host, url }) => {
//   return (
//     <div>
//       <h1>Thông tin máy chủ</h1>
//       <p><strong>Host:</strong> {host}</p>
//       <p><strong>URL:</strong> {url}</p>
//     </div>
//   );
// };