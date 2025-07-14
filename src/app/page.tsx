import Link from "next/link";

export default function Home() {
  return (
    <div className="container text-center m-8">
      <h1 className="font-bold">Welcome to Visual Science!</h1>
      <h2>Please explore these simulations:</h2>
      <nav className="mt-8">
        <Link href="/gravitation" className="text-red-600">
          Gravitation /{" "}
        </Link>
        <Link className="text-orange-400" href="/accduetogravity">
          Acceleration due to gravity /{" "}
        </Link>
        <Link className="text-yellow-400" href="/featherandcoin">
          Feather and Coin /{" "}
        </Link>
        <Link className="text-green-600" href="/archimedes">
          Archimedes Principle /{" "}
        </Link>
        <Link className="text-blue-800" href="/optics">
          Optics /{" "}
        </Link>
        <Link className="text-purple-700" href="/transformer">
          Transformer
        </Link>
      </nav>
    </div>
  );
}
