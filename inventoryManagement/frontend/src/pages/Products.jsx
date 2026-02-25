import React from "react";
import { useQuery } from "@tanstack/react-query";
import Table from "../components/common/Table";

// Fetcher function (same as SWR fetcher)
const fetchProducts = async () => {
  const res = await fetch("http://localhost:5000/api/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

const Products = () => {
  // TanStack Query Hook
  const {
    data: products,
    error,
    isLoading,
    refetch, // equivalent to mutate()
    isFetching, // optional: background refresh indicator
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,

    // Cache configuration
    staleTime: 1000 * 60, // ✅ 1 minute cache
    gcTime: 1000 * 60 * 10, // cache kept 10 minutes

    // Prevent unnecessary refetch
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Table columns
  const columns = ["Name", "Price", "Stock", "Description", "Actions"];

  // Loading state
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-primary">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="alert alert-danger m-3">
        <strong>Error:</strong> {error.message}
      </div>
    );
  }

  // Transform data for Table
  const tableData = (products || []).map((p) => ({
    Name: p.name,
    Price: `$${p.price}`,
    Stock: p.stock,
    Description: p.description,
    Actions: (
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => refetch()} // manual refresh
      >
        Refresh
      </button>
    ),
  }));

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Product Management</h4>

        <button className="btn btn-primary btn-sm" onClick={() => refetch()}>
          {isFetching ? "Syncing..." : "Sync Data"}
        </button>
      </div>

      {tableData.length > 0 ? (
        <Table columns={columns} data={tableData} />
      ) : (
        <div className="text-center p-5 border rounded bg-light">
          <p className="text-muted">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
