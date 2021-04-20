import { Title } from "@shared/ui";
import { getPkgName } from "@shared/utils";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Title label="Hello" />
      {getPkgName()}
    </div>
  );
}

export default App;
