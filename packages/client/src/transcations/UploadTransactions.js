import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { formatDate, formatMoney } from "../utils";
import { Modal } from "../components/Modal";

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
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTransactions = async (page) => {
    const response = await api.get(`/transactions?page=${page}`);
    const { transactions, totalPages } = response.data;
    setTransactions(transactions);
    setTotalPages(totalPages);
  };

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast("Nenhum arquivo foi selecionado", { type: "warning" });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    api
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast("Suas tranções foram enviadas.", { type: "success" });
        toast("O processamento já foi iniciado.", { type: "warning" });
        setOpen(false);
        setSelectedFile(null);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold ">Transcações</h1>
          <button
            className="bg-blue-500 text-white font-bold px-4 rounded-full"
            onClick={() => setOpen(!open)}
          >
            Adicionar transação
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Vendedor
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Produto
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, idx) => (
                <tr key={idx} className="border border-gray-300">
                  <td className="border py-2 px-4">{transaction.seller}</td>
                  <td className="border py-2 px-4">{transaction.product}</td>
                  <td className="border py-2 px-4 text-right">
                    {formatMoney(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handleClick(pageNumber)}
              className={`ml-2 px-3 py-1 rounded-md text-white ${
                pageNumber === currentPage
                  ? "bg-blue-500"
                  : "bg-gray-300 hover:bg-blue-500"
              }`}
              disabled={pageNumber === currentPage}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
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
          {selectedFile?.name && (
            <div className="mt-8">
              <p className="text-md">
                <b>Arquivo selecionado:</b> {selectedFile.name}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="mt-12 w-full px-4 py-2 mt-4 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </Modal>
    </>
  );
};
