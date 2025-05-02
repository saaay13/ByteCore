import DonacionesForm from "./DonacionesForm";
import DonacionesList from "./DonacionesList";

export default function Donaciones() {
  return (
    <div className="p-6 space-y-12 bg-[#2A2A3D] text-white">
      <DonacionesForm />
      <DonacionesList />
    </div>
  );
}
