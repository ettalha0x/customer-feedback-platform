"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FaCopy } from "react-icons/fa"
import toast, { Toaster } from 'react-hot-toast'

export default function Dashboard() {
  const [products, setProducts] = useState<{ id: number, name: string }[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [filteredClients, setFilteredClients] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<number | undefined>()
  const [selectedClient, setSelectedClient] = useState<number | undefined>()
  const [link, setLink] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/feedback/products/")
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:8000/feedback/clients/")
        const data = await response.json()
        setClients(data)
      } catch (error) {
        console.error("Error fetching clients:", error)
      }
    }

    fetchProducts()
    fetchClients()
  }, [])

  useEffect(() => {
    if (selectedProduct !== undefined) {
      const filtered = clients.filter(client =>
        client.products.includes(selectedProduct)
      )
      setFilteredClients(filtered)
    } else {
      setFilteredClients([])
    }
  }, [selectedProduct, clients])

  const generateLink = () => {
    if (selectedProduct !== undefined && selectedClient !== undefined) {
      setLink(`/feedback/${selectedProduct}/${selectedClient}`)
    }
  }

  const copyToClipboard = () => {
    if (link) {
      navigator.clipboard.writeText(`${window.location.origin}${link}`)
      toast.success("Link copied to clipboard!")
    }
  }

  return (
    <div className="flex flex-col items-center pt-8 space-y-6">
      <Toaster />
      <h2 className="text-3xl font-bold text-green-700">Dashboard</h2>
      <div className="space-y-4 w-full max-w-md">
        <Select onValueChange={(value) => setSelectedProduct(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id.toString()}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedProduct !== undefined && (
          <Select onValueChange={(value) => setSelectedClient(Number(value))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a client" />
            </SelectTrigger>
            <SelectContent>
              {filteredClients.map((client) => (
                <SelectItem key={client.id} value={client.id.toString()}>
                  {client.first_name} {client.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <div className="flex justify-center">
          <Button onClick={generateLink} disabled={selectedProduct === undefined || selectedClient === undefined}>
            Generate Feedback Link
          </Button>
        </div>
      </div>
      {link && (
        <div className="mt-4 flex items-center space-x-2">
          <p className="font-semibold">Shareable Link:</p>
          <Link href={link} className="text-blue-500 hover:underline" target="_blank">
            {`${window.location.origin}${link}`}
          </Link>
          <Button onClick={copyToClipboard} className="ml-2">
            <FaCopy />
          </Button>
        </div>
      )}
      <div className="mt-8">
        <Link href="/">
          <Button variant="outline">View Feedback Insights</Button>
        </Link>
      </div>
    </div>
  )
}