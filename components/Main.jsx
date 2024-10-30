import React from 'react'
import { Chat } from "@/components/Chat";
import {  signOut, useSession } from "next-auth/react"

const Main = () => {
    const { data: session } = useSession()
    return (
        <div className="bg-gradient-to-r from-white via-gray-100 to-gray-200  h-screen w-screen">
            <div className="bg-gray-300 w-full flex gap-5 p-4 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="source-code-pro font-semibold text-xl">
                        Bienvenid@ a RAG JSON´S {session.user.name}.
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <img src={session.user.image} className="h-[50px] w-[50px] rounded-full mr-2 gap-2" alt="" />
                    <button onClick={() => signOut()} className="source-code-pro bg-gray-400 p-2 rounded-md text-black hover:underline hover:bg-gray-500 hover:text-white">
                        Cerrar sesión
                    </button>
                </div>
            </div>

            <div className="flex justify-center pt-4">

                <Chat />
            </div>
        </div>
    )
}

export default Main