import { CustomHeader, ShopContent } from "./components";
import { ProviderTable } from "~table_context";
import styles from "~GlobalStyle/global.module.scss";
import "~GlobalStyle/global.css";
import { ItemsProvider } from "~items_context";
import FormLogin from "./components/Content/HeThong/DangNhap/FormLogin";
import Modal from "./components/Content/HeThong/DangNhap/Modal";
import { useUserContext } from "~user";

function App() {
  const [stateUser, dispatchUser] = useUserContext();
  const visible = stateUser.isLogin;
  return (
    <div className="App">
      {visible && (
        <Modal title="Đăng Nhập">
          <FormLogin />
        </Modal>
      )}
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
