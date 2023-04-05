import { render, screen, fireEvent, act } from "@testing-library/react";
import { Transactions } from "./Transactions";
import { QueryClient, QueryClientProvider } from "react-query";
import userEvent from "@testing-library/user-event";
global.ResizeObserver = require("resize-observer-polyfill");

test("renders Transactions component", async () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <Transactions />
    </QueryClientProvider>
  );

  // tests if componente transcations (the most importat) is rendering
  expect(screen.getByText("Transcações")).toBeInTheDocument();

  // test opening a modal to send a file
  await act(() => {
    fireEvent.click(screen.getByText("Adicionar transação"));
  });
  expect(
    screen.getByText("Clique para carregar uma nova transação")
  ).toBeInTheDocument();

  // test sending a file
  const file = new File(["test file content"], "test.txt", {
    type: "text/plain",
  });
  const inputFile = screen.getByLabelText(
    /Clique para carregar uma nova transação/i
  );
  userEvent.upload(inputFile, file);
  userEvent.click(screen.getByRole("button", { name: /Enviar/i }));
  expect(screen.getByText(/Enviando/i)).toBeInTheDocument();
});
