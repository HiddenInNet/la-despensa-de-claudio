import { useStore } from "@nanostores/preact";
import { orderName, orderPhone } from "../../../utils/nanoStores/order";

export default function OrderClientForm() {
    // Leemos los valores del store reactivamente
    const name = useStore(orderName);
    const phone = useStore(orderPhone);

    const handleNameChange = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        console.log(target.value)
        orderName.set(target.value);
    };

    const handlePhoneChange = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
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
                        Nombre completo
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="ticket-client-name"
                        required
                        placeholder="Nombre completo"
                        value={name}
                        onInput={handleNameChange}
                        class="rounded-sm border border-stone-200 bg-stone-50 px-4 py-3 transition-colors focus:border-green-800 focus:outline-none"
                    />
                </div>
                
                <div class="flex w-full max-w-100 flex-col gap-2 text-start">
                    <label
                        for="phone"
                        class="text-xs font-bold tracking-wider text-neutral-200 uppercase"
                    >
                        Teléfono
                    </label>
                    <input
                        type="number"
                        name="phone"
                        id="ticket-client-phone"
                        required
                        placeholder="Teléfono"
                        value={phone}
                        onInput={handlePhoneChange}
                        class="rounded-sm border border-stone-200 bg-stone-50 px-4 py-3 transition-colors focus:border-green-800 focus:outline-none"
                    />
                </div>
            </form>
        </div>
    );
}