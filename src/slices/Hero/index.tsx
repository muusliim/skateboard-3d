import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import { WideLogo } from "./WideLogo";
import { TallLogo } from "./TallLogo";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture relative h-dvh overflow-hidden bg-brand-pink text-zinc-800"
    >
      <div className="absolute inset-0 flex items-center pt-16">
        <WideLogo className="hidden w-full text-brand-purple opacity-20 mix-blend-multiply lg:block" />
        <TallLogo className="w-full text-brand-purple opacity-20 mix-blend-multiply lg:hidden" />
      </div>
      <div className="absolute inset-0 mx-auto mt-24 grid max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 ~py-8/12">
        <Heading
          size="lg"
          as="h1"
          className="relative max-w-2xl place-self-start font-extrabold"
        >
          <PrismicText field={slice.primary.heading} />
        </Heading>

        <div className="relative flex w-full flex-col items-center justify-between ~gap-2/4 lg:flex-row">
          <div className="max-w-[40ch] font-semibold ~text-lg/xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <ButtonLink
            field={slice.primary.button}
            icon="skateboard"
            size="lg"
            className="z-20 mt-2 block"
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>
      </div>

      {/* skate 3d  */}
    </Bounded>
  );
};

export default Hero;
