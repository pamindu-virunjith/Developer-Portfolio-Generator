import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function NotFound() {
  const location = useLocation();

  useEffect(() =>{
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);


  return (
    <div className="flex h-screen items-center justify-center bg-[hsl(var(--muted))]">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">404</h1>
        <p className="mb-4 text-xl text-[hsl(var(--muted-foreground))]">Oops! Page not found</p>
        <a href="/" className="text-[hsl(var(--primary))] underline hover:text-[hsl(var(--primary))]/90">
          Return to Home
        </a>
      </div>
    </div>
  )
}

export default NotFound