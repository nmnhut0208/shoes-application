import clsx from "clsx";
import styles from "./InTongHop.module.scss";

const PhanSo = ({ tuso, mauso }) => {
  return (
    <table style={{ border: "none" }}>
      <tbody>
        <tr>
          <td className={clsx(styles.phan_so, styles.tu_so)}>{tuso}</td>
        </tr>
        <tr>
          <td className={styles.phan_so}>{mauso}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default PhanSo;
