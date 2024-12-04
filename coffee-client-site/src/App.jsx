import { useLoaderData } from "react-router-dom";
import "./App.css";
import CoffeeCard from "./CoffeeCard";
import { useState } from "react";

function App() {
  const coffee = useLoaderData();
  console.log(coffee);
  const [coffees, setCoffees] = useState(coffee);
  return (
    <>
      <h1 className="text-2xl text-blue-500 text-center font-bold mt-20">
        HOT COLD COFFEE ( <span className="text-red-500">{coffee.length}</span>)
      </h1>
      <div className="grid md:grid-cols-2 gap-5">
        {coffee.map((coffee) => (
          <CoffeeCard
           key={coffee._id} 
           coffee={coffee}
           coffees={coffees}
           setCoffees={setCoffees}
           ></CoffeeCard>
        ))}
      </div>
    </>
  );
}

export default App;
