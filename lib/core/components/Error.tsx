import { GrCircleAlert } from "react-icons/gr";

interface Props {
  error: string;
}

export default function Error({ error }: Props) {
  return (
    <div className="flex flex-row gap-2 items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
      <GrCircleAlert />
      {error}
    </div>
  );
}
