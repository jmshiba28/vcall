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
import {Routes,Route} from 'react-router-dom'
import Home from './pages/home/home'
import Roompage from './pages/Room/index'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/room/:roomid" element={<Roompage />}></Route>

    </Routes>
   
  );
}

export default App;
