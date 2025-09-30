import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"
        fill="currentColor"
      />
      <path
        d="M168 96a40 40 0 1 0-48.88 38.49L128 176l9.88-41.51A40 40 0 0 0 168 96Zm-40 24a24 24 0 1 1 24-24a24 24 0 0 1-24 24Z"
        fill="currentColor"
      />
    </svg>
  );
}