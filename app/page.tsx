"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import {
  fetchAuthSession,
  signInWithRedirect,
  signOut,
} from "aws-amplify/auth";
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

  const handleSignInWithRedirect = () => {
    signInWithRedirect({
      provider: {
        custom: "AzureOIDC",
      },
    });
  };

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
        Footer() {
          return (
            <div 
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
            <button
              onClick={handleSignInWithRedirect}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 12px',
                backgroundColor: '#0078D4',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg"
                alt="Azure Logo"
                style={{ height: '20px', marginRight: '8px' }}
              />
              Login with Azure
            </button>
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
            <h1>Hello!</h1>
            <button onClick={signOut}>Sign out</button>
            {/* StorageBrowser Component */}
            <h2>Your Files</h2>
            <StorageBrowser />
        </main>
      )}
    </Authenticator>
  );
}
