import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { ButtonLink } from "@/components/ButtonLink";
import { SkaterScribble } from "./SkaterScribble";
import clsx from "clsx";

type Props = {
  skater: Content.SkaterDocument;
  index: number;
};

export function Skater({ skater, index }: Props) {
  const colors = [
    "text-brand-orange",
    "text-brand-lime",
    "text-brand-purple",
    "text-brand-aqua",
  ];
  const strokeColor = colors[index];
  return (
    <div className="skater group relative flex flex-col items-center gap-4">
      <div className="layout-content overflow-hidden rounded-2xl">
        <PrismicNextImage
          field={skater.data.background_photo}
          width={500}
          imgixParams={{ q: 30 }}
          alt=""
          className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:blur-sm group-hover:grayscale"
        />
        <SkaterScribble className={clsx("skater-scribble relative", strokeColor)} />
        <PrismicNextImage
          field={skater.data.foreground_photo}
          width={500}
          alt=""
          className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
        />
        <div className="relative h-48 w-full place-self-end bg-gradient-to-t from-slate-900 to-transparent"></div>
        <h3 className="relative place-self-end justify-self-center p-2 font-sans font-bold text-brand-gray drop-shadow-lg ~text-4xl/6xl">
          {skater.data.name}
        </h3>
      </div>
      <ButtonLink field={skater.data.customizer_link} size="sm">
        Создай свой скейт
      </ButtonLink>
    </div>
  );
}
