"use client";
import React, { ComponentProps, ReactNode } from "react";
import {
  ColorField,
  Content,
  ImageField,
  KeyTextField,
} from "@prismicio/client";
import clsx from "clsx";
import { Heading } from "@/components/Heading";
import { PrismicNextImageProps } from "@prismicio/next";

type Props = Pick<
  Content.BoardCustomizerDocumentData,
  "wheels" | "decks" | "metals"
> & { className?: string };

export default function Controls({ decks, wheels, metals, className }: Props) {
  return (
    <div className={clsx(className, "flex flex-col gap-6")}>
      <Options title="Деки"></Options>
      <Options title="Колеса"></Options>
      <Options title="Подвески"></Options>
      <Options title="Болты"></Options>
    </div>
  );
}

type OptionsProps = {
  title: ReactNode;
  selectedName?: KeyTextField;
  children?: ReactNode;
};

function Options({ title, selectedName, children }: OptionsProps) {
  const formattedName = selectedName?.replace(/-/g, " ");
  return (
    <div>
      <div className="flex">
        <Heading as="h2" size="xs" className="mb-2 font-black">
          {title}
        </Heading>
        <p className="ml-3 text-zinc-500">
          <span className="select-none text-zinc-600">{formattedName}</span>
        </p>
      </div>
      <ul className="mb-1 flex flex-wrap gap-2">{children}</ul>
    </div>
  );
}

type OptionProps = Omit<ComponentProps<"button">, "children"> & {
  //чтоб children был обязательным! поэтому удалил и заново добавил обратно
  selected?: boolean;
  children: ReactNode;
} & (
    | {//для кнопок с картинками
        imageField: ImageField;
        imgix?: PrismicNextImageProps["imgixParams"];
        colorField?: never;
      }
    | {//для кнопок с выбором цвета
        colorField: ColorField;
        imageField?: never;
        imgix?: never;
      }
  );


//   function Option({children, selected, imageField, colorField, imgix, ...rest}: OptionProps) {

//   }