import {Link} from 'react-router-dom';
import React from 'react';
import {RouteName} from '../constanst/routes';
import {BreadcrumbPage} from '../types/common';

interface BreadcrumbsProps {
  pages?: BreadcrumbPage[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({pages}) => {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={RouteName.Login}>Вход</Link>
      </li>
      {
        pages?.map((page) => (
          <li key={page.url} className="breadcrumbs__item">
            <Link to={page.url} className="link">{page.title}</Link>
          </li>
        ))
      }
    </ul>
  );
}
