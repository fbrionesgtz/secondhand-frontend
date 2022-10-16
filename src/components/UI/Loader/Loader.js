import { VscLoading } from "react-icons/vsc";
import styles from "./Loader.module.css";
const Loader = (props) => {
  return <VscLoading className={styles.loader} style={{ ...props.styles }} />;
};

export default Loader;
