# Weather App

A modern React application built with [Vite](https://vitejs.dev/) that provides users with current weather conditions through multiple search methods:

- City name
- ZIP code
- Geographic coordinates (latitude & longitude)

## Application Screenshots

### City Search
![City Search](https://github.com/Dev-Mastermind/Weather-App/blob/main/src/assets/City-Search.png)

### Coordinates Search
![Coordinates Search](https://github.com/Dev-Mastermind/Weather-App/blob/main/src/assets/Coordinates-Search.png)

### ZipCode Search
![ZipCode Search](https://github.com/Dev-Mastermind/Weather-App/blob/main/src/assets/ZipCode-Search.png)


Weather data is provided by the [OpenWeather](https://openweathermap.org/api) Current Weather API.

## Getting Started

1. **Clone / download the repository**
2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment**:
```
# Create .env file and set VITE_OPENWEATHER_API_KEY
```

4. **Start development server**:
```bash
npm run dev
```

## Project Architecture

### Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (buttons, modals)
│   └── weather/         # Weather-specific components
│       ├── SearchForm/
│       ├── WeatherCard/
│       ├── Dashboard/
│       ├── WeekList/
│       └── HourlyChart/
├── pages/               # Page-level components
│   └── Home/
├── hooks/               # Custom React hooks
├── services/            # API and external integrations
├── constants/           # App constants and config
├── styles/             # Global styles
└── tests/              # Test files
```

### Key Design Principles

1. **Component Organization**
   - Each component has its own folder with:
     - Component file (`.jsx`)
     - Scoped styles (`.module.css`)
     - Clean exports (`index.js`)

2. **Separation of Concerns**
   - Services: Handle API calls
   - Hooks: Manage state logic
   - Components: Handle presentation
   - Pages: Compose components

3. **Modular CSS**
   - Component-scoped styles
   - Prevents style conflicts
   - Easy maintenance

## Available Commands

```bash
# Development
npm run dev      # Start dev server
npm run test     # Run tests
npm run lint     # Check code style
npm run format   # Format code

# Production
npm run build    # Build for production
npm run preview  # Preview production build
```

## Testing

The project uses:
- Vitest for test running
- React Testing Library for component testing
- Tests located in `src/tests/__tests__/`

## Future Improvements

- Persist searches in localStorage
- Support i18n / dark theme
- Better error boundary + offline fallback
- Air quality integration
- Extended weather forecasts

## Contributing

When adding new features:

1. **New API Services**
   - Add to `services/` directory
   - Create corresponding hook in `hooks/`

2. **New Components**
   - Follow component folder pattern
   - Include scoped CSS modules
   - Add unit tests

3. **New Pages**
   - Add to `pages/` directory
   - Follow existing page structure

## License

For the purpose of this take-home exercise. Feel free to reuse any part of it.

## VPN Configuration and Access (WireGuard)

This project is deployed behind a WireGuard VPN for secure access. Below are the steps and configuration details for setting up and connecting to the VPN, as well as accessing the deployed React app.

### WireGuard Server & Client Setup

1. **Install WireGuard** on the EC2 instance using your system's package manager.
2. **Generate key pairs** for both the server and each client:
   - Use `wg genkey` and `wg pubkey` to generate private and public keys.
3. **Server configuration** includes:
   - Server's private key
   - Listening port
   - VPN subnet (e.g., `10.0.0.1/24`)
4. **Adding a new client:**
   - Generate a client private key and public key.
   - Assign a unique VPN IP (e.g., `10.0.0.2`) for the client.
   - In the server's WireGuard config file, add a new `[Peer]` section with the client's public key and allowed IPs.

   **Example server config peer section:**
   ```ini
   [Peer]
   PublicKey = <client_public_key>
   AllowedIPs = 10.0.0.2/32
   ```

5. **Client configuration** contains:
   - Client's private key and IP
   - Server's public key and endpoint address

   **Example client config:**
   ```ini
   [Interface]
   PrivateKey = <client_private_key>
   Address = 10.0.0.2/24
   DNS = 1.1.1.1

   [Peer]
   PublicKey = <server_public_key>
   AllowedIPs = 10.0.0.1/32
   Endpoint = <server_public_IP>:51820
   PersistentKeepalive = 25
   ```

### Domain and Nginx Configuration

- The domain `demo.fontmingle.com` points to the WireGuard VPN IP, so clients connected via VPN can access the deployed React app using that domain.
- The Nginx configuration file for the app is located at `/etc/nginx/conf.d/demo-app.conf`.
- Nginx serves the React app from `/var/www/demo-app`.
- To deploy the React app:
  1. Create a production build using:
     ```bash
     npm run build
     ```
  2. Place the generated static files inside `/var/www/demo-app`.
  3. Nginx will serve these static files, allowing access via the configured domain.

### Example: Current Tunnel Configuration

```ini
[Interface]
PrivateKey = SB5Ldkh/t8cKf+HnVuG+4f3WMqy5R4UHPIYghNYZc38=
Address = 10.0.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = KDWQ0N9mZ3bXSQsmTibcPP5XdeoMk9Nrzo0qz1KR2zA=
AllowedIPs = 10.0.0.1/32
Endpoint = 54.177.100.205:51820
PersistentKeepalive = 25
```

### How to Connect to the WireGuard VPN and Use the App

1. Download and install WireGuard from [https://www.wireguard.com/install/](https://www.wireguard.com/install/).
2. Open the WireGuard app and click **Add Tunnel**.
3. Import the configuration by opening the ZIP file shared with you.
4. Click **Activate** to connect to the VPN.
5. Once connected, open your browser and go to:
   - [http://demo.fontmingle.com/](http://demo.fontmingle.com/)
---

## WireGuard VPN Setup Screenshots

![WireGuard Setup 1](https://github.com/Dev-Mastermind/Weather-App/blob/main/src/assets/WireGaurd-1.png)

![WireGuard Setup 2](https://github.com/Dev-Mastermind/Weather-App/blob/main/src/assets/WireGaurd-2.png)
