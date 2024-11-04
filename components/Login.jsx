import Google from "@/public/icons/Google";
import {  signIn } from "next-auth/react"

const Login = () => {
    return (
        <div className="bg-blue-400 h-screen w-screen flex items-center">
            <div className="flex justify-center w-full">
                <div className="bg-white rounded-xl w-[400px] h-[450px] flex justify-center items-center">
                    <div className="flex-row text-center">
                        <h1 className="text-3xl font-bold mb-64">RAG - JSON's</h1>
                        <button onClick={() => signIn('google')} className="bg-black text-white p-2 rounded-md flex font-semibold gap-2 hover:bg-black/80"><Google className="size-6" />Login with google</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
