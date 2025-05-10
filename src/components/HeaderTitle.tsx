import { TitleProps } from "../typings";

const HeaderTitle = ({ withColor, plain }: TitleProps) => {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center pt-12">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {withColor}
        </span>{" "}
        <span className="drop-shadow-[0_1.2px_1.2px_rgba(1,50,32,0.9)]">
          {plain}
        </span>
      </h1>
    </div>
  );
};

export default HeaderTitle;
