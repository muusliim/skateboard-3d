import { Metadata } from "next";
import { isFilled, asImageSrc, Content } from "@prismicio/client";
import { SliceComponentProps, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage");
  const slices = bundleParallaxCards(page.data.slices);

  return (
    <SliceZone
      slices={slices}
      components={{
        ...components,
        parallax_cards_bundle: ({
          slice,
        }: SliceComponentProps<ParallaxCardsBundleSlice>) => (
          <div>
            <SliceZone slices={slice.slices} components={components} />
          </div>
        ),
      }}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: isFilled.keyText(page.data.meta_title)
        ? page.data.meta_title
        : undefined,
      description: isFilled.keyText(page.data.meta_description)
        ? page.data.meta_description
        : undefined,
      images: isFilled.image(page.data.meta_image)
        ? [asImageSrc(page.data.meta_image)]
        : undefined,
    },
  };
}

type ParallaxCardsBundleSlice = {
  id: string;
  slice_type: "parallax_cards_bundle";
  slices: Content.ParallaxCardsSlice[];
};

function bundleParallaxCards(
  slices: Content.HomepageDocumentDataSlicesSlice[],
) {
  const result: (
    | Content.HomepageDocumentDataSlicesSlice
    | ParallaxCardsBundleSlice
  )[] = [];

  for (const slice of slices) {
    if (slice.slice_type !== "parallax_cards") {
      result.push(slice);
      continue;
    }
    const bundle: (typeof result)[number] = result[result.length - 1];

    if (bundle?.slice_type === "parallax_cards_bundle") {
      bundle.slices.push(slice);
    } else {
      result.push({
        id: crypto.randomUUID(),
        slice_type: "parallax_cards_bundle",
        slices: [slice],
      });
    }
  }
  return result;
}
