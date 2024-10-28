import { useState } from "react";
import EnviarIcon from "@/public/icons/Enviar";
import { BurbleChat } from "./BurbleChat";
import DocsIcon from "@/public/icons/Documentos";
import UploadDocs from "./UploadDocs";
import { UserBurbleChat } from "./UserBurbleChat";

export function Chat() {
    const [showUploadDocs, setShowUploadDocs] = useState(false);
    const [message, setMessage] = useState("");
    const [sentMessage, setSentMessage] = useState(""); // Estado para almacenar el mensaje enviado

    const handleDocsButtonClick = (e) => {
        e.preventDefault(); 
        setShowUploadDocs(true); // Muestra UploadDocs y oculta Chat
    };

    const handleCloseUploadDocs = () => {
        setShowUploadDocs(false); // Mostrar Chat
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            setSentMessage(message); 
            
            setMessage(""); // Limpiar el input después de enviar
        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            {showUploadDocs ? (
                // Muestra solo el componente UploadDocs
                <div className="bg-gray-200 w-[500px] h-[420px] rounded-xl p-4">
                    <UploadDocs onClose={handleCloseUploadDocs} />
                </div>
            ) : (
                // Muestra solo el componente Chat
                <div className="bg-gray-200 w-[500px] h-[420px] rounded-xl p-4 flex flex-col gap-3">
                    <UserBurbleChat message={sentMessage || "..."} /> {/* Usar sentMessage aquí */}
                    <BurbleChat />
                    <form className="flex mt-auto" onSubmit={handleSendMessage}>
                        <div className="flex bg-white rounded-xl w-full p-1 gap-1">
                            <input
                                type="text"
                                placeholder="Ingrese su pregunta"
                                className="bg-white w-full rounded-xl p-2"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                onClick={handleDocsButtonClick}
                                type="button"
                                className="bg-gray-400 hover:bg-gray-500 rounded-full p-1"
                            >
                                <DocsIcon className="size-8 stroke-white" />
                            </button>
                            <button type="submit" className="bg-gray-400 hover:bg-gray-500 rounded-full p-1">
                                <EnviarIcon className="size-8 stroke-white" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
