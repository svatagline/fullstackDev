import { useEffect, useState, useContext, useRef } from "react";
import Table from "../../components/CommonTable";
import { useApi } from "../../utils/useApi";
import CommonForm from "../../components/CommonForm";
import Modal from "../../components/CommonModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [orderProduct, setOrderProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    quantity: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef();
  const { get, post, put, delete: del, loading, error } = useApi();

  // ---------------- Fetch Products ----------------
  useEffect(() => {
    get("/products").then((res) => setProducts(res.data));
  }, []);

  // ---------------- Product Modal ----------------
  const openAddModal = () => {
    setEditingProduct(null);
    setOrderProduct(null);
    setFormData({ name: "", price: "", stock: "", description: "" });
    setModalShow(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setOrderProduct(null);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    });
    setModalShow(true);
  };

  const handleSubmit = async (formData) => {
    try {
      const data = editingProduct
        ? await put(`/products/%{editingProduct._id}`, formData)
        : await post("/products", formData);

      setProducts((prev) =>
        editingProduct
          ? prev.map((p) => (p._id === editingProduct._id ? data : p))
          : [data, ...prev],
      );

      setModalShow(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await del(`/products/%{id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Order Modal ----------------
  const openOrderModal = (product) => {
    setOrderProduct(product);
    setEditingProduct(null);
    setFormData({
      name: product.name,
      quantity: "",
    });
    setErrorMsg("");
    setModalShow(true);
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async () => {
    if (!orderProduct) return;

    const qty = Number(formData.quantity);
    if (qty <= 0 || qty > orderProduct.stock) {
      setErrorMsg("Quantity must be between 1 and available stock.");
      return;
    }

    try {
      await post("/orders", {
        productId: orderProduct._id,
        quantity: qty,
      });

      setModalShow(false);
    } catch (err) {
      setErrorMsg(error || "Order failed");
    }
  };

  // ---------------- Table ----------------
  const columns = ["Name", "Price", "Stock", "Description", "Actions"];

  const data = products.map((p) => ({
    Name: p.name,
    Price: `${p.price}`,
    Stock: p.stock,
    Description: p.description,
    Actions: (
      <>
        <button
          className="btn btn-sm btn-success me-1"
          onClick={() => openOrderModal(p)}
          disabled={loading}
        >
          Add Order
        </button>
        <button
          className="btn btn-sm btn-primary me-1"
          onClick={() => openEditModal(p)}
          disabled={loading}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleDelete(p._id)}
          disabled={loading}
        >
          Delete
        </button>
      </>
    ),
  }));

  const productFormConfig = [
    {
      fieldName: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter product name",
      validation: [
        {
          ruleType: "function",
          rule: (value) => !!value && value.trim() !== "",
          errorMessage: "Name is required",
        },
        {
          ruleType: "function",
          rule: (value) => value.length >= 3,
          errorMessage: "Name must be at least 3 characters",
        },
      ],
    },

    {
      fieldName: "price",
      label: "Price",
      type: "number",
      placeholder: "Enter price",
      validation: [
        {
          ruleType: "function",
          rule: (value) => value !== "" && value !== null,
          errorMessage: "Price is required",
        },
        {
          ruleType: "function",
          rule: (value) => Number(value) > 0,
          errorMessage: "Price must be greater than 0",
        },
      ],
    },

    {
      fieldName: "stock",
      label: "Stock",
      type: "number",
      placeholder: "Enter stock quantity",
      validation: [
        {
          ruleType: "function",
          rule: (value) => value !== "" && value !== null,
          errorMessage: "Stock is required",
        },
        {
          ruleType: "function",
          rule: (value) =>
            Number.isInteger(Number(value)) && Number(value) >= 0,
          errorMessage: "Stock must be a valid non-negative integer",
        },
      ],
    },

    {
      fieldName: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description",
      validation: [
        {
          ruleType: "function",
          rule: (value) => !value || value.length <= 500,
          errorMessage: "Description cannot exceed 500 characters",
        },
      ],
    },
  ];

  const orderFormConfig = [
    {
      fieldName: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter product name",
    },

    {
      fieldName: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: "Enter quantity",
      validation: [
        {
          ruleType: "function",
          rule: (value) => value !== "" && value !== null,
          errorMessage: "Quantity is required",
        },
      ],
    },
  ];

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Products</h4>
        <button
          className="btn btn-success"
          onClick={openAddModal}
          disabled={loading}
        >
          + Add Product
        </button>
      </div>

      {/* {error && <div className="alert alert-danger">{error}</div>} */}

      <Table columns={columns} data={data} />

      {/* Product Add/Edit Modal */}
      {!orderProduct ? (
        <Modal
          show={modalShow}
          title={editingProduct ? "Edit Product" : "Add Product"}
          onClose={() => setModalShow(false)}
          onConfirm={() => formRef.current.submitForm()}
          confirmText={editingProduct ? "Update" : "Add"}
        >
          <CommonForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            config={productFormConfig}
            ref={formRef}
          />
        </Modal>
      ) : (
        // Order Modal

        <Modal
          show={modalShow}
          title={"Add order"}
          onClose={() => setModalShow(false)}
          onConfirm={() => formRef.current.submitForm()}
          confirmText={"Add"}
        >
          <CommonForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            config={orderFormConfig}
            ref={formRef}
          />
        </Modal>

        // <Modal
        //   show={modalShow}
        //   title={`Order: ${orderProduct.name}`}
        //   onClose={() => setModalShow(false)}
        //   onConfirm={handleOrderSubmit}
        //   confirmText="Place Order"
        // >
        //   {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        //   <FormInput
        //     label="Product"
        //     name="name"
        //     value={formData.name}
        //     disabled
        //   />
        //   <FormInput
        //     label="Quantity"
        //     name="quantity"
        //     type="number"
        //     value={formData.quantity}
        //     onChange={handleOrderChange}
        //     required
        //   />
        // </Modal>
      )}
    </div>
  );
};

export default Products;
