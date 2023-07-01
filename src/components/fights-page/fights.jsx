import Link from "next/link";
import CustomButton from "../ui/custom-button/custom_button";
import PageHead from "../ui/page-head/page_head";
import styles from "./fights.module.scss";
import { Table } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
// import { Trash, PencilSquare } from "react-bootstrap-icons";

const FightsPage = () => {
  const [fightsData, setFightsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useState(() => {
    setIsLoading(true);
    axios
      .get("/api/fights")
      .then((res) => {
        setFightsData(res.data || []);
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
      {fightsData[0] && (
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
            {fightsData.map((fight, idx) => {
              return (
                <tr key={fight._id}>
                  <td>{idx + 1}</td>
                  <td>{new Date(fight?.date)?.toDateString()}</td>
                  <td>{fight?.title} </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <CustomButton>Create a Fight</CustomButton>
    </div>
  );
};

export default FightsPage;
