import Link from "next/link";
import CustomButton from "../ui/custom-button/custom_button";
import PageHead from "../ui/page-head/page_head";
import styles from "./journals-list.module.scss";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import TableSkeleton from "../ui/table-skeleton/table-skelton";
import CreateJournal from "../create-journal/create-journal";
import Journal from "../journal/journal";
// import { Trash, PencilSquare } from "react-bootstrap-icons";

const JournalRow = (props) => {
  const { journal, idx,setjournalData } = props;
  const date = new Date(journal?.date);
  const [showJournal, setShowJournal] = useState(false);

  return (
    <>
      <tr
        onClick={() => {
          setShowJournal(true);
        }}
        className={styles.journal_row}
      >
        <td>{idx + 1}</td>
        <td>{`${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`}</td>
        <td>
          {/* <Link href={`/journal/${journal?._id}`}> */}
          {journal?.title}

          {/* </Link> */}
        </td>
      </tr>
      {showJournal && (
        <Journal journal={journal} setShowJournal={setShowJournal} setjournalData={setjournalData} />
      )}
    </>
  );
};

const JournalsList = (props) => {
  const { category } = props;
  const [journalData, setjournalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/journalData?category=${category?.toLowerCase()}`)
      .then((res) => {
        setjournalData(res.data || []);
      })
      .then(() => setIsLoading(false))
      .catch(() => {
        setjournalData([]);
        setIsLoading(false);
      });
  }, [category, showCreate]);

  console.log(journalData);

  return (
    <div className={styles.journals_list}>
      <Link href={"/"}>
        <CustomButton>Home</CustomButton>
      </Link>
      {showCreate ? (
        <PageHead>Create {`${category}`}</PageHead>
      ) : (
        <PageHead>Our {`${category}s`}</PageHead>
      )}

      {showCreate ? (
        <CreateJournal
          category={category.toLowerCase()}
          setShowCreate={setShowCreate}
        />
      ) : (
        <>
          {isLoading && <TableSkeleton />}

          {journalData[0] && !isLoading && (
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
                {journalData
                  ?.sort(function (a, b) {
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(b?.createdAt) - new Date(a?.createdAt);
                  })
                  .map((journal, idx) => {
                    return (
                      <JournalRow
                        key={journal._id}
                        journal={journal}
                        idx={idx}
                        setjournalData={setjournalData}
                      />
                    );
                  })}
              </tbody>
            </Table>
          )}
        </>
      )}
      <CustomButton
        clickHandler={() => {
          setShowCreate(!showCreate);
        }}
      >
        {showCreate ? "Back" : `Create a ${category}`}
      </CustomButton>
    </div>
  );
};

export default JournalsList;
