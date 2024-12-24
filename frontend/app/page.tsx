"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [feedbacks, setFeedbacks] = useState<any>(null)
  const [products, setProducts] = useState<any>(null)

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:8000/feedback/feedbacks/')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const feedbacks = await response.json()
        setFeedbacks(feedbacks)
      } catch (error) {
        console.error('Error fetching feedbacks:', error)
      }
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/feedback/products/')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const products = await response.json()
        setProducts(products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchFeedbacks()
    fetchProducts()
  }, [])

  if (!feedbacks || !products) return <div>Loading...</div>

  const productMap = products.reduce((acc: any, product: any) => {
    acc[product.id] = product.name
    return acc
  }, {})

  const processedData = feedbacks.reduce((acc: any, feedback: any) => {
    const product = productMap[feedback.product]
    if (!acc[product]) {
      acc[product] = { avgSatisfaction: 0, responses: 0, totalSatisfaction: 0, recommendCount: 0 }
    }
    acc[product].responses += 1
    acc[product].totalSatisfaction += feedback.satisfaction
    if (feedback.recommend) acc[product].recommendCount += 1
    acc[product].avgSatisfaction = acc[product].totalSatisfaction / acc[product].responses
    return acc
  }, {})

  const chartData = Object.entries(processedData).map(([product, stats]: [string, any]) => ({
    product,
    satisfaction: stats.avgSatisfaction,
    responses: stats.responses,
    recommendRate: (stats.recommendCount / stats.responses) * 100,
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Feedback Insights</h2>
        <Button className="btn" onClick={() => router.push("/dashboard")}>Create new feedback form</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(processedData).map(([product, stats]: [string, any]) => (
          <Card key={product}>
            <CardHeader>
              <CardTitle>{product}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Average Satisfaction: {stats.avgSatisfaction.toFixed(1)}</p>
              <p>Total Responses: {stats.responses}</p>
              <p>Recommendation Rate: {(stats.recommendCount / stats.responses * 100).toFixed(1)}%</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Satisfaction Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="satisfaction" fill="#4CAF50" />
              <Bar dataKey="recommendRate" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}