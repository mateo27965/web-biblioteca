import { useState } from "react"


const Busqueda = () => {
    const [ open , setOpen]=useState(true)

    return(
        <>
        <button
        class="open-modal-button uppercase w-[118px] h-[21px] bg-[#AFA8A8] font-ddin text-center text-[9px] flex flex-row items-center justify-center gap-2 xl:w-[126px] xl:h-[27px] xl:text-[12px]"
        >
        Agenda una cita
        </button>
        <div
        class="modal hidden fixed inset-0 z-50 overflow-auto flex items-center justify-center"
        >

        <div class="modal-overlay bg-black opacity-50 absolute inset-0 h-full"></div>

        <div
            class="modal-content bg-white w-11/12 p-4 rounded shadow-lg relative z-10 max-w-[373px]"
        >
            <div
            class="w-full h-auto border-2 border-black flex flex-col items-center justify-center p-[10px]"
            >


            <div
                class="w-full h-auto flex flex-row items-center justify-around pt-[10px]"
            >
                <button
                class="close-modal-button w-[120px] uppercase font-ddin-bold bg-black text-white px-4 py-2 text-[20px]"
                >
                Enviar
                </button>
                <button
                type="button"
                class="close-modal-button absolute top-[-20px] right-[-20px] rounded-full p-2 border border-white text-white hover:bg-black hover:border-black"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-x"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                </button>
            </div>

            </div>
        </div>
        </div>
        </>
    )
}