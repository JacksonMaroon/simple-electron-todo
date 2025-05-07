import { render, screen } from "@testing-library/react"
import { PostItem } from "@/components/post-item"

describe("PostItem", () => {
  const mockPost = {
    id: "1",
    title: "Test Post",
    slug: "test-post",
    summary: "This is a test post",
    publishedAt: new Date("2023-01-01"),
    tags: [
      { id: "1", name: "Test", color: "#ff0000" },
      { id: "2", name: "Example", color: "#00ff00" },
    ],
  }

  it("renders post title", () => {
    render(<PostItem post={mockPost} />)
    expect(screen.getByText("Test Post")).toBeInTheDocument()
  })

  it("renders post summary", () => {
    render(<PostItem post={mockPost} />)
    expect(screen.getByText("This is a test post")).toBeInTheDocument()
  })

  it("renders post date", () => {
    render(<PostItem post={mockPost} />)
    expect(screen.getByText("January 1, 2023")).toBeInTheDocument()
  })

  it("renders post tags", () => {
    render(<PostItem post={mockPost} />)
    expect(screen.getByText("Test")).toBeInTheDocument()
    expect(screen.getByText("Example")).toBeInTheDocument()
  })

  it("links to the post detail page", () => {
    render(<PostItem post={mockPost} />)
    const link = screen.getByRole("link", { name: "Test Post" })
    expect(link).toHaveAttribute("href", "/posts/test-post")
  })
})
