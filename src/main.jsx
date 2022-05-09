import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContextProvider from './contexts/AuthContext';
import App from './App'
import SimpleReactLightbox from 'simple-react-lightbox'
import './App.scss'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 2, // 2 minutes
			cacheTime: 1000 * 60 * 60 * 4, // 4 hours
		},
	},
})


ReactDOM.render(
  <React.StrictMode>
    	<QueryClientProvider client={queryClient}>
      <HashRouter>
        <AuthContextProvider>
        <SimpleReactLightbox>

          <App />
          </SimpleReactLightbox>
        </AuthContextProvider>
      </HashRouter>
      </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
