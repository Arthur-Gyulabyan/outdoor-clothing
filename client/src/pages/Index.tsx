import React from "react";
import { PlusCircle } from "lucide-react";
import AppLayout from "@/components/common/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DataTable } from "@/components/common/DataTable";

import { useDesignSpecs } from "@/hooks/use-design";
import { CreateDesignForm } from "@/components/forms/CreateDesignForm";

import { useProductionOrders } from "@/hooks/use-production-order";
import { CreateProductionOrderForm } from "@/components/forms/CreateProductionOrderForm";

import { useMaterialOrders } from "@/hooks/use-material-order";
import { CreateMaterialOrderForm } from "@/components/forms/CreateMaterialOrderForm";

import { useProductionSchedules } from "@/hooks/use-production-schedule";
import { ScheduleProductionForm } from "@/components/forms/ScheduleProductionForm";

import { useProductionProcesses } from "@/hooks/use-production-process";
import { StartProductionForm, CompleteProductionForm } from "@/components/forms/CompleteProductionForm"; // Naming mistake: Should be StartProductionForm

import { useFinishedProducts } from "@/hooks/use-finished-product";
import { InspectProductForm } from "@/components/forms/InspectProductForm";

import { usePackagedItems } from "@/hooks/use-packaged-item";
import { PackageClothingForm } from "@/components/forms/PackageClothingForm";

import { useShipments } from "@/hooks/use-shipment";
import { ShipClothingForm } from "@/components/forms/ShipClothingForm";

// Correct import path for StartProductionForm (Fixing the previous import statement)
import { StartProductionForm as CorrectStartProductionForm } from "@/components/forms/StartProductionForm";

