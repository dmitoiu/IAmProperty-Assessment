import React, {useEffect} from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {CheckIcon, ClipboardIcon, ShareIcon} from '@heroicons/react/24/outline'
import {useLocation} from "react-router-dom";

export default function ShareDialog({dialogOpen, showShareProjectDialog}) {
    const [open, setOpen] = useState(true);
    const location = useLocation();
    let backButtonRef = React.createRef();

    if(location.pathname === "/"){
        location.pathname = "";
    }

    useEffect(() => {
        if(backButtonRef.current !== null){
            backButtonRef.current.focus();
        }
    })

    return (
        <Transition.Root show={dialogOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={showShareProjectDialog}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                        <ShareIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Darie-Dragoș Mitoiu Payroc Assessment
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <div>
                                                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">

                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                                      http://
                                                    </span>
                                                    <input
                                                        type="text"
                                                        name="company-website"
                                                        id="company-website"
                                                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-red-500 focus:border-red-500 sm:text-sm border-gray-300"
                                                        value={"dmitoiu.com" + location.pathname}
                                                        disabled={true}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {navigator.clipboard.writeText("www.dmitoiu.com" + location.pathname)}}
                                                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                                                        autoFocus={true}
                                                    >
                                                        <ClipboardIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        <span>Copy</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                                        onClick={() => showShareProjectDialog(false)}
                                        ref={backButtonRef}
                                    >
                                        Go back
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}