import React from "react";
import { Link } from "react-router-dom";
import { PanelLeft, MountainSnow, Factory, Package, Truck, LayoutDashboard, Shirt, Box, CalendarDays, FlaskConical, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isMobile: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, isMobile }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Link
        to={to}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
      >
        {icon}
        <span className="sr-only">{label}</span>
      </Link>
    </TooltipTrigger>
    <TooltipContent side="right">{label}</TooltipContent>
  </Tooltip>
);

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, title }) => {
  const isMobile = useIsMobile();

  const navigation = [
    { to: "/", icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard" },
    { to: "#designs", icon: <Shirt className="h-5 w-5" />, label: "Designs" },
    { to: "#production-orders", icon: <Factory className="h-5 w-5" />, label: "Production Orders" },
    { to: "#material-orders", icon: <Box className="h-5 w-5" />, label: "Material Orders" },
    { to: "#production-schedules", icon: <CalendarDays className="h-5 w-5" />, label: "Production Schedules" },
    { to: "#production-processes", icon: <FlaskConical className="h-5 w-5" />, label: "Production Processes" },
    { to: "#finished-products", icon: <Gavel className="h-5 w-5" />, label: "Finished Products" },
    { to: "#packaged-items", icon: <Package className="h-5 w-5" />, label: "Packaged Items" },
    { to: "#shipments", icon: <Truck className="h-5 w-5" />, label: "Shipments" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {isMobile ? (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                  <MountainSnow className="h-6 w-6" />
                  <span className="sr-only">Outdoor Clothing</span>
                </Link>
                {navigation.map((item) => (
                  <Link key={item.to} to={item.to} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-semibold">{title}</h1>
        </header>
      ) : (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 py-4">
            <Link
              to="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <MountainSnow className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Outdoor Clothing</span>
            </Link>
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} icon={item.icon} label={item.label} isMobile={isMobile} />
            ))}
          </nav>
        </aside>
      )}
      <div className={`flex flex-col ${isMobile ? "" : "sm:gap-4 sm:py-4 sm:pl-14"}`}>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;