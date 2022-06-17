import { Button, styled } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

import { ComponentProps } from "react";

type PredefinedLinkButtonProps = Omit<ComponentProps<typeof Button>, "LinkComponent">;

const PredefinedLinkButton = (props: PredefinedLinkButtonProps) => <Button LinkComponent={Link} {...props}></Button>

type LinkButtonProps = LinkProps & PredefinedLinkButtonProps;

const LinkButton = styled(PredefinedLinkButton)<LinkButtonProps>(({ theme }) => ({}));

export default LinkButton;