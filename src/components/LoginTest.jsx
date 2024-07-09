import { Sidebar } from "./Sidebar"
import { SimpleNavbar } from "./SimpleNavbar"

export function LoginTest() {
  return (
    <div className="flex gap-5 mt-4">
      <Sidebar />
      <SimpleNavbar />
    </div>

  )
}