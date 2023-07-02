import styles from "./Signature.module.scss";
const Signature = ({ fontSize }) => {
  return (
    <div className={styles.end_page}>
      <div>
        <p style={{ fontSize: fontSize }}>
          ....................., Ngày........tháng........năm..........
        </p>
        <p style={{ fontWeight: "bold", fontSize: fontSize }}>Người lập</p>
      </div>
    </div>
  );
};

export default Signature;
