import { StaticImageData } from "next/image";

export type PropsWithClassName = {
  className?: string;
};

export type LinkData<CustomData extends Record<string, unknown> = {}> = {
  href: string;
  text: string;
  img: string | StaticImageData;
} & CustomData;
