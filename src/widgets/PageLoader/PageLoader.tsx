import styles from "./PageLoader.module.scss";
import { Loader } from "@/shared/UI/Loader";

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <div className={`${styles.pageLoader} ${className ?? ""}`}>
    <Loader />
  </div>
);

export default PageLoader;
