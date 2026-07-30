interface Props {
  size?: number;
}

export function Logo({ size = 32 }: Props) {
  return (
    <div
      className="flex items-center justify-center font-bold shrink-0"
      style={{
        width: size,
        height: size,
        background: 'var(--accent)',
        color: '#ffffff',
        borderRadius: size * 0.22,
        fontSize: size * 0.55,
        fontFamily: 'var(--font-display)',
      }}
    >
      T
    </div>
  );
}
