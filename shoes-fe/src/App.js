import { CustomHeader, ShopContent } from "./components";
import { ProviderTable } from '@table_context';

function App() {
  return (
    <div className="App">
      <CustomHeader />
      <ProviderTable>
        <ShopContent />
      </ProviderTable>

    </div>
  );
}

export default App;
