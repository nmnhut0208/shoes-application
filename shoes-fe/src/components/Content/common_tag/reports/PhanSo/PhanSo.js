import clsx from "clsx";
import styles from "./PhanSo.module.scss";

const PhanSo = ({ tuso, mauso, fontSize }) => {
  return (
    <table style={{ border: "none" }}>
      <tbody>
        <tr>
          <td
            className={clsx(styles.phan_so, styles.tu_so)}
            style={{ fontSize: fontSize }}
          >
            {tuso}
          </td>
        </tr>
        <tr>
          <td className={styles.phan_so} style={{ fontSize: fontSize }}>
            {mauso}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PhanSo;
