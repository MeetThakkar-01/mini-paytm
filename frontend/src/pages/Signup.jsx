import { useState } from "react";
import BottomInfo from "../components/BottomInfo";
import FormButton from "../components/FormButton";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import InputComponent from "../components/inputComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    return <div className="h-screen bg-slate-300 flex justify-center items-center">
        <div className="bg-white h-auto w-1/4 p-2 rounded-2xl shadow-md flex flex-col items-center">
            <Header header={"Sign Up"}></Header>
            <SubHeader subHeading={"Enter Your Information to Create an Account."} />
            <InputComponent label={"First Name"} placeholder={"Enter First Name"} 
            onChange={(e) => setFirstName(e.target.value)} />
            <InputComponent label={"Last Name"} placeholder={"Enter Last Name"} 
            onChange={(e) => setLastName(e.target.value)}/>
            <InputComponent label={"Email"} placeholder={"Enter Email"} 
            onChange={(e) => setUsername(e.target.value)}/>
            <InputComponent label={"Password"} placeholder={"Enter Password"} 
            onChange={(e) => setPassword(e.target.value)}/>

            <FormButton buttonText={"Sign Up"} onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username, firstName, lastName, password
                });

                localStorage.setItem("token", response.data.token);
                navigate("/dashboard")

            }}/>


            <BottomInfo string={"Already have an account? "} linkTxt={"Sign In"} link={"signin"} />


        </div>
    </div>
}