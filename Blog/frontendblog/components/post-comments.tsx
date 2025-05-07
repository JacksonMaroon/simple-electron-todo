"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { trpc } from "@/lib/trpc/client"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

const commentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  body: z.string().min(5, "Comment must be at least 5 characters"),
})

type CommentFormValues = z.infer<typeof commentSchema>

interface PostCommentsProps {
  postId: string
}

export function PostComments({ postId }: PostCommentsProps) {
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()
  const utils = trpc.useUtils()

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: "",
      email: "",
      body: "",
    },
  })

  const { data: comments, isLoading } = trpc.comments.byPostId.useQuery({
    postId,
  })

  const { mutate: addComment, isLoading: isSubmitting } = trpc.comments.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Comment submitted",
        description: "Your comment has been submitted for moderation.",
      })
      form.reset()
      setShowForm(false)
      utils.comments.byPostId.invalidate({ postId })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit comment",
        variant: "destructive",
      })
    },
  })

  function onSubmit(data: CommentFormValues) {
    addComment({
      postId,
      ...data,
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Comments</h3>

      {isLoading ? (
        <p>Loading comments...</p>
      ) : comments?.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments?.map((comment) => (
            <div key={comment.id} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-medium">{comment.authorName}</h4>
                <time className="text-sm text-muted-foreground">{formatDate(new Date(comment.createdAt))}</time>
              </div>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}

      {!showForm ? (
        <Button onClick={() => setShowForm(true)}>Add Comment</Button>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your comment" rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Comment"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
