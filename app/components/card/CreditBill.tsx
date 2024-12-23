import { Card, CardContent, Grid, Typography } from "@mui/material";
import { formatToIDR } from "@/app/utils/helper";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { IsDesktop } from "@/app/hooks";

const CreditBill: React.FC = () => {
  const isDesktop = IsDesktop();
  return (
    <Link href={"#"}>
      <Card
        sx={{
          borderRadius: "16px",
          p: isDesktop ? 2 : 1,
          boxShadow: "1px 4px 7px grey",
        }}
      >
        <CardContent>
          <Grid
            container
            display="flex"
            flexDirection="column"
            gap={isDesktop ? 2 : 1}
          >
            <Grid
              display="flex"
              alignItems="start"
              justifyContent="space-between"
            >
              <Grid display="flex" gap={2} alignItems="center">
                <Avatar sx={{ bgcolor: "#001740" }}>RA</Avatar>
                <Grid>
                  <Typography
                    variant={`${isDesktop ? "body1" : "body2"}`}
                    fontWeight={600}
                  >
                    Rafli Afriza Nugraha
                  </Typography>
                  <Typography
                    variant={`${isDesktop ? "body2" : "caption"}`}
                    fontWeight={400}
                  >
                    ID Kredit : 123456789
                  </Typography>
                </Grid>
              </Grid>
              <Link
                href={"#"}
                className=" hidden lg:block"
                style={{
                  textDecoration: "underline",
                  fontSize: "14px",
                  color: "blue",
                  padding: "auto 0px",
                }}
              >
                Lihat Detail
              </Link>
            </Grid>
            <Grid display="flex" gap={2} alignItems="center">
              <Typography variant={`${isDesktop ? "body2" : "caption"}`}>
                <Typography
                  variant={`${isDesktop ? "body2" : "caption"}`}
                  fontWeight={600}
                  display="inline"
                >
                  Lokasi Pusat :{" "}
                </Typography>
                Gampong Jawa, Kuta ALam, Kota Banda Aceh
              </Typography>
            </Grid>
            <Grid display="flex" flexDirection="column">
              <Typography variant={`${isDesktop ? "body2" : "caption"}`}>
                <Typography
                  variant={`${isDesktop ? "body2" : "caption"}`}
                  fontWeight={600}
                  display="inline"
                >
                  Total tagihan :
                </Typography>
              </Typography>
              <Typography
                variant={`${isDesktop ? "h5" : "h6"}`}
                fontWeight={600}
              >
                {formatToIDR(3550)} / 1000 L
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CreditBill;
