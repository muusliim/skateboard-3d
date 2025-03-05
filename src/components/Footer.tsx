import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Logo } from "./Logo";
import { Bounded } from "./Bounded";

type Props = {};

export async function Footer({}: Props) {
  const client = createClient();
  const settings = await client.getSingle("settings");
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

        {/* boards */}
      </div>
      {/* links */}
      <Bounded as={"nav"}>
        <ul className="flex flex-wrap justify-center gap-6">
          {settings.data.navigation.map((item) => (
            <li key={item.link.text}>
              <PrismicNextLink field={item.link} className="~text-lg/3xl transition-color duration-300  hover:text-brand-orange" />
            </li>
          ))}
        </ul>
      </Bounded>
    </footer>
  );
}
