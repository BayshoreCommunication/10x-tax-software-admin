import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-[#eeeeee]">
      <Spinner
        className="text-[#1B2639] "
        color="default"
        label="Loading..."
        labelColor="foreground"
        size="lg"
      />
    </div>
  );
}
