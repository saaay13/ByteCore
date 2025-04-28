import CarrerasForm from "./CarrerasForm";
import CarrerasList from "./CarrerasList";

export default function Carreras() {
  return (
    <div className="p-6 space-y-10">
      <CarrerasForm />
      <CarrerasList />
    </div>
  );
}