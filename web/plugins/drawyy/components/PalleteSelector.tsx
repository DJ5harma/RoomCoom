import { usePallete } from "../providers/PalleteProvider";

const colors: string[] = [
	"rgb(255,100,100)",
	"rgb(100,255,100)",
	"rgb(100,100,255)",
	"rgb(255,255,100)",
	"rgb(255,100,255)",
	"rgb(100,255,255)",
];

export const PalleteSelector = () => {
	const { design, setDesign } = usePallete();
	return (
		<div className="bg-white w-40 h-60 rounded-lg text-black p-2 flex flex-col select-none text-sm border-2 border-purple-800">
			<p>Bg:</p>
			<div className="flex gap-1">
				{colors.map((color) => {
					const isSelected = design.bgColor === color;
					return (
						<div
							key={"Bg:" + color}
							className={`w-6 aspect-square rounded-md`}
							style={{
								backgroundColor: color,
								border: isSelected ? "solid black 4px" : "solid 0.1px gray",
							}}
							onClick={() => {
								setDesign((p) => ({ ...p, bgColor: color }));
							}}
						/>
					);
				})}
			</div>
			<p className="mt-2">Stroke:</p>
			<div className="flex gap-1">
				{colors.map((color) => {
					const isSelected = design.strokeColor === color;
					return (
						<div
							key={"Stroke:" + color}
							className={`w-6 aspect-square rounded-md`}
							style={{
								backgroundColor: color,
								border: isSelected ? "solid black 4px" : "solid 0.1px gray",
							}}
							onClick={() => {
								setDesign((p) => ({ ...p, strokeColor: color }));
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};
