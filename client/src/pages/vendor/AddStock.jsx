import { useState } from "react";
import { add as stock } from "../../api/stock";

const categories = [
  "electronics",
  "fashion",
  "groceries",
  "home",
  "books",
]

const AddStock = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescr, setShortDescr] = useState("");
  const [longDescr, setLongDescr] = useState("");
  const { userId } = JSON.parse(localStorage.getItem("user"));

  const handlePrice = (e) => {
    setPrice(checkNumber(e.target.value) || price);
  };

  const handleQuantity = (e) => {
    setQuantity(checkNumber(e.target.value) || quantity);
  };

  const checkNumber = (value) => {
    if (isNaN(value)) {
      setError("Price must be a number");
      return null;
    }
    return value;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Please upload a valid image file.");
    }
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    if (!name || !file || !price || !quantity || !category || !shortDescr || !longDescr) {
      setError("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("owner", userId);
    formData.append("name", name);
    formData.append("image", file);
    formData.append("price", price);
    formData.append("available", quantity);
    formData.append("category", category);
    formData.append("shortDescr", shortDescr);
    formData.append("longDescr", longDescr);
    
    stock(formData)
      .then((res) => {
        console.log(res);
        setFile(null);
        setPrice("");
        setQuantity("");
        setError(null);
        setName("");
        setCategory("");
        setShortDescr("");
        setLongDescr("");
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred. Please try again.");
      });
  }

  return (
    <form action="" className="box pad-2em flex wrap gap-2em">
      <div className="box flex column gap-2em">
      <h1>Adding stock</h1>
      <h3 className="color-primary-500">Upload a picture of the product</h3>
      { !file ?
        <label
        htmlFor="fileInput"
        className="box flex justify-center align-center pointer w-third"
        style={{
          background: "#f9f9f9",
          aspectRatio: "3/2",
          border: "2px dashed #ccc",
          borderRadius: "8px",
        }}
      >
        +
        <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }}
        />
      </label> :
        <img
            src={URL.createObjectURL(file)} alt="Preview" className="w-half" style={{height: "auto",marginTop: "10px",borderRadius: "8px",
            }}
        />
      }
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="box pad-2em flex wrap gap-2em wrap column bg-neutral-200 w-third">
        <p>
            Name: <input type="text" placeholder="Enter the name of the product" value={name} onChange={e => setName(e.target.value)} />
        </p>
        <p>
            Price:{" "}
            <input
            type="text"
            placeholder="Enter the price"
            value={price}
            onChange={handlePrice}
            />
        </p>
        <p>
            Stock:{" "}
            <input
            type="text"
            placeholder="Enter the stock quantity"
            value={quantity}
            onChange={handleQuantity}
            />
        </p>
        <p className="flex column gap-1em">
          Category : 
          <select name="category" id="category" className="box pad-half" onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </p>
        <p className="flex column gap-1em">
          Short description : 
          <textarea
            name="description" className="box pad-half"
            id="description"
            cols="30"
            rows="3"
            placeholder="Enter a short description"
            value={shortDescr}
            onChange={(e) => setShortDescr(e.target.value)}
          ></textarea>
        </p>
        <p className="flex column gap-1em">
          Long description : 
          <textarea className="box pad-half"
            name="description"
            id="description"
            cols="30"
            rows="6"
            placeholder="Describe the product in detail"
            value={longDescr}
            onChange={(e) => setLongDescr(e.target.value)}
          ></textarea>
        </p>
        <input type="submit" value="Submit stock" className="btn btn-primary fw-700" onClick={handleAddStock}/>
      </div>
    </form>
  );
};

export default AddStock;
