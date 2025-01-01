// components/SuccessModal.tsx
import { useEffect } from "react";
import Swal from "sweetalert2";

interface SuccessModalProps {
  title: string;
  text: string;
  icon?: "success" | "error" | "warning" | "info" | "question"; // Tipe icon yang diizinkan
  confirmButtonText?: string;
  confirmButtonColor?: string;
  onClose?: () => void; // Callback ketika modal ditutup
}

const Modal: React.FC<SuccessModalProps> = ({
  title,
  text,
  icon = "success",
  confirmButtonText = "OK",
  confirmButtonColor = "#3085d6",
  onClose,
}) => {
  // Menampilkan SweetAlert2 ketika komponen ini dipanggil
  const showModal = () => {
    Swal.fire({
      icon: icon, // Jenis alert (success, error, dll)
      title: title, // Judul modal
      text: text, // Isi teks modal
      confirmButtonText: confirmButtonText,
      confirmButtonColor: confirmButtonColor,
      customClass: {
        icon: "custom-icon", // Kelas CSS kustom untuk ikon
      },
    }).then(() => {
      if (onClose) {
        onClose(); // Menangani callback jika disediakan
      }
    });
  };

  // Menampilkan modal ketika komponen ini dimuat
  useEffect(() => {
    showModal(); // Modal hanya muncul sekali saat komponen pertama kali dimuat
  }, []); // Hanya dipanggil sekali saat komponen pertama kali dimuat

  return null; // Tidak perlu merender apapun dalam DOM karena SweetAlert2 akan menampilkan modal sendiri
};

export default Modal;
