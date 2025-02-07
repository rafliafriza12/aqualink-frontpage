"use client";
import { IsDesktop } from "@/app/hooks";
import { useAuth } from "@/app/hooks/UseAuth";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import Modal from "@/app/components/modals/Modal";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import L from "leaflet";

interface Coordinates {
  lat: number;
  lng: number;
}
const LaporKebocoran: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [problem, setProblem] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const isDesktop = IsDesktop();
  const navigation = useRouter();
  const auth = useAuth();
  const [position, setPosition] = useState<number | any>(null);

  const handleMapClick = (coords: any) => {
    setPosition(coords); // Simpan koordinat lokasi klik
  };

  const datas: any = [
    {
      status: "Menunggu konfirmasi",
      timeStamp: "2 jam yang lalu",
    },
    {
      status: "Menunggu konfirmasi",
      timeStamp: "2 jam yang lalu",
    },
    {
      status: "Menunggu konfirmasi",
      timeStamp: "2 jam yang lalu",
    },
    {
      status: "Menunggu konfirmasi",
      timeStamp: "2 jam yang lalu",
    },
  ];

  // const handleClick = () => {
  //   setIsLoading(!isLoading);
  //   setShowModal(!showModal);
  // };

  // const LocationMarker: React.FC<{
  //   onMapClick: (coords: Coordinates) => void;
  // }> = ({ onMapClick }) => {
  //   useMapEvents({
  //     click(e) {
  //       const { lat, lng } = e.latlng; // Koordinat lokasi klik
  //       onMapClick({ lat, lng }); // Kirim data koordinat ke fungsi parent
  //     },
  //   });

  //   return null;
  // };

  // L.Icon.Default.mergeOptions({
  //   iconRetinaUrl:
  //     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  //   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  //   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  // });

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth/login");
    }
  }, [auth.auth.isAuthenticated, navigation]);

  if (!auth.auth.isAuthenticated) {
    return null; // Hindari rendering konten saat redirect
  }
  return isDesktop ? (
    <div className=" w-full flex justify-between">
      {/* <div className=" w-[48.5%] h-[50vh]">
        <Grid display="flex" gap={2} alignItems="center">
          <StickyNote2OutlinedIcon />
          <Typography variant="h6" fontWeight={700}>
            Status Laporan
          </Typography>
        </Grid>
        <Grid width="100%" sx={{ mt: 4 }}>
          <Card
            sx={{
              width: "100%",
              borderRadius: "16px",
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
                {datas.map((data: any, i: number) => {
                  return (
                    <Grid
                      xs={12}
                      width="100%"
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      <StickyNote2OutlinedIcon />
                      <Grid>
                        <Typography variant="body1" fontWeight={600}>
                          {data.status}
                        </Typography>
                        <Typography variant="caption" fontWeight={400}>
                          {data.timeStamp}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <div className=" w-[48.5%] h-[50vh]">
        <Grid display="flex" gap={2} alignItems="center">
          <StickyNote2OutlinedIcon />
          <Typography variant="h6" fontWeight={700}>
            Lapor Kebocoran
          </Typography>
        </Grid>
        <Grid width="100%" sx={{ mt: 4 }}>
          <Card
            sx={{
              width: "100%",
              borderRadius: "16px",
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

                <Grid sx={{ width: "100%", height: "50vh" }} overflow="hidden">
                  <MapContainer
                    className="w-full h-full"
                    center={{ lat: 5.5555773881451, lng: 95.32125260223387 }}
                    zoom={13}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker onMapClick={handleMapClick} />
                    {position && (
                      <Marker position={[position.lat, position.lng]}>
                        <Popup>
                          Koordinat: <br /> Lat: {position.lat}, Lng:{" "}
                          {position.lng}
                        </Popup>
                      </Marker>
                    )}
                  </MapContainer>
                  ,
                </Grid>
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
                    py: 1,
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
                  <Typography variant="body1" fontWeight={700}>
                    Lapor
                  </Typography>
                </LoadingButton>
              </Grid>
            </CardContent>
          </Card>
          {showModal && (
            <Modal
              title="Pelaporan Berhasil"
              text="Laporan anda sudah dikonfirmasi dan akan segera diproses"
              icon="success"
              confirmButtonText="OK"
              confirmButtonColor="#001740"
              onClose={() => handleClick()}
            />
          )}
        </Grid>
      </div> */}
    </div>
  ) : (
    <Grid width="100%" display="flex" flexDirection="column" gap={5}>
      {/* <Typography
        variant={isDesktop ? "h6" : "body1"}
        fontWeight={600}
        fontSize={isDesktop ? 20 : 14}
      >
        Lapor Kebocoran
      </Typography>

      <Card
        sx={{
          width: "100%",
          boxShadow: "0px 4px 7px grey",
          borderRadius: "7px",
        }}
      >
        <CardContent>
          <Grid width="100%" display="flex" flexDirection="column" gap={1}>
            <Link
              href={"/lapor-kebocoran/lapor"}
              className="w-full flex items-center gap-3 py-2"
            >
              <AddIcon />
              <Typography variant="body1" fontWeight={400} p={0} m={0}>
                Buat Laporan
              </Typography>
            </Link>
            <hr className="border-t-2 border-gray-300 " />
            <Accordion sx={{ boxShadow: "none", p: 0, m: 0 }}>
              <AccordionSummary
                sx={{
                  boxShadow: "none",
                  p: 0,
                  m: 0,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <StickyNote2OutlinedIcon />
                <Typography component="span" sx={{ pl: "0.75rem" }}>
                  Status Laporan
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ width: "100%", px: 0 }}>
                <Grid
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  p={0}
                  m={0}
                  gap={1}
                >
                  {datas.map((data: any, i: number) => {
                    return (
                      <Grid
                        xs={12}
                        width="100%"
                        display="flex"
                        alignItems="center"
                        gap={"0.75rem"}
                      >
                        <StickyNote2OutlinedIcon />
                        <Grid>
                          <Typography variant="body1" fontWeight={600}>
                            {data.status}
                          </Typography>
                          <Typography variant="caption" fontWeight={400}>
                            {data.timeStamp}
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
                <div className="mt-3">
                  <Link href={"#"} className="underline text-blue-600">
                    Lihat semua
                  </Link>
                </div>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </CardContent>
      </Card> */}
    </Grid>
  );
};

export default LaporKebocoran;
