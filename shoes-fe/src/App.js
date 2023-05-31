import { CustomHeader, ShopContent } from "./components";
import { ProviderTable } from "~table_context";
import styles from "~GlobalStyle/global.module.scss";
import "~GlobalStyle/global.css";
import { ItemsProvider } from "~items_context";

function App() {
  return (
    <div className="App">
      <ItemsProvider>
        <header className={styles.area_header}>
          <CustomHeader />
        </header>
        <ProviderTable>
          <section className={styles.area_body}>
            <ShopContent />
          </section>
        </ProviderTable>
      </ItemsProvider>
    </div>
  );
}

export default App;
