import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {
  setLoading,
  unsetLoading,
} from "@/app/lib/features/loading/loadingSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faX } from "@fortawesome/free-solid-svg-icons";

const ProductForm = ({
  categories,
  fetchProducts,
  toggleForm,
  editingProduct,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);

  const [formState, setFormState] = useState({
    name: "",
    category: "",
    price: "",
    images: [],
    imagePreviews: [],
  });

  useEffect(() => {
    if (editingProduct) {
      console.log("product to be edited: ", editingProduct);
      setFormState({
        name: editingProduct.name,
        category: editingProduct.category,
        price: editingProduct.price,
        images: [],
        imagePreviews:
          editingProduct.images?.map(
            (image,index) => `${process.env.NEXT_PUBLIC_BACKEND_API}/${editingProduct.images[index]}`
          ) || [],
      });
      console.log("form state" , formState);
    } else {
      setFormState({
        name: "",
        category: "",
        price: "",
        images: [],
        imagePreviews: [],
      });
    }
  }, [editingProduct]);

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading());
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("category", formState.category);
      formData.append("price", formState.price);
      formState.images.forEach((image) => {
        formData.append("images", image);
      });

      let response;
      if (editingProduct) {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/crud/product/${editingProduct.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/crud/product`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.status === 200) {
        fetchProducts();
        toast.success(response.data.message, { fontSize: "14px" });
        toggleForm();
      } else {
        throw new Error(response.data.message || "Failed to save product.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to perform operation.", {
        fontSize: "14px",
      });
    } finally {
      dispatch(unsetLoading());
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setFormState((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
      imagePreviews: [...prevState.imagePreviews, ...newImagePreviews],
    }));
  };

  const removeImage = (index) => {
    setFormState((prevState) => {
      const newImages = [...prevState.images];
      const newImagePreviews = [...prevState.imagePreviews];
      newImages.splice(index, 1);
      newImagePreviews.splice(index, 1);
      return {
        ...prevState,
        images: newImages,
        imagePreviews: newImagePreviews,
      };
    });
  };

  return (
    <form onSubmit={saveProduct} className="w-full">
      <label className="block text-blue-900 text-sm font-semibold mb-2">
        Category
      </label>
      <select
        className="border-2 border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
        value={formState.category}
        onChange={(e) =>
          setFormState({ ...formState, category: e.target.value })
        }
      >
        <option value="" disabled>
          Select a product category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <label className="block text-blue-900 text-sm font-semibold mb-2">
        Product name
      </label>
      <input
        type="text"
        name="name"
        className="border-2 border-gray-300 rounded-md px-1 w-full mb-2"
        value={formState.name}
        placeholder="Product name"
        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
      />

      <label className="block text-blue-900 text-sm font-semibold mb-2">
        Photos
      </label>
      <div className="flex flex-wrap gap-2 mb-4">
        <label className="w-24 h-24 text-center cursor-pointer bg-gray-200 text-grey-500 text-sm flex items-center justify-center gap-1 rounded-lg">
          <FontAwesomeIcon icon={faUpload} />
          <span className="block">Upload</span>
          <input type="file" hidden multiple onChange={handleImageChange} />
        </label>
        {formState.imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="h-24 w-24 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 rounded-full flex items-center justify-center p-1"
            >
              <FontAwesomeIcon icon={faX} className="h-3 w-3 text-white" />
            </button>
          </div>
        ))}
      </div>

      <label className="block text-blue-900 text-sm font-semibold mb-2">
        Price
      </label>
      <input
        type="number"
        min="0"
        className="border-2 border-gray-300 rounded-md px-1 w-full mb-2"
        value={formState.price}
        placeholder="Product price"
        onChange={(e) => setFormState({ ...formState, price: e.target.value })}
      />

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={() => {
            toggleForm();
            setFormState({
              name: "",
              category: "",
              price: "",
              images: [],
              imagePreviews: [],
            });
          }}
          className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-900 text-white px-3 py-1 rounded-md"
        >
          {editingProduct ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
