import { ProviderLayoutProps } from "../types";
import { useAppSelector } from "../store/hooks";
import UserLayout from "./UserLayout";

const AppLayout: React.FC<ProviderLayoutProps> = ({ children }) => {
  return <UserLayout>{children}</UserLayout>;
};

export default AppLayout;
