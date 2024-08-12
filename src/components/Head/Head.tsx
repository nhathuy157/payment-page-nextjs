import { headers } from 'next/headers';

export default function Head() {
  const headersList = headers();
  console.log(headersList);
  return (
    <head>
      <title>Payment Page 222</title>
    </head>
  );
}
