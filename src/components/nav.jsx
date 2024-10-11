"use client"
import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'next-intl'
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/fetch/authcontext';


const Navbar = () => {

  const t = useTranslations("navlinks");
  const pathname =usePathname();
  const router = useRouter();
  const locale = useParams().locale;
  const { token, logout } = useAuth();
  
  const handlelanguagechange = (e)=>{
   const newLocale = e.target.value;
   const path = pathname.split("/").slice(2).join("/");
   router.push(`/${newLocale}/${path}`)
  }

  const handleLogout = ()=>{
    logout();
    router.push(`/${locale}/login`)
  }
  
  return <>
  {
    token ? (<div className='b-nav flex justify-between items-center mx-2 py-4'>
    <div>
      <Link href={`/${locale}/`}>{t("title")}</Link>
    </div>
    <div><button onClick={handleLogout} className='bg-sky-500 p-1 rounded text-white'>{t('logout')}</button>
    <select value={locale} onChange={handlelanguagechange} className='rounded-md px-4 py-2 bg-transparent hover:outline-none focus:outline-none '>
      <option value="en">EN</option>
      <option value="ar">AR</option>
    </select>
    </div>
   </div>) :(<div className='b-nav flex justify-between items-center mx-2 py-4'>
    <div>
      <Link href={`/${locale}/`}>{t("title")}</Link>
    </div>
    <select value={locale} onChange={handlelanguagechange} className='rounded-md px-4 py-2 bg-transparent hover:outline-none focus:outline-none '>
      <option value="en">EN</option>
      <option value="ar">AR</option>
    </select>
   </div>
  )}
  
  </>
}
export default Navbar
