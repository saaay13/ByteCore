import ParticipantesForm from "./ParticipantesForm";
import ParticipantesList from "./ParticipantesList";
export default function Participantes() {
    return (
        <div className="p-6 space-y-10">
        <ParticipantesForm />
        <ParticipantesList />
        </div>
    );
}
