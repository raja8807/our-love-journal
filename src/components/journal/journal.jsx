import axios from "axios";
import CustomButton from "../ui/custom-button/custom_button";
import styles from "./journal.module.scss";
import { Image } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";

const Journal = (props) => {
  const { journal, setShowJournal, setjournalData } = props;

  const deleteJournal = async () => {
    if (confirm("sure to delete?")) {
      axios
        .delete(`/api/journalData?_id=${journal?._id}`)
        .then((res) => {
          alert("Deleted");
          setjournalData((old) => {
            return old.filter((j) => j._id !== journal._id);
          });
          setShowJournal(false);
        })
        .catch((err) => alert(err));
    }
  };

  const ImagePreview = (props) => {
    const { imageSrc } = props;
    const [showFullScreen, setFullScreen] = useState(false);

    return !showFullScreen ? (
      <Image
        alt="xx"
        src={imageSrc}
        width={"40%"}
        style={{ margin: "10px" }}
        onClick={() => {
          setFullScreen(true);
        }}
      />
    ) : (
      <div className={styles.image_fullScreen}>
        <Image alt="xx" src={imageSrc} width={"100%"} />
        <CustomButton
          clickHandler={() => {
            setFullScreen(false);
          }}
        >
          Back
        </CustomButton>
      </div>
    );
  };

  return (
    <div className={styles.journal}>
      <div>
        <p>Date : {journal?.date}</p>
        <br />
        <p>Title : {journal?.title}</p>
        <br />
        <p>Description :</p>
        <p>{journal?.description}</p>
        <br />
        {journal.images?.length > 0 && <p>Images</p>}
        {journal.images?.map((imageSrc, _idx) => {
          return (
            <ImagePreview key={_idx} imageSrc={imageSrc} />
            // <Link key={_idx} href={imageSrc}>
            //   <Image
            //     alt="xx"
            //     src={imageSrc}
            //     width={"40%"}
            //     style={{ margin: "10px" }}
            //   />
            // </Link>
          );
        })}
      </div>
      <div className={styles.btns}>
        <CustomButton
          clickHandler={() => {
            setShowJournal(false);
          }}
        >
          Back
        </CustomButton>
        <CustomButton
          clickHandler={() => {
            deleteJournal();
          }}
        >
          Delete
        </CustomButton>
      </div>
    </div>
  );
};

export default Journal;
