import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { VideoType } from "../pages";
import styles from "../styles/Modal.module.scss";

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  video?: VideoType;
}

const Modal: React.FC<ModalProps> = ({ show, video: videoProp, onClose }) => {
  const [video, setVideo] = useState(videoProp);
  const bgProps = useSpring({
    opacity: show ? 1 : 0,
  });
  const cardProps = useSpring({
    top: show ? 30 : 500,
    scale: show ? 1 : 0.8,
  });

  useEffect(() => {
    if (videoProp) {
      setVideo(videoProp);
    }
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
            style={{ backgroundImage: `url("${video.thumbnail}")` }}
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
          <div className={styles.description}>
            {video.description
              .split("\n")
              .map((x) => (x === "" ? <br key={Math.random()}/> : <p key={Math.random()}>{x}</p>))}
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Modal;
