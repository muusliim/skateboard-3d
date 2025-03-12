import { CSSProperties, ElementType, ReactNode } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: ElementType | string;
  className?: string;
  style?: CSSProperties & { [key: string]: number };
  children: ReactNode;
  id?: string;
};

export function Bounded({
  as: Component = "section",
  className,
  id,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Component id={id} className={clsx("px-6 ~py-10/16", className)} {...restProps}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Component>
  );
}
