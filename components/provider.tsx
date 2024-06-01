import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  center?: boolean;
}

const Provider: FC<Props> = ({ center, children }) => {
  return (
    <div
      className={`px-4 ${
        center ? "flex justify-center items-center min-h-screen" : "mt-20"
      }`}
    >
      {children}
    </div>
  );
};

export default Provider;
