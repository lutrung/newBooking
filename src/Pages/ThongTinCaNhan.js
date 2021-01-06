import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { lichSuDatVeApiAction } from '../Redux/Actions/QuanLyNguoiDungActions';
import moment from 'moment'
export default function ThongTinCaNhan(props) {
    const userLogin = useSelector(state => state.QuanLyNguoiDungReducer.userLogin);
    const accountLogin = useSelector(state => state.QuanLyNguoiDungReducer.accountLogin);
    const bookingHistory = useSelector(state => state.QuanLyNguoiDungReducer.bookingHistory);
    console.log(bookingHistory);
    const dispatch = useDispatch();
    useEffect(async () => {
        dispatch(await lichSuDatVeApiAction(accountLogin.taiKhoan))
    }, [])
    return (
        <div className='personalInfomation' style={{ backgroundImage: "url('./img/bgGalaxy.jpg')" }} >
            <div className='personalInfomation__banner'>
                <img src="/img/bgPersonal.jpg" alt='/img/bgPersonal.jpg' />
            </div>
            <div className='personalInfomation__container'>
                <nav className='infomation__title'>
                    <div className="nav nav-tabs personal__title" id="nav-tab" role="tablist">
                        <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#personal-info" role="tab" aria-controls="nav-home" aria-selected="true">THÔNG TIN CÁ NHÂN</a>
                        <a className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#history-booking" role="tab" aria-controls="nav-profile" aria-selected="false">LỊCH SỬ ĐẶT VÉ</a>
                    </div>
                </nav>
                <div className="tab-content infomation__content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="personal-info" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className='personal__information'>
                            <div className='row personal_information-account'>
                                <div className='col-6 account__left'>
                                    <p>Email: <span>{userLogin.email}</span></p>
                                    <p>Họ tên: <span>{userLogin.hoTen}</span></p>
                                    <p>Số điện: <span>{userLogin.soDT}</span></p>
                                </div>
                                <div className='col-6 account__right'>
                                    <p>Tài khoản: <span>{accountLogin.taiKhoan}</span></p>
                                    <p>Mật khẩu: <span>{accountLogin.matKhau}</span></p>
                                    <a href=''>Cập nhật</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="history-booking" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <div className='history__booking'>
                            {bookingHistory.thongTinDatVe?.map((thongTinVe, index) => {
                                return <Fragment key={index}>
                                    <div className='history__booking-content'>
                                        <div className='history_booking-left '>
                                            <img src='https:/picsum.photos/200/250' alt='...' />
                                        </div>
                                        <div className='history_booking-right'>
                                            {thongTinVe.danhSachGhe?.slice(0, 1).map((thongTinGhe, index) => {
                                                return <Fragment key={index}>
                                                    <div className='right__ticket'>
                                                        <div className='right__ticket-logo'>
                                                            <img src='https://image.freepik.com/free-vector/retro-cinema-background_52683-1701.jpg' alt='' />
                                                        </div>
                                                        <div className='right__ticket-info'>
                                                            <h2 className='info__nameCinema'>{thongTinGhe.tenHeThongRap}</h2>
                                                            <p>Tên phim:
                                                                <span className='info__nameMovie'> {thongTinVe.tenPhim}</span>
                                                            </p>
                                                            <p>Vị trí:
                                                                <span className='info__cinemaNumber'> {thongTinGhe.tenRap}- Ghế </span>
                                                                <span className='info__chair'>{thongTinGhe.tenGhe}</span>
                                                            </p>
                                                            <p>Ngày đặt:
                                                                <span className='info__day'>{moment(thongTinVe.ngayDat).format('dddd, MMMM Do YYYY, h:mm A')}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            })}
                                        </div>
                                    </div>
                                </Fragment>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}