export default function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`bg-[#2b1f55] animate-pulse rounded-md ${className}`}
    />
  );
}