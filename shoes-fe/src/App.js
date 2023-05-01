import { CustomHeader, ShopContent } from "./components";
import { ProviderTable } from "~table_context";
import styles from "~GlobalStyle/global.module.scss";
import "~GlobalStyle/global.css";

function App() {
  return (
    <div className="App">
      <header className={styles.area_header}>
        <CustomHeader />
      </header>
      <ProviderTable>
        <section className={styles.area_body}>
          <ShopContent />
        </section>
      </ProviderTable>
    </div>
  );
}

export default App;
