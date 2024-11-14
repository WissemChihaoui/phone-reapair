import React from 'react'
import { Helmet } from 'react-helmet-async'
import { CONFIG } from 'src/config-global';
import { UserCreateView } from 'src/sections/user/view';

const metadata = { title: `Ajouter Client | Dashboard - ${CONFIG.appName}` };

export default function add() {
  return (
    <>
        <Helmet>
            <title>{metadata.title}</title>
        </Helmet>
        <UserCreateView />
    </>
  )
}
