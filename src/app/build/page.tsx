import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import { createClient } from "@/prismicio";
import Preview from "./Preview";
import { asImageSrc } from "@prismicio/client";
import Controls from "./Controls";

export default async function Page() {
  const client = createClient();
  const customizer = await client.getSingle("board_customizer");
  const { wheels, decks, metals } = customizer.data;

  // Устанавливаем дефолтные значения
  const defaultWheel = wheels[0];
  const defaultDeck = decks[0];
  const defaultTruck = metals[0];
  const defaultBolt = metals[0];

  const wheelTextureURLs = wheels
    .map((wheel) => asImageSrc(wheel?.texture))
    .filter((url): url is string => typeof url === "string");
  const deckTextureURLs = decks
    .map((deck) => asImageSrc(deck?.texture))
    .filter((url): url is string => typeof url === "string");

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative aspect-square shrink-0 bg-[#25292d] lg:aspect-auto lg:grow">
        <div className="absolute inset-0">
          {defaultBolt && defaultDeck && defaultTruck && defaultWheel && (
            <Preview
              deckTextureURLs={deckTextureURLs}
              wheelTextureURLs={wheelTextureURLs}
              defaultWheel={defaultWheel}
              defaultDeck={defaultDeck}
              defaultTruck={defaultTruck}
              defaultBolt={defaultBolt}
            />
          )}
        </div>
        <Link href={"/"} className="absolute left-6 top-6">
          <Logo className="text-white ~h-8/12" />
        </Link>
      </div>

      <div className="bg-texture grow bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
        <Heading as="h1" size="sm" className="mb-6 font-extrabold">
          Создай свой скейтборд
        </Heading>
        <Controls
          decks={decks}
          wheels={wheels}
          metals={metals}
          className="mb-6"
        />
        <ButtonLink href="" color="orange" icon="plus">
          Добавить в корзину
        </ButtonLink>
      </div>
    </div>
  );
}
