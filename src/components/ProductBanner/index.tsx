import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import {productById} from '@site/src/data/products';
import {RobotIllustration} from '@site/src/components/ProductIllustrations';
import {ArrowRight} from '@site/src/components/Icons';
import styles from './styles.module.css';

export default function ProductBanner({productId}: {productId: string}): ReactNode {
  const product = productById(productId);
  if (!product) return null;

  return (
    <section className={clsx(styles.banner, styles[product.accent])}>
      <div className={styles.copy}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          产品文档 · {product.status}
        </div>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.nameZh}>{product.nameZh}</p>
        <p className={styles.subtitle}>{product.subtitle}</p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.tags}>
          {product.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.actions}>
          {product.placeholder ? (
            <>
              <Link className={styles.primary} to="/amr-a">
                查看 WS2024-Lyon 专区
                <ArrowRight className={styles.arrow} />
              </Link>
              <Link className={styles.secondary} to="/docs">
                浏览通用文档
              </Link>
            </>
          ) : (
            <>
              <Link className={styles.primary} to={`/${product.id}/quick-start`}>
                快速开始
                <ArrowRight className={styles.arrow} />
              </Link>
              <Link className={styles.secondary} to={`/${product.id}/specs`}>
                规格参数
              </Link>
            </>
          )}
        </div>
      </div>
      <div className={styles.art}>
        <RobotIllustration id={product.illustration} />
      </div>
    </section>
  );
}
