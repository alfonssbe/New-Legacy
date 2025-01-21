import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle } from "@/app/admin/components/ui/card";
import { Heading } from "@/app/admin/components/ui/heading";
import prismadb from "@/lib/prismadb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";


const DashboardPage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const params = await props.params;
  const products = await prismadb.product.findMany({
    where: {
      brandId: params.brandId
    },
    select: {
      id: true,
      name: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
  const sizes = await prismadb.size.findMany({
    where: {
      brandId: params.brandId
    },
    select: {
      name: true
    }
  });
  const allCat = await prismadb.allCategory.findMany({
    where: {
      brandId: params.brandId,
      type: "Category"
    },
    select: {
      name: true
    }
  });
  const allSubCat = await prismadb.allCategory.findMany({
    where: {
      brandId: params.brandId,
      type: "Sub Category"
    },
    select: {
      name: true
    }
  });
  const allSubSubCat = await prismadb.allCategory.findMany({
    where: {
      brandId: params.brandId,
      type: "Sub Sub Category"
    },
    select: {
      name: true
    }
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Overview" description="Overview of your Brand" />
        <Separator />
        <div className="grid gap-4 grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle style={{ fontSize: '1.3rem' }} className="text-sm font-medium">Total Product</CardTitle>
              {products.length}
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle style={{ fontSize: '1.3rem' }} className="text-sm font-medium">Total Sizes</CardTitle>
              {sizes.length}
            </CardHeader>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle style={{ fontSize: '1.3rem' }} className="text-sm font-medium">
                Total Categories
              </CardTitle>
              {allCat.length}
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle style={{ fontSize: '1.3rem' }} className="text-sm font-medium">Total Sub Categories</CardTitle>
              {allSubCat.length}
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle style={{ fontSize: '1.3rem' }} className="text-sm font-medium">Total Sub Sub Categories</CardTitle>
              {allSubSubCat.length}
            </CardHeader>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle style={{ fontSize: '1.3rem' }}>Recently Updated</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.slice(0, 10).map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <Link href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products/${product.id}`}>
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell>{product.updatedAt.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
