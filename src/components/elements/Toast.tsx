import { useState } from "preact/hooks";

export default function Toast({text}: {text: string}) {

    const [texto, setTexto] = useState(text);

    return (
        <div class="bg-black text-white">{texto}</div>
    );
}