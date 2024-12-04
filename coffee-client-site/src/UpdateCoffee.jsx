import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
  const coffee = useLoaderData();
  const {_id, name, quantity, supplier, taste, details, photo, category } = coffee;
  console.log(coffee, "Update Coffee Data");
  const handelUpdateCoffee = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const quantity = form.quantity.value;
    const supplier = form.supplier.value;
    const taste = form.taste.value;
    const category = form.category.value;
    const details = form.details.value;
    const photo = form.photo.value;
    const UpdateCoffee = {
      name,
      quantity,
      supplier,
      taste,
      details,
      photo,
      category,
    };
    console.log(UpdateCoffee);
    // ! IMPROTENT : Send to The Server
    fetch(`http://localhost:5000/coffee/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(UpdateCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Coffee Update SuccesFully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <div className="container w-11/12 mx-auto bg-[#F4F2F0] p-10">
      <div>
        <h2 className="text-center text-2xl text-blue-500">
          Update Coffe {name}{" "}
        </h2>
      </div>
      <form onSubmit={handelUpdateCoffee}>
        {/* // ! IMPORTANT: name and Quantity  */}
        <div className="flex mb-8">
          <div className=" w-full mr-8">
            <label htmlFor="" className="border border-red-500">
              Name
            </label>
            <div className="">
              <input
                name="name"
                className="input input-bordered w-full"
                placeholder="Enter coffee name"
                defaultValue={name}
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="" className="border border-red-500">
              Chef Quantity
            </label>
            <div className="w-full border border-red-500 ">
              <input
                name="quantity"
                className="input input-bordered w-full"
                placeholder="Quantity"
                defaultValue={quantity}
              />
            </div>
          </div>
        </div>
        {/* // ! IMPORTANT: Supplier Taste  */}
        <div className="flex mb-8">
          <div className=" w-full mr-8">
            <label htmlFor="" className="border border-red-500">
              Supplier
            </label>
            <div className="">
              <input
                name="supplier"
                className="input input-bordered w-full"
                placeholder="Supplier"
                defaultValue={supplier}
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="" className="border border-red-500">
              Taste
            </label>
            <div className="w-full border border-red-500 ">
              <input
                name="taste"
                className="input input-bordered w-full"
                placeholder="Taste"
                defaultValue={taste}
              />
            </div>
          </div>
        </div>
        {/* // ! IMPORTANT: Details and Category */}
        <div className="flex mb-8">
          <div className=" w-full mr-8">
            <label htmlFor="" className="border border-red-500">
              Category
            </label>
            <div className="">
              <input
                name="category"
                className="input input-bordered w-full"
                placeholder="Enter coffee category"
                defaultValue={category}
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="" className="border border-red-500">
              Details
            </label>
            <div className="w-full border border-red-500 ">
              <input
                name="details"
                className="input input-bordered w-full"
                placeholder="Details"
                defaultValue={details}
              />
            </div>
          </div>
        </div>
        {/* // ! IMPORTANT: This is a critical section  */}

        <div className="flex mb-8">
          <div className=" w-full mr-8">
            <label htmlFor="" className="border border-red-500">
              Photo
            </label>
            <div className="">
              <input
                name="photo"
                className="input input-bordered w-full"
                placeholder="Enter coffee category"
                defaultValue={photo}
              />
            </div>
          </div>
        </div>
        <input
          className="btn btn-block bg-black text-white"
          type="submit"
          value="Update Coffee"
        />
      </form>
    </div>
  );
};

export default UpdateCoffee;
