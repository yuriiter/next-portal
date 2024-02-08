import React from "react";
import { LinkData, PropsWithClassName } from "@/types/types";
import { PostsStackPost } from "./PostsStackPost";
import { cn } from "@/utils/utils";
import { useTranslation } from "next-i18next";

type PostsStackProps = {
  posts: LinkData<{ rating: number }>[];
  title: string;
} & PropsWithClassName;

export const PostsStack = ({ posts, className, title }: PostsStackProps) => {
  const { t } = useTranslation();

  return (
    <div className={cn([className])}>
      <h3 className="uppercase font-bold text-lg mb-4">{title}</h3>
      <div className="flex flex-wrap gap-3 items-stretch">
        {posts.length > 0 ? (
          posts.map(({ rating, href, text, img }, idx) => (
            <PostsStackPost
              key={idx}
              text={text}
              href={href}
              rating={rating}
              img={img}
            />
          ))
        ) : (
          <p className="text-gray-300">{t("side-posts-no-data")}</p>
        )}
      </div>
    </div>
  );
};
