import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const PersonalBar = () => {
	return (
        <div className="bg-white h-full flex items-center p-2">

		<Link href={"/personal"}>
			<Button className="bg-black text-white hover:text-black hover:bg-white hover:border-black hover:border">Personal ZONE</Button>
		</Link>
        </div>
	);
};
