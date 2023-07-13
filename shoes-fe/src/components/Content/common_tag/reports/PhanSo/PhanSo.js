import styles from "./PhanSo.module.scss";

const PhanSo = ({ tuso, mauso, fontSize }) => {
  return (
    <div className={styles.fraction}>
      <span className={styles.fup} style={{ fontSize: fontSize }}>
        {tuso}
      </span>
      <span className={styles.bar} style={{ fontSize: fontSize }}>
        /
      </span>
      <span className={styles.fdn} style={{ fontSize: fontSize }}>
        {mauso}
      </span>
    </div>
  );
};

export default PhanSo;
