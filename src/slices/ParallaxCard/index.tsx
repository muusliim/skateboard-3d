import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import { ParallaxImage } from "./ParallaxImage";

/**
 * Props for `ParallaxCards`.
 */
export type ParallaxCardsProps =
  SliceComponentProps<Content.ParallaxCardsSlice>;

/**
 * Component for "ParallaxCards" Slices.
 */

const ParallaxCards: FC<ParallaxCardsProps> = ({ slice, index }) => {
  const theme = slice.primary.theme;
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        "sticky top-[calc(var(--index)*1.8rem)]",
        theme === "Aqua" && "bg-brand-aqua",
        "text-white",
        theme === "Orange" && "bg-brand-orange",
        "text-white",
        theme === "Blue" && "bg-brand-blue",
        "text-white",
        theme === "Green" && "bg-brand-green",
        "text-white",
        "bg-texture",
      )}
      style={{ "--index": index }}
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div
          className={clsx(
            "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
            slice.variation === "imageOnLeft" && "md:order-2",
          )}
        >
          <Heading size="lg" as="h2" className="font-extrabold">
            <PrismicText field={slice.primary.heading} />
          </Heading>
          <div className="mt-2 max-w-md text-lg leading-normal">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <ButtonLink
            field={slice.primary.button_link}
            color={theme === "Aqua" || theme === "Blue" ? "orange" : "lime"}
          >
            {slice.primary.button_link.text}
          </ButtonLink>
        </div>
        <ParallaxImage
          foregroundImage={slice.primary.foreground_image}
          backgroundImage={slice.primary.background_image}
        />
      </div>
    </Bounded>
  );
};

export default ParallaxCards;
