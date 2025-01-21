import Image from "next/image";
import styles from '@/app/(legacy)/css/styles.module.css'

export const Loader = () => {
  return <div className={styles.iconCSS} ><Image alt="loader_legacy" src={'/images/legacy/Legacy-icon-only.svg'} priority
  fill
  style={{ objectFit: 'contain' }}/></div>
};
