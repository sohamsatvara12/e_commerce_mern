
import { MoonLoader } from "react-spinners";

export default function Loader() {
  return (


<div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-10 p-10  w-screen h-screen">

<MoonLoader color="#1e3a8a"    className="absolute top-0 right-0 mt-2 mr-2 text-blue-900" />
</div>
  );
}

