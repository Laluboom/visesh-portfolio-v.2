const Skills = () => {
    return (
        <section id="Skills" className="container">
            <h2 className="text-center">
                <small className="block text-sm text-gray-500">About Me</small>
                Skills
            </h2>
            <div className="bg-blue-100 rounded-2xl p-8 flex flex-col md:flex-row gap-8">
                {/* Left Column */}
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4">Frontend</h3>
                    <ul className="flex flex-wrap gap-4 mb-8">
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">HTML</li>
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">CSS</li>
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">JavaScript</li>
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">...</li>
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">AutoCAD</li>
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">...</li>
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">...</li>
                    </ul>
                    <h3 className="text-xl font-semibold mb-4">Backend</h3>
                    <ul className="flex flex-wrap gap-4">
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">...</li>
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">...</li>
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">...</li>
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">Python</li>
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">SolidWorks</li>
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">...</li>
                        <li className="inline-block bg-blue-400 text-white py-2 px-4 rounded-lg">Inventor</li>
                    </ul>
                </div>

                {/* Right Column */}
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4">A bit about me</h3>
                    <p className="mb-4">
                        First-year Mathematics student who is a Data Science student at City University London,
                        passionate about exploring the universe through the lens of philosophy, robotics, and data
                        science. With a background in robotics and web development (Python, HTML, CSS, JavaScript),
                        I aim to bridge technology with my deep passion for math and philosophical insight for
                        innovative solutions and lasting prosperity. Aspiring to pursue a PhD and contribute to the
                        world of research and development that can make a significant impact on society. Currently
                        working on exploring AI functionalities with Raspberry Pi.
                    </p>
                    <p>
                        I have currently made a customized AI chatbot using Python. I plan to add JARVIS-like
                        functionality in my life and automate it.
                    </p>
                </div>
            </div>
        </section>

    );
};

export default Skills;