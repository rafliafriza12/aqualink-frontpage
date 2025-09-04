import PrivateProvider from "@/app/layouts/PrivateProvider";
import { Container } from "@mui/material";
import Navbar from "@/app/components/navbar/Index";
const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateProvider>
      <main className=" py-4 px-4 lg:px-32 lg:pt-[120px]">
        {children}
        <Navbar />
      </main>
    </PrivateProvider>
  );
};

export default PrivateLayout;
