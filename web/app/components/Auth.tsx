import { API_URL } from "@/utils/Api";

export const Auth = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <a className="bg-white text-black p-2" href={API_URL+"/auth/google"}>Continue With Google</a>
        </div>
    );
}
