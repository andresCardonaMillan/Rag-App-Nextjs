export function BurbleChat ({message}) {
    return ( 
<div class="flex items-start gap-2.5 relative">
   <img class="w-8 h-8 rounded-full" src="https://i.pinimg.com/564x/bb/f7/24/bbf724f7fc662cfafae64534698e8dd9.jpg?size=sm&ratio=sq&f=jpg" alt="Foto"/>
   <div class="flex flex-col gap-1 w-full max-w-[320px]">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
         <span class="text-sm font-semibold text-black">JSON BOT</span>
      </div>
      <div class="flex flex-col p-4 border-gray-200 rounded-e-xl rounded-es-xl bg-black w-fit max-w-full overflow-hidden break-words">
         <p class="text-sm font-normal text-white">
            {message}
         </p>
      </div>
      <span class="text-sm font-normal text-gray-500 pl-4">11:30</span>
   </div>
</div>

    )
}