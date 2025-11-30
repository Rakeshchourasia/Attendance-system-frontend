import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import VisitorRegistration from './pages/VisitorRegistration';
import Attendance from './pages/Attendance';
import AdminLogin from './pages/AdminLogin';
import EventPass from './pages/EventPass';
import Reports from './pages/Reports';
import QRAttendance from './pages/QRAttendance';


function App() {
  return (
    <Router>
     
      <Routes>
         <Route path="/signin" element={<AdminLogin/>}/>
           <Route
              path="/"
              element={<Layout />}
            >
          <Route index element={<Dashboard />} />
          <Route path="visitor" element={<VisitorRegistration />} />
          <Route path="events" element={<EventPass />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="reports" element={<Reports />} />
          <Route path="qr-attendance" element={<QRAttendance />} /> 
          </Route>
      </Routes>
    </Router>
  );
}

export default App;