import { StaticImageData } from "next/image";

export type PropsWithClassName = {
  className?: string;
};

export type LinkData<CustomData extends Record<string, unknown> = {}> = {
  href: string;
  text: string | undefined;
  img: string | StaticImageData | undefined;
} & CustomData;
