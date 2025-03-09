import { FC } from "react";
import { asImageSrc, Content } from "@prismicio/client";
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
import { Skateboard3D } from "./Skateboard3D";

const _defaultTextureDeck = "/skateboard/Deck.webp";
const _defaultTextureWheel = "/skateboard/SkateWheel1.png";
const _defaultTruckColor = "#343131";
const _defaultBoltColor = "#343131";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const deckTexture =
    asImageSrc(slice.primary.skateboard_deck_texture) || _defaultTextureDeck;

  const wheelTexture =
    asImageSrc(slice.primary.skateboard_wheel_texture) || _defaultTextureWheel;

  const truckColor = slice.primary.skateboard_truck_color || _defaultTruckColor;

  const boltColor = slice.primary.skateboard_bolt_color || _defaultBoltColor;
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture relative h-dvh overflow-hidden bg-brand-pink pt-44 text-zinc-800 md:pt-32"
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
          <div className="max-w-[40ch] font-semibold ~text-base/xl">
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
      <Skateboard3D
        deckTexture={deckTexture}
        wheelTexture={wheelTexture}
        truckColor={truckColor}
        boltColor={boltColor}
      />
    </Bounded>
  );
};

export default Hero;
