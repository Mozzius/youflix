import { useEffect, useState } from "react";
import { getSession, signOut, useSession } from "next-auth/client";
import VideoList from "../components/VideoList";
import styles from "../styles/Home.module.scss";
import Modal from "../components/Modal";

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}

export type VideoType = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  channel: {
    id: string;
    title: string;
  };
};

export default function Home() {
  const [video, setVideo] = useState(null);
  const [categories, setCategories] = useState(null);
  const [session] = useSession();

  const activeVideo = !!video;

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .catch((e) => console.error(e))
      .then((data) => {
        setCategories(
          data
            .filter((x) => x.snippet.assignable && x.id !== "19")
            .sort(() => 0.5 - Math.random())
        );
      });
  }, []);

  useEffect(() => {
    document.querySelector("body").style.overflow = activeVideo
      ? "hidden"
      : "initial";
  }, [activeVideo]);

  return (
    <>
      <nav className={styles.nav}>
        <h1>youflix</h1>
        <img src={session.user.image} onClick={() => signOut()} />
      </nav>
      {categories &&
        categories.map((category: any) => (
          <VideoList
            key={category.id}
            category={category}
            setVideo={setVideo}
          />
        ))}
      <Modal show={activeVideo} video={video} onClose={() => setVideo(null)} />
    </>
  );
}
