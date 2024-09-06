import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ClipboardList, Menu, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const routes = [
  { name: 'Ongoing Polls', path: '/admin/ongoing' },
  { name: 'Completed Polls', path: '/admin/completed' },
]

export function Navbar({val}:{val:string}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    console.log('Logging out...')
    navigate('/')
    setIsOpen(false)
  }

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ease-in-out ${
        scrolled ? 'shadow-md py-2' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <ClipboardList className="h-8 w-8 text-blue-600" />
            </motion.div>
            <span className="ml-2 text-xl font-bold text-blue-800">Admin Polls</span>
          </Link>
          <div className="hidden sm:flex sm:space-x-8">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`relative inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                  val === route.name
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {route.name}
              </Link>
            ))}
          </div>
          <div className="hidden sm:flex sm:items-center">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Log out
            </Button>
          </div>
          <div className="sm:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800 focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:hidden">
                <SheetHeader className="border-b border-gray-200 px-6 py-4 mb-4">
                  <SheetTitle className="text-blue-800">Menu</SheetTitle>
                </SheetHeader>
                <div className="px-6">
                  <nav className="space-y-4">
                    {routes.map((route) => (
                      <Link
                        key={route.path}
                        to={route.path}
                        onClick={() => setIsOpen(false)}
                        className={`block py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                          location.pathname === route.path
                            ? 'bg-blue-100 text-blue-600 px-4'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        {route.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      <span className="text-base font-medium">Log out</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}