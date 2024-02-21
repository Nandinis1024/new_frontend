import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen bg-gray-300 w-screen" style={
            {
                backgroundImage: `url('./bg-image.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }
        }>
            <div className="text-4xl text-center mb-8 text-white font-bold h-1/8 flex justify-centerr mx-auto mt-10">
                Payments-Microservice
            </div>

            <div className="bg-white p-8 mb-52 rounded shadow-md max-w-md items-center justify-center w-screen mx-auto my-auto">
                <div className="mb-10 font-bold text-gray-700 text-center">
                    Welcome to the Payments MicroService, buy Products and make Payments directly from here!
                </div>

                <div className="flex justify-center space-x-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white"
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </button>
                    <button
                        type="button"
                        className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
