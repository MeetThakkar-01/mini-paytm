import { useNavigate } from "react-router-dom";

export default function User({UserName, userId}) {

    const navigate = useNavigate();

    return <div className="flex justify-start items-center p-4">
        <img className="ml-2 inline-block h-8 w-8 rounded-full ring-2 bg-slate-400 ring-white bg-no-repeat" src="" alt="UU" />
        <p className="pl-2 text-lg font-semibold">{UserName}</p>
        <button className="ml-auto h-auto w-auto p-3 rounded-lg bg-black text-white" 
        onClick={e => {
            navigate("/send?id=" + userId + "&name="+ UserName);
        }}>Send Money</button>
    </div>
}