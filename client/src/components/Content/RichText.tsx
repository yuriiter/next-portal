import { PropsWithClassName } from "@/types/types";
import { cn } from "@/utils/utils";
import Markdown from "react-markdown";
import gfm from "remark-gfm";

type RichTextProps = { children: string } & PropsWithClassName;

export const RichText = ({ children, className }: RichTextProps) => {
  return (
    <div className={cn(["my-5 rich-text", className])}>
      <Markdown remarkPlugins={[gfm]}>{children}</Markdown>
    </div>
  );
};
