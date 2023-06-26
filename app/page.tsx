"use client"

import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/ui/navbar"
import { CartProvider } from "@/lib/CartContext"

export default function Home() {
  return (
    <CartProvider>
      <Navbar/>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          <ProductCard />
        </div>
      </div>
    </CartProvider>
  )
}
