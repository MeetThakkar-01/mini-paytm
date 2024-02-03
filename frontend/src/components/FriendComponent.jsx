export default function FriendComponent({ username }) {
    return <div className="flex justify-start items-center p-2">
        <img className="ml-2 inline-block h-8 w-8 rounded-full ring-2 bg-slate-400 ring-white bg-no-repeat" src="" alt="UU" />
        <p className="pl-2 text-lg font-semibold">{username}</p>

    </div>
}
