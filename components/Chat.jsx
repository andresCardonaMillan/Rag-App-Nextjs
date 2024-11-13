import { useState } from "react";
import axios from "axios";
import EnviarIcon from "@/public/icons/Enviar";
import { BurbleChat } from "./BurbleChat";
import DocsIcon from "@/public/icons/Documentos";
import UploadDocs from "./UploadDocs";
import { UserBurbleChat } from "./UserBurbleChat";

export function Chat() {
    const [showUploadDocs, setShowUploadDocs] = useState(false);
    const [message, setMessage] = useState("");
    const [sentMessage, setSentMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isDocumentLoaded, setIsDocumentLoaded] = useState(false); // Nuevo estado

    const handleDocsButtonClick = (e) => {
        e.preventDefault();
        setShowUploadDocs(true);
    };

    const handleCloseUploadDocs = (wasDocumentLoaded) => {
        setShowUploadDocs(false);
        if (wasDocumentLoaded) {
            setIsDocumentLoaded(true); // Solo marca como cargado si el documento fue cargado
        } else {
            setIsDocumentLoaded(false); // Asegura que no se habilite el chat si no se cargó el documento
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            setSentMessage(message);

            try {
                const response = await axios.get("http://127.0.0.1:8001/generate-answer/", {
                    params: { query: message }
                });

                setResponseMessage(response.data); // Almacena la respuesta del backend
            } catch (error) {
                console.error("Error al obtener respuesta:", error);
                setResponseMessage("Error al obtener respuesta");
            }

            setMessage(""); // Limpia el campo de entrada
        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            {showUploadDocs ? (
                <div className="bg-gray-200 w-[500px] h-[420px] rounded-xl p-4">
                    <UploadDocs onClose={handleCloseUploadDocs} />
                </div>
            ) : (
                <div className="bg-gray-200 w-[500px] h-[420px] rounded-xl p-4 flex flex-col gap-3">
                    <UserBurbleChat message={sentMessage || "..."} />
                    <BurbleChat message={
                        responseMessage
                            ? responseMessage  // Mostrar la respuesta si está disponible
                            : isDocumentLoaded
                                ? "Documento cargado, ingresa tu pregunta..."
                                : "Para empezar, carga un documento."
                    } /> 
                    <form className="flex mt-auto" onSubmit={handleSendMessage}>
                        <div className="flex bg-white rounded-xl w-full p-1 gap-1">
                            <input
                                type="text"
                                placeholder={isDocumentLoaded ? "Ingresa tu pregunta" : "Carga tu documento a la derecha ⮕"}
                                className="bg-white w-full rounded-xl p-2"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={!isDocumentLoaded} // Desactiva si no se cargó el documento
                            />
                            <button
                                onClick={handleDocsButtonClick}
                                type="button"
                                className="bg-gray-400 hover:bg-gray-500 rounded-full p-1"
                            >
                                <DocsIcon className="size-8 stroke-white" />
                            </button>
                            <button
                                type="submit"
                                className={`rounded-full p-1 ${isDocumentLoaded ? 'bg-gray-400 hover:bg-gray-500' : 'bg-gray-300 cursor-not-allowed'}`}
                                disabled={!isDocumentLoaded} // Desactiva si no se cargó el documento
                            >
                                <EnviarIcon className="size-8 stroke-white" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
