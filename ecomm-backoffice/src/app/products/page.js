'use client';

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ProductForm from "./productForm";
import ProductTable from "./productTable";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';
import { toast } from "react-toastify";
import { setLoading, unsetLoading } from "@/app/lib/features/loading/loadingSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function Products({ swal }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      dispatch(setLoading());
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/crud/products`
      );
      const resData = response.data;

      if (response.status === 200) {
        setProducts(resData.product_list);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again.", {
        fontSize: "14px",
      });
    } finally {
      dispatch(unsetLoading());
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/crud/categories`
      );
      const resData = response.data;

      if (response.status === 200) {
        setCategories(resData.category_list);
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories. Please try again.", {
        fontSize: "14px",
      });
    }
  };

  const updateProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true); 
  };

  const deleteProduct = async (productId) => {
    try {
      dispatch(setLoading());
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API}/crud/product/${productId}`);
      if (response.status === 200) {
        fetchProducts();
        toast.success("Product deleted successfully.", { fontSize: "14px" });
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.", {
        fontSize: "14px",
      });
    } finally {
      dispatch(unsetLoading());
    }
  };

  const confirmDeleteProduct = (productId) => {
    swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productId);
      }
    });
  };

  return (
    <Layout>
      <button
        className="bg-blue-900 text-white px-3 py-2 rounded-md"
        onClick={() => setIsModalOpen(true)}
      >
        Add new Product
      </button>

      {loading && <div className="loader">Loading...</div>}

      <ProductTable
        products={products}
        updateProduct={updateProduct}
        deleteProduct={confirmDeleteProduct}
      />

      <Modal isOpen={isModalOpen}>
        <h2 className="text-blue-900 text-xl font-semibold mb-2">
          {editingProduct ? "Edit Product" : "New Product"}
        </h2>
        <ProductForm
          categories={categories}
          fetchProducts={fetchProducts}
          toggleForm={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          editingProduct={editingProduct}
        />
      </Modal>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Products swal={swal} />);
