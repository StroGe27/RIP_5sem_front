import React from 'react'
import { Link } from 'react-router-dom'
import styles from './BreadCrumbs.module.scss'

export type BreadCrumbsProps = {
  links: Map<string, string>;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ links }) => {
  return (
    <div className={styles.breadcrumbs}>
      {Array.from(links.entries()).map(([key, value], index) => (
        <React.Fragment key={index /* Используйте index в качестве уникального ключа */}>
          {index < links.size - 1 ? (
            <Link to={value} className={styles.breadcrumbs__item}>
              <span className={styles.breadcrumbs__item_link}>{key}</span>
            </Link>
          ) : (
            <div className={styles.breadcrumbs__item_last}>
              {key}
            </div>
          )}
      {/* Для всех элементов кроме последнего выводим разделитель в виде стрелки */}
        {index < links.size - 1 && (
          <div className={styles.breadcrumbs__item_icon}> / </div>
        )}
      </React.Fragment>
      ))}
    </div>
  );
};

export default  BreadCrumbs