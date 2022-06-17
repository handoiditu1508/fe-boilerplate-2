import { Link, To, useMatch, useResolvedPath } from "react-router-dom";

import React from "react";

type CustomLinkProps = {
  children: React.ReactNode,
  to: To
}

export default function CustomLink({ children, to, ...props }: CustomLinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link style={{ textDecoration: match ? 'underline' : 'none' }}
        to={to}
        {...props}
      >
        {children}
      </Link>
      {match && ' (active)'}
    </div>
  );
}