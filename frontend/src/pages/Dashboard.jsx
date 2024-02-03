import axios from "axios";
import Balance from "../components/Balance";
import Navbar from "../components/Navbar";
import User from "../components/User";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {

            headers: {
                'auth': "Bearer " + localStorage.getItem("token"),
            }
        }).then(res => setUsers(res.data.user));
    }, [filter])

    return <div>

        <Navbar User={"Meet"} />
        <Balance Balance={"12000"} />

        <div className="p-4">
            <p className="text-xl font-semibold mb-2">Users </p>
            <input className="p-2 border-2 border-black w-full" placeholder="Search users....." 
            onChange={e => setFilter(e.target.value)}></input>
        </div>

        <div>
            {users.map(user => <User UserName={user.firstName + " " + user.lastName} userId={user._id}/>)}
        </div>


    </div>
}
