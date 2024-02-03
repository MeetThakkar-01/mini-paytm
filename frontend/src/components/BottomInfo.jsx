import { Link } from "react-router-dom";

export default function BottomInfo({string, linkTxt, link}) {
    return <>
        <div className="font-medium">{string}<Link className="underline cursor-pointer" to={"/" + link}>{linkTxt}</Link></div></>
}