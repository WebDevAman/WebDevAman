import React from "react";
import Image from "next/image";
import Link from "next/link";
import truncateString from "../../utils/helpers/truncateString";
import Skeleton from "../common/Skeleton";

interface PostSuggestionsProps {
  postsSuggested: Array<{ [any: string]: string }>;
}

function PostSuggestions({ postsSuggested }: PostSuggestionsProps) {
  const isLoading = Boolean(!postsSuggested);
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-2">
      {isLoading
        ? new Array(6).fill("").map((_, i) => <SuggestionElement key={i} isLoading={true} />)
        : //@ts-ignore
        postsSuggested.map((post, i) => <SuggestionElement key={i} postSuggested={post.node} />)}
    </div>
  );
}

function SuggestionElement({
  postSuggested,
  isLoading,
}: {
  postSuggested?: { [any: string]: any };
  isLoading?: boolean;
}) {
  return (
    <div className="rounded overflow-hidden shadow-md">
      <Link href={postSuggested?.uri || "#"}>
        <a className="block relative aspect-w-4 aspect-h-2">
          {!isLoading ? (
            <Image
              layout="fill"
              objectFit="cover"
              src={postSuggested!.featuredImage.node.link}
              alt={postSuggested!.featuredImage.node.altText}
              title={postSuggested!.featuredImage.node.title}
            />
          ) : (
            <Skeleton className="inset-0 absolute !rounded-none" />
          )}
        </a>
      </Link>

      <Link href={postSuggested?.uri || "#"}>
        <a>
          <h3 className="hover:text-main text-base leading-[1.1] font-bold p-1.5 a proposito di Keynes">
            {!isLoading ? <span>{truncateString(postSuggested?.title, 60)}</span> : <Skeleton count={3} />}
          </h3>
        </a>
      </Link>
    </div>
  );
}

export default PostSuggestions;
