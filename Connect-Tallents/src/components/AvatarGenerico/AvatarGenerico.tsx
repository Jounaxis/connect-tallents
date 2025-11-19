type Props = {
  className?: string;
};

export default function AvatarGenerico({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Avatar genérico"
      className={`avatar-generic ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="22" r="14" fill="currentColor" />
      <path
        d="M32 36c-12.15 0-22 9.85-22 22v4h44v-4c0-12.15-9.85-22-22-22z"
        fill="currentColor"
      />
    </svg>
  );
}
