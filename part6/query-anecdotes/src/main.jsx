import ReactDOM from 'react-dom/client'
import App from './App'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NotificationContext} from "./NotificationContext.jsx";

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={client}>
        <NotificationContext>
            <App />
        </NotificationContext>
    </QueryClientProvider>
)