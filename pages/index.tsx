import { useEffect, useState } from "react";
import { getSession, signOut, useSession } from "next-auth/client";
import Image from "next/image";
import VideoList from "../components/VideoList";
import styles from "../styles/Home.module.scss";
import Modal from "../components/Modal";
import useApi from "../lib/useApi";
import Player from "../components/Player";

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
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  description: string;
  channel: {
    id: string;
    title: string;
  };
};

export default function Home() {
  const [video, setVideo] = useState(null);
  const categories = useApi("categories", { initialValue: [] });
  const [session] = useSession();

  const activeVideo = !!video;

  useEffect(() => {
    document.querySelector("body").style.overflow = activeVideo
      ? "hidden"
      : "initial";
  }, [activeVideo]);

  return (
    <Player>
      <nav className={styles.nav}>
        <h1>youflix</h1>
        <Image
          src={session.user.image}
          alt={session.user.name}
          width={50}
          height={50}
          onClick={() => signOut()}
        />
      </nav>
      {categories
        .filter((x) => x.snippet.assignable && x.id !== "19")
        .map((category: any) => (
          <VideoList
            key={category.id}
            category={category}
            setVideo={setVideo}
          />
        ))}
      <Modal show={activeVideo} video={video} onClose={() => setVideo(null)} />
    </Player>
  );
}
