import CustomButton from "../ui/custom-button/custom_button";
import styles from "./journals_page.module.scss";
import { Table } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";

const JournalsPage1 = () => {
  return (
    <div className={styles.journals_page}>
      <Table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>20.06.23</td>
            <td>We met after a long time </td>
            <td>
              <Trash className={styles.icon_trash}/>
              &nbsp; &nbsp;
              <PencilSquare className={styles.icon_edit}/>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>20.06.23</td>
            <td>We met after a long time </td>
            <td>
              <Trash className={styles.icon_trash}/>
              &nbsp; &nbsp;
              <PencilSquare className={styles.icon_edit}/>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>20.06.23</td>
            <td>We met after a long time </td>
            <td>
              <Trash className={styles.icon_trash}/>
              &nbsp; &nbsp;
              <PencilSquare className={styles.icon_edit}/>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>20.06.23</td>
            <td>We met after a long time </td>
            <td>
              <Trash className={styles.icon_trash}/>
              &nbsp; &nbsp;
              <PencilSquare className={styles.icon_edit}/>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>20.06.23</td>
            <td>We met after a long time </td>
            <td>
              <Trash className={styles.icon_trash}/>
              &nbsp; &nbsp;
              <PencilSquare className={styles.icon_edit}/>
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>20.06.23</td>
            <td>We met after a long time </td>
            <td>
              <Trash className={styles.icon_trash}/>
              &nbsp; &nbsp;
              <PencilSquare className={styles.icon_edit}/>
            </td>
          </tr>
        </tbody>
      </Table>
      <CustomButton>Create a Journal</CustomButton>
    </div>
  );
};

export default JournalsPage1;
