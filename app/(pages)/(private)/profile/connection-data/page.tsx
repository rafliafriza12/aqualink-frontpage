"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import CircleBackground from "@/app/components/svg/CircleBackground";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { useCreateConnectionData } from "@/app/services/connectionData/connectionData.mutation";
import { toast } from "react-toastify";
import { ArrowBack, Upload, CheckCircle } from "@mui/icons-material";

interface FormData {
  nik: string;
  noKK: string;
  alamat: string;
  kecamatan: string;
  kelurahan: string;
  noImb: string;
  luasBangunan: string;
}

const ConnectionDataPage = () => {
  const router = useRouter();
  const createMutation = useCreateConnectionData();

  const [formData, setFormData] = useState<FormData>({
    nik: "",
    noKK: "",
    alamat: "",
    kecamatan: "",
    kelurahan: "",
    noImb: "",
    luasBangunan: "",
  });

  const [files, setFiles] = useState<{
    nikFile: File | null;
    kkFile: File | null;
    imbFile: File | null;
  }>({
    nikFile: null,
    kkFile: null,
    imbFile: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is PDF or Image
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Hanya file PDF atau gambar (JPG, PNG) yang diperbolehkan");
        return;
      }
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }
      setFiles((prev) => ({
        ...prev,
        [fieldName]: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.nik ||
      !formData.noKK ||
      !formData.alamat ||
      !formData.kecamatan ||
      !formData.kelurahan ||
      !formData.noImb ||
      !formData.luasBangunan
    ) {
      toast.error("Semua field wajib diisi");
      return;
    }

    if (!files.nikFile || !files.kkFile || !files.imbFile) {
      toast.error("Semua dokumen (PDF/Gambar) wajib diunggah");
      return;
    }

    // Create FormData
    const submitData = new FormData();
    submitData.append("nik", formData.nik);
    submitData.append("noKK", formData.noKK);
    submitData.append("alamat", formData.alamat);
    submitData.append("kecamatan", formData.kecamatan);
    submitData.append("kelurahan", formData.kelurahan);
    submitData.append("noImb", formData.noImb);
    submitData.append("luasBangunan", formData.luasBangunan);
    submitData.append("nikFile", files.nikFile);
    submitData.append("kkFile", files.kkFile);
    submitData.append("imbFile", files.imbFile);

    try {
      await createMutation.mutateAsync(submitData);
      router.push("/profile");
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="w-full flex flex-col font-inter relative z-0 min-h-screen overflow-hidden">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] fixed z-[-10] top-0 hidden lg:block"
        )}
        width={80}
        height={80}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />
      <div className="w-full fixed z-[-10] lg:hidden inset-0">
        <CircleBackground />
      </div>

      <div className="w-full flex flex-col gap-6 py-[18.4px]">
        <HeaderMobile mode="normal" />

        <div className="">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white mb-4"
          >
            <ArrowBack />
            <span>Kembali</span>
          </button>

          <div className="bg-[#202226] rounded-3xl p-6">
            <h1 className="text-white font-bold text-2xl mb-2">
              Data Koneksi Air
            </h1>
            <p className="text-gray-400 text-sm mb-6">
              Lengkapi data berikut untuk mengajukan pemasangan koneksi air PDAM
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NIK */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  NIK <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={handleInputChange}
                  placeholder="Masukkan NIK"
                  className="w-full bg-[#2A2D31] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={16}
                />
              </div>

              {/* NIK File */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Upload NIK (PDF/Gambar){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/jpg,image/png"
                    onChange={(e) => handleFileChange(e, "nikFile")}
                    className="hidden"
                    id="nikFile"
                  />
                  <label
                    htmlFor="nikFile"
                    className="w-full bg-[#2A2D31] text-gray-400 px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-[#333740] transition"
                  >
                    <span className="text-sm">
                      {files.nikFile
                        ? files.nikFile.name
                        : "Pilih file PDF/Gambar"}
                    </span>
                    {files.nikFile ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <Upload />
                    )}
                  </label>
                </div>
              </div>

              {/* No KK */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Nomor KK <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="noKK"
                  value={formData.noKK}
                  onChange={handleInputChange}
                  placeholder="Masukkan Nomor KK"
                  className="w-full bg-[#2A2D31] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={16}
                />
              </div>

              {/* KK File */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Upload KK (PDF/Gambar) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/jpg,image/png"
                    onChange={(e) => handleFileChange(e, "kkFile")}
                    className="hidden"
                    id="kkFile"
                  />
                  <label
                    htmlFor="kkFile"
                    className="w-full bg-[#2A2D31] text-gray-400 px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-[#333740] transition"
                  >
                    <span className="text-sm">
                      {files.kkFile
                        ? files.kkFile.name
                        : "Pilih file PDF/Gambar"}
                    </span>
                    {files.kkFile ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <Upload />
                    )}
                  </label>
                </div>
              </div>

              {/* Alamat */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Alamat <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  placeholder="Masukkan alamat lengkap"
                  className="w-full bg-[#2A2D31] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                />
              </div>

              {/* Kecamatan */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Kecamatan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleInputChange}
                  placeholder="Masukkan kecamatan"
                  className="w-full bg-[#2A2D31] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Kelurahan */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Kelurahan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="kelurahan"
                  value={formData.kelurahan}
                  onChange={handleInputChange}
                  placeholder="Masukkan kelurahan"
                  className="w-full bg-[#2A2D31] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* No IMB */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Nomor IMB <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="noImb"
                  value={formData.noImb}
                  onChange={handleInputChange}
                  placeholder="Masukkan Nomor IMB"
                  className="w-full bg-[#2A2D31] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* IMB File */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Upload IMB (PDF/Gambar){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/jpg,image/png"
                    onChange={(e) => handleFileChange(e, "imbFile")}
                    className="hidden"
                    id="imbFile"
                  />
                  <label
                    htmlFor="imbFile"
                    className="w-full bg-[#2A2D31] text-gray-400 px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-[#333740] transition"
                  >
                    <span className="text-sm">
                      {files.imbFile
                        ? files.imbFile.name
                        : "Pilih file PDF/Gambar"}
                    </span>
                    {files.imbFile ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <Upload />
                    )}
                  </label>
                </div>
              </div>

              {/* Luas Bangunan */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Luas Bangunan (m²) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="luasBangunan"
                  value={formData.luasBangunan}
                  onChange={handleInputChange}
                  placeholder="Masukkan luas bangunan"
                  className="w-full bg-[#2A2D31] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="w-full bg-gradient-to-r from-[#5F68FE] to-[#2835FF] text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {createMutation.isPending ? "Mengirim..." : "Kirim Pengajuan"}
              </button>

              <p className="text-gray-400 text-xs text-center mt-4">
                Data akan diverifikasi oleh admin dalam 1-3 hari kerja
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionDataPage;
