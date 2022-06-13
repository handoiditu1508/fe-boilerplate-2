import { NavLink, To, useLocation } from "react-router-dom";

import React from "react";

type QueryNavLinkProps = {
  to: To,
  children: React.ReactNode,
  style: React.CSSProperties | ((props: {
    isActive: boolean;
  }) => React.CSSProperties)
}

export default function QueryNavLink({ to, ...props }: QueryNavLinkProps) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}