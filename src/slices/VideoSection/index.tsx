import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { VideoPlayer } from "./VideoPlayer";
import clsx from "clsx";
import Image from "next/image";

const _maskClasses =
  "[mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-repeat:no-repeat] [mask-size:100%] [mask-position:center_center]";

/**
 * Props for `VideoSection`.
 */
export type VideoSectionProps = SliceComponentProps<Content.VideoSectionSlice>;

/**
 * Component for "VideoSection" Slices.
 */

const VideoSection: FC<VideoSectionProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      as={"section"}
      className="bg-texture bg-zinc-900"
    >
      <h2 className="sr-only">Видео</h2>
      <div className="relative aspect-video">
        {/* Masks */}
        <div
          className={clsx(
            _maskClasses,
            "absolute inset-0 bg-brand-gray ~translate-x-2/3 ~translate-y-2/3",
          )}
        />
        <div
          className={clsx(
            _maskClasses,
            "~translate--x-2/3 absolute inset-0 bg-brand-orange ~translate-y-1/2",
          )}
        />
        <div
          className={clsx(
            _maskClasses,
            "absolute inset-0 bg-brand-blue ~translate-x-1/2 ~-translate-y-2/3",
          )}
        />
        {/* Video */}
        <div className={clsx(_maskClasses, "relative h-full")}>
          {isFilled.keyText(slice.primary.youtube_video_id) && (
            <VideoPlayer youTubeID={slice.primary.youtube_video_id} />
          )}
        </div>

        {/* Texture */}
        <Image
          src="/image-texture.png"
          alt=""
          fill
          className={clsx(
            _maskClasses,
            "pointer-events-none relative object-cover opacity-80",
          )}
        />
      </div>
    </Bounded>
  );
};

export default VideoSection;
