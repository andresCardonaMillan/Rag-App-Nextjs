import { useSession } from "next-auth/react";

export function UserBurbleChat({ message }) {
    const { data: session } = useSession()

    return (
        <div className="flex items-start gap-2.5 justify-end">
            <div className="flex flex-col gap-1 max-w-[320px] w-fit">
                <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-black">{session.user.name}</span>
                </div>
                <div className="flex flex-col leading-1.5 p-4 border-gray-200 rounded-s-xl rounded-se-xl bg-gray-600 max-w-full overflow-hidden break-words">
                    <p className="text-sm font-normal text-white">{message}</p>
                </div>
                <span className="text-sm font-normal text-gray-500 text-right pr-4">11:30</span>
            </div>
            <img
            className="w-8 h-8 rounded-full"
            src={session.user.image}
            alt={`Foto de ${session.user.name}`}
            />
        </div>
    );
}
