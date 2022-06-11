import { Link, To, useMatch, useResolvedPath } from "react-router-dom";

import React from "react";

interface CustomLinkProps {
  children: React.ReactNode[] | React.ReactNode,
  to: To
}

export default function CustomLink({ children, to, ...props }: CustomLinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

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