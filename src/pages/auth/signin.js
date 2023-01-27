import React from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Header from '@/components/Header'
import Image from 'next/image'

export default function Signin({providers}) {
  return (
    <>
      <Header/>
      <div className="flex justify-center space-x-7 mt-20">
        <img className="hidden object-cover md:inline-flex md:w-48 rotate-6" src="https://like4like.com/img/hero-x750.png" alt="instagram-likes" />
        <div className="">
          {
            Object.values(providers).map((provider, index) => (
              <div key={provider.name} className="flex flex-col items-center">
                <Image width={128} height={128} className="w-32 object-cover" src="https://www.elcedrobarcelona.com/wp-content/uploads/instagram-logo-2.png" alt="instagram and logo" />
                <p className="text-sm italic my-10 text-center">This app is created for learning purposes.</p>
                <button onClick={() => { signIn(provider.id, { callbackUrl: '/' }); }} className=" bg-red-400 p-3 rounded-lg text-white hover:bg-red-500 hover:scale-105">Sign in with {provider.name}</button>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}