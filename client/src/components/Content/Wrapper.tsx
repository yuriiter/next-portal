import React, { PropsWithChildren } from "react";

export const Wrapper = ({ children }: PropsWithChildren) => {
  return <div className="rounded-2xl py-[1px] bg-wrapper">{children}</div>;
};
