import CarrerasForm from "./CarrerasForm";
import CarrerasList from "./CarrerasList";

export default function Carreras() {
  return (
    <div className="p-6 space-y-10 bg-[#1E1D2B] min-h-screen text-white">
      <CarrerasForm />
      <CarrerasList />
    </div>
  );
}
