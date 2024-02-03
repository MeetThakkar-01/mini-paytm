export default function FormButton({ buttonText, onClick }) {
    return <>
        <div className="button pl-3 py-5 w-full">
            <button onClick={onClick} className=" bg-black text-white h-10 w-11/12 font-medium rounded-lg">{buttonText}</button>
        </div>
    </>
}