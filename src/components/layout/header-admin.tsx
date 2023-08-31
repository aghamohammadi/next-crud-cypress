import Link from "next/link";

const Header = () => {
    return ( 
        <div className="sm:px-6 lg:px-10 py-4">
            <Link href="/" className="text-sm font-semibold leading-6 text-gray-900">
                Home
            </Link>
        </div>
     );
}
 
export default Header;