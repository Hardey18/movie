// import { CircularProgress } from "@nextui-org/react";
// import React, { useEffect, useState } from "react";

import { FC } from "react";
import { ICPercentProps } from "../typings";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar: FC<ICPercentProps> = ({ percent }) => {
  // const percentage = 66;
  return (
    <div style={{ width: 60, height: 60 }}>
      <CircularProgressbar
        value={percent}
        text={`${percent}%`}
        background
        styles={buildStyles({
          textSize: "1.5rem",
          pathColor: `${
            percent >= 70
              ? "rgb(74 222 128)"
              : percent >= 30
              ? "rgb(250 204 21)"
              : "rgb(248 113 113)"
          }`,
          backgroundColor: "black",
          trailColor: "black",
          textColor: `${
            percent >= 70
              ? "rgb(74 222 128)"
              : percent >= 30
              ? "rgb(250 204 21)"
              : "rgb(248 113 113)"
          }`,
        })}
      />
      ;
    </div>
  );
};

export default CircularProgressBar;
