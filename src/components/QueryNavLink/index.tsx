import { NavLink, To, useLocation } from "react-router-dom";

import React from "react";
import { useCombineUrlQuery } from "../../hooks";

type QueryNavLinkProps = {
  to: To,
  children: React.ReactNode,
  style: React.CSSProperties | ((props: {
    isActive: boolean;
  }) => React.CSSProperties)
}

export default function QueryNavLink({ to, ...props }: QueryNavLinkProps) {
  const location = useLocation();

  const link = useCombineUrlQuery(to.toString(), location.search);

  return <NavLink to={link} {...props} />;
}