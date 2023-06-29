import './App.css';
import Main from './components/Main';

import { DynamicContextProvider} from '@dynamic-labs/sdk-react';

function App() {
  return (
    <div className="App">
     <DynamicContextProvider
     settings={{
       environmentId: 'dca95954-81d8-4ef8-b20f-b1c3b6781cb6'
    }}>
      <Main />
  </DynamicContextProvider>
    </div>
  );
}

export default App;
