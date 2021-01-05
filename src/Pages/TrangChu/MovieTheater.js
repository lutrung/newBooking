import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layHeThongCumRapApiAction, layHeThongRapApiAction, layLichChieuHTRApiAction } from '../../Redux/Actions/QuanLyPhimActions';
import moment from 'moment'

export default function MovieTheater() {
    const dispatch = useDispatch();
    // API HE THONG RAP (Binding logo)
    useEffect(async () => {
        dispatch(await layHeThongRapApiAction())
    }, [])
    const heThongRap = useSelector(state => state.QuanLyPhimReducer.heThongRap)
    // API HE THONG CUM RAP (Binding hệ thống cụm rạp)
    const [maHeThongRap, setMaHeThongRap] = useState("BHDStar");
    const layMaHeThongRap = (ma) => {
        setMaHeThongRap(ma);
    };
    console.log('maHeThongRap', maHeThongRap);
    useEffect(async () => {
        dispatch(await layHeThongCumRapApiAction(maHeThongRap))
    }, [maHeThongRap])
    const cumRap = useSelector(state => state.QuanLyPhimReducer.cumRap)
    console.log('cumRap', cumRap);
    // API THONG TIN LICH CHIEU (Binding phim & suat chieu)
    const [maCumRap, setMaCumRap] = useState('bhd-star-cineplex-3-2');
    const layMaCumRap = (maCR) => {
        setMaCumRap(maCR);
    };
    useEffect(async () => {
        dispatch(await layLichChieuHTRApiAction(maHeThongRap))
    }, [maHeThongRap])
    const lichChieuHTR = useSelector(state => state.QuanLyPhimReducer.lichChieuHTR)



    return (
        <div className='movieTheater' id='movieTheater'>
            <div className="movieTheater__backGround" style={{ background: 'url("/img/bg.png") center center / cover', paddingTop: '10%' }}> </div>
            <div className='row movieTheater__container'>
                {/* DANH SÁCH RẠP */}
                <div className="col-xs-12 col-sm-12 col-md-1 nav flex-column nav-pills  movieTheater__logo" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    {heThongRap?.map((rap, index) => {
                        let active = index === 0 ? 'active' : '';
                        let maHTR = rap.maHeThongRap
                        return <a key={index} onClick={() => {
                            layMaHeThongRap(maHTR);
                        }} className={'nav-link  logo__item ' + active} id="v-pills-home-tab" data-bs-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                            <img src={rap.logo} alt={rap.logo} />
                        </a>
                    })}
                </div>
                {/* DANH SÁCH CỤM RẠP */}
                <div className="col-xs-6 col-sm-6 col-md-3 nav flex-column nav-pills movieTheater__cinema" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    {cumRap?.map((chiNhanh, index) => {
                        let active = index === 0 ? 'active' : '';
                        let maCR = chiNhanh.maCumRap
                        return <a key={index} onClick={() => {
                            layMaCumRap(maCR);
                        }} className={'nav-link cinema__item ' + active} id="v-pills-home-tab" data-bs-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                            <div className='cinema__item-content'>
                                <div className='cinema__item-img'>
                                    <img src='https://s3img.vcdn.vn/123phim/2018/09/bhd-star-vincom-quang-trung-15379536724871.jpg' alt='...' />
                                </div>
                                <div className='cinema__item-info'>
                                    <div className='info__branch'>
                                        <p title={chiNhanh.tenCumRap}>{chiNhanh.tenCumRap}</p>
                                    </div>
                                    <div className='info__address'>
                                        <p title={chiNhanh.diaChi}>{chiNhanh.diaChi}</p>
                                    </div>
                                    <div className='info__detail'>
                                        [Chi tiết]
                                        </div>
                                </div>
                            </div>
                        </a>
                    })}
                </div>
                {/* DANH SÁCH PHIM */}
                <div className='col-xs-6 col-sm-6 col-md-8 movieTheater__showTimes'>
                    {lichChieuHTR.map((lichChieu, index) => {
                        return <Fragment key={index}>
                            {lichChieu.lstCumRap?.map((lichTheoRap, index) => {
                                if (lichTheoRap.maCumRap === maCumRap) {
                                    return <Fragment key={index}>
                                        {lichTheoRap.danhSachPhim?.slice(0, 10).map((danhSachPhim, index) => {
                                            return <div key={index} className='movieTheater__showTimes-item'>
                                                <div className='phim d-flex item__top'>
                                                    <img src={danhSachPhim.hinhAnh} alt='...' style={{ width: '50px' }} />
                                                    <div className='item__top-info'>
                                                        <p className='info__name'><span>C13</span> - {danhSachPhim.tenPhim}</p>
                                                        <span>116 phút - TIX 8.6 - IMDb 0</span>
                                                    </div>
                                                </div>
                                                <div className='lichChieu item__bottom'>
                                                    <p className='digital'>2D Digital</p>
                                                    {danhSachPhim.lstLichChieuTheoPhim?.slice(0, 7).map((suatChieu, index) => {
                                                        return <a key={index} href='#' className='item__bottom-time'>
                                                            <span className='time__start'>{moment(suatChieu.ngayChieuGioChieu).format('hh:mm')}</span> ~
                                                                <span className='time__end'> {moment(suatChieu.ngayChieuGioChieu).format('hh:mm')}</span>
                                                        </a>
                                                    })}
                                                </div>
                                            </div>
                                        })}
                                    </Fragment>
                                }
                            })}
                        </Fragment>
                    })}
                </div>
            </div>
        </div >
    )
}


