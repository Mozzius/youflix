import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import styles from "../styles/Modal.module.scss";

export interface DescriptionProps {
  content: string;
}

const Description: React.FC<DescriptionProps> = ({ content }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [needsExpanding, setNeedsExpanding] = useState(true);
  const [ref, { height }] = useMeasure();

  useEffect(() => {
    setExpanded(false);
  }, [content]);

  useEffect(() => {
    if (!expanded) {
      setNeedsExpanding(height >= 80);
    }
  }, [expanded, height]);

  return (
    <>
      <div
        className={styles.description}
        style={{ height: !needsExpanding || expanded ? "auto" : "100px" }}
      >
        <div ref={ref}>
          {content
            .split("\n")
            .map((x) =>
              x === "" ? (
                <br key={Math.random()} />
              ) : (
                <p key={Math.random()}>{x}</p>
              )
            )}
        </div>

        {!expanded && needsExpanding && <div className={styles.fade} />}
      </div>
      {needsExpanding && (
        <p onClick={() => setExpanded((e) => !e)} className={styles.readMore}>
          {expanded ? "READ LESS" : "READ MORE"}
        </p>
      )}
    </>
  );
};

export default Description;
