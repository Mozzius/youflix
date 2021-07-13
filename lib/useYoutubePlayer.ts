import { MutableRefObject, useRef } from "react";
import YouTube from "react-youtube";

type ReturnType = readonly [
  MutableRefObject<YouTube | null>,
  {
    play: () => void;
    pause: () => void;
  }
];

const useYoutubePlayer = (id: string): ReturnType => {
  const ref = useRef<YouTube>();

  const player = ref.current?.getInternalPlayer() ?? null;

  const play = () => {
    if (player) {
      try {
        player.playVideo();
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const pause = () => {
    if (player) {
      try {
        player.pauseVideo();
      } catch (e) {
        console.warn(e);
      }
    }
  };

  return [ref, { play, pause }] as const;
};

export default useYoutubePlayer;
