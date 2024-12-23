import { useState, useEffect } from 'react'; // Import state và effect
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar';
import ChiNhanhInfo from './pages/chinhanhInfo';
import DuAnInfo from './pages/DuAnInfo';
import NhanVienInfo from './pages/NhanVienInfo';
import PhongBanInfo from './pages/PhongBanInfo';
import ChiNhanhInsert from './pages/ChiNhanhInsert';
import NhanVienInsert from './pages/NhanVienInsert';
import NhanVienEdit from './pages/NhanVienEdit';
import TinhLuong from './pages/tinhLuong';
import PhongBanInsert from './pages/PhongBanInsert';
import { useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PersonalInfo from './pages/PersonalInfo';
import LogoutButton from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  const location = useLocation(); // Get the current route path
  const hideSidebarRoutes = ['/login']; // Add paths where you don't want the sidebar
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className='flex flex-row'>
      {showSidebar && <Sidebar /> }
      <div className='w-full'>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ChiNhanhInfo />} />
            <Route path="/chi-nhanh" element={<ChiNhanhInfo />} />
            <Route path="/phong-ban" element={<PhongBanInfo />} />
            <Route path="/du-an" element={<DuAnInfo />} />
            <Route path="/nhan-vien" element={<NhanVienInfo />} />

            <Route path="/chi-nhanh/insert" element={<ChiNhanhInsert />} />
            <Route path="/phong-ban/insert" element={<PhongBanInsert />} />
            <Route path="/nhan-vien/insert" element={<NhanVienInsert />} />
            <Route path="/nhan-vien/edit/:MaNV" element={<NhanVienEdit />} />

            <Route path="tinh-luong" element={<TinhLuong />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/logout" element={<LogoutButton />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App;
