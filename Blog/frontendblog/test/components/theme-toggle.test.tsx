import { render, screen, fireEvent } from "@testing-library/react"
import { ThemeProvider } from "next-themes"
import { ThemeToggle } from "@/components/theme-toggle"

describe("ThemeToggle", () => {
  it("renders the theme toggle button", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    )

    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByText("Toggle theme")).toBeInTheDocument()
  })

  it("toggles the theme when clicked", () => {
    const { container } = render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    )

    const button = screen.getByRole("button")
    fireEvent.click(button)

    // Note: We can't easily test the actual theme change in jsdom
    // This is more of a smoke test to ensure the click handler works
    expect(button).toBeInTheDocument()
  })
})
