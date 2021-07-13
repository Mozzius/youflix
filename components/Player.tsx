import { useSpring, animated } from "@react-spring/web";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

import useYoutubePlayer from "../lib/useYoutubePlayer";
import styles from "../styles/Player.module.scss";

const PlayerContext = createContext<(id: string, title: string) => void>(
  () => {}
);

const Player: React.FC = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const [[id, title], setId] = useState<[string, string]>(["", ""]);
  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const timeoutRef = useRef<number | undefined>();
  const intervalRef = useRef<number | undefined>();
  const [ref, { play, pause }] = useYoutubePlayer(id);
  const [playing, setPlaying] = useState<boolean>(false);
  const props = useSpring({
    opacity: show ? 1 : 0,
    scale: show ? 1 : 0.8,
  });

  useEffect(() => {
    setPlaying(show);
  }, [show]);

  useEffect(() => {
    if (playing) {
      play();
    } else {
      pause();
    }
  }, [pause, play, playing]);

  useEffect(
    () => () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    },
    []
  );

  const onPlayerReady = (event) => {
    const player = event.target;
    // duration and time are not available until metadata is loaded,
    // which is after the video starts
    function pollUntilMetadata() {
      const duration = player.getDuration();
      console.log(duration);
      if (!duration) {
        timeoutRef.current = window.setTimeout(pollUntilMetadata, 10);
      } else {
        setDuration(duration);
        intervalRef.current = window.setInterval(
          () => setTime(player.getCurrentTime()),
          100
        );
      }
    }
    pollUntilMetadata();
  };

  return (
    <PlayerContext.Provider
      value={(id, title) => {
        setId([id, title]);
        setShow(true);
      }}
    >
      <animated.div
        style={props}
        className={`${styles.container} ${show ? styles.shown : styles.hidden}`}
      >
        <div className={styles.ui} onClick={() => setPlaying((p) => !p)}>
          <div className={styles.title}>{title}</div>
          <button
            className={styles.close}
            onClick={(evt) => {
              evt.stopPropagation();
              setShow(false);
            }}
          >
            <div>+</div>
          </button>
          <div className={styles.progressBar}>
            <div style={{ width: `${(time / duration) * 100}%` }} />
          </div>
          <button className={styles.playPause}>
            <span>{playing ? "\u23F8\uFE0E" : "\u23F5\uFE0E"}</span>
          </button>
          {!!time && !!duration && (
            <div className={styles.duration}>
              {Math.floor(time / 60)}:{Math.floor(time % 60)} /{" "}
              {Math.floor(duration / 60)}:{Math.floor(duration % 60)}
            </div>
          )}
        </div>
        <YouTube
          ref={ref}
          videoId={id}
          containerClassName={styles.player}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnd={() => setShow(false)}
          onError={() => setShow(false)}
          onReady={onPlayerReady}
          opts={{
            height: "100%",
            width: "100%",
            playerVars: {
              autoplay: 1,
              controls: 0,
              disablekb: 1,
              fs: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
            },
          }}
        />
      </animated.div>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export default Player;
