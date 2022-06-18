import { IconButton, styled } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

import { ComponentProps } from "react";

type PredefinedLinkIconButtonProps = Omit<ComponentProps<typeof IconButton>, "LinkComponent">;

const PredefinedLinkIconButton = (props: PredefinedLinkIconButtonProps) => <IconButton LinkComponent={Link} {...props}></IconButton>

type LinkIconButtonProps = LinkProps & PredefinedLinkIconButtonProps;

const LinkIconButton = styled(PredefinedLinkIconButton)<LinkIconButtonProps>(({ theme }) => ({}));

export default LinkIconButton;