import Image from "next/image";
import classes from "./ProductItem.module.css";
import Button from "../Button/Button";
import Link from "next/link";
export default function ProductItem(props: any) {
  return (
    <Link
      // href={
      //   "/DetailsProduct" + window.location.search + "&index=" + props.index
      // }
      href={"/DetailsProduct"}
      className={`${classes.container}`}
    >
      <div className={classes.inf}>
        <div className={classes.box_img}>
          <Image
            src={props.content.image || '/Product.png'}
            alt="error"
            width={372}
            height={288}
          />
          {/* <div className={classes.rectangleDiv} /> */}
        </div>
        <div className={classes.inf_content}>
          <p>Tên sản phẩm: {props.content.name}</p>
          <p>Số lượng: {props.content.number}</p>
          <p>
            Giá:{" "}
            {props.content.money.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
      </div>
      <Button className={classes.btn}>Xem Thêm</Button>
    </Link>
  );
}
