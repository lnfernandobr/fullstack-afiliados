import React, { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

const AiOutlineCloudUpload = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      fill="#ccc"
      d="M11 20H6.5q-2.275 0-3.888-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.038T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.313 3.188T18.5 20H13v-7.15l1.6 1.55L16 13l-4-4l-4 4l1.4 1.4l1.6-1.55V20Z"
    />
  </svg>
);

export const UploadTransactions = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      console.log(`Uploading file ${selectedFile.name}...`);

      const formData = new FormData();
      formData.append("file", selectedFile);

      api
        .post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast(
            "Suas tranções foram enviadas. O processamento já foi iniciado"
          );
        })
        .catch(console.error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center w-full h-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center gap-2"
          >
            <AiOutlineCloudUpload className="text-4xl text-gray-400" />
            <span className="text-lg font-medium text-gray-500">
              Clique para carregar uma nova transação
            </span>
            <span className="text-sm text-gray-400">
              (Arquivos suportados: .txt)
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileInput}
            accept=".txt"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Enviar
        </button>
      </form>

      <table className="border-collapse border w-full mt-12">
        <thead>
          <tr>
            <th className="border py-2 px-4 text-left">Vendedor</th>
            <th className="border py-2 px-4 text-left">Produto</th>
            <th className="border py-2 px-4 text-left">Data</th>
            <th className="border py-2 px-4 text-right">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border py-2 px-4">Vendedor A</td>
            <td className="border py-2 px-4">Produto 1</td>
            <td className="border py-2 px-4">2023/04/01</td>
            <td className="border py-2 px-4 text-right">R$ 10,00</td>
          </tr>
          <tr>
            <td className="border py-2 px-4">Vendedor B</td>
            <td className="border py-2 px-4">Produto 2</td>
            <td className="border py-2 px-4">2023/04/02</td>
            <td className="border py-2 px-4 text-right">R$ 20,00</td>
          </tr>
          <tr>
            <td className="border py-2 px-4">Vendedor C</td>
            <td className="border py-2 px-4">Produto 3</td>
            <td className="border py-2 px-4">2023/04/03</td>
            <td className="border py-2 px-4 text-right">R$ 30,00</td>
          </tr>
        </tbody>
      </table>

      <div className="text-right w-full mt-4">
        <span className="font-bold mr-2">Total:</span>
        <span className="font-bold">R$ 60,00</span>
      </div>
    </div>
  );
};
