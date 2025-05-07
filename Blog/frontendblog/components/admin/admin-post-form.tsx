"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { trpc } from "@/lib/trpc/client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { MultiSelect } from "@/components/ui/multi-select"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  summary: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().default(false),
  commentsEnabled: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
  seriesId: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface AdminPostFormProps {
  post?: any
}

export function AdminPostForm({ post }: AdminPostFormProps) {
  const [activeTab, setActiveTab] = useState("editor")
  const router = useRouter()
  const { toast } = useToast()
  const utils = trpc.useUtils()

  const { data: tags } = trpc.tags.list.useQuery()
  const { data: series } = trpc.series.list.useQuery()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      summary: post?.summary || "",
      content: post?.content || "",
      published: post?.published || false,
      commentsEnabled: post?.commentsEnabled ?? true,
      tags: post?.tags?.map((tag: any) => tag.id) || [],
      seriesId: post?.seriesId || "",
    },
  })

  const { mutate: createPost, isLoading: isCreating } = trpc.posts.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Post created",
        description: "Your post has been created successfully",
      })
      router.push("/admin/posts")
      utils.posts.listAll.invalidate()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive",
      })
    },
  })

  const { mutate: updatePost, isLoading: isUpdating } = trpc.posts.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Post updated",
        description: "Your post has been updated successfully",
      })
      router.push("/admin/posts")
      utils.posts.listAll.invalidate()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update post",
        variant: "destructive",
      })
    },
  })

  function onSubmit(data: FormValues) {
    if (post) {
      updatePost({
        id: post.id,
        ...data,
      })
    } else {
      createPost(data)
    }
  }

  const isLoading = isCreating || isUpdating

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="post-slug" {...field} />
                </FormControl>
                <FormDescription>The URL-friendly version of the title</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief summary of the post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultiSelect
                    selected={field.value || []}
                    options={
                      tags?.map((tag) => ({
                        label: tag.name,
                        value: tag.id,
                      })) || []
                    }
                    onChange={field.onChange}
                    placeholder="Select tags"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seriesId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Series</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={field.value || ""}
                    onChange={field.onChange}
                  >
                    <option value="">None</option>
                    {series?.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Published</FormLabel>
                  <FormDescription>Whether the post is publicly visible</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="commentsEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Comments</FormLabel>
                  <FormDescription>Allow readers to comment on this post</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="mt-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content (MDX)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your post content in MDX format"
                      className="min-h-[400px] font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="preview" className="mt-4">
            <div className="rounded-lg border p-4">
              <div className="prose max-w-none dark:prose-invert">
                {/* MDX preview would go here */}
                <p className="text-muted-foreground">MDX preview is not available in this demo.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : post ? "Update Post" : "Create Post"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/posts")}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
