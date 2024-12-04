import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  const { _id, name, quantity, supplier, taste, details, photo, category } =
    coffee;
  const handelDeleted = (_id) => {
    console.log("Deleted Succes Full");
    console.log(_id,"Id name");
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
       
        console.log("deleted confirm");
        fetch(`http://localhost:5000/coffee/${_id}`,{
            method:"DELETE"
            // headers:{
            //     "content-type" : "aplication/json"
            // },
            // body: JSON.stringify(result)

        })
        .then(res =>res.json())
        .then(data =>{
            console.log(data);
            if(data.deletedCount > 0){
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  }
                
                );
                const remaining = coffees.filter(cof =>cof._id != _id) 
                setCoffees(remaining)
            }
        })
        }
      });
      
  };
  return (
    <div>
      <div>
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img src={photo} alt="Shoes" />
          </figure>
          <div className="flex justify-between px-10">
            <div>
              <h2 className="card-title">{name}</h2>
              <p>{quantity}</p>
              <p>{supplier}</p>
              <p>{taste}</p>
            </div>
            <div className="card-actions justify-end">
              <div className="join join-vertical space-y-5">
                <button className="btn btn-active bg-blue-400 join-item">
                  View
                </button>
               <Link to={`updateCoffee/${_id}`}>
               <button className="btn btn-active bg-blue-400 join-item">
                  Edit
                </button>
               </Link>
                <button
                  onClick={()=>handelDeleted(_id)}
                  className="btn btn-active bg-blue-400 join-item"
                >
                  Deleted
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
