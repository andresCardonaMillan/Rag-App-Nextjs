import { useDropzone } from 'react-dropzone';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const UploadDocs = ({ onClose }) => {
    const [dataURL, setDataURL] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState(() => {
        const savedFiles = localStorage.getItem("uploadedFiles");
        return savedFiles ? JSON.parse(savedFiles) : [];
    });
    const [uploadMessage, setUploadMessage] = useState("");

    useEffect(() => {
        localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
    }, [uploadedFiles]);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                const binaryStr = reader.result;
                setDataURL(binaryStr);
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const { getRootProps, acceptedFiles, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleUpload = async () => {
        if (acceptedFiles.length > 0) {
            setUploadedFiles((prevFiles) => [
                ...prevFiles,
                ...acceptedFiles.map((file) => ({
                    name: file.name,
                    url: URL.createObjectURL(file),
                }))
            ]);
            setUploadMessage("Documento subido exitosamente!");

            try {
                const formData = new FormData();
                formData.append('file', selectedFile);

                const response = await axios.post("http://127.0.0.1:8001/save-document/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                console.log("Respuesta del servidor:", response.data);
            } catch (error) {
                console.error("Error al subir el documento al servidor:", error);
                setUploadMessage("Error al subir el documento al servidor.");
            }

            setTimeout(() => setUploadMessage(""), 3000);
        }
    };

    const selectedFile = acceptedFiles[0];

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex flex-col items-center justify-center">
            <div className="bg-gray-200 w-[500px] h-[500px] rounded-xl p-4 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 text-2xl hover:text-gray-700 hover:underline">
                    X
                </button>
                <h2 className="text-3xl justify-center text-center source-code-pro">Mis Documentos</h2>
                <form className="text-center mt-4">
                    <div
                        className="w-full h-[20vh] border-2 border-dashed border-gray-400 flex justify-center items-center cursor-pointer"
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} className="hidden" />
                        {dataURL && selectedFile ? (
                            <div className="text-gray-600 flex flex-col justify-center items-center">
                                <p className="text-lg font-semibold">Archivo seleccionado:</p>
                                <p className="mt-1">{selectedFile.name}</p>
                            </div>
                        ) : isDragActive ? (
                            <div className="flex flex-col justify-center items-center text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    height="50"
                                    width="50"
                                    fill="currentColor"
                                >
                                    <path d="M1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811L7 21C3.64378 20.7257 1 17.9216 1 14.5ZM16.8483 18.9868C19.1817 18.8093 21 16.8561 21 14.5C21 12.927 20.1884 11.4962 18.8771 10.6781L18.0714 10.1754L17.9517 9.23338C17.5735 6.25803 15.0288 4 12 4C8.97116 4 6.42647 6.25803 6.0483 9.23338L5.92856 10.1754L5.12288 10.6781C3.81156 11.4962 3 12.927 3 14.5C3 16.8561 4.81833 18.8093 7.1517 18.9868L7.325 19H16.675L16.8483 18.9868ZM13 13V17H11V13H8L12 8L16 13H13Z"></path>
                                </svg>
                                <p className="mt-2 text-lg">Suelta tus archivos aquí</p>
                            </div>
                        ) : (
                            <div className="flex flex-col justify-center items-center text-gray-600">
                                <p className="text-lg">Arrastra aquí tus archivos o haz clic para cargarlos.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex items-center justify-center space-x-4">
                        <button
                            type="button"
                            onClick={handleUpload}
                            className="bg-gray-400 hover:bg-gray-500 rounded-full source-code-pro p-1"
                        >
                            SUBIR DOCUMENTO
                        </button>
                        {uploadMessage && <p className="text-green-500 font-semibold">{uploadMessage}</p>}
                    </div>
                </form>

                {uploadedFiles.length > 0 && (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold text-gray-700">Documentos Subidos</h2>
                        <ul className="mt-2 space-y-2 max-h-32 overflow-y-auto 
                                       [&::-webkit-scrollbar]:w-2
                                       [&::-webkit-scrollbar-track]:bg-gray-200
                                       [&::-webkit-scrollbar-thumb]:bg-gray-500
                                       [&::-webkit-scrollbar-thumb]:rounded-full">
                            {uploadedFiles.map((file, index) => (
                                <li key={index} className="flex items-center space-x-4">
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {file.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadDocs;