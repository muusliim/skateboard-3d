"use client";
import { ComponentProps, ReactNode, useEffect } from "react";
import {
  ColorField,
  Content,
  ImageField,
  isFilled,
  KeyTextField,
} from "@prismicio/client";
import clsx from "clsx";
import { Heading } from "@/components/Heading";
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import useCustomizationStore from "@/stores/useCustomizationStore";
import { useShallow } from "zustand/shallow";
import { useRouter } from "next/navigation";

type Props = Pick<
  Content.BoardCustomizerDocumentData,
  "wheels" | "decks" | "metals"
> & { className?: string };

export default function Controls({ decks, wheels, metals, className }: Props) {
  const router = useRouter();
  const {
    setBolt,
    setDeck,
    setTruck,
    setWheel,
    selectedBolt,
    selectedDeck,
    selectedTruck,
    selectedWheel,
  } = useCustomizationStore(
    useShallow((state) => ({
      setBolt: state.setBolt,
      setDeck: state.setDeck,
      setTruck: state.setTruck,
      setWheel: state.setWheel,
      selectedBolt: state.selectedBolt,
      selectedDeck: state.selectedDeck,
      selectedTruck: state.selectedTruck,
      selectedWheel: state.selectedWheel,
    })),
  );
  useEffect(() => {
    const url = new URL(window.location.href);
    if (isFilled.keyText(selectedWheel?.uid)) {
      url.searchParams.set("wheel", selectedWheel.uid);
    }
    if (isFilled.keyText(selectedDeck?.uid)) {
      url.searchParams.set("deck", selectedDeck.uid);
    }
    if (isFilled.keyText(selectedTruck?.uid)) {
      url.searchParams.set("truck", selectedTruck?.uid);
    }
    if (isFilled.keyText(selectedBolt?.uid)) {
      url.searchParams.set("bolt", selectedBolt?.uid);
    }

    router.replace(url.href);
  }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt, router]);
  return (
    <div className={clsx(className, "flex flex-col gap-6")}>
      <Options title="Деки" selectedName={selectedDeck?.uid}>
        {decks.map((deck) => (
          <Option
            key={deck.uid}
            imageField={deck.texture}
            imgixParams={{
              rect: [20, 1500, 1000, 850], //координаты, где вырезать картинку (используем полную картинку доски и вырезаем для кнопки)
              width: 150,
              height: 150,
            }}
            selected={deck?.uid === selectedDeck?.uid}
            onClick={() => setDeck(deck)}
          >
            {deck.uid?.replace(/_/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Колеса" selectedName={selectedWheel?.uid}>
        {wheels.map((wheel) => (
          <Option
            key={wheel.uid}
            imageField={wheel.texture}
            imgixParams={{ rect: [20, 10, 850, 850], width: 150, height: 150 }}
            selected={wheel?.uid === selectedWheel?.uid}
            onClick={() => setWheel(wheel)}
          >
            {wheel.uid?.replace(/_/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Подвески" selectedName={selectedTruck?.uid}>
        {metals.map((metal) => (
          <Option
            key={metal.uid}
            colorField={metal.color}
            selected={metal?.uid === selectedTruck?.uid}
            onClick={() => setTruck(metal)}
          >
            {metal.uid?.replace(/_/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Болты" selectedName={selectedBolt?.uid}>
        {metals.map((metal) => (
          <Option
            key={metal.uid}
            colorField={metal.color}
            selected={metal?.uid === selectedBolt?.uid}
            onClick={() => setBolt(metal)}
          >
            {metal.uid?.replace(/_/g, " ")}
          </Option>
        ))}
      </Options>
    </div>
  );
}

type OptionsProps = {
  title: ReactNode;
  selectedName?: KeyTextField;
  children?: ReactNode;
};

function Options({ title, selectedName, children }: OptionsProps) {
  const formattedName = selectedName?.replace(/_/g, " ");
  return (
    <div>
      <div className="flex">
        <Heading as="h2" size="xs" className="mb-2 font-black">
          {title}
        </Heading>
        <p className="ml-3 text-zinc-500">
          <span className="select-none text-zinc-200">{formattedName}</span>
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
  onClick: () => void;
} & (
    | {
        //для кнопок с картинками
        imageField: ImageField;
        imgixParams?: PrismicNextImageProps["imgixParams"];
        colorField?: never;
      }
    | {
        //для кнопок с выбором цвета
        colorField: ColorField;
        imageField?: never;
        imgixParams?: never;
      }
  );

function Option({
  children,
  selected,
  imageField,
  colorField,
  imgixParams,
  onClick,
}: OptionProps) {
  return (
    <li>
      <button
        className={clsx(
          "size-10 cursor-pointer rounded-full bg-black p-1 outline-2 outline-white",
          selected && "outline",
        )}
        onClick={onClick}
      >
        {imageField ? (
          <PrismicNextImage
            field={imageField}
            imgixParams={imgixParams}
            alt=""
            className={clsx(
              "pointer-events-none h-full w-full rounded-full",
              selected && "ring-2 ring-zinc-600 ring-offset-2",
            )}
          />
        ) : (
          <div
            style={{ backgroundColor: colorField ?? undefined }}
            className={clsx(
              "pointer-events-none h-full w-full rounded-full",
              selected && "ring-2 ring-zinc-600 ring-offset-2",
            )}
          />
        )}

        <span className="sr-only">{children}</span>
      </button>
    </li>
  );
}
