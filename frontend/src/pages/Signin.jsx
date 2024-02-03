import BottomInfo from "../components/BottomInfo";
import FormButton from "../components/FormButton";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import InputComponent from "../components/inputComponent";

export default function Signin() {
    return <div className="h-screen bg-slate-300 flex justify-center items-center">
        <div className="bg-white h-auto w-1/4 p-2 rounded-2xl shadow-md flex flex-col items-center">
            <Header header={"Sign In"}></Header>
            <SubHeader subHeading={"Enter your credentials to access your account."} />
            <InputComponent label={"Email"} placeholder={"Enter Email"} />
            <InputComponent label={"Password"} placeholder={"Enter Password"} />

            <FormButton buttonText={"Sign In"} />


            <BottomInfo string={"Don't have an account? "} linkTxt={"Sign Up"} link={"signup"}/>


        </div>
    </div>
}