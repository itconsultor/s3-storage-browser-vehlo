"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from '@aws-amplify/ui-react';
import { StorageBrowser } from '../components/StorageBrowser';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    <Authenticator 
      hideSignUp
      components={{
        Header() {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
              <img
                src="https://vehlo.com/wp-content/uploads/Vehlo-Logo_RGB_Light.png"
                alt="Custom Logo"
                style={{ width: '350px', height: 'auto' }}
              />
              <h2 style={{ margin: '10px 0' }}>Welcome to Vehlo S3 Bucket files</h2>
            </div>
          );
        },
      }}
    >
    
      {({ signOut, user }) => (
        <main>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
              <img
                src="https://vehlo.com/wp-content/uploads/Vehlo-Logo_RGB_Light.png"
                alt="Custom Logo"
                style={{ width: '350px', height: 'auto' }}
              />
              <h2 style={{ margin: '10px 0' }}>Welcome to Vehlo S3 Bucket files</h2>
            </div>
            <h1>Hello {user?.signInDetails?.loginId}</h1>
            <button onClick={signOut}>Sign out</button>
            {/* StorageBrowser Component */}
            <h2>Your Files</h2>
            <StorageBrowser />
        </main>
      )}
    </Authenticator>
  );
}
