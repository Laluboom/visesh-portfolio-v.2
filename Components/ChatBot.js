const ChatBot = () => {
    return (
        <div>
            <section className="chatbot container">
                <h2>
                    <small>Talk To Me</small>
                    ChatBot
                </h2>
                <div className="bg-blue-100 rounded-3xl p-8 gap-8 flex flex-col lg:flex-row">
                    <div className="flex-3 pr-8">
                        <h3 className="text-xl font-bold mb-4">AI Chatbot</h3>
                        <p className="mb-6">
                            I have made a customized AI chatbot using Python and free cloud computation provided by Krutim AI.
                            It is currently a friendly AI chatbot that you can chat with.
                        </p>
                        <p className="mb-6">
                            Feel free to download my resume here. I'm actively seeking new opportunities, so if you have a role or
                            project you think I’d be a great fit for, please reach out via email. I’m also open to collaborating on
                            exciting projects. Let’s connect on LinkedIn!
                        </p>
                        <a
                            id="chatbot-info-resume-link"
                            href="Files/Visesh Akbari Resume.pdf"
                            className="button black bg-black text-white px-4 py-2 rounded-md"
                        >
                            Download Resume
                        </a>
                    </div>
                    <div className="flex-4 bg-white rounded-lg p-6 flex flex-col">
                        <div className="flex-1 overflow-y-scroll">
                            <ul className="flex flex-col justify-end gap-4">
                                <li className="flex items-center gap-4">
                                    <span className="bg-blue-400 text-white w-16 h-16 rounded-full flex items-center justify-center">
                                        AI
                                    </span>
                                    <div className="flex-1">Hi. Can I help you?</div>
                                </li>
                                <li className="flex items-center gap-4 flex-row-reverse text-right">
                                    <span className="bg-yellow-400 text-white w-16 h-16 rounded-full flex items-center justify-center">
                                        User
                                    </span>
                                    <div className="flex-1">Yes.</div>
                                </li>
                                {/* Add other chat messages similarly */}
                            </ul>
                        </div>
                        <div className="mt-4 flex gap-4">
                            <input
                                name="user-input-box"
                                type="text"
                                placeholder="Hey Visesh, what experiences do you have?"
                                className="flex-1 p-3 rounded-md border focus:outline-none focus:border-gray-400"
                            />
                            <button
                                className="bg-black text-white px-4 py-2 rounded-md"
                                id="send-button"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ChatBot