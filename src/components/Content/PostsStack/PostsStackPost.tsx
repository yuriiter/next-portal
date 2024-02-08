import { PropsWithClassName } from "@/types/types";
import { cn } from "@/utils/utils";
import { Rating } from "@smastrom/react-rating";
import { StaticImageData } from "next/image";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/Button/Button";

type PostsStackPostProps = {
  rating: number;
  text: string;
  href: string;
  img: StaticImageData | string;
} & PropsWithClassName;

export const PostsStackPost = ({
  rating,
  text,
  href,
  img,
  className,
}: PostsStackPostProps) => {
  return (
    <Link
      href={`${href}`}
      className={cn([
        "rounded-md bg-banner bg-opacity-60 transition-all p-3 flex gap-4 hover:bg-primary stack-post",
        className,
      ])}
    >
      <Image
        src={img}
        alt={text}
        width={80}
        height={70}
        className="rounded-md min-w-20 h-[70px] grow object-cover"
      />
      <div className="flex flex-col grow justify-between gap-3">
        <Button onClick={() => null} className="stack-button">
          {text}
        </Button>
        <Rating value={rating} readOnly style={{ width: "100px" }} />
      </div>
    </Link>
  );
};
