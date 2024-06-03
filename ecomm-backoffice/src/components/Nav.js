import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { faBoxesStacked, faHouse, faList, faX ,faUser,faGear, faStore} from '@fortawesome/free-solid-svg-icons';

export default function Nav({ show, toggleNav }) {
    const inactiveLink = 'flex gap-2 p-1 px-8 items-center mr-0  '
    const activeLink = `${inactiveLink} bg-white text-blue-900  items-center rounded-l-xl max-md:rounded-xl `;

    const pathname = usePathname();

    return (
        <aside className={`${show ? 'left-0' : '-left-full'} top-0 text-white p-4 pr-0 max-md:p-4  max-md:fixed  bg-blue-900 w-screen h-screen md:static md:w-auto transition-all duration-300 ease-in-out max-sm:w-screen`}>
            <Link href="/dashboard" className="flex text-white mb-4 mr-3 items-center ">
                <FontAwesomeIcon icon={faStore} className="" />
                <span>ECommerce Admin</span>
            </Link>
            <nav className="flex flex-col gap-2">
                <Link href="/dashboard" className={pathname.includes('/dashboard') ? activeLink : inactiveLink}>
                    <FontAwesomeIcon icon={faHouse} className="w-5" />
                    <span>Dashboard</span>
                </Link>
                <Link href="/users" className={pathname.includes('/users') ? activeLink : inactiveLink}>
                    <FontAwesomeIcon icon={faUser} className="w-5" />
                    <span>Users</span>
                </Link>
                <Link href="/orders" className={pathname.includes('/orders') ? activeLink : inactiveLink}>
                    <FontAwesomeIcon icon={faList} className="w-5" />
                    <span>Orders</span>
                </Link>
                <Link href="/categories" className={pathname.includes('/categories') ? activeLink : inactiveLink}>
                    <FontAwesomeIcon icon={faBoxesStacked} className="w-5" />
                    <span>Categories</span>
                </Link>
                <Link href="/products" className={pathname.includes('/products') ? activeLink : inactiveLink}>
                    <FontAwesomeIcon icon={faBoxesStacked} className="w-5" />
                    <span>Products</span>
                </Link>
                <Link href="/settings" className={pathname.includes('/settings') ? activeLink : inactiveLink}>
                    <FontAwesomeIcon icon={faGear} className="w-5" />
                    <span>Settings</span>
                </Link>
            </nav>

                <div className="bg-white rounded-[50%] flex items-center justify-center p-2 w-10 h-10 mx-auto mt-5 hidden max-md:flex">
                    <FontAwesomeIcon
                        icon={faX}
                        className="close-btn text-blue-900"
                        onClick={() => toggleNav(false)}
                    />
                </div>

        </aside>
    );
}
