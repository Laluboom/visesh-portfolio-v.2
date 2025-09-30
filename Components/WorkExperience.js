const WorkExperience = () => {
    return (
        <div>
            <section className="container">
                <h2 className="text-center">
                    <small className="block text-sm text-gray-500">Recent</small>
                    Work Experience
                </h2>
                <div className="flex flex-col md:flex-row gap-8 mt-8">
                    {/* Workplace 1 */}
                    <article className="bg-yellow-100 p-6 rounded-2xl flex-1">
                        <figure className="relative w-full pb-[56.25%] overflow-hidden rounded-lg">
                            <img
                                src="Images/Workplace1.png"
                                alt="Workplace"
                                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                            <figcaption className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
                                Workplace - 1
                            </figcaption>
                        </figure>
                        <h3 className="mt-4 mb-2 text-lg font-semibold">Workplace - 1</h3>
                        <div className="font-semibold text-gray-700 mb-2">2000-2020</div>
                        <p className="mb-4">This is an example description for a workplace.</p>
                    </article>

                    {/* Workplace 2 */}
                    <article className="bg-yellow-100 p-6 rounded-2xl flex-1">
                        <figure className="relative w-full pb-[56.25%] overflow-hidden rounded-lg">
                            <img
                                src="Images/Workplace2.png"
                                alt="Workplace"
                                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                            <figcaption className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
                                Workplace - 2
                            </figcaption>
                        </figure>
                        <h3 className="mt-4 mb-2 text-lg font-semibold">Workplace - 2</h3>
                        <div className="font-semibold text-gray-700 mb-2">2000-2020</div>
                        <p className="mb-4">This is an example description for a workplace.</p>
                    </article>

                    {/* Workplace 3 */}
                    <article className="bg-yellow-100 p-6 rounded-2xl flex-1">
                        <figure className="relative w-full pb-[56.25%] overflow-hidden rounded-lg">
                            <img
                                src="Images/Workplace3.png"
                                alt="Workplace"
                                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                            <figcaption className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
                                Workplace - 3
                            </figcaption>
                        </figure>
                        <h3 className="mt-4 mb-2 text-lg font-semibold">Workplace - 3</h3>
                        <div className="font-semibold text-gray-700 mb-2">2000-2020</div>
                        <p className="mb-4">This is an example description for a workplace.</p>
                    </article>
                </div>
            </section>
        </div>
    )
}

export default WorkExperience