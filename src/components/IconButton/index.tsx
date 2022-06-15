import { IconButton as MuiIconButton, styled } from "@mui/material";

import { LinkProps } from "react-router-dom";

const IconButton = styled(MuiIconButton)<LinkProps>(({ theme }) => ({}));

export default IconButton;