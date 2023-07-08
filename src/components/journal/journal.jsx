import axios from "axios";
import CustomButton from "../ui/custom-button/custom_button";
import styles from "./journal.module.scss";
import { Button, Image, Modal } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";

const ImagePreview = (props) => {
  const { imageSrc, fileName } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body style={{ padding: "0" }}>
          <Image alt="xx" src={imageSrc} width={"100%"} />
        </Modal.Body>
        <Modal.Footer>
          <Link href={imageSrc} download={fileName} target="_blank">
            Download
          </Link>
          &nbsp; &nbsp;
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Image
        alt="xx"
        src={imageSrc}
        width={"40%"}
        style={{ margin: "10px" }}
        onClick={handleShow}
      />
    </>
  );
};

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
            <ImagePreview
              key={_idx}
              imageSrc={imageSrc}
              fileName={`${journal.title}_${_idx}`}
            />
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
