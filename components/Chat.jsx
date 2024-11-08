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

    const handleDocsButtonClick = (e) => {
        e.preventDefault(); 
        setShowUploadDocs(true);
    };

    const handleCloseUploadDocs = () => {
        setShowUploadDocs(false);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            setSentMessage(message);

            try {
                const response = await axios.get("http://127.0.0.1:8001/generate-answer/", {
                   params:{ query: message}
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
                    <BurbleChat message={responseMessage || "¿Cómo puedo ayudarte hoy?" }/> {/* respuesta en BurbleChat */}
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
