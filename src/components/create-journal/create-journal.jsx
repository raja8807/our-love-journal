import axios from "axios";
import CustomButton from "../ui/custom-button/custom_button";
import styles from "./create-journal.module.scss";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";

const IamgesUploadWidget = ({ category, onSuccess, title }) => {
  useEffect(() => {
    const folderName = title.split(" ").join("-");
    const openWideget = () => {
      window.cloudinary?.openUploadWidget(
        {
          cloudName: "dykxp8srf",
          uploadPreset: "derwkvly",
          sources: ["local,url"],
          folder: `${category}/${folderName}`,
        },
        onSuccess
      );
    };

    window.openCloudinaryWidgetForImages = openWideget;
  }, [category, onSuccess, title]);

  return null;
};

const CreateJournal = (props) => {
  const { category, setShowCreate } = props;

  const [newJournal, setNewJounal] = useState({
    date: "",
    title: "",
    description: "",
    category,
    images: [],
  });

  const createPost = async () => {
    // console.log(newJournal);
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

  // const [image, setIamge] = useState(null);

  const [tempTitle, setTempTitle] = useState({
    title: "",
    fixed: false,
  });

  return (
    <div className={styles.create_journal}>
      <Row>
        <Col xs="9">
          <input
            type="text"
            placeholder="Title"
            value={tempTitle.title}
            onChange={(e) => {
              const { target } = e;
              setTempTitle({ ...tempTitle, title: target.value });
            }}
            disabled={tempTitle.fixed}
          />
        </Col>
        <Col xs="3" style={{ marginTop: "15px" }}>
          <CustomButton
            clickHandler={() => {
              if (tempTitle?.fixed) {
                setTempTitle({
                  title: "",
                  fixed: false,
                });
                setNewJounal({ ...newJournal, title: "" });
              } else {
                setNewJounal({ ...newJournal, title: tempTitle.title });
                setTempTitle({ ...tempTitle, fixed: true });
              }
            }}
            disabled={newJournal?.images?.length > 0}
          >
            {tempTitle?.fixed ? "Clear" : "Fix"}
          </CustomButton>
        </Col>
      </Row>
      <input
        type="date"
        value={newJournal.date}
        onChange={(e) => {
          const { target } = e;
          setNewJounal({ ...newJournal, date: target.value });
        }}
        disabled={!tempTitle.fixed}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => {
          const { target } = e;
          setNewJounal({ ...newJournal, description: target.value });
        }}
        disabled={!tempTitle.fixed}
      />
      {newJournal?.images?.map((image, _idx) => {
        return (
          <Image key={_idx} height={100} width={50} alt="xx" src={image} />
        );
      })}
      <div style={{ display: "flex", gap: "5px" }}>
        <IamgesUploadWidget
          category={category}
          title={newJournal.title}
          onSuccess={(err, res) => {
            if (res.event === "success") {
              const index = newJournal.images?.length;
              setNewJounal((prev) => {
                const images = [...prev.images];
                images[index] = res.info.secure_url;
                return { ...prev, images };
              });
            }
          }}
        />
        <CustomButton
          clickHandler={() => {
            window?.openCloudinaryWidgetForImages();
          }}
          disabled={!tempTitle.fixed}
        >
          Add Iamges
        </CustomButton>
        <CustomButton clickHandler={createPost} disabled={!tempTitle.fixed}>
          Create
        </CustomButton>
      </div>
    </div>
  );
};

export default CreateJournal;
