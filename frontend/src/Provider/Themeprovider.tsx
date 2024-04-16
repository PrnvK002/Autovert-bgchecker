import { useMemo } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { ThemeProvider } from "@emotion/react";
import { generateAppTheme } from "../utils/generatetheme.util";

interface props{
    children: JSX.Element
}

export default function Themeprovider({children}:props) {
  const { template } = useSelector((state: IRootState) => state.userReducer);

  const appTheme = useMemo(() => {
    return generateAppTheme(template);
  }, [template]);

  return <>
  <ThemeProvider theme={appTheme}>
    {children}
  </ThemeProvider>
  </>;
}
