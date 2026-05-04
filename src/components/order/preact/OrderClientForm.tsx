import { useStore } from "@nanostores/preact";
import { checkOrderName, checkPhoneNumber, orderName, orderPhone } from "../../../utils/nanoStores/order";
import { useState } from "preact/hooks";

export default function OrderClientForm() {
    const name = useStore(orderName);
    const phone = useStore(orderPhone);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);

    const handleNameChange = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        if (!checkOrderName(target.value)) {
            setIsNameValid(false);
        } else {
            setIsNameValid(true);
        };
        orderName.set(target.value);
    };

    const handlePhoneChange = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        if (!checkPhoneNumber(target.value)) {
            setIsPhoneValid(false);
        } else {
            setIsPhoneValid(true);
        };
        orderPhone.set(target.value);
    };

    return (
        <div id="ticket-client-data" class="w-full px-4 py-4">
            <form id="ticket-client-form" class="flex flex-col items-center gap-2">
                <div class="flex w-full max-w-100 flex-col gap-2 text-start">
                    <label
                        for="name"
                        class="text-xs font-bold tracking-wider text-neutral-200 uppercase"
                    >
                        Nombre completo (Obligatorio)
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="ticket-client-name"
                        required
                        placeholder="Nombre completo"
                        value={name}
                        onInput={handleNameChange}
                        class={`rounded-sm border bg-stone-50 px-4 py-3 transition-colors focus:outline-none ${
                        isNameValid 
                            ? "border-stone-200 focus:border-green-800" 
                            : "border-4 border-red-700"
                        }`}                    />
                </div>
                
                <div class="flex w-full max-w-100 flex-col gap-2 text-start">
                    <label
                        for="phone"
                        class="text-xs font-bold tracking-wider text-neutral-200 uppercase"
                    >
                        Teléfono (Obligatorio)
                    </label>
                    <input
                        type="number"
                        name="phone"
                        id="ticket-client-phone"
                        required
                        placeholder="Teléfono"
                        value={phone}
                        onInput={handlePhoneChange}
                        class={`rounded-sm border bg-stone-50 px-4 py-3 transition-colors focus:outline-none ${
                        isPhoneValid 
                            ? "border-stone-200 focus:border-green-800" 
                            : "border-4 border-red-700"
                        }`}                    />
                </div>
            </form>
        </div>
    );
}