import { ButtonLink } from "@/components/ButtonLink";
import { HorizontalLine, VerticalLine } from "@/components/LineBackground";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { FaStar } from "react-icons/fa6";
import { Scribble } from "./Scribble";

type Props = {
  id: string;
};

export async function SkateboardProduct({ id }: Props) {
  const client = createClient();
  const product = await client.getByID<Content.SkateboardDocument>(id);

  const _verticalLineClasses =
    "absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";
  const _horizontalLineClasses =
    "-mx-4 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";
  //Данные продукта после загрузки из призмика
  const price = isFilled.number(product.data.price)
    ? `${product.data.price} РУБ.`
    : "Цена не найдена";
  const name = isFilled.keyText(product.data.name)
    ? product.data.name
    : "Без названия";
  const color = isFilled.keyText(product.data.color_hex)
    ? product.data.color_hex
    : "#000000";
  const rating = isFilled.keyText(product.data.name)
    ? product.data.name.length + 20
    : 25;

  return (
    <div className="group relative mx-auto w-full max-w-72 px-6 pt-4">
      <VerticalLine className={clsx(_verticalLineClasses, "left-4")} />
      <VerticalLine className={clsx(_verticalLineClasses, "right-4")} />
      <HorizontalLine className={clsx(_horizontalLineClasses)} />

      <div className="mx-2 flex items-center justify-between font-semibold ~text-base/2xl">
        <span>{price}</span>
        <span className="inline-flex items-center gap-1">
          <FaStar className="z-10 text-yellow-400" /> {rating}
        </span>
      </div>
      <div className="-mb-1 overflow-hidden py-4">
        <Scribble
          color={color}
          className="absolute inset-0 h-full w-full animate-squiggle"
        />
        <PrismicNextImage
          alt=""
          field={product.data.image}
          width={150}
          className="mx-auto w-[60%] origin-top py-2 transition-transform duration-500 ease-in-out group-hover:scale-150"
        />
      </div>
      <HorizontalLine className={clsx(_horizontalLineClasses, "z-10")} />
      <h3 className="my-2 text-center font-sans font-black leading-snug ~text-lg/xl">
        {name}
      </h3>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ButtonLink field={product.data.customizer_link}>
          Кастомизировать
        </ButtonLink>
      </div>
    </div>
  );
}
