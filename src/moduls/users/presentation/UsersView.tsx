import { useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase'
import { View } from 'react-native'


import Account from './components/Account'
import Auth from './components/Auth'

export function UsersView() {
  const [userId, setUserId] = useState<string | null>(null)
  const [email, setEmail] = useState<string | undefined>(undefined)

  useEffect(() => {
    supabase.auth.getClaims().then(({ data }) => {
      if (data?.claims) {
        setUserId(data.claims.sub)
        setEmail(data.claims.email)
      }
    })

    supabase.auth.onAuthStateChange(async (_event, _session) => {
      const {
        data,
      } = await supabase.auth.getClaims()
      if (data?.claims) {
        setUserId(data.claims.sub)
        setEmail(data.claims.email)
      } else {
        setUserId(null)
        setEmail(undefined)
      }
    })
  }, [])

  return <View>{userId ? <Account key={userId} userId={userId} email={email} /> : <Auth />}</View>
}