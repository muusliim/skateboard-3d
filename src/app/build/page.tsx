import Link from "next/link";
import React from "react";

import { Logo } from "@/components/Logo";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import { createClient } from "@/prismicio";

export default async function page() {
  const client = createClient();
  const customizer = await client.getSingle("board_customizer");
  const { wheels, decks, metals } = customizer.data; 

  
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative aspect-square shrink-0 bg-[#4a5e77] lg:aspect-auto lg:grow">
        <Link href={"/"} className="absolute left-6 top-6">
          <Logo className="text-white ~h-8/12" />
        </Link>
      </div>
      <div className="bg-texture grow bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
        <Heading as="h1" size="sm" className="mb-6 font-extrabold">
          Создай свой скейтборд
        </Heading>

        <ButtonLink href="" color="orange" icon="plus">
          Добавить в корзину
        </ButtonLink>
      </div>
    </div>
  );
}