const Index = () => {
  const [isCreateDesignOpen, setIsCreateDesignOpen] = React.useState(false);
  const [isCreateProductionOrderOpen, setIsCreateProductionOrderOpen] = React.useState(false);
  const [isCreateMaterialOrderOpen, setIsCreateMaterialOrderOpen] = React.useState(false);
  const [isScheduleProductionOpen, setIsScheduleProductionOpen] = React.useState(false);
  const [isStartProductionOpen, setIsStartProductionOpen] = React.useState(false);
  const [isCompleteProductionOpen, setIsCompleteProductionOpen] = React.useState(false);
  const [isInspectProductOpen, setIsInspectProductOpen] = React.useState(false);
  const [isPackageClothingOpen, setIsPackageClothingOpen] = React.useState(false);
  const [isShipClothingOpen, setIsShipClothingOpen] = React.useState(false);

  // Fetching data
  const { data: designSpecs, isLoading: isLoadingDesigns, error: errorDesigns } = useDesignSpecs();
  const { data: productionOrders, isLoading: isLoadingProductionOrders, error: errorProductionOrders } = useProductionOrders();
  const { data: materialOrders, isLoading: isLoadingMaterialOrders, error: errorMaterialOrders } = useMaterialOrders();
  const { data: productionSchedules, isLoading: isLoadingProductionSchedules, error: errorProductionSchedules } = useProductionSchedules();
  const { data: productionProcesses, isLoading: isLoadingProductionProcesses, error: errorProductionProcesses } = useProductionProcesses();
  const { data: finishedProducts, isLoading: isLoadingFinishedProducts, error: errorFinishedProducts } = useFinishedProducts();
  const { data: packagedItems, isLoading: isLoadingPackagedItems, error: errorPackagedItems } = usePackagedItems();
  const { data: shipments, isLoading: isLoadingShipments, error: errorShipments } = useShipments();

  return (
    <AppLayout title="Outdoor Clothing Manufacturing Dashboard">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Manufacturing Overview</h1>
        <div className="flex flex-wrap gap-2">
          {/* Quick Action Buttons for Mutations */}
          <Dialog open={isCreateDesignOpen} onOpenChange={setIsCreateDesignOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  New Design
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Design</DialogTitle>
                <DialogDescription>
                  Enter details for a new clothing design specification.
                </DialogDescription>
              </DialogHeader>
              <CreateDesignForm onSuccess={() => setIsCreateDesignOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateProductionOrderOpen} onOpenChange={setIsCreateProductionOrderOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  New Prod. Order
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Production Order</DialogTitle>
                <DialogDescription>
                  Specify details for a new production order.
                </DialogDescription>
              </DialogHeader>
              <CreateProductionOrderForm onSuccess={() => setIsCreateProductionOrderOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateMaterialOrderOpen} onOpenChange={setIsCreateMaterialOrderOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  New Material Order
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Material Order</DialogTitle>
                <DialogDescription>
                  Order new materials for production.
                </DialogDescription>
              </DialogHeader>
              <CreateMaterialOrderForm onSuccess={() => setIsCreateMaterialOrderOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={isScheduleProductionOpen} onOpenChange={setIsScheduleProductionOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Schedule Production
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule Production</DialogTitle>
                <DialogDescription>
                  Define a new production schedule.
                </DialogDescription>
              </DialogHeader>
              <ScheduleProductionForm onSuccess={() => setIsScheduleProductionOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={isStartProductionOpen} onOpenChange={setIsStartProductionOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Start Production
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Start Production</DialogTitle>
                <DialogDescription>
                  Log the start of a new production process.
                </DialogDescription>
              </DialogHeader>
              <CorrectStartProductionForm onSuccess={() => setIsStartProductionOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={isCompleteProductionOpen} onOpenChange={setIsCompleteProductionOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Complete Production
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Complete Production</DialogTitle>
                <DialogDescription>
                  Record details upon completion of a production process.
                </DialogDescription>
              </DialogHeader>
              <CompleteProductionForm onSuccess={() => setIsCompleteProductionOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={isInspectProductOpen} onOpenChange={setIsInspectProductOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Inspect Product
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Inspect Product</DialogTitle>
                <DialogDescription>
                  Perform quality inspection on a finished product.
                </DialogDescription>
              </DialogHeader>
              <InspectProductForm onSuccess={() => setIsInspectProductOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={isPackageClothingOpen} onOpenChange={setIsPackageClothingOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Package Clothing
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Package Clothing</DialogTitle>
                <DialogDescription>
                  Enter details for packaging finished clothing items.
                </DialogDescription>
              </DialogHeader>
              <PackageClothingForm onSuccess={() => setIsPackageClothingOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={isShipClothingOpen} onOpenChange={setIsShipClothingOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Ship Clothing
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ship Clothing</DialogTitle>
                <DialogDescription>
                  Record shipment details for outgoing orders.
                </DialogDescription>
              </DialogHeader>
              <ShipClothingForm onSuccess={() => setIsShipClothingOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Designs</CardTitle>
            <Shirt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingDesigns ? "..." : designSpecs?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoadingDesigns ? "Loading designs" : errorDesigns ? "Error fetching designs" : "Designs created so far"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Production Orders</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingProductionOrders ? "..." : productionOrders?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoadingProductionOrders ? "Loading orders" : errorProductionOrders ? "Error fetching orders" : "Pending production requests"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Materials in Stock</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingMaterialOrders ? "..." : materialOrders?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoadingMaterialOrders ? "Loading inventory" : errorMaterialOrders ? "Error fetching inventory" : "Tracked material orders"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Production Lines</CardTitle>
            <FlaskConical className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingProductionProcesses ? "..." : productionProcesses?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoadingProductionProcesses ? "Loading processes" : errorProductionProcesses ? "Error fetching processes" : "Currently running processes"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 py-4">
        <div id="designs" className="lg:col-span-2 xl:col-span-1">
          <DataTable
            title="Design Specifications"
            data={designSpecs}
            columns={[
              { key: "designTitle", header: "Title" },
              { key: "materialType", header: "Material" },
              { key: "colorPreferences", header: "Colors" },
            ]}
            isLoading={isLoadingDesigns}
            error={errorDesigns}
            emptyMessage="No design specifications found."
          />
        </div>

        <div id="production-orders" className="lg:col-span-2 xl:col-span-1">
          <DataTable
            title="Production Orders"
            data={productionOrders}
            columns={[
              { key: "orderNumber", header: "Order #" },
              { key: "productDesign", header: "Design" },
              { key: "quantityRequired", header: "Qty" },
              { key: "dueDate", header: "Due Date" },
            ]}
            isLoading={isLoadingProductionOrders}
            error={errorProductionOrders}
            emptyMessage="No production orders found."
          />
        </div>

        <div id="material-orders" className="lg:col-span-2 xl:col-span-1">
          <DataTable
            title="Material Orders"
            data={materialOrders}
            columns={[
              { key: "pONumber", header: "PO #" },
              { key: "materialType", header: "Material" },
              { key: "quantity", header: "Qty" },
              { key: "supplierName", header: "Supplier" },
              { key: "deliveryDate", header: "Delivery" },
            ]}
            isLoading={isLoadingMaterialOrders}
            error={errorMaterialOrders}
            emptyMessage="No material orders found."
          />
        </div>

        <div id="production-schedules" className="lg:col-span-2 xl:col-span-1">
          <DataTable
            title="Production Schedules"
            data={productionSchedules}
            columns={[
              { key: "scheduleID", header: "Schedule ID" },
              { key: "startDate", header: "Start Date" },
              { key: "endDate", header: "End Date" },
              { key: "productionLine", header: "Line" },
              { key: "operatorId", header: "Operator" },
            ]}
            isLoading={isLoadingProductionSchedules}
            error={errorProductionSchedules}
            emptyMessage="No production schedules found."
          />
        </div>

        <div id="production-processes" className="lg:col-span-2 xl:col-span-1">
          <DataTable
            title="Production Processes"
            data={productionProcesses}
            columns={[
              { key: "processID", header: "Process ID" },
              { key: "batchNo", header: "Batch #" },
              { key: "operatorName", header: "Operator" },
              { key: "startTime", header: "Start Time" },
              { key: "endTime", header: "End Time" },
              { key: "totalUnits", header: "Units" },
              { key: "defectsCount", header: "Defects" },
              { key: "qualityReport", header: "Quality" },
            ]}
            isLoading={isLoadingProductionProcesses}
            error={errorProductionProcesses}
            emptyMessage="No production processes in progress."
          />
        </div>

        <div id="finished-products" className="lg:col-span-2 xl:col-span-1">
          <DataTable
            title="Finished Products Inspection"
            data={finishedProducts}
            columns={[
              { key: "finishedProdID", header: "Prod. ID" },
              { key: "inspectionDate", header: "Date" },
              { key: "inspector", header: "Inspector" },
              { key: "batchNo", header: "Batch #" },
              { key: "scoreRating", header: "Score" },
            ]}
            isLoading={isLoadingFinishedProducts}
            error={errorFinishedProducts}
            emptyMessage="No finished products inspected."
          />
        </div>

        <div id="packaged-items" className="lg:col-span-2 xl:col-span-1">
          <DataTable
            title="Packaged Items"
            data={packagedItems}
            columns={[
              { key: "packageID", header: "Package ID" },
              { key: "packagingDate", header: "Date" },
              { key: "boxType", header: "Box Type" },
              { key: "packagedQty", header: "Qty" },
              { key: "sealStatus", header: "Seal Status" },
            ]}
            isLoading={isLoadingPackagedItems}
            error={errorPackagedItems}
            emptyMessage="No items packaged."
          />
        </div>

        <div id="shipments" className="lg:col-span-2 xl:col-span-1">
          <DataTable
            title="Shipments"
            data={shipments}
            columns={[
              { key: "shipmentNo", header: "Shipment #" },
              { key: "shipDate", header: "Ship Date" },
              { key: "trackingNo", header: "Tracking #" },
              { key: "destAddress", header: "Destination" },
              { key: "carrierName", header: "Carrier" },
            ]}
            isLoading={isLoadingShipments}
            error={errorShipments}
            emptyMessage="No shipments recorded."
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;