import { render } from "@testing-library/react"
import { PostListSkeleton } from "@/components/post-list-skeleton"

describe("PostListSkeleton", () => {
  it("renders skeleton elements", () => {
    render(<PostListSkeleton />)

    // Check that we have 5 skeleton items
    const skeletonItems = document.querySelectorAll(".flex.flex-col.gap-2")
    expect(skeletonItems.length).toBe(5)

    // Each skeleton item should have multiple skeleton elements
    const skeletonElements = document.querySelectorAll(".h-4, .h-6")
    expect(skeletonElements.length).toBeGreaterThan(10)
  })
})
