export type Province = {
  Code: string;
  FullName: string;
  District: Array<District>;
};

export type District = {
  Code: string;
  FullName: string;
  ProvinceCode: string;
  Ward: Array<Ward>;
};

export type Ward = {
  Code: string;
  FullName: string;
  DistrictCode: string;
};

export type UserInfo = {
  name: string;
  user_avatar_url: string;
  ma_bhxh: string;
  cccd: string;
  ngay_sinh: string;
  thoi_diem_5_nam:string,
  gioi_tinh: string;
  tinh_thanh_pho: string;
  quan_huyen: string;
  phuong_xa: string;
  so_nha: string;
  dia_chi: string;
  so_dien_thoai: string;
  bhyt_avatar_url: string;
  bhyt_thoi_han: string;
  bhyt_so_the: string;
  bhyt_noi_dang_ky: string;
  tong_tham_gia_bhxh:string;
  tong_tham_gia_bhyt:string;
  tong_tham_gia_bhtnld:string;
  tong_cham_dong:string;
  qt_bhxh: QTBHXH[];
  qt_bhyt: QTBHYT[];
  qt_bhtnld: QTBHTNLD[];
  qt_bhtn: QTBHTN[];
};

export type QTBHXH = {
  tong_tham_gia: string;
  tong_cham_dong: string;
  tu_thang: string;
  den_thang: string;
  dia_chi:string,
  don_vi_cong_tac: string;
  loai_tien: string;
  nghe_nghiep: string;
  luong_dong: string;
  muc_luong: string;
  noi_lam_viec:string,
};
export type QTBHYT = {
  tong_tham_gia: string;
  tu_thang: string;
  den_thang: string;
  don_vi_cong_tac: string;
  loai_tien: string;
  nghe_nghiep: string;
  luong_dong: string;
  muc_luong: string;
  noi_lam_viec:string,
};
export type QTBHTN = {
  tong_tham_gia: string;
  tu_thang: string;
  den_thang: string;
  don_vi_cong_tac: string;
  loai_tien: string;
  nghe_nghiep: string;
  luong_dong: string;
  muc_luong: string;
  noi_lam_viec:string,
};
export type QTBHTNLD = {
  tong_tham_gia: string;
  tu_thang: string;
  den_thang: string;
  don_vi_cong_tac: string;
  loai_tien: string;
  nghe_nghiep: string;
  luong_dong: string;
  muc_luong: string;
  noi_lam_viec:string,
};
