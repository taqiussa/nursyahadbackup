import { Link } from '@inertiajs/react';
import logo from '../../../public/images/logo.png'

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div>
                <Link href="/" className='flex flex-col justify-center items-center space-y-7'>
                    <img src={logo} className='w-28' alt='logo'/>
                    <div className="text-emerald-500 text-xl lg:text-3xl font-bold lg:tracking-widest text-center">
                        SD KARAKATER NUR SYAHAD
                    </div>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
