import axios from "axios";
import CustomButton from "../ui/custom-button/custom_button";
import styles from "./create-journal.module.scss";
import { useState } from "react";

const CreateJournal = (props) => {
  const { category, setShowCreate } = props;

  const [newJournal, setNewJounal] = useState({
    date: "",
    title: "",
    description: "",
    category,
  });

  const createPost = async () => {
    if (newJournal.date && newJournal.title && newJournal.description) {
      axios
        .post("/api/journalData", newJournal)
        .then((res) => {
          alert("Created");
          setShowCreate(false);
        })
        .catch((err) => alert(err));
    } else {
      alert("fill all the fields");
    }
  };

  return (
    <div className={styles.create_journal}>
      <input
        type="date"
        value={newJournal.date}
        onChange={(e) => {
          const { target } = e;
          setNewJounal({ ...newJournal, date: target.value });
        }}
      />
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => {
          const { target } = e;
          setNewJounal({ ...newJournal, title: target.value });
        }}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => {
          const { target } = e;
          setNewJounal({ ...newJournal, description: target.value });
        }}
      />
      <CustomButton clickHandler={createPost}>Create</CustomButton>
    </div>
  );
};

export default CreateJournal;
