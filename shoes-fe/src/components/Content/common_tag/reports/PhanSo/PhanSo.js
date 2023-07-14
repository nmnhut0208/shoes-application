import { useMemo } from "react";
import styles from "./PhanSo.module.scss";

const PhanSo = ({ tuso, mauso, fontSize }) => {
  const line_between = useMemo(() => {
    if (tuso === "") return "";
    else return "/";
  }, []);

  const color = useMemo(() => {
    if (tuso === "") return "white";
    else return "black";
  }, []);

  return (
    <div className={styles.fraction}>
      <span className={styles.fup} style={{ fontSize: fontSize }}>
        {tuso}
      </span>
      {line_between !== "" && (
        <span className={styles.bar} style={{ fontSize: fontSize }}>
          {line_between}
        </span>
      )}
      <span
        className={styles.fdn}
        style={{ fontSize: fontSize, "border-top": `thin solid ${color}` }}
      >
        {mauso}
      </span>
    </div>
  );
};

export default PhanSo;
