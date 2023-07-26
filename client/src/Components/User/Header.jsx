import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../redux-toolkit/slices/userSlice"
import { FaHeart } from 'react-icons/fa';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';

const navigation = [
    { name: 'Dashboard', href: '/user/dashboard', current: false },
    { name: 'Trainers', href: '/user/trainers', current: false },
    { name: 'Sessions', href: '/user/sessions', current: false },
]
const userNavigation = [
    { name: 'My Account', href: '#', id: 'account' },
    { name: 'Sign out', href: '#', id: 'signout' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header({ notifications, setNotifications, setSelectedChat }) {
    const user = useSelector((state) => state.loggedUser.userInfo)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pathname = location.pathname
    useEffect(() => {
        navigation.map((item) => {
            if (item.href === pathname) {
                item.current = true
            }
        })
    }, [pathname])

    const handleClick = (id) => {
        if (id === "signout") {
            Cookies.remove("accessToken")
            dispatch(logoutUser())
            navigate("/login")
        } else if (id === "account") {
            navigate("/user/account")
        }
    }
    return (
        <>
            <Disclosure as="nav" className="custom-dark-blue">
                { ({ open }) => (
                    <>
                        <div className="mx-auto h-92 max-w-7xl px-10 sm:px-6 lg:px-8">
                            <div className="flex py-24 px-20 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Link to="/">
                                            <img
                                                className="w-40 h-40"
                                                src="/logo.png"
                                                alt="Your Company"
                                            />
                                        </Link>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            { navigation.map((item) => (
                                                <a
                                                    key={ item.name }
                                                    href={ item.href }
                                                    className={ classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-custom-yellow'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-20 py-2 text-sm font-medium'
                                                    ) }
                                                    aria-current={ item.current ? 'page' : undefined }
                                                >
                                                    { item.name }
                                                </a>
                                            )) }
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6 px-20 gap-10">
                                        <button
                                            type="button"
                                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            onClick={ () => navigate("/user/account") }
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <FaHeart
                                                className="text-gray-300 w-18 h-18 cursor-pointer"
                                            />
                                        </button>
                                        {/* Notification dropdown */ }
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="flex max-w-xs items-center rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="sr-only">View notifications</span>
                                                    <Stack spacing={ 2 } direction="row">
                                                        <Badge badgeContent={ notifications.length > 0 ? notifications.length : "0" } color="secondary">
                                                            <BellIcon className="h-20 w-20 text-white" color="action" />
                                                        </Badge>
                                                    </Stack>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={ Fragment }
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 my-10 w-60 h-92 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style={ { width: '218px' } }>
                                                    { !notifications.length && <span className='block px-8 py-8 text-sm text-gray-700 cursor-pointer'>No New Messages</span> }
                                                    { notifications.map((item) => (
                                                        <Menu.Item key={ item._id } >
                                                            { ({ active }) => (
                                                                <a
                                                                    onClick={ () => {
                                                                        setSelectedChat(item.sender._id)
                                                                        setNotifications(notifications.filter((n) => n !== item));
                                                                    } }
                                                                    className={ classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-8 py-8 text-sm text-gray-700 cursor-pointer'
                                                                    ) }
                                                                >
                                                                    { `New Message from ${ item.sender.firstName } ` }
                                                                </a>
                                                            ) }
                                                        </Menu.Item>
                                                    )) }
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>

                                        {/* Profile dropdown */ }
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="sr-only">Open user menu</span>
                                                    { !user.profilePic ?
                                                        <img className="h-30 w-30 rounded-full object-cover" src="/images/user-plceholder.png" alt="" />
                                                        :
                                                        <img className="h-30 w-30 rounded-full object-cover" src={ user.profilePic } alt="" />

                                                    }
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={ Fragment }
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 my-10 w-60 h-92 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style={ { width: '110px', height: '81px' } }>
                                                    { userNavigation.map((item) => (
                                                        <Menu.Item key={ item.name } >
                                                            { ({ active }) => (
                                                                <a
                                                                    onClick={ () => {
                                                                        handleClick(item.id)
                                                                    } }
                                                                    className={ classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-8 py-8 text-sm text-gray-700 cursor-pointer'
                                                                    ) }
                                                                >
                                                                    { item.name }
                                                                </a>
                                                            ) }
                                                        </Menu.Item>
                                                    )) }
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */ }
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">Open main menu</span>
                                        { open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        ) }
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                { navigation.map((item) => (
                                    <Disclosure.Button
                                        key={ item.name }
                                        as="a"
                                        href={ item.href }
                                        className={ classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        ) }
                                        aria-current={ item.current ? 'page' : undefined }
                                    >
                                        { item.name }
                                    </Disclosure.Button>
                                )) }
                            </div>
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={ user.profilePic } alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">{ user.name }</div>
                                        <div className="text-sm font-medium leading-none text-gray-400">{ user.email }</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    { userNavigation.map((item) => (
                                        <Disclosure.Button
                                            key={ item.name }
                                            as="a"
                                            href={ item.href }
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            { item.name }
                                        </Disclosure.Button>
                                    )) }
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                ) }
            </Disclosure>
        </>
    )
}
