import { PropsWithClassName } from "@/types/types";
import React, { PropsWithChildren } from "react";
import { WrapperContainer } from "./WrapperContainer";

type WithHeaderProps = PropsWithClassName &
  PropsWithChildren & {
    header: string;
  };

export const WithHeader = ({ children, header }: WithHeaderProps) => {
  return (
    <>
      <WrapperContainer>
        <h2 className="uppercase w-full font-bold my-3 text-2xl lead-relaxed">
          {header}
        </h2>
      </WrapperContainer>
      {children}
    </>
  );
};
