import React from "react";
import { useAuthValue } from "../../auth-context";
import Layout from "../../components/layout";

export default function Home() {
  const { currentUser } = useAuthValue();
  return (
    <Layout>
      <h1>Home</h1>
      {currentUser?.emailVerified &&   <h2>{currentUser?.email ? `Bem vindo ${currentUser?.email}` : null}</h2> }
    
    </Layout>
  );
}
