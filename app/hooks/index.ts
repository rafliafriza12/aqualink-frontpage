import { useMediaQuery } from "react-responsive";
export const IsDesktop = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });
  return isDesktop;
};
