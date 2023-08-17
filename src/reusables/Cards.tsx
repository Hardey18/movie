import { TransactionOutlined } from "@ant-design/icons";
import { FC } from "react";
import { numberWithCommas } from "../utils";
import { CardProps } from "../typings";

const Cards: FC<CardProps> = ({ title, budget }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
      <dt>
        <div>
          <TransactionOutlined className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" />
        </div>
        <span className="mt-4 text-sm font-medium text-gray-900">{title}</span>
      </dt>
      <dd className="mt-1 text-sm text-gray-500">
        ${numberWithCommas(budget)}
      </dd>
    </div>
  );
}

export default Cards;
