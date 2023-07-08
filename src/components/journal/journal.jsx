import axios from "axios";
import CustomButton from "../ui/custom-button/custom_button";
import styles from "./journal.module.scss";
import { Image } from "react-bootstrap";
import Link from "next/link";

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

  console.log(journal);

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
        {journal.images.length > 0 && <p>Images</p>}
        {journal.images.map((imageSrc, _idx) => {
          return (
            <Link key={_idx} href={imageSrc}>
              <Image
                alt="xx"
                src={imageSrc}
                width={"45%"}
                style={{ margin: "10px" }}
              />
            </Link>
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
