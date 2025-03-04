import { CSSProperties, ElementType, ReactNode } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: ElementType;
  className?: string;
  style?: CSSProperties & { [key: string]: number };
  children: ReactNode;
};

export function Bounded({
  as: Component = "section",
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Component className={clsx("px-6 ~py-10/16", className)} {...restProps}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Component>
  );
}
