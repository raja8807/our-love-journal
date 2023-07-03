const { default: Skeleton } = require("react-loading-skeleton");
import 'react-loading-skeleton/dist/skeleton.css'

const TableSkeleton = () => {
  return (
    <>
      <Skeleton height={50}/>
      <Skeleton height={30}/>
      <Skeleton height={30}/>
      <Skeleton height={30}/>
      <Skeleton height={30}/>
    </>
  );
};

export default TableSkeleton;