// import React, { Fragment, useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { layHeThongCumRapApiAction, layHeThongRapApiAction, layLichChieuHTRApiAction } from '../../Redux/Actions/QuanLyPhimActions';
// import moment from 'moment'

// export default function MovieTheater() {
//     const dispatch = useDispatch();
//     // API HE THONG RAP (Binding logo)
//     useEffect(async () => {
//         dispatch(await layHeThongRapApiAction())
//     }, [])
//     const heThongRap = useSelector(state => state.QuanLyPhimReducer.heThongRap)
//     // API HE THONG CUM RAP (Binding hệ thống cụm rạp)
//     const [maHeThongRap, setMaHeThongRap] = useState("BHDStar");
//     const layMaHeThongRap = (ma) => {
//         setMaHeThongRap(ma);
//     };
//     console.log('maHeThongRap', maHeThongRap);
//     useEffect(async () => {
//         dispatch(await layHeThongCumRapApiAction(maHeThongRap))
//     }, [maHeThongRap])
//     const cumRap = useSelector(state => state.QuanLyPhimReducer.cumRap)
//     console.log('cumRap', cumRap);
//     // API THONG TIN LICH CHIEU (Binding phim & suat chieu)
//     const [maCumRap, setMaCumRap] = useState('bhd-star-cineplex-3-2');
//     const layMaCumRap = (maCR) => {
//         setMaCumRap(maCR);
//     };
//     useEffect(async () => {
//         dispatch(await layLichChieuHTRApiAction(maHeThongRap))
//     }, [maHeThongRap])
//     const lichChieuHTR = useSelector(state => state.QuanLyPhimReducer.lichChieuHTR)



//     return (
//         <div className='movieTheater' id='movieTheater'>
//             <div className="movieTheater__backGround" style={{ background: 'url("/img/bg.png") center center / cover', paddingTop: '10%' }}> </div>
//             <div className='movieTheater__container'>
//                 <div className="d-flex align-items-start">
//                     {/* DANH SÁCH RẠP */}
//                     <div className="nav flex-column nav-pills  movieTheater__logo" id="v-pills-tab" role="tablist" aria-orientation="vertical">
//                         {heThongRap?.map((rap, index) => {
//                             let active = index === 0 ? 'active' : '';
//                             let maHTR = rap.maHeThongRap
//                             return <a key={index} onClick={() => {
//                                 layMaHeThongRap(maHTR);
//                             }} className={'nav-link  logo__item ' + active} id="v-pills-home-tab" data-bs-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
//                                 <img src={rap.logo} alt={rap.logo} />
//                             </a>
//                         })}
//                     </div>
//                     {/* DANH SÁCH CỤM RẠP */}
//                     <div className="nav flex-column nav-pills movieTheater__cinema" id="v-pills-tab" role="tablist" aria-orientation="vertical">
//                         {cumRap?.map((chiNhanh, index) => {
//                             let active = index === 0 ? 'active' : '';
//                             let maCR = chiNhanh.maCumRap
//                             return <a key={index} onClick={() => {
//                                 layMaCumRap(maCR);
//                             }} className={'nav-link cinema__item ' + active} id="v-pills-home-tab" data-bs-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
//                                 <div className='cinema__item-content'>
//                                     <div className='cinema__item-img'>
//                                         <img src='https://s3img.vcdn.vn/123phim/2018/09/bhd-star-vincom-quang-trung-15379536724871.jpg' alt='...' />
//                                     </div>
//                                     <div className='cinema__item-info'>
//                                         <div className='info__branch'>
//                                             <p title={chiNhanh.tenCumRap}>{chiNhanh.tenCumRap}</p>
//                                         </div>
//                                         <div className='info__address'>
//                                             <p title={chiNhanh.diaChi}>{chiNhanh.diaChi}</p>
//                                         </div>
//                                         <div className='info__detail'>
//                                             [Chi tiết]
//                                         </div>
//                                     </div>
//                                 </div>
//                             </a>
//                         })}
//                     </div>
//                     {/* DANH SÁCH PHIM */}
//                     <div className='movieTheater__showTimes'>
//                         {lichChieuHTR.map((lichChieu, index) => {
//                             return <Fragment key={index}>
//                                 {lichChieu.lstCumRap?.map((lichTheoRap, index) => {
//                                     if (lichTheoRap.maCumRap === maCumRap) {
//                                         return <Fragment key={index}>
//                                             {lichTheoRap.danhSachPhim?.slice(0, 10).map((danhSachPhim, index) => {
//                                                 return <div key={index} className='movieTheater__showTimes-item'>
//                                                     <div className='phim d-flex item__top'>
//                                                         <img src={danhSachPhim.hinhAnh} alt='...' />
//                                                         <div className='item__top-info'>
//                                                             <p className='info__name'><span>C13</span> - {danhSachPhim.tenPhim}</p>
//                                                             <span>116 phút - TIX 8.6 - IMDb 0</span>
//                                                         </div>
//                                                     </div>
//                                                     <div className='lichChieu item__bottom'>
//                                                         <p className='digital'>2D Digital</p>
//                                                         {danhSachPhim.lstLichChieuTheoPhim?.slice(0, 7).map((suatChieu, index) => {
//                                                             return <a key={index} href='#' className='item__bottom-time'>
//                                                                 <span className='time__start'>{moment(suatChieu.ngayChieuGioChieu).format('hh:mm')}</span> ~
//                                                                 <span className='time__end'> {moment(suatChieu.ngayChieuGioChieu).format('hh:mm')}</span>
//                                                             </a>
//                                                         })}
//                                                     </div>
//                                                 </div>
//                                             })}
//                                         </Fragment>
//                                     }
//                                 })}
//                             </Fragment>
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }

