// import { CircularProgress } from "@nextui-org/react";
// import React, { useEffect, useState } from "react";

import { FC } from "react";
import { ICPercentProps } from "../typings";

const CircularProgressBar:FC<ICPercentProps> = ({ percent }) => {
  return (
    <div>
      <div className={`radial-progress bg-black ${percent >= 70 ? "text-green-400" : percent >= 30 ? "text-yellow-400" : "text-red-400"}`} style={{ "--value": `${percent}`, "--size": "4rem", "--thickness": "4px" }}>{percent}%</div>
    </div>
  );
};

export default CircularProgressBar;
