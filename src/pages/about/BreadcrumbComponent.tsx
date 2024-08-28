import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";

export const BreadcrumbComponent = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter((seg) => seg);

  return (
    <Breadcrumb className="flex justify-center items-center">
      <BreadcrumbList className="text-white text-lg hover:text-blue-700 ">
        <BreadcrumbItem >
          <BreadcrumbLink  href="/" >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const formattedSegment = segment.replace(/-/g, " ").toUpperCase();

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbSeparator />
              {isLast ? (
                <BreadcrumbPage className="text-gray-300">{formattedSegment}</BreadcrumbPage>
              ) : (
                <BreadcrumbItem >
                  <BreadcrumbLink href={href} >
                    {formattedSegment}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
