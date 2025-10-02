export interface UserProfile {
  _id: string;
  email: string;
  fullName: string;
  phone: string | null;
  isVerified: boolean;
  SambunganDataId: ConnectionData | null;
  meteranId: Meteran | null;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectionData {
  _id: string;
  userId: string;
  nik: string;
  nikFile: string;
  noKK: string;
  kkFile: string;
  alamat: string;
  kecamatan: string;
  kelurahan: string;
  noImb: string;
  imbFile: string;
  luasBangunan: number;
  isVerifiedByData: boolean;
  isVerifiedByTechnician: boolean;
  isAllProcedureDone: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Meteran {
  _id: string;
  noMeteran: string;
  kelompokPelangganId: KelompokPelanggan;
  userId: string;
  connectionDataId: string;
  totalPemakaian: number;
  pemakaianBelumTerbayar: number;
  jatuhTempo: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface KelompokPelanggan {
  _id: string;
  namaKelompok: string;
  hargaPenggunaanDibawah10: number;
  hargaPenggunaanDiatas10: number;
  biayaBeban: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileResponse {
  status: number;
  data: {
    user: UserProfile;
    hasConnectionData: boolean;
    hasMeteran: boolean;
    isVerified: boolean;
  };
  message: string;
}
