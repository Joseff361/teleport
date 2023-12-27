import { Outlet } from 'react-router-dom';

import bannerSrc from '../../assets/banner.png';
import classes from './RootLayout.module.css';

function RootLayout() {
  return (
    <main className={classes.layout}>
      <section className={classes['layout__banner']}>
        <img
          src={bannerSrc}
          alt="banner image"
          className={classes['layout__image']}
        />
      </section>
      <section className={classes['layout__form']}>
        <Outlet />
      </section>
    </main>
  );
}

export default RootLayout;
