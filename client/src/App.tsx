import { BrowserRouter, Routes, Route } from 'react-router-dom'; // para poder rutear
import MainView from "./components/MainView";


export interface IAppProps { }

const App: React.FunctionComponent<IAppProps> = (props) => {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
