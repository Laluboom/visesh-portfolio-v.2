const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex justify-center space-x-4">
                <li><a href="#Home" className="text-white hover:text-gray-400">Home</a></li>
                <li><a href="#About" className="text-white hover:text-gray-400">About</a></li>
                <li><a href="#Projects" className="text-white hover:text-gray-400">Projects</a></li>
                <li><a href="#Contact" className="text-white hover:text-gray-400">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar