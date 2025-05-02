import ParticipantesForm from "./ParticipantesForm";
import ParticipantesList from "./ParticipantesList";

export default function Participantes() {
  return (
    <div className="p-6 space-y-10 text-gray-200">
      <h2 className="text-2xl font-bold text-[#22c55e] border-b border-gray-700 pb-2">
        Gestión de Participantes
      </h2>

      <div className="bg-[#2D2B3A] p-6 rounded-xl shadow-md">
        <ParticipantesForm />
      </div>

      <div className="bg-[#2D2B3A] p-6 rounded-xl shadow-md">
        <ParticipantesList />
      </div>
    </div>
  );
}
