import { headers } from 'next/headers';
import getOrder from '../common';
import Script from 'next/script'


export async function generateMetadata({ params, searchParams }: any){
  // debugger
  // const headersList = headers();
  // const url = new URL(headersList.get('URL') || "");
  const order_hash = searchParams.order_hash;
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


  const title = "Thông tin đơn hàng " + data.data.code;
  const description= "Kiểm tra đơn hàng của bạn đảm bảo mọi thứ đều chính xác trước khi tiến hành thanh toán.";
  const image = data?.data.image || "../_next/image?url=%2Fno-pictures.png&w=384&q=75" ;
  // Tạo meta ở đây
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          // url: data.data.image ? data.data.image : "/no-pictures.png",
          url: image,
          alt: data.data.code,
        }
      ]
    },
    twitter: {
      title: title,
      description: description,
      images: image,
    },
    facebook: {
      title: title,
      description: description,
      images: image,
    },
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