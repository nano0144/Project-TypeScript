import { BrowserRouter, Routes, Route } from 'react-router-dom'; // para poder rutear
import MainView from "./components/MainView";
import RigthList from "./components/RigthList";


export interface IAppProps { }

const App: React.FunctionComponent<IAppProps> = (props) => {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/list" element={<RigthList />} />          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
