import React from "react";

const Hero = () => {
    return (
        <div>
            <section className="container mx-auto flex flex-col md:flex-row gap-8 p-4">
                {/* Hero Blue Section */}
                <div className="flex-1 bg-blue-100 rounded-2xl p-8 flex flex-col justify-center">
                    <div>
                        <h1 className="text-4xl font-bold">
                            <small className="block text-lg font-light">Hi, I'm</small>
                            Visesh
                        </h1>
                        <p className="mt-4 text-base leading-relaxed">
                            A Mathematics with Data Science undergraduate at City University London, skilled in SolidWorks,
                            AutoCAD, Inventor, and robotics, with practical experience in production operations and quality testing.
                            Proficient in Python programming, HTML, CSS, and JavaScript, and adept at utilizing cutting-edge
                            technologies to enhance operational efficiency.
                            <span className="block mt-2 font-semibold hidden md:block">
                                Strong expertise in technical communication ensures effective collaboration and clear articulation
                                of complex ideas across teams and stakeholders.
                            </span>
                        </p>
                        <div className="mt-6 flex flex-wrap space-x-4 space-y-2">
                            <a
                                href="Files/Visesh Akbari Resume.pdf"
                                className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                            >
                                Download Resume
                            </a>
                            <a
                                href="mailto:viseshakbari@gmail.com?subject=Query&body=Please%20provide%20your%20message%20here."
                                className="bg-white text-black py-2 px-4 rounded border border-black hover:bg-gray-100"
                            >
                                Mail Me
                            </a>
                        </div>
                        <div className="mt-6 flex space-x-4">
                            <a href="https://github.com/Laluboom" target="_blank" rel="noopener noreferrer">
                                <img src="Images/Github-Logo.png" alt="github" className="w-12" />
                            </a>
                            <a href="https://www.linkedin.com/in/viseshakbari/" target="_blank" rel="noopener noreferrer">
                                <img src="Images/LinkedIn-Logo.png" alt="linkedin" className="w-12" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Hero Yellow Section */}
                <div className="flex-1 bg-yellow-300 rounded-2xl px-8 flex justify-center items-end">
                    <img src="Images/Visesh-Akbari.png" alt="Visesh-Akbari" className="max-w-3/5 py-16" />
                </div>
            </section>
        </div>
    );
};

export default Hero;
