import { useEffect, useState } from 'react'

import './App.css'
import { Button, Card, CardBody, Form } from "@heroui/react";

function App() {
  const [profile, setProfile] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
      const res = await fetch("/profile");
      const data = await res.json();

      console.log(data)

      setProfile(data)
      setLoaded(true)
    }

    loadProfile()
  }, [])

  return (
    <>
      <Card>
        <CardBody>
          {!profile?.id && <a href="/login">
            <Button color="primary">Sign in with Google</Button>
          </a>}
          {profile?.id &&
            <Form action="/logout" method='post'>
              <Button color="secondary" type='submit'>Logout</Button>
            </Form>
          }

          {profile?.id && <p>Name: {profile.username}, Nick{profile.displayName}, UUID: {profile.id}</p>}
        </CardBody>
      </Card>
    </>
  )
}

export default App
