export function BurbleChat () {
    return ( 
<div class="flex items-start gap-2.5 relative">
   <img class="w-8 h-8 rounded-full" src="https://img.lalr.co/cms/2015/10/26214616/maluma1027-1000.jpg?size=sm&ratio=sq&f=jpg" alt="Foto"/>
   <div class="flex flex-col gap-1 w-full max-w-[320px]">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
         <span class="text-sm font-semibold text-black">Maluma</span>
      </div>
      <div class="flex flex-col p-4 border-gray-200 rounded-e-xl rounded-es-xl bg-black w-fit max-w-full overflow-hidden break-words">
         <p class="text-sm font-normal text-white">
            Textoooooooooooooooooooooooooooo
         </p>
      </div>
      <span class="text-sm font-normal text-gray-500 pl-4">11:30</span>
   </div>
</div>

    )
}