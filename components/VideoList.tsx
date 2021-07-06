import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { VideoType } from "../pages";
import styles from "../styles/VideoList.module.scss";
import useApi from "../lib/useApi";

export interface VideoListProps {
  category: {
    id: string;
    snippet: {
      title: string;
    };
  };
  setVideo: (video: VideoType) => void;
}

const VideoList: React.FC<VideoListProps> = ({ category, setVideo }) => {
  const [ref, inView] = useInView();
  const videos = useApi("videos", {
    path: category.id,
    predicate: inView,
    initialValue: [],
  });

  return (
    <div ref={ref} className={styles.category}>
      <p>{category.snippet.title}</p>
      <div className={styles.videoList}>
        {videos.map((video: any) => {
          const snippet = video.snippet;
          return (
            <div
              key={video.id}
              className={styles.video}
              onClick={() =>
                setVideo({
                  id: video.id,
                  title: snippet.title,
                  description: snippet.description,
                  channel: {
                    id: snippet.channelId,
                    title: snippet.channelTitle,
                  },
                  thumbnail:
                    snippet.thumbnails.maxres ?? snippet.thumbnails.high,
                })
              }
            >
              <Image
                src={snippet.thumbnails.high.url}
                alt={snippet.title}
                width={snippet.thumbnails.high.width}
                height={snippet.thumbnails.high.height}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoList;
