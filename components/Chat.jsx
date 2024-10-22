
import EnviarIcon from "@/public/icons/Enviar";
import { BurbleChat } from "./BurbleChat";
import DocsIcon from "@/public/icons/Documentos";

export function Chat () {
    return (
        <div>
            <div className="bg-gray-200 w-[500px] h-[420px] rounded-xl p-4 ">
            <BurbleChat/>
            <form className="flex">
                <div className="flex bg-white rounded-xl w-full p-1 gap-1 mt-56">
                <input type="text" placeholder="Ingrese su pregunta" className="bg-white w-full rounded-xl p-2" />
                
                <button className="bg-gray-400 hover:bg-gray-500 rounded-full p-1">
                    <DocsIcon className="size-8 stroke-white"/>
                </button>
                <button className="bg-gray-400 hover:bg-gray-500 rounded-full p-1">
                    <EnviarIcon className="size-8 stroke-white"/>
                </button>
                
                </div>
            </form>
            </div>
            
        </div>
    )
}

