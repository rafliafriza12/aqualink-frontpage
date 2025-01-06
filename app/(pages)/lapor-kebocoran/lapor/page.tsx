"use client";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState, useEffect } from "react";
import { IsDesktop } from "@/app/hooks";
import { useAuth } from "@/app/hooks/UseAuth";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/modals/Modal";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
const ReportFormMobile: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [problem, setProblem] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const isDesktop = IsDesktop();
  const navigation = useRouter();
  const auth = useAuth();

  const steps = ["Isi formulir", "Verifikasi", "Kirim"];

  const handleClick = () => {
    setStep(step + 1);
    if (step === 2) {
      setIsLoading(true);
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth/login");
    }
  }, [auth.auth.isAuthenticated, navigation]);

  if (!auth.auth.isAuthenticated) {
    return null; // Hindari rendering konten saat redirect
  }

  return (
    <Grid width="100%" display="flex" flexDirection="column" gap={3} pb={5}>
      <Typography
        variant={isDesktop ? "h6" : "body1"}
        fontWeight={600}
        fontSize={isDesktop ? 20 : 14}
      >
        Lapor Kebocoran
      </Typography>

      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card
        sx={{
          width: "100%",
          borderRadius: "7px",
          boxShadow: "0px 4px 7px grey",
        }}
      >
        <CardContent>
          <Grid
            display="flex"
            flexDirection="column"
            gap={5}
            xs={12}
            width="100%"
          >
            <TextField
              id="name"
              label="Nama Pelapor"
              variant="outlined"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  color: "#001740", // Warna teks input
                  "& fieldset": {
                    borderColor: "#001740", // Warna outline default
                  },
                  "&:hover fieldset": {
                    borderColor: "#001740", // Warna outline saat hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#001740", // Warna outline saat fokus
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#001740", // Warna label default
                  "&.Mui-focused": {
                    csetEmailolor: "#001740", // Warna label saat fokus
                  },
                },
              }}
            />
            <TextField
              id="problem"
              label="Spesifikasi Masalah"
              variant="outlined"
              value={problem}
              type="text"
              onChange={(e) => setProblem(e.target.value)}
              multiline
              rows={4} // Tentukan jumlah baris di TextArea
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  color: "#001740", // Warna teks input
                  "& fieldset": {
                    borderColor: "#001740", // Warna outline default
                  },
                  "&:hover fieldset": {
                    borderColor: "#001740", // Warna outline saat hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#001740", // Warna outline saat fokus
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#001740", // Warna label default
                  "&.Mui-focused": {
                    color: "#001740", // Warna label saat fokus
                  },
                },
              }}
            />

            <TextField
              id="address"
              label="Alamat Lengkap"
              variant="outlined"
              value={address}
              type="text" // Ganti menjadi type text karena ini sekarang textarea
              onChange={(e) => setAddress(e.target.value)}
              multiline
              rows={4} // Tentukan jumlah baris di TextArea
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  color: "#001740", // Warna teks input
                  "& fieldset": {
                    borderColor: "#001740", // Warna outline default
                  },
                  "&:hover fieldset": {
                    borderColor: "#001740", // Warna outline saat hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#001740", // Warna outline saat fokus
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#001740", // Warna label default
                  "&.Mui-focused": {
                    color: "#001740", // Warna label saat fokus
                  },
                },
              }}
            />

            <Grid
              width="100%"
              display="flex"
              justifyContent={step === 0 ? "end" : "space-between"}
              alignItems="center"
            >
              {step !== 0 && (
                <LoadingButton
                  loading={isLoading}
                  onClick={() => setStep(step - 1)}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#001740",
                    width: "30%",
                    color: "white",
                    textTransform: "none",
                    borderRadius: "7px",
                    py: 0.8,
                    borderColor: "#001740",
                    "&:hover": {
                      backgroundColor: "#001740", // Warna saat hover
                      borderColor: "#001740",
                    },
                    "& .MuiLoadingButton-loadingIndicator": {
                      color: "white", // Warna indikator loading
                    },
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Kembali
                  </Typography>
                </LoadingButton>
              )}
              <LoadingButton
                loading={isLoading}
                onClick={() => handleClick()}
                variant="outlined"
                sx={{
                  backgroundColor: "#001740",
                  width: "30%",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "7px",
                  py: 0.8,
                  borderColor: "#001740",
                  "&:hover": {
                    backgroundColor: "#001740", // Warna saat hover
                    borderColor: "#001740",
                  },
                  "& .MuiLoadingButton-loadingIndicator": {
                    color: "white", // Warna indikator loading
                  },
                }}
              >
                <Typography variant="body2" fontWeight={600}>
                  {step !== 2 ? "Lanjut" : "Lapor"}
                </Typography>
              </LoadingButton>
            </Grid>
          </Grid>
        </CardContent>
        {showModal && (
          <Modal
            title="Pelaporan Berhasil"
            text="Laporan anda sudah dikonfirmasi dan akan segera diproses"
            icon="success"
            confirmButtonText="OK"
            confirmButtonColor="#001740"
            onClose={() => (
              setIsLoading(false), setStep(0), setShowModal(false)
            )}
          />
        )}
      </Card>
    </Grid>
  );
};

export default ReportFormMobile;
