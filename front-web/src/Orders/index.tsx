import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { fetchProducts, saveOrder } from "../api";
import Footer from "../Footer";
import { CheckIsSelected } from "./helpers";
import OrderLocation from "./OrderLocation";
import OrderSummary from "./OrderSummary";
import ProductList from "./ProductList";
import StepesHeader from "./StepsHeader";
import "./styles.css";
import { OrderLocationData, Product } from "./types";

function Orders() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [orderLocation, setOrderLocations] = useState<OrderLocationData>();
  const totalPrice = selectedProducts.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  useEffect(() => {
    fetchProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => {
        toast.warning('Erro ao listar produtos');
      });
  }, []);

  const handleSelectProduct = (product: Product) => {
    const isAlreadySelected = CheckIsSelected(selectedProducts, product);
  
    if (isAlreadySelected) {
      const selected = selectedProducts.filter(item => item.id !== product.id);
      setSelectedProducts(selected);
    } else {
      setSelectedProducts(previous => [...previous, product]);
    }
  }

  const handleSubmit = () => {
    const productsIds = selectedProducts.map(({ id }) => ({ id }));
    const payload = {
      ...orderLocation!,
      products: productsIds
    }
  
    saveOrder(payload).then((response) => {
      toast.error(`Pedido enviado com sucesso! Nº ${response.data.id}`);
      setSelectedProducts([]);
    })
      .catch(() => {
        toast.warning('Erro ao enviar pedido');
      })
  }
  

  return (
    <>
      <div className="orders-container">
        <StepesHeader />
        <ProductList 
        products={products}
        onSelectProduct={handleSelectProduct}
        selectedProducts={selectedProducts}
        />
        <OrderLocation
          onChangeLocation={(location) => setOrderLocations(location)}
        />
        <OrderSummary
         amount={selectedProducts.length}
          totalPrice={totalPrice}
          onSubmit={handleSubmit}
        />
      </div>
      <Footer />
    </>
  );
}

export default Orders;
