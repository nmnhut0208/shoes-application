import styles from "./Signature.module.scss";
const Signature = () => {
  return (
    <div className={styles.end_page}>
      <div>
        <p>....................., Ngày........tháng........năm..........</p>
        <p style={{ fontWeight: "bold" }}>Người lập</p>
      </div>
    </div>
  );
};

export default Signature;
