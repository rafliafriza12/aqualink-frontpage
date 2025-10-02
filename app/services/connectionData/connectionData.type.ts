export interface ConnectionDataForm {
  nik: string;
  nikFile: File | null;
  noKK: string;
  kkFile: File | null;
  alamat: string;
  kecamatan: string;
  kelurahan: string;
  noImb: string;
  imbFile: File | null;
  luasBangunan: number;
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

export interface ConnectionDataResponse {
  status: number;
  data: ConnectionData;
  message: string;
}
