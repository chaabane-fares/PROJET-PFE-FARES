import routes, { renderRoutes } from '@src/modules/shared/routes'
import { useAppSelector } from '@src/modules/shared/store'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { supabase } from '@src/client'
import { useState, useEffect } from 'react'

const App = () => {
  const queryClient = new QueryClient()
  const { i18n } = useTranslation('translation')
  document.body.dir = i18n?.dir()

  const theme = useAppSelector((state) => state.theme.mode)

  {
    /* // ******check user with supabase*****
  const[user,setUser]=useState(null)
  useEffect(()=>{
    checkUser();
    //****to we can detect when the OAuth redirect is happened and then  recalling check user on redirect ****
    window.addEventListener('hashchange',function(){
      checkUser()
    });   
  },[])
  //***setUser will update user with the user returned from the supabase***
  async function checkUser(){
    const user =supabase.auth.getUser();
    setUser(user);
  }
  async function signInWithOAuth() { 
    await supabase.auth.signInWithOAuth({provider:'github'});
  }
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }*/
  }
  supabase.auth.getUser() // get current user
  supabase.auth.signOut() // sign out
  supabase.auth.signInWithOAuth({
    // sign in with github
    provider: 'github',
    options: {
      redirectTo: `home page url /`,
    },
  })

  return (
    <div id={theme}>
      <Helmet>
        <title>Welcome - Github code reviewer</title>
      </Helmet>
      <QueryClientProvider client={queryClient}>{renderRoutes(routes)}</QueryClientProvider>
    </div>
  )
}

export default App
