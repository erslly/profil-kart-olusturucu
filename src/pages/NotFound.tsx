import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "../components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Hatası: Kullanıcı var olmayan bir rotaya erişmeye çalıştı:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-lg border bg-card text-card-foreground shadow-lg">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-muted/20 rounded-full p-3">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Sayfa Bulunamadı</h2>
            <p className="text-muted-foreground">
              Aramakta olduğunuz sayfa mevcut değil veya taşınmış olabilir.
            </p>
          </div>
          
          <div className="pt-4 w-full">
            <Link to="/">
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm mt-8">
        {location.pathname} adresi mevcut değil
      </p>
    </div>
  );
};

export default NotFound;