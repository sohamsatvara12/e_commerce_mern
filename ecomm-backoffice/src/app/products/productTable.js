import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ProductTable = ({ products, updateProduct, deleteProduct }) => {
  return (
    <div className="mt-4">
        <table className="table basic w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Images
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product,index) => (
              <tr key={product.id}>
                <td>
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {product.price}
                </td>
                <td>
                  {product.category}
                </td>
                <td>
                <div className="flex flex-wrap gap-2">
                  {product.images && product.images.map((image, index) => (
                    <img
                      key={index}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_API}/${image}`}
                      alt={`Product ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-md"
                    />
                  ))}
                </div>
                </td>
                <td >
                  <div className="flex flex-col gap-2 w-1/2 mx-auto">
                  <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-md shadow-3xl"
                  onClick={() => updateProduct(product)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md shadow-3xl"
                  onClick={() => deleteProduct(product.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                  </div>
        

                </td>
                </tr>
            ))}
            
          </tbody>
          </table>
    </div>
  );
};

export default ProductTable;
