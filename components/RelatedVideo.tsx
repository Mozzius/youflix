import Image from "next/image";
import { VideoType } from "../pages";
import styles from "../styles/RelatedVideo.module.scss";

export interface RelatedVideoProps {
  video: VideoType;
  setActiveVideo: () => void;
}

const RelatedVideo: React.FC<RelatedVideoProps> = ({
  video,
  setActiveVideo,
}) => {
  return (
    <div className={styles.container} onClick={setActiveVideo}>
      <div className={styles.image} style={{ backgroundImage: `url("${video.thumbnail.url}")` }} />
      <div className={styles.info}>
        <p className={styles.title}>{video.title}</p>
        <p className={styles.channel}>{video.channel}</p>
      </div>
    </div>
  );
};

export default RelatedVideo;
