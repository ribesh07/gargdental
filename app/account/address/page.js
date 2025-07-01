import AddressSelector from "./AddressSelector";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6">Select Address</h1>
        <AddressSelector />
      </div>
    </main>
  );
}
