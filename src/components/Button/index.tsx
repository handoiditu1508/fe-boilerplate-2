import { Button as MuiButton, styled } from "@mui/material";

import { LinkProps } from "react-router-dom";

const Button = styled(MuiButton)<LinkProps>(({ theme }) => ({}));

export default Button;