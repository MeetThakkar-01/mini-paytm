export default function Navbar({User}) {
    return <nav className="flex justify-between h-auto p-3 bg-slate-300">
            <div className="text-lg font-bold p-1">Payments App</div>
            <div className="p-1 flex items-center">
                <p>Hello, {User} </p>
                <img className="ml-2 inline-block h-8 w-8 rounded-full ring-2 ring-white bg-no-repeat" src="" alt={User[0]+User[1]} />
            </div>
        </nav>
}