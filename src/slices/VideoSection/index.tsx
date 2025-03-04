import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { VideoPlayer } from "./VideoPlayer";

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
      className="bg-texture bg-zinc-800 text-white"
    >
      <h2 className="sr-only">Видео</h2>
      <div className="aspect-video relative">
        <div className="absolute inset-0 [mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-repeat:no-repeat] [mask-size:100%] [mask-position:center_center] bg-brand-gray" />
        {/* <VideoPlayer youTubeID={slice.primary.youtube_video_id} /> */}
      </div>

      {/* Masks */}
      {/* Video */}
      {/* Texture */}
    </Bounded>
  );
};

export default VideoSection;
