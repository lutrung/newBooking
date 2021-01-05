import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { dangNhapApiAction } from '../Redux/Actions/QuanLyNguoiDungActions';

export default function DangNhap() {
    let x = true;
    const showHide = () => {
        if (x) {
            document.getElementById('password').type = 'text'
            document.getElementById('show').innerHTML = '<i class="fa fa-eye-slash"></i>'
            x = false;
        } else {
            document.getElementById('password').type = 'password'
            document.getElementById('show').innerHTML = '<i class="fa fa-eye" ></i>'
            x = true;
        }
    }
    const dispatch = useDispatch()
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        window.onresize = function () {
            setHeight(window.innerHeight);
        }
    }, []);

    const [userLogin, setUserLogin] = useState({ taiKhoan: '', matKhau: '' })
    console.log(userLogin);
    const handleChange = (e) => {
        let { value, name } = e.target;
        let newUserLogin = { ...userLogin, [name]: value }
        setUserLogin(newUserLogin)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(await dangNhapApiAction(userLogin))
    }
    return (
        <div className='login' style={{ backgroundImage: "url('./img/bgDangKy.jpg')", height, color: 'white' }} >
            <form className='login__form' onSubmit={handleSubmit}>
                <div className='login__form-logo '>
                    <a href='/trangchu'><img className='logo' alt='...' src='./img/Header/logo.png' /></a>
                </div>
                <h1 className='login__form-title'>Đăng nhập</h1>
                <div className="login__form-input">
                    <div className='formLogin'>
                        <i className="fa fa-user-alt"></i>
                        <input name='taiKhoan' className="form-control" aria-describedby="taiKhoan" placeholder="Tài khoản" onChange={handleChange} />
                    </div>
                </div>
                <div className="login__form-input">
                    <div className='formLogin'>
                        <i className="fa fa-lock"></i>
                        <input id='password' type='password' name='matKhau' className="form-control" aria-describedby="matKhau" placeholder="Mật khẩu" onChange={handleChange} />
                        <div id='show' onClick={() => showHide()}>
                            <i class="fa fa-eye" ></i>
                        </div>
                    </div>

                </div>
                <div className="login__form-remember">
                    <div className='remember__left'>
                        <input id='remember' type='checkbox' className='mr-1' />
                        <label htmlFor="remember" style={{ margin: 0 }}>Ghi nhớ đăng nhập</label>
                    </div>
                    <div className='remember__right'>
                        <a href='/'>Quên mật khẩu?</a>
                    </div>

                </div>
                <div className="login__form-input ">
                    <button className='btn' type='submit'>Đăng nhập</button>
                </div>
                <div className="login__form-note">
                    <span>Bạn chưa có tài khoản?<NavLink to='/dangky'> Đăng ký</NavLink></span>
                </div>
            </form>
        </div>
    )
}
