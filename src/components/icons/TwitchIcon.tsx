import { siTwitch } from 'simple-icons';

interface TwitchIconProps {
  readonly className?: string;
  readonly size?: number;
}

export default function TwitchIcon({ className, size = 17 }: TwitchIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={siTwitch.path} />
    </svg>
  );
}
