import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import YouTube from "react-youtube";

type ReturnType = readonly [
  MutableRefObject<YouTube | null>,
  {
    play: () => void;
    pause: () => void;
    duration: number;
    time: number;
  }
];

const useYoutubePlayer = (id: string): ReturnType => {
  const ref = useRef<YouTube | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  const getPlayer = useCallback(() => {
    if (ref && ref.current) {
      const player = ref.current.getInternalPlayer();
      player.getDuration().then(setDuration);
      return player;
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, id]);

  console.log(time);

  useEffect(() => {
    const player = getPlayer();
    if (player) {
      const id = window.setInterval(
        () => player.getCurrentTime().then(setTime),
        100
      );
      return clearInterval(id);
    }
  }, [getPlayer]);

  const play = useCallback(() => {
    const player = getPlayer();
    if (player) {
      player.playVideo();
    }
  }, [getPlayer]);

  const pause = useCallback(() => {
    const player = getPlayer();
    if (player) {
      player.pauseVideo();
    }
  }, [getPlayer]);

  return [ref, { play, pause, duration, time }] as const;
};

export default useYoutubePlayer;
