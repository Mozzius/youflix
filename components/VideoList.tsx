import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { VideoType } from "../pages";
import styles from "../styles/VideoList.module.scss";

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
  const [videos, setVideos] = useState([]);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      fetch(`/api/videos/${category.id}`)
        .then((res) => res.json())
        .then((x) => setVideos(x));
    }
  }, [inView, category.id]);

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
                    snippet.thumbnails?.maxres?.url ??
                    snippet.thumbnails.high.url,
                })
              }
            >
              <img src={snippet.thumbnails.high.url} alt={snippet.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoList;
