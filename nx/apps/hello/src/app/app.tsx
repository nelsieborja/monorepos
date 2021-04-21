import { Title } from '@nx/ui';
import { getPkgName } from '@nx/utils';
import './app.css';

export function App() {
  return (
    <div className="App">
      <Title label="Hello" />
      {getPkgName()}
    </div>
  );
}

export default App;
