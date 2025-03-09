import { FC, JSX, Fragment } from "react";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { createClient } from "@/prismicio";
import { Skater } from "./Skater";
import SlideInAnimation from "@/components/SlideInAnimation";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid: FC<TeamGridProps> = async ({ slice }): Promise<JSX.Element> => {
  const client = createClient();
  const skaters = await client.getAllByType("skater");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy"
    >
      <SlideInAnimation>
        <Heading
          as="h2"
          size="lg"
          className="text-center font-black text-white ~mb-4/6"
        >
          <PrismicText field={slice.primary.heading} />
        </Heading>
      </SlideInAnimation>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {skaters.map((skater, i) => (
          <Fragment key={i}>
            {skater.data.name && (
                <Skater skater={skater} index={i} />
            )}
          </Fragment>
        ))}
      </div>
    </Bounded>
  );
};

export default TeamGrid;
