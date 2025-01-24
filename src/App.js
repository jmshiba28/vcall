// import {Routes,Route} from 'react-router-dom'
// // import Home from './pages/home/home'
// import Roompage from './pages/Room/index'

// function App() {
//   return (
//     <Roompage/>
//     // <Routes>
//     //   {/* <Route path="/" element={<Home />}></Route> */}
      
//     //   <Route path="/room/1" element={<Roompage/>}></Route>

//     // </Routes>
   
//   );
// }

// export default App;






// import {Routes,Route} from 'react-router-dom'
// import Home from './pages/home/home'
// import Roompage from './pages/Room/index'
// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />}></Route>
//       <Route path="/room/:roomid" element={<Roompage />}></Route>

//     </Routes>
   
//   );
// }

// export default App;





import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';  // Import the NotFoundPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />  {/* This handles undefined routes */}
      </Routes>
    </Router>
  );
}

export default App;
