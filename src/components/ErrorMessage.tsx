import type { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className="mt-4 bg-red-600 p-3 text-center font-bold text-white uppercase">
      {children}
    </div>
  );
}
