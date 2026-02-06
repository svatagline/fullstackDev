import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { SocketContext } from "../context/SocketContext";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";
import FormInput from "../components/common/FormInput";
import { useApi } from "../api/useApi";
import useSocketEvent from "./useSocketEvent";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [orderProduct, setOrderProduct] = useState(null); // For order modal
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    quantity: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  useSocketEvent({
    title: "Products Page",
    onInventoryUpdate: ({ productId, stock }) =>
      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? { ...p, stock } : p)),
      ),
  });

  const socket = useContext(SocketContext);

  const fetchProducts = useApi(() => api.get("/products"));
  const addOrUpdateProduct = useApi((data, id = null) => {
    if (id) return api.put(`/products/${id}`, data);
    return api.post("/products", data);
  });
  const deleteProductApi = useApi((id) => api.delete(`/products/${id}`));
  const addOrderApi = useApi((data) => api.post("/orders", data));

  useEffect(() => {
    fetchProducts.request().then((data) => setProducts(data));
  }, []);

  //   useEffect(() => {
  //     if (!socket) return;

  //     // Live stock update
  //     socket.on("inventory:update", ({ productId, stock }) => {
  //       console.log("stocktest", stock);
  //   setProducts((prev) =>
  //     prev.map((p) => (p._id === productId ? { ...p, stock } : p)),
  //   );
  //     });

  //     // Admin notification example
  //     socket.on("admin:new-order", (data) => {
  //       console.log("New order placed:", data);
  //     });

  //     return () => {
  //       socket.off("inventory:update");
  //       socket.off("admin:new-order");
  //     };
  //   }, [socket]);

  // --- Product Modal ---
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: "", price: "", stock: "", description: "" });
    setModalShow(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    });
    setModalShow(true);
  };

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const data = await addOrUpdateProduct.request(
        formData,
        editingProduct?._id,
      );
      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProduct._id ? data : p)),
        );
      } else {
        setProducts((prev) => [data, ...prev]);
      }
      setModalShow(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteProductApi.request(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // --- Order Modal ---
  const openOrderModal = (product) => {
    setOrderProduct(product);
    setFormData({
      name: product.name,
      quantity: "",
    });
    setErrorMsg("");
    setModalShow(true);
  };

  const handleOrderChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async () => {
    if (!orderProduct) return;

    const qty = Number(formData.quantity);
    if (qty > orderProduct.stock || qty <= 0) {
      setErrorMsg("Quantity must be between 1 and available stock.");
      return;
    }

    try {
      const data = await addOrderApi.request({
        productId: orderProduct._id,
        quantity: qty,
      });

      // Emit stock update via socket
      socket?.emit("order:placed", {
        productId: orderProduct._id,
        stock: orderProduct.stock - qty,
      });

      setModalShow(false);
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Order failed");
    }
  };

  // --- Table ---
  const columns = ["Name", "Price", "Stock", "Description", "Actions"];
  const data = products.map((p) => ({
    Name: p.name,
    Price: `$${p.price}`,
    Stock: p.stock,
    Description: p.description,
    Actions: (
      <>
        <button
          className="btn btn-sm btn-success me-1"
          onClick={() => openOrderModal(p)}
        >
          Add Order
        </button>
        <button
          className="btn btn-sm btn-primary me-1"
          onClick={() => openEditModal(p)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleDelete(p._id)}
        >
          Delete
        </button>
      </>
    ),
  }));

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Products</h4>
        <button className="btn btn-success" onClick={openAddModal}>
          + Add Product
        </button>
      </div>

      <Table columns={columns} data={data} />

      {/* Product Add/Edit Modal */}
      {editingProduct !== null || orderProduct === null ? (
        <Modal
          show={modalShow}
          title={editingProduct ? "Edit Product" : "Add Product"}
          onClose={() => setModalShow(false)}
          onConfirm={handleSubmit}
          confirmText={editingProduct ? "Update" : "Add"}
        >
          <FormInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <FormInput
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleFormChange}
            required
          />
          <FormInput
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleFormChange}
            required
          />
          <FormInput
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleFormChange}
          />
        </Modal>
      ) : (
        // Order Modal
        <Modal
          show={modalShow}
          title={`Order: ${orderProduct?.name}`}
          onClose={() => setModalShow(false)}
          onConfirm={handleOrderSubmit}
          confirmText="Place Order"
        >
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          <FormInput
            label="Product"
            name="name"
            value={formData.name}
            onChange={() => {}}
            disabled
          />
          <FormInput
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleOrderChange}
            required
          />
        </Modal>
      )}
    </div>
  );
};

export default Products;
