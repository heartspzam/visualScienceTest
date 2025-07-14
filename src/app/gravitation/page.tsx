import Sketch from "@/components/Sketch";

export default function Gravitation() {
  return (
    <div className="h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">
        Welcome to gravitational force simulation.
      </h1>
      <div>
        <Sketch width={600} height={400} />
      </div>
    </div>
  );
}
