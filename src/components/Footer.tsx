import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Logo } from "./Logo";
import { Bounded } from "./Bounded";
import { FooterPhysics } from "./FooterPhysics";

export async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  const skateboards = settings.data.footer_skateboards
    .map((item) => asImageSrc(item.skateboard, { h: 700 }))
    .filter((image): image is string => typeof image === "string");
  return (
    <footer className="bg-texture overflow-hidden bg-zinc-900 text-white">
      <div className="relative h-[75vh] ~p-10/16 md:aspect-auto">
        {/* image */}
        <PrismicNextImage
          field={settings.data.footer_image}
          alt=""
          fill
          className="object-cover"
          width={1200}
        />
        {/* LOGO */}
        <Logo className="pointer-events-none relative h-20 text-brand-navy mix-blend-multiply md:h-28" />

        {/* boards PHYSICS  */}
        <FooterPhysics
          boards={skateboards}
          className="absolute inset-0 overflow-hidden z-10"
        />
      </div>
      {/* links */}
      <Bounded as={"nav"}>
        <ul className="flex flex-wrap justify-center gap-6">
          {settings.data.navigation.map((item) => (
            <li key={item.link.text}>
              <PrismicNextLink
                field={item.link}
                className="transition-color duration-300 ~text-lg/3xl hover:text-brand-orange"
              />
            </li>
          ))}
        </ul>
      </Bounded>
    </footer>
  );
}
