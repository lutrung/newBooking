import React, { useEffect } from 'react'
import ThongTinLichChieu from './ThongTinLichChieu'
import ThongTinPhim from './ThongTinPhim'

export default function ChiTietPhim(props) {
    let maPhim = props.match.params.maPhim;
    return (
        <div style={{ background: 'url("/img/bgChiTietPhim2.jpg") center center / cover' }}>
            <ThongTinPhim maPhim={maPhim} />
            <ThongTinLichChieu />
        </div>
    )
}
