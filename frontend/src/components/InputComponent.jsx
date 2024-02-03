export default function InputComponent({label, placeholder, onChange}) {
    return <>
    <div className="input flex flex-col items-start self-start pl-3 py-4 w-full">
                <h1 className="text-lg font-semibold">{label}</h1>
                <input type="text" onChange={onChange} className=" border-stone-300 border-2 p-3 h-10 w-11/12 rounded-md mt-1" placeholder={placeholder} />
            </div>
    </>
}