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




import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Lazy load components
const LoginPage = lazy(() => import('./pages/LoginPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const RoomPage = lazy(() => import('./pages/RoomPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

// Mock authentication check
const isAuthenticated = true; // Replace with actual auth logic

// Private Route wrapper
const PrivateRoute = ({ element }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

// Layout Component
const MainLayout = ({ children }) => (
  <div>
    <header>
      <nav>
        {/* Add navigation links */}
        <a href="/home">Home</a>
        <a href="/room/1">Room</a>
      </nav>
    </header>
    <main>{children}</main>
    <footer>
      <p>© 2025 My App. All rights reserved.</p>
    </footer>
  </div>
);

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/room/:roomid" element={<PrivateRoute element={<RoomPage />} />} />
              <Route path="*" element={<NotFoundPage />} /> {/* Handles undefined routes */}
            </Routes>
          </MainLayout>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
