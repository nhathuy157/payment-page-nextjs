import React from "react";
import classes from "./InfoItem.module.css";

export default function InfoITem({
  darkColor,
  title,
  content,
}: {
  darkColor?: boolean;
  title: string;
  content: any;
}) {
  return (
    <li className={`row ${classes.infoItem}`}>
      <p className={`col l-5 c-6 ${darkColor ? "darkColor" : ""}`}>{title}</p>
      <p className="col l-7 c-6 darkColor">{content}</p>
    </li>
  );
}
