import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layThongLichChieuPhimApiAction } from '../../Redux/Actions/QuanLyPhimActions';
import moment from 'moment'
import { USER_LOGIN } from '../../Util/Config';
export default function ThongTinLichChieu(props) {
    const dispatch = useDispatch();
    useEffect(async () => {
        dispatch(await layThongLichChieuPhimApiAction(props.maPhim))
    }, [])
    const thongTinLichChieu = useSelector(state => state.QuanLyPhimReducer.thongTinLichChieu)
    console.log('thongTinLichChieu', thongTinLichChieu);
    const [maHeThongRap, setMaHeThongRap] = useState();
    const layMaHeThongRap = (ma) => {
        setMaHeThongRap(ma);
    };
    console.log(maHeThongRap);
    return (
        <div className='showtimesInformation' id='showTime'>
            <div className='myContainer'>
                <nav className='showtimesInformation__title'>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-1" role="tab" aria-controls="nav-home" aria-selected="true">Lịch chiếu</a>
                        <a className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-2" role="tab" aria-controls="nav-profile" aria-selected="false">Thông tin</a>
                    </div>
                </nav>
                <div className="tab-content showtimesInformation__content" id="nav-tabContent">
                    <div className="tab-pane fade show active showTime" id="nav-1" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className='row'>
                            <div className="col-3 nav flex-column nav-pills  showtimesInformation__logo" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                {thongTinLichChieu.heThongRapChieu?.map((heThongRap, index) => {
                                    let active = index === 0 ? 'active' : '';
                                    let maHeThongRap = heThongRap.maHeThongRap
                                    return <a key={index} className={'nav-link  logo__item ' + active} id="v-pills-home-tab" data-bs-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={() => { layMaHeThongRap(maHeThongRap) }}>
                                        <img src={heThongRap.logo} alt={heThongRap.logo} />
                                    </a>
                                })}
                            </div>
                            <div className='col-9 showtimesInformation__showTimes'>
                                {thongTinLichChieu.heThongRapChieu?.map((heThongRap, index) => {
                                    if (heThongRap.maHeThongRap === maHeThongRap) {
                                        return <div className='showTimes__allCinema' key={index}>
                                            {heThongRap.cumRapChieu?.map((cumRap, index) => {
                                                return <div className='showTimes__cinema' key={index}>
                                                    <div className='showTimes__cinema-top'>
                                                        <img src='https://s3img.vcdn.vn/123phim/2018/09/bhd-star-vincom-quang-trung-15379536724871.jpg' />
                                                        <div>
                                                            <span className='nameCinema'>{cumRap.tenCumRap}</span>
                                                            <br />
                                                            <span className='point'>116 phút - TIX 8.6 - IMDb 0</span>
                                                        </div>
                                                    </div>
                                                    <div className='showTimes__cinema-bottom'>
                                                        <p className='digital'>2D Digital</p>
                                                        {cumRap.lichChieuPhim?.slice(0, 5).map((lichChieu, index) => {
                                                            // return <a key={index} href='#' className='times'>
                                                            //     <span className='time__start'>{moment(lichChieu.ngayChieuGioChieu).format('hh:mm')}</span> ~
                                                            //     <span className='time__end'> {moment(lichChieu.ngayChieuGioChieu).format('hh:mm')}</span>
                                                            // </a>
                                                            return <button className='times' key={index} onClick={async () => {
                                                                if (localStorage.getItem(USER_LOGIN)) {
                                                                    props.push.push('/chitietphongve/' + lichChieu.maLichChieu)
                                                                } else {
                                                                    props.push.push('/dangnhap')
                                                                }
                                                            }}>
                                                                <span className='time__start'>{moment(lichChieu.ngayChieuGioChieu).format('hh:mm')}</span> ~
                                                                  <span className='time__end'> {moment(lichChieu.ngayChieuGioChieu).format('hh:mm')}</span>
                                                            </button>
                                                        })}
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade infomation" id="nav-2" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <div className='row infomation__content'>
                            <div className='col-6 infomation__content-left'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <span className='title'>Ngày công chiếu</span>
                                    </div>
                                    <div className='col-6'>
                                        <span className='content'>{moment(thongTinLichChieu.ngayKhoiChieu).format('MM-DD-YYYY')}</span>
                                    </div>
                                </div>
                                {/* ------------- */}
                                <div className='row'>
                                    <div className='col-6'>
                                        <span className='title'>Đạo diễn</span>
                                    </div>
                                    <div className='col-6'>
                                        <span className='content'>CyberSoft</span>
                                    </div>
                                </div>
                                {/* ------------- */}
                                <div className='row'>
                                    <div className='col-6'>
                                        <span className='title'>Diễn viên</span>
                                    </div>
                                    <div className='col-6'>
                                        <span className='content'>Lư Nguyễn Thành Trung</span>
                                    </div>
                                </div>
                                {/* ------------- */}
                                <div className='row'>
                                    <div className='col-6'>
                                        <span className='title'>Thể loại</span>
                                    </div>
                                    <div className='col-6'>
                                        <span className='content'>Đồ án</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 infomation__content-right'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <span className='title'>Nội dung</span>
                                    </div>
                                    <div className='col-12'>
                                        <span className='content'>{thongTinLichChieu.moTa}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
