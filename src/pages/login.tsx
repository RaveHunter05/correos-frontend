import Image from 'next/image';
import posImage from 'public/pos_image.png';

export default function Login() {
    return (
        <div className="">
            <div className="flex flex-row w-screen h-screen">
                <div className="w-2/5 bg-sky-400 h-100 flex justify-center items-center flex flex-col space-y-4">
                    <h2 className="text-white text-3xl">Point of sale</h2>
                    <Image
                        src={posImage}
                        alt="POS Image"
                        width="180"
                        height="180"
                    />
                </div>

                <div className="w-3/5 bg-neutral-300 flex flex-col justify-center items-center ">
                    <div className="text-left">
                        <h5 className="text-orange-400 text-xs font-bold">
                            POINT OF SALE
                        </h5>
                        <h2 className="text-2xl font-bold">Sign in</h2>

                        <div className="space-y-2 my-2">
                            <input
                                type="text"
                                placeholder="Email address"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                            />
                            <br />
                            <input
                                type="text"
                                placeholder="Password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="space-y-2 my-2">
                            <p className="text-gray-400 hover:text-gray-600 text-xs font-bold cursor-pointer">
                                Don't have an account? Register
                            </p>
                            <p className="text-sky-400 hover:text-sky-600 text-xs font-bold cursor-pointer">
                                Forgotten your password?
                            </p>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
