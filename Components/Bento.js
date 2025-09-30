import React from 'react'
import Image from 'next/image'

const Bento = () => {
    return (
        <div>
            <section id="Projects" className="container">
                <h2 className="text-center">
                    <small className="block text-sm text-gray-500">Previous</small>
                    Completed Projects
                </h2>
                <div className="grid gap-6 grid-cols-5 grid-rows-4 h-[960px] mt-8 md:grid-rows-8 md:h-auto md:grid-cols-1 md:flex md:flex-col md:gap-6">
                    {/* Bento Items */}
                    <a
                        href="#"
                        className="relative overflow-hidden bg-gray-100 rounded-lg col-span-2 row-span-2 md:h-[240px]"
                    >
                        <img
                            src="../public/Images/Bento1.png"
                            alt="Project-1"
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                    </a>
                    <a
                        href="#"
                        className="relative overflow-hidden bg-gray-100 rounded-lg col-span-2 row-span-1 md:h-[240px] md:col-span-3 md:row-span-2"
                    >
                        <img
                            src="Images/Bento2.png"
                            alt="Project-2"
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                    </a>
                    <a
                        href="#"
                        className="relative overflow-hidden bg-gray-100 rounded-lg col-span-1 row-span-1 md:h-[240px] md:col-span-3 md:row-span-2"
                    >
                        <img
                            src="Images/Bento3.png"
                            alt="Project-3"
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                    </a>
                    <a
                        href="#"
                        className="relative overflow-hidden bg-gray-100 rounded-lg col-span-1 row-span-1 md:h-[240px] md:col-span-2 md:row-span-4"
                    >
                        <img
                            src="Images/Bento4.png"
                            alt="Project-4"
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                    </a>
                    <a
                        href="#"
                        className="relative overflow-hidden bg-gray-100 rounded-lg col-span-2 row-span-1 md:h-[240px] md:col-span-3 md:row-span-2"
                    >
                        <img
                            src="Images/Bento5.png"
                            alt="Project-5"
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                    </a>
                    <a
                        href="#"
                        className="relative overflow-hidden bg-gray-100 rounded-lg col-span-5 row-span-3 md:h-[240px] md:col-span-5 md:row-span-2"
                    >
                        <img
                            src="Images/Bento6.png"
                            alt="Project-6"
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                    </a>
                </div>
            </section>

        </div>
    )
}

export default Bento