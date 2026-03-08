import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Authentication from './components/pageComponents/Authentication';
import Home from './components/pageComponents/Home';
import { Protected, Public } from './components/common/ProtectedComponent';



function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route element={<Protected />} >
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<Public />} >
          <Route path="/login" element={<Authentication />} />
          <Route path="/register" element={<Authentication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
