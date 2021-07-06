import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { VideoType } from "../pages";
import styles from "../styles/Modal.module.scss";
import useApi from "../lib/useApi";
import Description from "./Description";
import RelatedVideo from "./RelatedVideo";

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  video?: VideoType;
}

const Modal: React.FC<ModalProps> = ({ show, video: videoProp, onClose }) => {
  const [video, setVideo] = useState(videoProp);
  console.log(video?.id, !!video);
  const related = useApi("related", {
    path: video?.id,
    predicate: !!video,
    purge: true,
    initialValue: [],
  });
  const bgProps = useSpring({
    opacity: show ? 1 : 0,
  });
  const cardProps = useSpring({
    top: show ? 30 : 500,
    scale: show ? 1 : 0.8,
  });

  // cache video prop, so content doesn't disappear when closing
  useEffect(() => {
    if (videoProp) {
      setVideo(videoProp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoProp?.id]);

  if (!video) return null;

  return (
    <animated.div
      className={styles.background}
      onClick={onClose}
      style={{
        pointerEvents: show ? "auto" : "none",
        ...bgProps,
      }}
    >
      <animated.div
        className={styles.card}
        style={cardProps}
        onClick={(evt) => evt.stopPropagation()}
      >
        <div className={styles.backgroundImage}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url("${video.thumbnail.url}")` }}
          />
          <div className={styles.fade} />
        </div>
        <div className={styles.close} onClick={onClose}>
          <span>+</span>
        </div>
        <div className={styles.content}>
          <div className={styles.fill} />
          <h1>{video.title}</h1>
          <a href={`https://youtube.com/embed/${video.id}`}>
            <span>▸</span>Play
          </a>
          <Description content={video.description} />
          <div className={styles.related}>
            {related.slice(0, 6).map((vid) => {
              if (vid.snippet) {
                const transformed: VideoType = {
                  id: vid.id.videoId,
                  title: vid.snippet.title,
                  channel: vid.snippet.channelTitle,
                  description: vid.snippet.description,
                  thumbnail: vid.snippet.thumbnails.high,
                };
                return (
                  <RelatedVideo
                    key={vid.id.videoId}
                    video={transformed}
                    setActiveVideo={() =>
                      setVideo({
                        ...transformed,
                        thumbnail:
                          vid.snippet.thumbnails.maxres ??
                          vid.snippet.thumbnails.high,
                      })
                    }
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Modal;
