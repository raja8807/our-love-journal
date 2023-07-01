import Link from "next/link";
import CustomButton from "../ui/custom-button/custom_button";
import PageHead from "../ui/page-head/page_head";
import styles from "./meets.module.scss";
import { Table } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
// import { Trash, PencilSquare } from "react-bootstrap-icons";

const MeetsPage = () => {
  const [meetssData, setFMeetssData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useState(() => {
    setIsLoading(true);
    axios
      .get("/api/meets")
      .then((res) => {
        setFMeetssData(res.data || []);
      })
      .catch(() => setFMeetssData([]));
    setIsLoading(false);
  }, []);

  return (
    <div className={styles.fights_page}>
      <Link href={"/"}>
        <CustomButton>Home</CustomButton>
      </Link>

      <PageHead>Our Fights</PageHead>
      {isLoading && <p>Loading..</p>}
      {meetssData[0] && (
        <Table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Title</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {meetssData.map((meet, idx) => {
              return (
                <tr key={meet._id}>
                  <td>{idx + 1}</td>
                  <td>{new Date(meet?.date)?.toDateString()}</td>
                  <td>{meet?.title} </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <CustomButton>Create a Meet</CustomButton>
    </div>
  );
};

export default MeetsPage;
