import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CartContext, CartItem } from "@/lib/CartContext";
import { Separator } from "@radix-ui/react-separator";
import { useToast } from "./ui/use-toast";

export function ProductCard() {
  const { toast } = useToast()
  const { state, dispatch } = React.useContext(CartContext);
  const [products, setProducts] = React.useState([]);

  const addToCart = (id: Number, name: String) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, name } });
    toast({
      description: "Adicionado ao carrinho",
    });
  };

  const fetchProducts = async () => {
    const response = await fetch("https://apihomolog.innovationbrindes.com.br/api/site/v2/teste/listagem-produtos");
    const data = await response.json();
    setProducts(data);
  }

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {
        products.map(product => {
          if (product.estoque_disponivel <= 0) {
            return (
              <h1 key={product.codigo_produto}>
                Fora de estoque
              </h1>
            )
          }
          return (
            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" key={product.codigo_produto}>
              < Card className="w-[350px]" >
                <CardHeader>
                  <img src={product.imagem_produto} />
                  <CardTitle>{product.nome_produto}</CardTitle>
                  <CardDescription>{product.descricao_produto}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium leading-none">
                    {product.caracteristicas_produto}
                  </p>
                  <br />
                  <p className="text-sm font-medium leading-none bg-red-400">
                    Estoque: {product.estoque_disponivel}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={() => {
                    addToCart(product.codigo_produto, product.nome_produto);
                  }}>Adicionar ao carrinho</Button>
                </CardFooter>
              </Card >
            </div>

          )
        })
      }
    </>

  )
}