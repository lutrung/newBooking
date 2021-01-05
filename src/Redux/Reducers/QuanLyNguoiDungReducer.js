
const { USER_LOGIN, ACCOUNTLOGIN } = require("../../Util/Config")

let accountLogin = {}
if (localStorage.getItem(ACCOUNTLOGIN)) {
    accountLogin = JSON.parse(localStorage.getItem(ACCOUNTLOGIN));
}
let userLogin = {}
if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
    userLogin: userLogin,
    accountLogin: accountLogin,
    bookingHistory: {}
}
const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'DANG_NHAP': {
            state.userLogin = action.data
            state.accountLogin = action.account
            return { ...state }
        }
        default: return { ...state }
    }
}
export default QuanLyNguoiDungReducer;