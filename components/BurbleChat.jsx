import React, { useState, useEffect } from 'react';

export function BurbleChat({ message = '' }) {
   const [displayedMessage, setDisplayedMessage] = useState('');

   useEffect(() => {
      setDisplayedMessage(''); // Reinicia el mensaje visible antes de comenzar
      let accumulatedMessage = ''; // Variable para acumular el mensaje completo

      for (let i = 0; i < message.length; i++) {
         setTimeout(() => {
            accumulatedMessage += message[i];
            setDisplayedMessage(accumulatedMessage); // Muestra el mensaje acumulado
         }, i * 50); // Controla la velocidad del efecto
      }
   }, [message]);

   return (
      <div className="flex items-start gap-2.5 relative">
         <img
            className="w-8 h-8 rounded-full"
            src="https://i.pinimg.com/564x/bb/f7/24/bbf724f7fc662cfafae64534698e8dd9.jpg?size=sm&ratio=sq&f=jpg"
            alt="Foto"
         />
         <div className="flex flex-col gap-1 w-full max-w-[320px]">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
               <span className="text-sm font-semibold text-black">JSON BOT</span>
            </div>
            <div className="flex flex-col p-4 border-gray-200 rounded-e-xl rounded-es-xl bg-black w-fit max-w-full overflow-y-auto max-h-[150px] break-words
                              [&::-webkit-scrollbar]:w-2
                                       [&::-webkit-scrollbar-track]:bg-black
                                       [&::-webkit-scrollbar-thumb]:bg-gray-400
                                       ">
               <p className="text-sm font-normal text-white">
                  {displayedMessage}
               </p>
            </div>

         </div>
      </div>
   );
}
