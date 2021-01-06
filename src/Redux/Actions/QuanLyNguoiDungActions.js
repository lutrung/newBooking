import Axios from 'axios'
import Swal from 'sweetalert2'
import { ACCESSTOKEN, USER_LOGIN, DOMAIN, ACCOUNTLOGIN } from '../../Util/Config'
import { history } from '../../Util/history'
import { DANG_NHAP, LICH_SU_DAT_VE } from '../Const/QuanLyPhimConst'
export const dangNhapApiAction = async (userLogin) => {
    return async (dispatch) => {
        try {

            let result = await Axios({
                url: DOMAIN + '/api/quanlynguoidung/dangnhap',
                method: 'POST',
                data: userLogin
            })
            localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
            localStorage.setItem(ACCESSTOKEN, result.data.accessToken);
            localStorage.setItem(ACCOUNTLOGIN, JSON.stringify(userLogin));
            Swal.fire('Thông báo', 'Đăng nhập thành công', 'success')
            history.push('/trangchu')
            dispatch({
                type: DANG_NHAP,
                data: result.data,
                account: userLogin
            })
        } catch (err) {
            Swal.fire('Thông báo', err.response.data, 'error')
        }
    }
}
export const dangKyApiAction = async (userSignup) => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: DOMAIN + '/api/QuanLyNguoiDung/DangKy',
                method: 'POST',
                data: userSignup
            })
            Swal.fire('Thông báo', 'Đăng ký thành công', 'success')
            history.push('/dangnhap')
        } catch (err) {
            Swal.fire('Thông báo', err.response.data, 'error')
        }
    }
}
export const lichSuDatVeApiAction = async (account) => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: DOMAIN + '/api/QuanLyNguoiDung/ThongTinTaiKhoan',
                method: 'POST',
                data: { taiKhoan: account },
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESSTOKEN) }
            })
            dispatch({
                type: LICH_SU_DAT_VE,
                data: result.data
            })
        } catch (err) {
            console.log(err.response.data);
        }
    }
}