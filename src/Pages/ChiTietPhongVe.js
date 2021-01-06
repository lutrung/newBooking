import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { datVeApiAction, layThongTinPhongVeApiAction } from '../Redux/Actions/QuanLyPhimActions';
import { DAT_GHE } from '../Redux/Const/QuanLyPhimConst';
import { USER_LOGIN } from '../Util/Config';
export default function ChiTietPhongVe(props) {
    const thongTinPhongVe = useSelector(state => state.QuanLyPhimReducer.thongTinPhongVe)
    const danhSachGheDangDat = useSelector(state => state.QuanLyPhimReducer.danhSachGheDangDat)
    console.log(thongTinPhongVe)
    const dispatch = useDispatch();
    useEffect(async () => {
        // lasy tham so lich chieu tu url
        let maLichChieu = props.match.params.maLichChieu;
        console.log(maLichChieu);
        // goi action ket noi api lay du lieu lich chieu ve
        dispatch(await layThongTinPhongVeApiAction(maLichChieu))
    }, [])

    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        window.onresize = function () {
            setHeight(window.innerHeight);
        }
    }, []);
    // Style nut dat ve
    let tongTien = danhSachGheDangDat.reduce((tongTien, gheDangDat, index) => {
        return tongTien += gheDangDat.giaVe
    }, 0)
    let disable = (tongTien === 0) ? 'disable' : '';
    let cursor = (tongTien === 0) ? 'no-drop' : '';
    let opacity = (tongTien === 0) ? '0.5' : '';
    return (
        <div className='container-fluid chiTietPhongVe'>
            <div className='chiTietPhongVe__content d-flex'>
                <div className=' text-center chiTietPhongVe_manHinh'>
                    {/* hien thi thong tin phong ve */}
                    <div className='thongTin__Rap'>
                        <div className='thongTin__Rap-content '>
                            <img src={thongTinPhongVe.thongTinPhim?.hinhAnh} />
                            <div className='thongTin__Rap-diaChi'>
                                <span className='ten__Rap'>{thongTinPhongVe.thongTinPhim?.tenCumRap}</span>
                                <br />
                                <span className='dia__Chi'>{thongTinPhongVe.thongTinPhim?.diaChi}</span>
                            </div>
                        </div>
                    </div>
                    <div className='manHinh'>
                        <img src='https://tix.vn/app/assets/img/icons/screen.png' />
                    </div>
                    <div className='danhSachGhe'>
                        {thongTinPhongVe.danhSachGhe?.map((ghe, index) => {
                            let classGheVip = ghe.loaiGhe === 'Thuong' ? '' : 'gheVip';
                            let classGheDaDat = ghe.daDat ? 'gheDaDat' : '';
                            let disable = ghe.daDat ? 'disable' : '';
                            let noiDungBtn = ghe.daDat ? 'X' : ghe.stt;
                            let indexGheDangDat = danhSachGheDangDat.findIndex(gheDangDat => ghe.maGhe === gheDangDat.maGhe)
                            let classGheDangDat = indexGheDangDat !== -1 ? 'gheDangDat' : '';
                            return <Fragment key={index}>
                                <button onClick={() => {
                                    dispatch({
                                        type: DAT_GHE,
                                        gheDangDat: {
                                            maGhe: ghe.maGhe,
                                            giaVe: ghe.giaVe,
                                            stt: ghe.stt
                                        }
                                    })
                                }} disabled={`${disable}`} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat}`}>{noiDungBtn}</button>
                                {(index + 1) % 16 === 0 ? <br /> : ''}
                            </Fragment>
                        })}
                    </div>
                    {/* <img src={"./img/loaiGhe.jpg"} alt='./img/loaiGhe.jpg' /> */}
                    <div className='loaiGhe'>
                        <div className='loaiGhe__item'>
                            <span className='ghe'></span>
                            <span>Ghế thường</span>
                        </div>
                        <div className='loaiGhe__item'>
                            <span className='ghe gheVip'></span>
                            <span>Ghế VIP</span>
                        </div>
                        <div className='loaiGhe__item'>
                            <span className='ghe gheDaDat'>X</span>
                            <span>Ghế đã được đặt</span>
                        </div>
                        <div className='loaiGhe__item'>
                            <span className='ghe gheDangDat'></span>
                            <span>Ghế đang chọn</span>
                        </div>
                    </div>
                </div>
                <div className=' chiTietPhongVe_thongTin' style={{ height }}>
                    <div className='thongTin_tongTien'>{danhSachGheDangDat.reduce((tongTien, gheDangDat, index) => {
                        return tongTien += gheDangDat.giaVe
                    }, 0).toLocaleString()} VND
                    </div>
                    <hr />
                    <div className='d-flex' style={{ margin: 0 }}>
                        <div style={{ width: '30%', marginRight: '10px' }}>
                            <img src={thongTinPhongVe.thongTinPhim?.hinhAnh} style={{ width: "100%" }} alt='' />
                        </div>
                        <div style={{ width: '70%' }}>
                            <h1>{thongTinPhongVe.thongTinPhim?.tenPhim}</h1>
                            <h5>{thongTinPhongVe.thongTinPhim?.tenCumRap} - {thongTinPhongVe.thongTinPhim?.tenRap}</h5>
                            <p>{thongTinPhongVe.thongTinPhim?.ngayChieu} - {thongTinPhongVe.thongTinPhim?.gioChieu}</p>
                        </div>
                    </div>
                    <hr />
                    <div className='thongTin_ghe'>
                        <div className='viTriGhe'>Ghế: {danhSachGheDangDat?.map((gheDangDat, index) => {
                            return <span key={index}>{gheDangDat.stt}, </span>
                        })}
                        </div>
                        <div className='tienGhe'>
                            {danhSachGheDangDat.reduce((tongTien, gheDangDat, index) => {
                                return tongTien += gheDangDat.giaVe
                            }, 0).toLocaleString()} đ
                        </div>
                    </div>
                    <hr />
                    <button style={{ cursor: `${cursor}`, opacity: `${opacity}` }} disabled={`${disable}`} className='btn_datVe' onClick={async () => {
                        if (localStorage.getItem(USER_LOGIN)) {
                            let user = JSON.parse(localStorage.getItem(USER_LOGIN))
                            let objectDatVe = {
                                'maLichChieu': props.match.params.maLichChieu,
                                'danhSachVe': danhSachGheDangDat,
                                'taiKhoanNguoiDung': user.taiKhoan
                            }
                            dispatch(await datVeApiAction(objectDatVe))
                        } else {
                            props.history.push('/dangnhap')
                        }
                    }}>Đặt vé</button>
                </div>
            </div>
        </div>
    )
}
