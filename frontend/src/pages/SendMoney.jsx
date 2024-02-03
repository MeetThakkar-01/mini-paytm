import FormButton from "../components/FormButton";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import InputComponent from "../components/inputComponent";
import FriendComponent from "../components/FriendComponent";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function SendMoney() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    return <div className="h-screen bg-slate-300 flex justify-center items-center">
        <div className="bg-white h-auto w-1/4 p-2 rounded-2xl shadow-md flex flex-col items-center">
            <Header header={"Send Money"}></Header>
            <SubHeader subHeading={"Initiate Transfer To."} />
            <FriendComponent username={name}></FriendComponent>
            <InputComponent label={"Amount (in Rs)"} placeholder={"Enter Amount"} 
            onChange={e => setAmount(e.target.value)} />


            <FormButton buttonText={"Initiate Transfer"} onClick={async (e) => {
                const reponse = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                    to: id,
                    amount: amount
                }, {
                    headers: {
                        'auth': "Bearer " + localStorage.getItem("token"),
                    }
                });
            }} />

        </div>
    </div>
}