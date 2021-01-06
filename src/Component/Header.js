import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2';
export default function Header() {
    const userLogin = useSelector(state => state.QuanLyNguoiDungReducer.userLogin);
    const logOut = () => {
        Swal.fire({
            title: 'Bạn có chắc muốn đăng xuất?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Có',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                window.location.href = '/';
            }
        })
    }
    return (
        <div className='header' id='header'>
            <div className='container-fluid'>
                <div className='header__menu'>
                    <div className='header__menu-logo'>
                        <NavLink to='/'><img className='logo' src='/img/Header/logo.png' /></NavLink>
                    </div>
                    <nav className='nav__pc'>
                        <ul className='header__menu-list'>
                            <li className='list__item'>
                                <a href='#search' className='list__item-link'>Lịch chiếu</a>
                            </li>
                            <li className='list__item'>
                                <a href='#movieTheater' className='list__item-link'>Cụm rạp</a>
                            </li>
                            <li className='list__item'>
                                <a href='#infomation' className='list__item-link'>Tin tức</a>
                            </li>
                            <li className='list__item'>
                                <a href='#application' className='list__item-link'>Ứng dụng</a>
                            </li>
                        </ul>
                    </nav>
                    <div className='header__menu-right'>
                        <label htmlFor='nav-mobile-input' className='header__menu-icon'>
                            <img src='/img/Header/menuicon.png' alt='/img/Header/menuicon.png' className='iconMenu' />
                        </label>
                        <input hidden type='checkbox' className='nav__input' id='nav-mobile-input' />
                        <label htmlFor='nav-mobile-input' className='header__menu-overlay'></label>
                        <nav className='nav__mobile'>
                            {userLogin.taiKhoan ?
                                <>
                                    <p className='nav__mobile-userLogin'>
                                        <img src='https://picsum.photos/50/50' alt='' style={{ borderRadius: '50%' }} />
                                        <NavLink to="/"><span className='text-danger mx-2' style={{ fontSize: '20px' }}>{userLogin.taiKhoan} </span></NavLink>
                                        <label htmlFor='nav-mobile-input'><i className="fa fa-angle-right user__arrow"></i></label>
                                    </p>
                                    <ul className='nav__mobile-list'>
                                        <li>
                                            <a href='#search' className='nav__mobile-link'>Lịch chiếu</a>
                                        </li>
                                        <li>
                                            <a href='#movieTheater' className='nav__mobile-link'>Cụm rạp</a>
                                        </li>
                                        <li>
                                            <a href='#infomation' className='nav__mobile-link'>Tin tức</a>
                                        </li>
                                        <li>
                                            <a href='#application' className='nav__mobile-link'>Ứng dụng</a>
                                        </li>
                                        <li>
                                            <a href='#' className='nav__mobile-link' onClick={() => logOut()}>Đăng xuất</a>
                                        </li>
                                    </ul>
                                </>
                                : (<>
                                    <a className='nav__mobile-userLogin'>
                                        <i className="fa fa-user-circle user__icon"></i>
                                        <NavLink to='/dangnhap' className='user__login'>Đăng nhập</NavLink>
                                        <label htmlFor='nav-mobile-input'><i className="fa fa-angle-right user__arrow"></i></label>

                                    </a>
                                    <ul className='nav__mobile-list'>
                                        <li>
                                            <a href='#' className='nav__mobile-link'>Lịch chiếu</a>
                                        </li>
                                        <li>
                                            <a href='#' className='nav__mobile-link'>Cụm rạp</a>
                                        </li>
                                        <li>
                                            <a href='#' className='nav__mobile-link'>Tin tức</a>
                                        </li>
                                        <li>
                                            <a href='#' className='nav__mobile-link'>Ứng dụng</a>
                                        </li>
                                        <li>
                                            <a href='#' className='nav__mobile-link'>Đăng xuất</a>
                                        </li>
                                    </ul>
                                </>)}
                        </nav>
                        <ul className='header__menu-user'>
                            {userLogin.taiKhoan ?
                                <>
                                    <li className='user__item closeUser'>
                                        <a href='#' className='user__item-link'><img src='https://picsum.photos/50/50' alt='' className='logo_dangNhap' /></a>
                                    </li>
                                    <li className='user__item closeUser'>
                                        <NavLink to="/"><span className='user__item-link text-danger'>Hello, {userLogin.taiKhoan} </span></NavLink>
                                    </li>
                                    <li className='user__item closeUser' style={{ borderLeft: '1px solid #9b9b9b' }}>
                                        <NavLink to='/' className='user__item-link' onClick={() => logOut()}>Đăng xuất</NavLink>
                                    </li>
                                </>
                                : (<>
                                    <li className='user__item closeUser'>
                                        <a href='#' className='user__item-link'><img src='./img/Header/avatardn.png' alt='' className='logo_dangNhap' /></a>
                                    </li>
                                    <li className='user__item closeUser'>
                                        <NavLink to='/dangky' className='user__item-link' >Đăng ký</NavLink>
                                    </li>
                                    <li className='user__item closeUser' style={{ borderLeft: '1px solid #9b9b9b' }}>
                                        <NavLink to='/dangnhap' className='user__item-link'>Đăng nhập</NavLink>
                                    </li>
                                </>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}






