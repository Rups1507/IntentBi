import { useEffect, useState } from "react";

export default function Dashboard() {
  //usestate for maintaining state of products before and after fetching
  const [products, setProducts] = useState([]);
  //Usestate for maintaining only page number
  const [pageNumber, setPageNumber] = useState(0);
  //Usestate for maintaining sort params using two different onchange on select tags
  //it takes the value from select tag and update only the respective key in object
  const [sortParams, setSortParams] = useState({
    sortBy: "id",
    sortDir: "asc",
  });
  //Usestate for maintaining total number of products using a seperate api
  const [total, setTotal] = useState(0);
  //usestate for maintaining the values in all input boxes for adding a new product
  const [currentProduct, setCurrentProduct] = useState({
    market: "",
    country: "",
    product: "",
    discount: "",
    unitSold: 0,
    manufacturingPrice: "",
    salePrice: "",
    grossSale: 0,
    sales: 0,
    cogs: "",
    profit: 0,
    date: "",
    monthNumber: 2,
    monthName: "February",
    year: 2024,
  });

  //function for fetching all products
  async function getProducts() {
    try {
      let res = await fetch(
        `http://localhost:8080/products/get?pageNumber=${pageNumber}&pageSize=10&sortBy=${sortParams.sortBy}&sortDir=${sortParams.sortDir}`
      );
      let data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  //function for fetching total number of products
  async function getTotal() {
    const res = await fetch("http://localhost:8080/products/getTotal");
    const total = await res.json();
    setTotal(total);
  }

  //function for handling input changes for all input boxes by targetting name property and value of each input event
  function handleInputChange(e) {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  }

  async function handleAddNewProduct() {
    const res = await fetch("http://localhost:8080/products/add", {
      method: "POST",
      body: JSON.stringify(currentProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    
    getProducts();
  }

  useEffect(() => {
    getProducts();
  }, [pageNumber, sortParams]);

  useEffect(() => {
    getTotal();
  }, []);

  return (
    <div className="dashboard_wrapper">
      <aside className="sidepanel">
        <div className="sorting_wrapper">
          <select
            name="sortBy"
            onChange={(e) =>
              setSortParams({ ...sortParams, sortBy: e.target.value })
            }
          >
            <option value="">Sort By : -Select-</option>
            <option value="unitSold">unit_sold</option>
            <option value="manufacturingPrice">manufacturing_price</option>
            <option value="salePrice">sale_price</option>
            <option value="sales">sales</option>
            <option value="profit">profit</option>
          </select>
          <select
            name="sortDir"
            onChange={(e) =>
              setSortParams({ ...sortParams, sortDir: e.target.value })
            }
          >
            <option value="">Sort Order : -Select-</option>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </div>

        <div className="input_field_wrapper">
          <input
            name="market"
            type="text"
            placeholder="Enter Market Name"
            onChange={handleInputChange}
          />
          <input
            name="country"
            type="text"
            placeholder="Enter Country Name"
            onChange={handleInputChange}
          />
          <input
            name="product"
            type="text"
            placeholder="Enter Product Name"
            onChange={handleInputChange}
          />
          <input
            name="discount"
            type="text"
            placeholder="Enter Discount"
            onChange={handleInputChange}
          />
          {/* <input name="unitSold" type="text" placeholder="Enter Unit Sold"/> */}
          <input
            name="manufacturingPrice"
            type="text"
            placeholder="Enter Manufacturing Price"
            onChange={handleInputChange}
          />
          <input
            name="salePrice"
            type="text"
            placeholder="Enter Sale Price"
            onChange={handleInputChange}
          />
          {/* <input name="grossSale" type="text" placeholder="Enter Gross Sale"/> */}
          {/* <input name="sales" type="text" placeholder="Enter Sales"/> */}
          <input
            name="cogs"
            type="text"
            placeholder="Enter Cogs"
            onChange={handleInputChange}
          />
          {/* <input name="profit" type="text" placeholder="Enter Profit"/> */}
          <input
            name="date"
            type="date"
            placeholder="Enter Date"
            onChange={handleInputChange}
          />
          <button onClick={() => handleAddNewProduct()}>Add Product</button>
        </div>
      </aside>
      <section className="dashboard_body">
        <div className="table_wrapper">
          <table>
            <thead>
              <th>id</th>
              <th>market</th>
              <th>country</th>
              <th>product</th>
              <th>discount</th>
              <th>unitSold</th>
              <th>manufacturingPrice</th>
              <th>salePrice</th>
              <th>grossSale</th>
              <th>sales</th>
              <th>cogs</th>
              <th>profit</th>
              <th>date</th>
              <th>monthNumber</th>
              <th>monthName</th>
              <th>year</th>
            </thead>
            <tbody>
              {products?.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.market}</td>
                    <td>{product.country}</td>
                    <td>{product.product}</td>
                    <td>{product.discount}</td>
                    <td>{product.unitSold}</td>
                    <td>{product.manufacturingPrice}</td>
                    <td>{product.salePrice}</td>
                    <td>{product.grossSale}</td>
                    <td>{product.sales}</td>
                    <td>{product.cogs}</td>
                    <td>{product.profit}</td>
                    <td>{product.date}</td>
                    <td>{product.month_number}</td>
                    <td>{product.month_name}</td>
                    <td>{product.year}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button
            disabled={pageNumber == 0}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Prev
          </button>
          <button>{pageNumber + 1}</button>
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber >= Math.floor(total / 10) }
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
