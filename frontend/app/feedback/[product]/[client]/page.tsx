"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function FeedbackSubmission() {
  const params = useParams()
  const router = useRouter()
  const productId = parseInt(params.product as string, 10)
  const clientId = parseInt(params.client as string, 10)
  const [satisfaction, setSatisfaction] = useState<string>("")
  const [improvements, setImprovements] = useState("")
  const [recommend, setRecommend] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const feedbackData = {
      product: productId,
      client: clientId,
      satisfaction: parseInt(satisfaction, 10),
      improvements,
      recommend: recommend === "yes",
      submitted_at: new Date().toISOString()
    }

    try {
      const response = await fetch("https://cuddly-trout-7rqrgw7vxvcx7v6-8000.app.github.dev/feedback/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(feedbackData)
      })

      if (response.ok) {
        toast.success("Feedback submitted successfully!")
        setTimeout(() => {
          router.push("/thank-you") // Navigate to the Thank You page
        }, 2000) // Delay to allow the toast to be visible
      } else {
        toast.error("Failed to submit feedback.")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast.error("An error occurred while submitting feedback.")
    }
  }

  return (
    <div className="space-y-6">
      <ToastContainer />
      <h2 className="text-2xl font-semibold">Feedback for Product {productId}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>How satisfied are you with the product?</Label>
          <RadioGroup value={satisfaction} onValueChange={setSatisfaction}>
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value.toString()} id={`satisfaction-${value}`} />
                <Label htmlFor={`satisfaction-${value}`}>{value}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="improvements">What improvements would you suggest?</Label>
          <Textarea
            id="improvements"
            value={improvements}
            onChange={(e) => setImprovements(e.target.value)}
            placeholder="Your suggestions..."
          />
        </div>
        <div>
          <Label>Would you recommend this product to others?</Label>
          <RadioGroup value={recommend} onValueChange={setRecommend}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="recommend-yes" />
              <Label htmlFor="recommend-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="recommend-no" />
              <Label htmlFor="recommend-no">No</Label>
            </div>
          </RadioGroup>
        </div>
        <Button type="submit">Submit Feedback</Button>
      </form>
    </div>
  )
}