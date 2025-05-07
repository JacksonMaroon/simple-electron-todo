"use client"

import { useState } from "react"
import { Check, MoreHorizontal, Trash, X } from "lucide-react"
import { trpc } from "@/lib/trpc/client"
import { formatDate } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

export function AdminCommentsList() {
  const [page, setPage] = useState(1)
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null)
  const { toast } = useToast()
  const utils = trpc.useUtils()

  const { data, isLoading } = trpc.comments.listAll.useQuery({
    page,
    limit: 10,
  })

  const { mutate: markSpam } = trpc.comments.markSpam.useMutation({
    onSuccess: () => {
      toast({
        title: "Comment marked as spam",
        description: "The comment has been marked as spam",
      })
      utils.comments.listAll.invalidate()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to mark comment as spam",
        variant: "destructive",
      })
    },
  })

  const { mutate: markNotSpam } = trpc.comments.markNotSpam.useMutation({
    onSuccess: () => {
      toast({
        title: "Comment marked as not spam",
        description: "The comment has been marked as not spam",
      })
      utils.comments.listAll.invalidate()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to mark comment as not spam",
        variant: "destructive",
      })
    },
  })

  const { mutate: deleteComment } = trpc.comments.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Comment deleted",
        description: "The comment has been deleted successfully",
      })
      setDeleteCommentId(null)
      utils.comments.listAll.invalidate()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete comment",
        variant: "destructive",
      })
    },
  })

  const handleDeleteComment = () => {
    if (deleteCommentId) {
      deleteComment({ id: deleteCommentId })
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Post</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.comments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No comments found
                </TableCell>
              </TableRow>
            ) : (
              data?.comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="font-medium">
                    {comment.authorName}
                    {comment.authorEmail && <div className="text-xs text-muted-foreground">{comment.authorEmail}</div>}
                  </TableCell>
                  <TableCell>
                    {comment.body.length > 50 ? `${comment.body.substring(0, 50)}...` : comment.body}
                  </TableCell>
                  <TableCell>
                    {comment.post?.title
                      ? comment.post.title.length > 20
                        ? `${comment.post.title.substring(0, 20)}...`
                        : comment.post.title
                      : "Unknown post"}
                  </TableCell>
                  <TableCell>{formatDate(new Date(comment.createdAt))}</TableCell>
                  <TableCell>
                    {comment.isSpam ? (
                      <Badge variant="destructive">Spam</Badge>
                    ) : (
                      <Badge variant="outline">Normal</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {comment.isSpam ? (
                          <DropdownMenuItem onClick={() => markNotSpam({ id: comment.id })}>
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Not Spam
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => markSpam({ id: comment.id })}>
                            <X className="mr-2 h-4 w-4" />
                            Mark as Spam
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={() => setDeleteCommentId(comment.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {data?.pagination.totalPages && data.pagination.totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= data.pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}

      <AlertDialog open={!!deleteCommentId} onOpenChange={(open) => !open && setDeleteCommentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the comment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteComment}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
