import PrivateProvider from "@/app/layouts/PrivateProvider";
import { Container } from "@mui/material";
import Navbar from "@/app/components/navbar/Index";
const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateProvider>
      <Container maxWidth="xl" sx={{ py: 2.3 }}>
        {children}
        <Navbar />
      </Container>
    </PrivateProvider>
  );
};

export default PrivateLayout;
