import { Switch, Route } from 'react-router-dom';
import './App.css';
import style from './css/main.css'
import ChiTietPhim from './Pages/ChiTietPhim/ChiTietPhim';
import ChiTietPhongVe from './Pages/ChiTietPhongVe';
import DangKy from './Pages/DangKy';
import DangNhap from './Pages/DangNhap';
import ThongTinCaNhan from './Pages/ThongTinCaNhan';
import TrangChu from './Pages/TrangChu/TrangChu';
import { HomeTemplate } from './Templates/HomeTemplate';
function App() {
  return (
    <>
      <Switch>
        <HomeTemplate exact path='/' Component={TrangChu} />
        <HomeTemplate exact path='/trangchu' Component={TrangChu} />
        <Route exact path='/dangky' component={DangKy} />
        <Route exact path='/dangnhap' component={DangNhap} />
        <HomeTemplate exact path='/chitietphim/:maPhim' Component={ChiTietPhim} />
        <Route exact path='/thongtincanhan' component={ThongTinCaNhan} />
        <Route exact path='/chitietphongve/:maLichChieu' component={ChiTietPhongVe} />
      </Switch>
    </>
  );
}

export default App;
